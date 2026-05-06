const map = L.map('map').setView([34.32, 109.71], 10.5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
map.setMaxBounds([[30.80, 108.80], [34.68, 109.50]]);

let heatLayer = null,
  markers = [],
  pollutionData = null,
  lineChart = null,
  csvData = null,
  currentYear = '2011',
  currentSeason = '春季';

fetch('static/data/610100.geojson')
  .then(r => r.json())
  .then(bound => {
    if (bound.crs) delete bound.crs;
    const fixedBound = turf.rewind(bound, { reverse: true });
    const offset = 0.15;
    const shiftedBound = {
      ...fixedBound,
      features: fixedBound.features.map(feature => ({
        ...feature,
        geometry: {
          ...feature.geometry,
          coordinates: feature.geometry.coordinates.map(coords =>
            coords.map(coord => coord.map(point => [point[0] - offset, point[1]]))
          )
        }
      }))
    };
    const city = turf.union(...shiftedBound.features.map(f => f.geometry));
    const big = turf.polygon([[[-180, 90], [180, 90], [180, -90], [-180, -90], [-180, 90]]]);
    const mask = turf.difference(big, city);
    L.geoJSON(mask, {
      style: { fillColor: '#000', fillOpacity: 0.4, stroke: false }
    }).addTo(map);
  });

fetch("static/processed/pollution_by_season.json")
  .then(res => res.json())
  .then(data => {
    pollutionData = data;
    renderMap(currentYear, currentSeason);
    setupSeasonButtons();
  });

fetch("static/data/最终合并带经纬度的数据.csv")
  .then(res => res.text())
  .then(csvText => {
    csvData = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    }).data;
    updateLineChart(currentYear);
  });

function setupSeasonButtons() {
  const btns = document.querySelectorAll('#season-buttons button');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const s = btn.dataset.season;
      if (s !== currentSeason) {
        currentSeason = s;
        renderMap(currentYear, currentSeason);
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });
  // 初始激活当前季节按钮
  const activeBtn = document.querySelector(`#season-buttons button[data-season="${currentSeason}"]`);
  if (activeBtn) activeBtn.classList.add('active');
}

function getFixedColor(pm25) {
  if (pm25 < 35) return '#00ff00';
  if (pm25 < 75) return '#ffff00';
  if (pm25 < 115) return '#ff9900';
  if (pm25 < 150) return '#ff66cc';
  return '#ff0000';
}

function createRippleMarker(name, lat, lon, pm25, item) {
  const color = getFixedColor(pm25);
  const html = `<div class="ripple" style="--ripple-color:${color}">
    <div class="ripple-wave"></div><div class="ripple-wave"></div><div class="ripple-wave"></div>
    <div class="center-dot"></div></div>`;
  const icon = L.divIcon({ html, className: '', iconSize: [60, 60], iconAnchor: [30, 30], popupAnchor: [0, -30] });
  const marker = L.marker([lat, lon], { icon }).addTo(map);
  marker.bindTooltip(name, { permanent: true, direction: 'top', className: '-labelripple', offset: [0, -35] });
  const t = marker.getTooltip();
  t._container?.style.setProperty('--ripple-color', color);
  marker.on('click', () => showPopup(name, item));
  markers.push(marker);
}

function renderMap(year, season) {
  if (!pollutionData || !pollutionData[year] || !pollutionData[year][season]) {
    console.warn(`无数据: 年份=${year}, 季节=${season}`);
    clearMapLayers();
    return;
  }

  clearMapLayers();

  const heatData = [];
  const seasonData = pollutionData[year][season];
  for (const name in seasonData) {
    const itm = seasonData[name];
    // 严格处理pm25，防止NaN影响
    let pm25 = itm.pollution_avg['PM2.5'];
    if (pm25 === null || pm25 === undefined || isNaN(pm25)) pm25 = 0;
    heatData.push([itm.lat, itm.lon, pm25]);
    createRippleMarker(name, itm.lat, itm.lon, pm25, itm);
  }

  const maxP = Math.max(...heatData.map(p => p[2]), 1);
  const norm = heatData.map(p => [p[0], p[1], p[2] / maxP]);

  heatLayer = L.heatLayer(norm, {
    radius: 25, blur: 15, maxZoom: 13,
    gradient: { 1.0: '#0000ff' }
  }).addTo(map);
}

