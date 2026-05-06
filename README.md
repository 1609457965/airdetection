# airdetection

## 项目简介

本仓库整理的是“大数据课程设计”相关文件，核心主题是西安市空气污染数据分析、PM2.5 时空分布展示与环境指标预测。项目内容包含原始/中间处理数据、缺失值填补结果、模型训练与预测文件、可视化网页、课程设计文档资料，以及一个独立的完美洗牌算法演示实验。

## 内容总览

| 模块 | 主要内容 | 说明 |
| --- | --- | --- |
| 数据清洗与合并 | `1 - 课程设计/*.csv`、`ok/*.csv` | 包含污染物数据拆分、合并、去重、时间矫正、缺失值处理、SVD 填补等中间结果 |
| 空气污染可视化 | `1 - 课程设计/629_2145/...` | Flask + Leaflet + Chart.js 项目，用于展示西安市 PM2.5 热力图、影响因素和未来预测页面 |
| 模型训练与预测 | `ok/新建文件夹/*.ipynb`、`1.py`、`.h5`、`.pth`、`.pkl` | 包含环境指标预测模型、LSTM/Transformer 模型权重、标准化器与编码器 |
| 结果图表 | `*.png`、`*.html`、`*.txt`、`future_predictions.*` | 包含数据概览、特征关系、训练过程、评估结果、综合报告和预测结果 |
| 课程资料 | `.doc`、`.docx`、`.pdf`、`.xls` | 包含课程设计说明、论文资料、格式要求和相关数据表 |
| 洗牌实验 | `洗牌/`、`1.mjs` | 包含完美洗牌算法的 React 可视化演示和相关文档 |

## 核心项目：西安市空气污染分析

### 研究对象

项目围绕西安市多个监测点的空气污染数据展开，涉及的主要字段包括：

- 监测位置：点位名称、纬度、经度
- 污染物指标：`SO2`、`NO2`、`PM10`、`CO`、`O31小时`、`O38小时`、`PM2.5`
- 时间信息：日期、时间段、年份、季节
- 天气信息：气温、风向、风力、降水强度、天气类型
- 污染等级：首要污染物、污染程度

### 数据处理流程

1. 原始污染物数据拆分与整理：`2分.csv`、`3分.csv`、`23分.csv`
2. 多份数据合并：`合并23.csv`、`合并23去重.csv`
3. 时间字段修正：`时间矫正.csv`
4. 缺失值处理：`仅换NA为空.csv`、`删掉全空.csv`、`CO_O31_O38_PM2.5全空.csv`
5. SVD 缺失值填补：`SVD填补.csv`、`全有_SVD填补.csv`
6. 加入地理坐标与天气编码：`合并带经纬度的数据.csv`、`end.csv`
7. 模型训练、评估与未来预测：`1.py`、`future_predictions.csv`、`prediction_results.txt`

## 可视化网站

可视化项目位于：

```text
1 - 课程设计/629_2145/POLLUTION_ALL - 编码异常目录名/
```

> 注：该目录名在当前系统中显示为乱码，可能是压缩包解压时编码不一致导致。

主要文件：

- `app.py`：Flask 入口，提供 `/`、`/2`、`/3` 三个页面
- `generate_json.py`：读取污染物 CSV 和经纬度表，按年份、季节、地点聚合生成 `pollution_by_season.json`
- `templates/index.html`：西安市污染热力图页面
- `templates/2.html`：影响因素页面
- `templates/3.html`：未来预测页面
- `static/js/script.js`：地图、热力图、年份/季节切换和折线图逻辑
- `static/js/pollutantHeatmap.js`：污染物热力图相关逻辑
- `static/data/610100.geojson`：西安市边界地理数据
- `static/processed/pollution_by_season.json`：前端展示使用的季节聚合污染数据

运行方式：

```bash
cd "1 - 课程设计/629_2145/POLLUTION_ALL - 编码异常目录名"
python app.py
```

启动后访问：

```text
http://127.0.0.1:8000
```

## 建模与预测

模型相关内容主要集中在：

```text
1 - 课程设计/ok/新建文件夹/
```

主要内容：

- `1.py`：环境预测建模脚本，使用 `pandas`、`numpy`、`scikit-learn`、`TensorFlow/Keras`、`matplotlib`、`seaborn` 等库
- `my_environment_model/`、`my_environment_model2/`、`well_trained_model/`：保存的 Keras 模型、标准化器、编码器和模型元信息
- `best_lstm_model.pth`、`best_transformer_model.pth`：PyTorch 模型权重
- `training_history.png`：训练过程可视化
- `evaluation_results.png`：模型评估结果
- `future_predictions.csv` / `future_predictions.txt`：未来预测结果
- `prediction_results.txt`：预测输出说明

## 主要数据文件说明

| 文件 | 说明 |
| --- | --- |
| `CO_O31_O38_PM2.5全空.csv` | 含多个污染物缺失字段的原始/中间数据 |
| `CO_O31_O38_PM2.5全空_处理后.csv` | 上述文件处理后的版本 |
| `SVD填补.csv` | 使用 SVD 方法进行缺失值填补后的数据 |
| `全有.csv` | 完整字段数据 |
| `全有_SVD填补.csv` | 完整字段数据的 SVD 填补版本 |
| `删掉全空.csv` | 删除全空字段/记录后的数据 |
| `时间矫正.csv` | 时间字段修正后的数据 |
| `合并23.csv` | 合并后的 2、3 类数据 |
| `合并23去重.csv` | 合并后去重数据 |
| `合并后的数据.csv` | 多源数据合并结果 |
| `合并带经纬度的数据.csv` | 加入经纬度后的最终展示/建模数据 |
| `end.csv` | 建模阶段使用的综合数据 |
| `future_predictions.csv` | 未来若干天的预测结果 |

