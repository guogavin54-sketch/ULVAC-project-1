# Business Section DESIGN

## 1. 架构设计方案

### 1.1 组件拆分与结构
由于目前项目是静态 HTML 环境，我们将在 `src/components/BusinessSection` 中搭建 React 组件结构：
- `BusinessSection.jsx`: 容器组件，负责外层布局、IntersectionObserver 挂载。
- `BusinessCard.jsx`: 卡片子组件，负责渲染单独的业务卡片及接收动效。
- `BusinessSection.module.css`: CSS Modules，存放样式与动画关键帧。
- `BusinessSection.test.js`: Jest 测试用例文件。

### 1.2 响应式适配策略 (1280px ~ 1920px)
- **字体大小 (Font Size)**: 使用 `clamp(MIN_PX, SCALED_VW, MAX_PX)`。
  - 例如，标题基准 54px（在 1440px 视口下）。在 1920px 对应 72px。公式：`clamp(54px, 3.75vw, 72px)`。
- **间距与宽度 (Padding/Width)**: 
  - 外层 Container `column-gap`: 基准 48px -> `clamp(48px, 3.33vw, 64px)`。
  - 外层 Container Width: `100%`，配合两端 `padding` 动态扩展。
  - 网格布局 `grid-template-columns`: 卡片宽度不再固定为 289px，而是按比例 `repeat(3, 1fr)`，配合 `aspect-ratio` 保证图片比例一致。

### 1.3 动画与交互逻辑
- **滚动视口 (Intersection Observer)**: 
  - 在 `useEffect` 中创建 `IntersectionObserver`，当模块 20% 进入视口时，添加 `.isVisible` 类。
  - `.isVisible` 类在 CSS 中触发 `animation: slideFadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;`。
- **Hover/Focus**: 
  - 卡片 `.card:hover`: `transform: scale(1.05); box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15); transition: transform 0.2s ease, box-shadow 0.2s ease;`

### 1.4 Figma 同步策略
如需在 Figma 中同步更新响应式配置或生成新的 Variant，后续将依赖 `use_figma` 调用（按 6A 第 4 步执行后提示）。

## 2. 核心数据结构
```javascript
const cardsData = [
  { id: 1, title: 'Semiconductor and...', desc: '...', imgSrc: 'assets/images/card1_semiconductor.svg' },
  // ... 6 个业务板块数据
];
```