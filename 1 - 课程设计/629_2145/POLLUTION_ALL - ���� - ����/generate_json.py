import pandas as pd
import json
import numpy as np

# 加载污染数据
df = pd.read_csv("data/最终合并带经纬度的数据.csv")

# 加载地名经纬度对应表
regions = pd.read_csv("data/regions.csv")

# 对经纬度保留足够精度用于合并匹配
df['纬度'] = df['纬度'].round(6)
df['经度'] = df['经度'].round(6)
regions['纬度'] = regions['纬度'].round(6)
regions['经度'] = regions['经度'].round(6)

# 合并数据以获取地名
merged = pd.merge(df, regions, on=['纬度', '经度'], how='left')

# 丢弃无法匹配到地名的数据
merged = merged.dropna(subset=['地名'])

# 日期处理
merged['日期'] = pd.to_datetime(merged['日期'], errors='coerce')
merged = merged.dropna(subset=['日期'])
merged['年份'] = merged['日期'].dt.year.astype(str)

def determine_season(month):
    if month in [3, 4, 5]:
        return '春季'
    elif month in [6, 7, 8]:
        return '夏季'
    elif month in [9, 10, 11]:
        return '秋季'
    else:
        return '冬季'

merged['季节'] = merged['日期'].dt.month.map(determine_season)

# 污染物字段
pollutants = ['SO2', 'NO2', 'PM10', 'CO', 'O31小时', 'O38小时', 'PM2.5']

# 按地名聚合
result = {}
grouped = merged.groupby(['年份', '季节', '地名'])

for (year, season, place), group in grouped:
    pollution_avg = {}
    for p in pollutants:
        values = pd.to_numeric(group[p], errors='coerce').dropna()
        if len(values):
            pollution_avg[p] = round(values.mean(), 2)

    first_row = group.iloc[0]
    lat = float(first_row['纬度'])
    lon = float(first_row['经度'])

    result.setdefault(year, {}).setdefault(season, {})[place] = {
        'lat': lat,
        'lon': lon,
        'pollution_avg': pollution_avg
    }

# 保存为JSON
with open("processed/pollution_by_season.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("✅ 生成成功：processed/pollution_by_season.json")
