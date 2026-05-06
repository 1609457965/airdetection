import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const TwoShuffleTypes = () => {
  const [data, setData] = useState([]);
  const [currentDemo, setCurrentDemo] = useState('out');
  const [demoStep, setDemoStep] = useState(0);
  const [comparison, setComparison] = useState([]);

  // 外洗牌 (Out-shuffle) - 顶部牌保持在顶部
  const outShuffle = (cards) => {
    const m = cards.length;
    if (m % 2 !== 0) return cards;
    
    const top = cards.slice(0, m/2);
    const bottom = cards.slice(m/2);
    const result = [];
    
    for (let i = 0; i < m/2; i++) {
      result.push(top[i]);      // 先放顶部半部分的牌
      result.push(bottom[i]);   // 再放底部半部分的牌
    }
    return result;
  };

  // 内洗牌 (In-shuffle) - 底部牌移到顶部
  const inShuffle = (cards) => {
    const m = cards.length;
    if (m % 2 !== 0) return cards;
    
    const top = cards.slice(0, m/2);
    const bottom = cards.slice(m/2);
    const result = [];
    
    for (let i = 0; i < m/2; i++) {
      result.push(bottom[i]);   // 先放底部半部分的牌
      result.push(top[i]);      // 再放顶部半部分的牌
    }
    return result;
  };

  // 计算恢复原始顺序所需的洗牌次数
  const findShuffleCount = (m, shuffleType) => {
    if (m % 2 !== 0) return -1;
    
    const original = Array.from({length: m}, (_, i) => i + 1);
    let cards = [...original];
    let count = 0;
    const shuffleFunc = shuffleType === 'out' ? outShuffle : inShuffle;
    
    do {
      cards = shuffleFunc(cards);
      count++;
      if (count > 1000) return -1; // 防止无限循环
    } while (!cards.every((card, index) => card === original[index]));
    
    return count;
  };

  // 理论计算
  const theoreticalCount = (m, shuffleType) => {
    if (m % 2 !== 0) return -1;
    
    // 计算乘法阶数
    const multiplicativeOrder = (a, n) => {
      let order = 1;
      let current = a % n;
      
      while (current !== 1) {
        current = (current * a) % n;
        order++;
        if (order > n) return -1;
      }
      return order;
    };

    if (shuffleType === 'out') {
      // 外洗牌：ord_{m-1}(2)
      return multiplicativeOrder(2, m - 1);
    } else {
      // 内洗牌：ord_{m+1}(2)
      return multiplicativeOrder(2, m + 1);
    }
  };

  // 演示数据生成
  const generateDemo = () => {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8]; // 8张牌演示
    const steps = [];
    let current = [...cards];
    
    steps.push({
      step: 0,
      cards: [...current],
      description: "初始状态"
    });

    const shuffleFunc = currentDemo === 'out' ? outShuffle : inShuffle;
    const maxSteps = 10;
    
    for (let i = 1; i <= maxSteps; i++) {
      current = shuffleFunc(current);
      steps.push({
        step: i,
        cards: [...current],
        description: `第${i}次${currentDemo === 'out' ? '外' : '内'}洗牌`,
        isOriginal: current.every((card, index) => card === cards[index])
      });
      
      if (current.every((card, index) => card === cards[index])) {
        break;
      }
    }
    
    return steps;
  };

  // 对比数据生成
  useEffect(() => {
    const generateComparison = () => {
      const results = [];
      
      for (let m = 2; m <= 52; m += 2) {
        const outCount = findShuffleCount(m, 'out');
        const inCount = findShuffleCount(m, 'in');
        const outTheory = theoreticalCount(m, 'out');
        const inTheory = theoreticalCount(m, 'in');
        
        if (outCount > 0 && inCount > 0) {
          results.push({
            m: m,
            out_empirical: outCount,
            in_empirical: inCount,
            out_theoretical: outTheory,
            in_theoretical: inTheory,
            difference: Math.abs(outCount - inCount)
          });
        }
      }
      
      setComparison(results);
    };

    generateComparison();
  }, []);

  const demoSteps = generateDemo();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        完美洗牌的两种类型：外洗牌 vs 内洗牌
      </h1>

      {/* 概念解释 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
          <h2 className="text-xl font-bold text-red-700 mb-4">外洗牌 (Out-shuffle)</h2>
          <div className="space-y-3">
            <p><strong>特征：</strong>顶部的牌保持在顶部位置</p>
            <p><strong>过程：</strong>上半部分先出牌，下半部分后出牌</p>
            <p><strong>数学模型：</strong>位置i → 位置(2i) mod (m-1)</p>
            <p><strong>公式：</strong>n = ord<sub>m-1</sub>(2)</p>
            <div className="bg-white p-3 rounded border">
              <p className="text-sm font-mono">
                初始: R R R R B B B B<br/>
                洗牌: R B R B R B R B
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
          <h2 className="text-xl font-bold text-blue-700 mb-4">内洗牌 (In-shuffle)</h2>
          <div className="space-y-3">
            <p><strong>特征：</strong>底部的牌移到顶部位置</p>
            <p><strong>过程：</strong>下半部分先出牌，上半部分后出牌</p>
            <p><strong>数学模型：</strong>位置i → 位置(2i+1) mod (m+1)</p>
            <p><strong>公式：</strong>n = ord<sub>m+1</sub>(2)</p>
            <div className="bg-white p-3 rounded border">
              <p className="text-sm font-mono">
                初始: R R R R B B B B<br/>
                洗牌: B R B R B R B R
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 互动演示 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">互动演示 (8张牌)</h3>
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => {setCurrentDemo('out'); setDemoStep(0);}}
            className={`px-4 py-2 rounded ${currentDemo === 'out' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            外洗牌演示
          </button>
          <button
            onClick={() => {setCurrentDemo('in'); setDemoStep(0);}}
            className={`px-4 py-2 rounded ${currentDemo === 'in' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            内洗牌演示
          </button>
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setDemoStep(Math.max(0, demoStep - 1))}
            disabled={demoStep === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
            上一步
          </button>
          <button
            onClick={() => setDemoStep(Math.min(demoSteps.length - 1, demoStep + 1))}
            disabled={demoStep === demoSteps.length - 1}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
            下一步
          </button>
          <span className="px-4 py-2 bg-white rounded border">
            {demoSteps[demoStep]?.description}
            {demoSteps[demoStep]?.isOriginal && " ✓ 恢复原序!"}
          </span>
        </div>

        <div className="bg-white p-4 rounded border">
          <div className="flex gap-2 justify-center">
            {demoSteps[demoStep]?.cards.map((card, index) => (
              <div
                key={index}
                className={`w-12 h-16 flex items-center justify-center rounded border-2 font-bold
                  ${card <= 4 ? 'bg-red-100 border-red-300 text-red-700' : 'bg-blue-100 border-blue-300 text-blue-700'}
                  ${demoSteps[demoStep]?.isOriginal ? 'ring-2 ring-green-400' : ''}
                `}
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 数据对比图表 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">洗牌次数对比分析</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={comparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="m" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="out_empirical" stroke="#dc2626" name="外洗牌次数" strokeWidth={2}/>
            <Line type="monotone" dataKey="in_empirical" stroke="#2563eb" name="内洗牌次数" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 差异分析 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">洗牌次数差异分布</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparison.slice(0, 20)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="m" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="difference" fill="#8884d8" name="次数差异" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 关键发现 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-bold text-green-700 mb-2">标准扑克牌 (52张)</h4>
          <p>外洗牌: {comparison.find(d => d.m === 52)?.out_empirical || 'N/A'} 次</p>
          <p>内洗牌: {comparison.find(d => d.m === 52)?.in_empirical || 'N/A'} 次</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-bold text-yellow-700 mb-2">平均差异</h4>
          <p>{(comparison.reduce((sum, d) => sum + d.difference, 0) / comparison.length).toFixed(1)} 次</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-bold text-purple-700 mb-2">最大差异</h4>
          <p>{Math.max(...comparison.map(d => d.difference))} 次</p>
          <p className="text-sm">({comparison.find(d => d.difference === Math.max(...comparison.map(d => d.difference)))?.m}张牌)</p>
        </div>
      </div>

      {/* 理论总结 */}
      <div className="bg-gradient-to-r from-red-50 to-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-center">理论总结</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-red-700">外洗牌 (Out-shuffle)</h4>
            <ul className="list-disc ml-6 space-y-1 text-sm">
              <li>顶牌保持在顶部</li>
              <li>公式: n = ord<sub>m-1</sub>(2)</li>
              <li>更常见于实际洗牌</li>
              <li>数学上更简单分析</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700">内洗牌 (In-shuffle)</h4>
            <ul className="list-disc ml-6 space-y-1 text-sm">
              <li>底牌移到顶部</li>
              <li>公式: n = ord<sub>m+1</sub>(2)</li>
              <li>在某些魔术中使用</li>
              <li>周期性质略有不同</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-white rounded border">
          <p className="text-center font-semibold">
            两种洗牌方式都能最终恢复原序，但所需次数通常不同，这为魔术师和数学家提供了丰富的研究材料。
          </p>
        </div>
      </div>

      {/* 数据表格 */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-4">详细对比数据 (前15项):</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">牌数(m)</th>
                <th className="border border-gray-300 px-4 py-2">外洗牌次数</th>
                <th className="border border-gray-300 px-4 py-2">内洗牌次数</th>
                <th className="border border-gray-300 px-4 py-2">差异</th>
                <th className="border border-gray-300 px-4 py-2">较优方式</th>
              </tr>
            </thead>
            <tbody>
              {comparison.slice(0, 15).map(row => (
                <tr key={row.m}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.m}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-red-600">{row.out_empirical}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-blue-600">{row.in_empirical}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{row.difference}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {row.out_empirical < row.in_empirical ? 
                      <span className="text-red-600">外洗牌</span> : 
                      row.in_empirical < row.out_empirical ? 
                      <span className="text-blue-600">内洗牌</span> : 
                      <span className="text-gray-600">相同</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TwoShuffleTypes;