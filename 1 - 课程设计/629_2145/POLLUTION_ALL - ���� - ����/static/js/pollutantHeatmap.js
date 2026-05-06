const predictionData = [
    {
        "日期": "2013-04-27",
        "位置": {
            "纬度": 34.382896,
            "经度": 108.883270
        },
        "污染物浓度": {
            "SO2": 26.4,
            "NO2": 26.4,
            "PM10": 49.2
        },
        "气象条件": {
            "时间段": "白天",
            "气温": 2.5,
            "天气": "雨"
        },
        "风力条件": {
            "风向": '南风',
            "风力": 1,
            "降水强度": 0.39
        },
        "预测置信度": {
            "天气置信度": 0.712,
            "风力置信度": 1.000
        }
    },
    {
        "日期": "2013-04-28",
        "位置": {
            "纬度": 34.382896,
            "经度": 108.883270
        },
        "污染物浓度": {
            "SO2": 8.4,
            "NO2": 8.4,
            "PM10": 15.7
        },
        "气象条件": {
            "时间段": "夜晚",
            "气温": -6.2,
            "天气": "雨"
        },
        "风力条件": {
            "风向": '西南风',
            "风力": 1,
            "降水强度": 0.44
        },
        "预测置信度": {
            "天气置信度": 0.645,
            "风力置信度": 1.000
        }
    },
    {
        "日期": "2013-04-29",
        "位置": {
            "纬度": 34.382896,
            "经度": 108.883270
        },
        "污染物浓度": {
            "SO2": 5.6,
            "NO2": 8.2,
            "PM10": 10.2
        },
        "气象条件": {
            "时间段": "白天",
            "气温": -13.6,
            "天气": "雨"
        },
        "风力条件": {
            "风向": '南风',
            "风力": 1,
            "降水强度": 0.58
        },
        "预测置信度": {
            "天气置信度": 0.847,
            "风力置信度": 1.000
        }
    }
];
predictionData.push(
  // 高压厂（三天）
  {
    "日期": "2013-04-27",
    "位置": { "纬度": 34.354256, "经度": 109.011482 },
    "污染物浓度": { "SO2": 27.5, "NO2": 107.8, "PM10": 148.5 },
    "气象条件": { "时间段": "白天", "气温": 7.5, "天气": "晴" },
    "风力条件": { "风向": "东风", "风力": 1, "降水强度": -0.01 },
    "预测置信度": { "天气置信度": 1.000, "风力置信度": 1.000 }
  },
  {
    "日期": "2013-04-28",
    "位置": { "纬度": 34.354256, "经度": 109.011482 },
    "污染物浓度": { "SO2": 32.2, "NO2": 126.1, "PM10": 173.7 },
    "气象条件": { "时间段": "晚上", "气温": 6.2, "天气": "晴" },
    "风力条件": { "风向": "东北风", "风力": 1, "降水强度": -0.00 },
    "预测置信度": { "天气置信度": 0.998, "风力置信度": 1.000 }
  },
  {
    "日期": "2013-04-29",
    "位置": { "纬度": 34.354256, "经度": 109.011482 },
    "污染物浓度": { "SO2": 31.9, "NO2": 125.1, "PM10": 172.3 },
    "气象条件": { "时间段": "白天", "气温": 5.6, "天气": "多云" },
    "风力条件": { "风向": "北风", "风力": 1, "降水强度": 0.01 },
    "预测置信度": { "天气置信度": 0.645, "风力置信度": 0.999 }
  },

  // 广运潭（三天）
  {
    "日期": "2013-04-27",
    "位置": { "纬度": 34.259781, "经度": 108.856987 },
    "污染物浓度": { "SO2": 25.3, "NO2": 86.9, "PM10": 154.0 },
    "气象条件": { "时间段": "白天", "气温": 7.5, "天气": "晴" },
    "风力条件": { "风向": "西北风", "风力": 1, "降水强度": -0.01 },
    "预测置信度": { "天气置信度": 1.000, "风力置信度": 1.000 }
  },
  {
    "日期": "2013-04-28",
    "位置": { "纬度": 34.259781, "经度": 108.856987 },
    "污染物浓度": { "SO2": 29.6, "NO2": 101.7, "PM10": 180.2 },
    "气象条件": { "时间段": "晚上", "气温": 6.2, "天气": "晴" },
    "风力条件": { "风向": "东南风", "风力": 1, "降水强度": -0.01 },
    "预测置信度": { "天气置信度": 1.000, "风力置信度": 1.000 }
  },
  {
    "日期": "2013-04-29",
    "位置": { "纬度": 34.259781, "经度": 108.856987 },
    "污染物浓度": { "SO2": 35.9, "NO2": 123.2, "PM10": 218.4 },
    "气象条件": { "时间段": "白天", "气温": 7.6, "天气": "晴" },
    "风力条件": { "风向": "西北风", "风力": 1, "降水强度": 0.00 },
    "预测置信度": { "天气置信度": 0.925, "风力置信度": 0.994 }
  }
);