## 文件结构梳理

```text
.
├── README.md
├── 1.mjs
├── package-lock.json
├── best_lstm_model.pth
├── best_transformer_model.pth
├── 参考资料 - 本科毕业设计格式要求.docx
├── 西安市PM2.5分布研究.doc
├── .idea/
│   ├── .gitignore
│   ├── misc.xml
│   ├── modules.xml
│   ├── workspace.xml
│   ├── 大数据课程设计.iml
│   └── inspectionProfiles/
├── 1 - 课程设计/
│   ├── 1.xls
│   ├── 2.xls
│   ├── 3.xls
│   ├── 2分.csv
│   ├── 3分.csv
│   ├── 23分.csv
│   ├── CO_O31_O38_PM2.5全空.csv
│   ├── CO_O31_O38_PM2.5全空_处理后.csv
│   ├── SVD填补.csv
│   ├── 仅换NA为空.csv
│   ├── 全有.csv
│   ├── 全有_SVD填补.csv
│   ├── 删掉全空.csv
│   ├── 合并23.csv
│   ├── 合并23去重.csv
│   ├── 时间矫正.csv
│   ├── 629_2145.zip
│   ├── e7ec5add-a507-4d06-98d1-003adc8e50c1.pdf
│   ├── 污染物论文(1)(2).pdf
│   ├── wash1.ipynb
│   ├── wash2.ipynb
│   ├── wash3.ipynb
│   ├── 629_2145/
│   │   └── POLLUTION_ALL - 编码异常目录名/
│   │       ├── app.py
│   │       ├── generate_json.py
│   │       ├── static/
│   │       │   ├── 1.jpg
│   │       │   ├── 2.jpg
│   │       │   ├── location1.png
│   │       │   ├── location2.png
│   │       │   ├── no2.png
│   │       │   ├── PM10.png
│   │       │   ├── so2.png
│   │       │   ├── css/
│   │       │   │   ├── pollutantHeatmap.css
│   │       │   │   └── style.css
│   │       │   ├── data/
│   │       │   │   ├── 610100.geojson
│   │       │   │   ├── 610100_fixed.geojson
│   │       │   │   ├── regions.csv
│   │       │   │   └── 最终合并带经纬度的数据.csv
│   │       │   ├── js/
│   │       │   │   ├── pollutantHeatmap.js
│   │       │   │   └── script.js
│   │       │   └── processed/
│   │       │       └── pollution_by_season.json
│   │       └── templates/
│   │           ├── index.html
│   │           ├── 2.html
│   │           ├── 3.html
│   │           ├── 1.jpg
│   │           ├── 2.jpg
│   │           ├── wind_season_data.json
│   │           ├── data/
│   │           │   ├── 610100.geojson
│   │           │   ├── regions.csv
│   │           │   └── 最终合并带经纬度的数据.csv
│   │           └── processed/
│   │               └── pollution_by_season.json
│   └── ok/
│       ├── 1.ipynb
│       ├── 全.csv
│       ├── 处理小数和0后的全.csv
│       ├── 编码后全.csv
│       ├── 编码后缺.csv
│       ├── 缺.csv
│       └── 新建文件夹/
│           ├── 1.ipynb
│           ├── 1.py
│           ├── 1处理完.csv
│           ├── 2.ipynb
│           ├── 3.ipynb
│           ├── 4.ipynb
│           ├── best_lstm_model.pth
│           ├── comprehensive_report.html
│           ├── dataveiw.ipynb
│           ├── data_overview.png
│           ├── end.csv
│           ├── end - 副本.csv
│           ├── end_cleaned.csv
│           ├── environmental_analysis.html
│           ├── evaluation_results.png
│           ├── feature_relationships.png
│           ├── future_predictions.csv
│           ├── future_predictions.json
│           ├── future_predictions.txt
│           ├── pollution_stats_calculated.json
│           ├── prediction_results.txt
│           ├── select.ipynb
│           ├── training_history.png
│           ├── weather_stats.json
│           ├── wind_season_data.json
│           ├── 合并23最终数据编码.csv
│           ├── 合并后的数据.csv
│           ├── 合并带经纬度的数据.csv
│           ├── 广运潭.txt
│           ├── 广运潭_latest_12.csv
│           ├── 高压厂.txt
│           ├── 高压开关厂_latest_12.csv
│           ├── dataview/
│           ├── dataview2/
│           ├── my_environment_model/
│           ├── my_environment_model2/
│           └── well_trained_model/
└── 洗牌/
    ├── 1.docx
    ├── 1.ipynb
    ├── 1.pdf
    └── 2.ipynb
```

## 运行环境参考

Python 侧常用依赖：

```text
pandas
numpy
matplotlib
seaborn
scikit-learn
tensorflow
keras
torch
joblib
flask
```

前端可视化使用：

```text
Leaflet
Leaflet Heat
Turf.js
Chart.js
PapaParse
```

## 备注

- 仓库中包含模型权重、数据集、图片、PDF、Word 文档等二进制文件，体积相对较大。
- 部分从压缩包解出的中文文件名/目录名存在编码显示异常，但不影响已有代码按当前路径运行。
- `future_predictions.json` 和 `pollution_stats_calculated.json` 当前为空文件，可根据后续预测或统计流程重新生成。
- `.idea/` 为 JetBrains/PyCharm 项目配置文件，保留用于还原本地开发环境。