function clearMapLayers() {
  if (heatLayer) {
    map.removeLayer(heatLayer);
    heatLayer = null;
  }
  markers.forEach(m => map.removeLayer(m));
  markers = [];
}

function showPopup(name, item) {
  if (!item) return;

  const popupId = `pie-${name.replace(/\s/g, '-')}`;

  const html = `
    <h4 style="margin: 10px 0; text-align: center;">📍 ${name}</h4>
    <div style="width: 300px; height: 300px; overflow: visible; display: flex; justify-content: center; align-items: center;">
      <canvas id="${popupId}" width="260" height="260"></canvas>
    </div>
  `;

  L.popup()
    .setLatLng([item.lat, item.lon])   // 地图上显示位置（不动）
    .setContent(html)                  // 地图上弹出内容（显示名字）
    .openOn(map);

  setTimeout(() => {
    const canvas = document.getElementById(popupId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (canvas._chart) canvas._chart.destroy();

    // 过滤掉无效污染物数据
    const labels = [];
    const values = [];

    for (const key in item.pollution_avg) {
      const val = item.pollution_avg[key];
      if (val !== null && val !== undefined && !isNaN(val)) {
        labels.push(key);
        values.push(val);
      }
    }

    const total = values.reduce((a, b) => a + b, 0);

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56',
            '#8DD3C7', '#FDB462', '#BEBADA', '#FB8072'
          ]
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: true,
        layout: { padding: 20 },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 14,
              padding: 8,
              font: { size: 12 }
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw;
                const percent = total === 0 ? 0 : ((value / total) * 100).toFixed(1);
                return `${context.label}: ${value} (${percent}%)`;
              }
            }
          },
          datalabels: {
            color: '#444',
            font: { size: 10 },
            anchor: 'end',
            align: 'end',
            offset: 2,
            formatter: (value, context) => {
              const label = context.chart.data.labels[context.dataIndex];
              const percent = total === 0 ? 0 : ((value / total) * 100).toFixed(1);
              return `${label}: ${percent}%`;
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    canvas._chart = chart;
  }, 150);
}

document.getElementById('year-select').addEventListener('change', (e) => {
  currentYear = e.target.value;
  updateLineChart(currentYear);
  renderMap(currentYear, currentSeason);
});

function updateLineChart(year) {
  if (!csvData) return;

  const filtered = csvData.filter(item => item.日期?.startsWith(year));
  if (filtered.length === 0) {
    console.warn("无该年份数据");
    return;
  }

  const dailyPollutants = {};
  filtered.forEach(item => {
    const date = item.日期.split(" ")[0];
    const val = Number(item['首要污染物']);
    if (!isNaN(val)) {
      if (!dailyPollutants[date]) dailyPollutants[date] = [];
      dailyPollutants[date].push(val);
    }
  });

  const data = [];
  for (const date in dailyPollutants) {
    const nums = dailyPollutants[date];
    const mode = getMode(nums);
    data.push({ x: new Date(date), y: mode });
  }

  data.sort((a, b) => a.x - b.x);
  const ctx = document.getElementById('line-chart').getContext('2d');
  if (lineChart) lineChart.destroy();

  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: `${year}年受污染程度变化`,
        data,
        borderColor: '#ff6633',
        backgroundColor: 'rgba(255, 102, 51, 0.3)',
        fill: true,
        pointRadius: 0.5,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month',
            tooltipFormat: 'yyyy-MM-dd',
            displayFormats: {
              day: 'MM-dd',
              month: 'yyyy-MM'
            }
          },
          title: { display: true, text: '日期' }
        },
        y: {
          title: { display: true, text: '污染程度（首要污染物编号）' },
          min: 0, max: 7,
          ticks: {
            stepSize: 1,
            callback: val => Number.isInteger(val) ? val : ''
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            boxWidth: 6,
            padding: 8,
            font: { size: 16, weight: 'bold' }
          }
        },
        zoom: {
          zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' },
          pan: { enabled: true, mode: 'x' }
        }
      }
    }
  });
}

function getMode(arr) {
  const freq = {};
  arr.forEach(n => freq[n] = (freq[n] || 0) + 1);
  return +Object.entries(freq).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}