const offsetsMap = {
    '草滩': [
        { lng: -0.14, lat: 0.03 },
        { lng: -0.07, lat: 0.03 },
        { lng: 0.00, lat: 0.03 }
    ],
    '高压厂': [
        { lng: 0.15, lat: 0.07 },
        { lng: 0.15, lat: 0.03 },
        { lng: 0.15, lat: -0.01 }
    ],
    '广运潭': [
        { lng: -0.07, lat: -0.05 },
        { lng: 0.00, lat: -0.05 },
        { lng: 0.07, lat: -0.05 }
    ]
};

function getPollutantData(date) {
    return predictionData.filter(item => item.日期 === date);
}

function getLocationNameByCoordinates(lat, lng) {
    if (Math.abs(lat - 34.259781) < 0.001 && Math.abs(lng - 108.856987) < 0.001) return '广运潭';
    if (Math.abs(lat - 34.382896) < 0.001 && Math.abs(lng - 108.883270) < 0.001) return '草滩';
    if (Math.abs(lat - 34.354256) < 0.001 && Math.abs(lng - 109.011482) < 0.001) return '高压厂';
    return '未知';
}

function updateChart() {
    function getPollutantEmoji(value) {
        if (value >= 100) return '😷';
        if (value >= 50) return '😐';
        return '😊';
    }

    function getWindEffectLines(windDirection, windForce, center) {
        const angleMap = {
            '南风': 90,
            '西南风': 45,
            '北风': 0,
            '东风': 180,
            '西北风': 315,
            '东南风': 135,
            '东北风': 225
        };
        const angle = angleMap[windDirection] || 0;
        const lines = [];
        for (let i = 0; i < 10; i++) {
            const offsetAngle = angle + (Math.random() * 40 - 20);
            const rad = offsetAngle * Math.PI / 180;
            const startLng = center[0] + (Math.random() - 0.5) * 1.2;
            const startLat = center[1] + (Math.random() - 0.5) * 1.2;
            const endLng = startLng + Math.cos(rad) * 1.0;
            const endLat = startLat + Math.sin(rad) * 1.0;
            lines.push({ coords: [[startLng, startLat], [endLng, endLat]] });
        }
        return {
            type: 'lines',
            zlevel: 8,
            effect: {
                show: true,
                period: 6 - windForce,
                trailLength: 0.6,
                symbol: 'arrow',
                color: 'rgba(101,209,81,100)',
                symbolSize: 12 + windForce * 2
            },
            lineStyle: {
                color: 'rgba(127, 166, 244, 0.05)',
                width: 2,
                curveness: 0.05
            },
            data: lines
        };
    }

    fetch('static/data/610100_fixed.geojson')
        .then(response => response.json())
        .then(geoJson => {
            echarts.registerMap('xian', geoJson);

            const pollutantDataList = getPollutantData(currentWeatherData.日期);

            const maxConcentration = Math.max(...pollutantDataList.flatMap(data => [
                data.污染物浓度.SO2,
                data.污染物浓度.NO2,
                data.污染物浓度.PM10
            ]));

            const windSeries = getWindEffectLines(
                currentWeatherData.风力条件.风向,
                currentWeatherData.风力条件.风力,
                [currentWeatherData.位置.经度, currentWeatherData.位置.纬度]
            );

            const symbolSizes = {
                'so2.png': [54, 54],   // SO2 图片宽64，高32（示例，可以调整）
                'no2.png': [47, 40],   // NO2 图片宽高相等
                'PM10.png': [50, 45]   // PM10 图片宽高相等
            };

            const series = pollutantDataList.flatMap(data => {
                const baseLng = data.位置.经度;
                const baseLat = data.位置.纬度;
                const locationName = getLocationNameByCoordinates(baseLat, baseLng);
                const offsets = offsetsMap[locationName] || [
                    { lng: -0.15, lat: 0.02 },
                    { lng: -0.15, lat: -0.02 },
                    { lng: -0.15, lat: -0.06 }
                ];

                return [
                    ['SO2', data.污染物浓度.SO2, 'static/so2.png'],
                    ['NO2', data.污染物浓度.NO2, 'static/no2.png'],
                    ['PM10', data.污染物浓度.PM10, 'static/PM10.png']
                ].map(([name, val, icon], i) => {
                    const fileName = icon.split('/').pop(); // 获取图片文件名
                    return {
                        name,
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        zlevel: 8,
                        data: [{
                            name,
                            value: [baseLng + offsets[i].lng, baseLat + offsets[i].lat, val],
                            symbol: `image://${icon}`,
                            symbolSize: symbolSizes[fileName] || [64, 64]  // 宽高数组
                        }],
                        label: {
                            show: true,
                            formatter: `${name}: ${val.toFixed(1)} ${getPollutantEmoji(val)}`,
                            position: 'top',
                            fontSize: 16,
                            color: '#1e3988'
                        }
                    };
                }).concat({
                    name: '区域标记',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 8,
                    data: [{
                        name: locationName,
                        value: [baseLng, baseLat]
                    }],
                    symbol: 'image://static/location1.png',
                    symbolSize: 5,
                    rippleEffect: { brushType: 'fill', scale: 45 },
                    itemStyle: { color: '#5590F0' },
                    label: {
                        show: true,
                        formatter: params => params.data.name,
                        position: 'top',
                        fontSize: 20,
                        color: '#d94e5d'
                    }
                });
            });


            const option = {
                geo: [
                    {
                        map: 'xian',
                        zlevel: 5,
                        zoom: 1.25,
                        label: { show: true, color: '#cce6ff' },
                        itemStyle: {
                            color: '#7aaee0',
                            borderWidth: 1,
                            borderColor: '#b0d4ff'
                        }
                    },
                    {
                        map: 'xian',
                        top: '10%',
                        zoom: 1.25,
                        zlevel: 4,
                        label: { show: false },
                        itemStyle: {
                            color: '#699fd8',
                            borderWidth: 1,
                            borderColor: '#a8ccf0'
                        }
                    },
                    {
                        map: 'xian',
                        top: '11.5%',
                        zoom: 1.25,
                        zlevel: 3,
                        label: { show: false },
                        itemStyle: {
                            color: '#5b90d0',
                            borderWidth: 1,
                            borderColor: '#9cc2ea'
                        }
                    },
                    {
                        map: 'xian',
                        top: '13%',
                        zoom: 1.25,
                        zlevel: 2,
                        label: { show: false },
                        itemStyle: {
                            color: '#4a7fc4',
                            borderWidth: 1,
                            borderColor: '#8cb5e3',
                            shadowColor: 'rgba(140, 181, 227, 0.5)',
                            shadowBlur: 14
                        }
                    }
                ],
                visualMap: {
                    min: 0,
                    max: maxConcentration,
                    calculable: true,
                    inRange: {
                        color: ['#50a3ba', '#eac736', '#d94e5d']
                    },
                    textStyle: { color: '#333' },
                    right: '5%',
                    top: 'center'
                },
                series: [...series, windSeries],
                legend: {
                    data: ['SO2', 'NO2', 'PM10'],
                    orient: 'vertical',
                    right: '25%',
                    top: '8%',
                    zlevel: 8
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        if (params.seriesType === 'scatter') {
                            const val = params.data.value[2] || 0;
                            const name = params.data.name || '';
                            const locationName = getLocationNameByCoordinates(params.data.value[1], params.data.value[0]);
                            return `
                                <strong>${name}</strong><br/>
                                浓度: ${val.toFixed(1)}<br/>
                                位置: ${locationName}<br/>
                                日期: ${currentWeatherData.日期}
                            `;
                        } else if (params.seriesType === 'effectScatter') {
                            return `
                                <strong>${params.data.name}</strong><br/>
                                日期: ${currentWeatherData.日期}
                            `;
                        }
                        return '';
                    }
                },
                graphic: {
                elements: [
                    {
                    type: 'group',
                    left: '80%',
                    top: '7%',
                    children: [
                        {
                        type: 'text',
                        style: {
                            text: 'N',
                            fill: '#333',
                            font: 'bold 22px sans-serif' // ← 字体更大
                        },
                        top: 0,
                        left: 12
                        },
                        {
                        type: 'line',
                        shape: { x1: 20, y1: 28, x2: 20, y2: 60 }, // ← 拉长线条
                        style: {
                            stroke: '#333',
                            lineWidth: 4 // ← 加粗线条
                        }
                        },
                        {
                        type: 'text',
                        style: {
                            text: 'S',
                            fill: '#333',
                            font: 'bold 22px sans-serif' // ← 字体更大
                        },
                        top: 60,
                        left: 12
                        },
                        {
                        type: 'text',
                        style: {
                            text: 'E',
                            fill: '#333',
                            font: 'bold 22px sans-serif'
                        },
                        top: 34,
                        left: 42
                        },
                        {
                        type: 'text',
                        style: {
                            text: 'W',
                            fill: '#333',
                            font: 'bold 22px sans-serif'
                        },
                        top: 34,
                        left: -10
                        }
                    ]
                    }
                ]
                }

            };

            myChart.setOption(option);
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
}

function updateWeatherDetails() {
    document.getElementById('weatherDate').textContent = `📅 ${currentWeatherData.日期}`;
    document.getElementById('windInfoBox').innerHTML = `
      预测日期：${currentWeatherData.日期}<br/>
      风向：${currentWeatherData.风力条件.风向}<br/>
      风力等级：${currentWeatherData.风力条件.风力} 级<br/>
      降水强度：${currentWeatherData.风力条件.降水强度} mm/h
    `;
}

function highlightWeatherItem(weather) {
    const weatherItems = document.querySelectorAll('.weather-item');
    weatherItems.forEach(item => {
        item.classList.remove('selected');
        if (item.getAttribute('data-weather') === weather) {
            item.classList.add('selected');
        }
    });
}

function predict(index) {
    currentWeatherData = predictionData[index];
    updateWeatherDetails();
    highlightWeatherItem(currentWeatherData.气象条件.天气);
    updateChart();
}

document.addEventListener('DOMContentLoaded', () => {
    myChart = echarts.init(document.getElementById('main'));
    predict(0); // 默认显示第一个日期的数据
});