# 地区地图切换模块 FINAL

## 完成结果

已用全新的地图切换模块替换原有 `bases-section` 占位实现，核心能力如下：

1. 使用 `Dot_japan 1.png` 作为世界地图主背景。
2. 使用 `Images_map.png` 作为信息卡主图。
3. 实现橙色定位点循环闪烁动画，动画频率约为 `1.5 次/秒`。
4. 实现地区切换逻辑：
   - 点击定位点切换当前地区
   - 选中态唯一
   - 信息卡平滑过渡更新
5. 实现基础交互体验：
   - hover / focus-visible / active
   - 键盘方向键切换
   - `aria-pressed` / `aria-current` / `aria-live`
6. 完成桌面、平板、手机三端适配。

## 修改文件

- [index.html](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/index.html)
- [style.css](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/css/style.css)
- [mobile.css](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/css/mobile.css)
- [main.js](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/js/main.js)
- [bases-map-verify.js](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/tests/bases-map-verify.js)

## 验证结果

验证报告：

- [VERIFY_REPORT.md](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/docs/map-bases-switch/VERIFY_REPORT.md)

生成截图：

- [bases-map-desktop-default.png](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/docs/map-bases-switch/bases-map-desktop-default.png)
- [bases-map-desktop-europe.png](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/docs/map-bases-switch/bases-map-desktop-europe.png)
- [bases-map-tablet-default.png](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/docs/map-bases-switch/bases-map-tablet-default.png)
- [bases-map-tablet-north-america.png](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/docs/map-bases-switch/bases-map-tablet-north-america.png)
- [bases-map-mobile-default.png](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/docs/map-bases-switch/bases-map-mobile-default.png)
- [bases-map-mobile-asia.png](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/docs/map-bases-switch/bases-map-mobile-asia.png)

自动化检查结果：

- `1440x1400`: 默认 `Japan`，点击后切换到 `Europe`，通过
- `1024x1366`: 默认 `Japan`，点击后切换到 `North America`，通过
- `390x1600`: 默认 `Japan`，点击后切换到 `Asia`，通过

## 交互说明

1. 默认地区为 `Japan`
2. 点击任意定位点后：
   - 当前点变为高亮选中态
   - 卡片进入短暂淡出/位移
   - 内容更新为目标地区
   - 卡片恢复显示
3. 键盘操作：
   - `Tab` 聚焦定位点
   - `Enter / Space` 激活当前点
   - `ArrowLeft / ArrowRight / ArrowUp / ArrowDown` 顺序切换地区

## 与设计要求的映射

1. 视觉骨架对齐：
   - 蓝色渐变背景
   - 标题与白色按钮
   - 世界地图主图
2. 动效对齐：
   - 定位点 pulse 闪烁
   - 选中态强化环
3. 交互对齐：
   - 标准地图选点体验
   - 平滑切换和选中反馈

## 当前已知限制

1. 地区卡片图片当前统一使用 `Images_map.png`，后续如有更多地区独立素材可再扩展。
2. 点位坐标目前是按当前背景图人工校准的百分比值，若后续更换底图，需要一起调整。
