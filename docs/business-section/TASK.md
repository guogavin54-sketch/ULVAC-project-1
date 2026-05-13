# Business Section TASK

## 任务清单

- [x] **Task 1: 环境准备与 React 结构搭建**
  - [x] 安装 React、Jest、Testing Library 相关依赖。
  - [x] 创建 `src/components/BusinessSection/` 目录。
- [x] **Task 2: 编写 React 组件逻辑 (`BusinessSection.jsx`, `BusinessCard.jsx`)**
  - [x] 抽离卡片数据为数组进行 map 渲染。
  - [x] 引入 `useIntersectionObserver` 钩子，控制可见性状态。
- [x] **Task 3: 编写 CSS Modules 样式 (`BusinessSection.module.css`)**
  - [x] 不复用原代码，依据 Figma 标注重写。
  - [x] 运用 `clamp()` 转换字体、间距、圆角。
  - [x] 编写 Hover 和 SlideFadeIn 动画关键帧。
- [x] **Task 4: 在 HTML 中集成 / 渲染组件**
  - [x] 配置 Babel 或 Webpack 打包组件并在 `index.html` 中替换原有静态区块，或提供纯 CSS/JS 版本作为实际网页预览方案。
  - *(考虑到当前环境为静态 HTML，为保证 `http://localhost:8080/` 预览有效，同时输出一套 Vanilla JS + CSS 的平替代码)*
- [x] **Task 5: 编写与运行 Jest 测试用例**
  - [x] 验证可见性状态（is-visible）。
  - [x] 验证 hover 状态渲染逻辑。
- [x] **Task 6: 自动化视觉回归测试 (Puppeteer + Pixelmatch)**
  - [x] 更新 `visual_test.js` 以覆盖动态视口 (1280px, 1440px, 1920px)。
  - [x] 执行对比，输出 PDF 报告。