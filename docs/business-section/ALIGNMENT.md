# Business Section ALIGNMENT

## 1. 核心目标
将现有的 Business Areas (Section) 基于 Figma 设计稿（1280px/1440px 基准）进行 1:1 像素级重构，并使用 React 技术栈输出为模块化组件。确保在 1920px 等宽屏下完美适配无视觉异常，并补充缺失的交互动效。

## 2. 需求边界 (做与不做)
- **要做**：
  - 构建 React 组件 `BusinessSection.jsx` 和 `BusinessSection.module.css`。
  - 使用 `clamp()` 或 CSS Grid 结合 `vw`/`rem` 实现 1280px-1920px 的等比缩放响应式适配。
  - 弃用现有 CSS，纯手工基于设计稿标注编写 CSS Modules 样式。
  - 实现 `IntersectionObserver` 滚动视口动画（`is-visible`），时长 0.6s，贝塞尔曲线 `cubic-bezier(0.22, 0.61, 0.36, 1)`。
  - 增加 Hover/Focus 状态动效：背景色渐变（≤200ms）、`scale(1.05)` 微放大、阴影加深。
  - 编写 Jest + React Testing Library 测试用例，覆盖响应式、可见性触发及 Hover 交互，覆盖率 ≥90%。
  - 生成测试报告、Readme 与验收录屏提示。
- **不做**：
  - 不修改 Header, Hero, Footer 等其他无关组件。
  - 不依赖任何第三方组件库（如 AntD, MUI），纯手工实现。

## 3. 模糊点与待确认项
1. **React 运行环境**：当前项目是一个纯 HTML 静态工程。我们需要在其中引入 React。建议在本地创建一个 `src/components/BusinessSection` 目录来存放 React 源码和测试代码。如果需要直接在 HTML 预览，我们可能需要引入 Babel Standalone 或构建工具（如 Vite/Webpack）。在此，我将提供符合规范的**React 源代码**及**Jest测试配置**。
2. **测试报告生成**：视觉 diff 测试仍使用已安装的 Puppeteer + Pixelmatch 生成热图与 PDF。

## 4. 初步验收标准
- 页面在 1920px 屏幕下不再出现 1440px 固定宽度的白边或间距失调，而是基于 `clamp()` 平滑扩展。
- Hover 时卡片平滑放大 1.05 倍并加深阴影。
- 向下滚动时，模块平滑渐入。
- Puppeteer 截图 Diff 差异率 <0.5%。