# 地区地图切换模块 ALIGNMENT

## 任务目标

基于 Figma `Section` 导出代码 `18511_42454` 与截图 `screenshot_18511_42454.png`，开发一个全新的 `ULVAC Main Bases` 地区地图切换模块，替换当前项目中的 `bases-section` 占位实现。

## 本次要做

1. 用全新的地图模块替换现有 `bases-section`。
2. 还原 Figma 的基础视觉骨架：
   - 蓝色渐变背景
   - `ULVAC Main Bases` 标题
   - `See All Group Companies` 按钮
   - 世界地图底图
3. 在地图上增加橙色定位点，并实现循环闪烁动效：
   - 频率约 `1.5 次/秒`
   - 透明度渐变与扩散过渡
   - 支持 `prefers-reduced-motion`
4. 实现地区切换交互：
   - 点击定位点切换当前地区内容
   - 选中态高亮
   - 切换卡片内容时带平滑过渡
5. 补足基础交互体验：
   - hover / focus / active 反馈
   - 键盘可操作
   - `aria-pressed` / `aria-controls` / `aria-live` 等语义
6. 做桌面端、平板端、手机端的响应式适配与基础验证。

## 本次不做

1. 不接入后端接口，地区数据使用本地静态数据。
2. 不实现真正的地图缩放、拖拽、搜索、地理投影计算。
3. 不做复杂 GIS 或 canvas 渲染，优先采用 HTML/CSS/JS 可维护方案。
4. 不在本阶段扩展到整站其他区块，只替换 `bases-section`。
5. 不做真实跨浏览器云真机平台测试，先完成本地多视口与主流浏览器兼容性级别验证方案。

## 已识别的现状

1. 当前 `bases-section` 是占位模块，页面中仍显示 `In Progress`。
2. 当前桌面样式在 [style.css](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/css/style.css) 中为旧的静态底图区块，不满足交互切换要求。
3. 当前脚本 [main.js](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/js/main.js) 尚无地图模块逻辑，需要新增独立初始化函数。
4. 移动端样式 [mobile.css](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/css/mobile.css) 已包含 `bases-section` 占位逻辑，也需要同步替换。

## 模糊点与默认假设

1. Figma 导出只给了基础视觉骨架，没有完整地区卡片代码。
   - 默认做法：保持 Figma 背景与按钮风格，地区信息卡按截图示意补足为标准信息卡。
2. 用户要求“参考主流成熟产品的交互逻辑”。
   - 默认做法：采用单选地图点 + 当前地区信息卡 + 点击切换 + 选中态环形高亮。
3. 地区数量未在需求中明确。
   - 默认做法：先实现 4-5 个代表性地区点位，结构上支持继续扩展。
4. “多终端兼容性测试”范围未指定具体工具链。
   - 默认做法：使用本地多视口截图与脚本校验，并在文档中列出推荐人工浏览器回归项。

## 初步技术边界

1. 结构层：
   - `index.html` 重写 `bases-section`
2. 样式层：
   - `style.css` 新增桌面/平板地图模块样式
   - `mobile.css` 新增移动端地图布局与卡片布局
3. 行为层：
   - `main.js` 新增 `initBasesMapSwitcher()`
4. 资源层：
   - 优先复用本地 `.figma` 或 `assets/images` 中的地图资源
   - 如需新地区预览图，先使用本地静态图或已有素材占位

## 初步验收标准

1. 原有 `bases-section` 被新模块完整替换。
2. 默认加载后有一个地区处于选中态，并显示对应内容卡。
3. 所有定位点均可点击切换，切换时卡片内容和选中态同步变化。
4. 闪烁动效连续自然，无明显跳帧；在 `prefers-reduced-motion` 下自动降级。
5. 在桌面、平板、手机视口下，地图、卡片、按钮布局可用且不溢出。
6. 无新增诊断错误，交互脚本无控制台报错。
