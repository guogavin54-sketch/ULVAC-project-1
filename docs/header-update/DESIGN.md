# Header Update DESIGN

## 1. 架构设计方案

### 1.1 DOM 结构调整 (`index.html`)
- **Header 容器**：保留 `<header class="global-header">`，但取消原先针对全屏背景的透明悬浮设计。
- **Logo 区域**：
  - 移除现有的内联 SVG Logo。
  - 引入图片 `<img src="assets/images/ULVAC LOGO(Blue) 1.png" alt="ULVAC" class="header-logo-img">`。
  - "Global" 文本保留，并调整颜色为灰色。
- **导航区域**：
  - `<nav class="main-nav">` 内部链接颜色改为深色（`--color-text-main`）。
- **语言选择器**：
  - 移除现有的内联 SVG 地球图标，替换为 `<img src="assets/images/language.png" alt="Language" class="lang-icon">`。
  - 为外层容器 `.lang-selector` 添加边框（border）、圆角（border-radius）和内边距（padding），以符合截图中的按钮样式。

### 1.2 样式调整 (`style.css`)
- `.global-header`：
  - 移除 `position: absolute;` 和 `color: var(--color-bg-white);`。
  - 改为 `position: sticky; top: 0;`（或 `relative`），背景色设为 `var(--color-bg-white)`。
  - 添加底部边框 `border-bottom: 1px solid var(--color-border);`。
  - 移除原先的 `z-index: 100;` 上的文字反白逻辑。
- `.logo`：
  - 采用 Flexbox 让 Logo 图片与 "Global" 文本垂直居中对齐，控制间距。
- `.lang-selector`：
  - `border: 1px solid var(--color-border);`
  - `border-radius: var(--radius-sm);`
  - `padding: var(--spacing-2) var(--spacing-3);`
  - 颜色设为黑色/深灰色。

### 1.3 交互逻辑 (`js/main.js`)
- 移除原先针对 `.global-header` 的“滚动时背景变为半透明深色”的逻辑。
- 替换为：滚动时为白底 Header 增加轻微的底部阴影（box-shadow），以区分页面内容。

### 1.4 figma-generate-design 技能整合
- 准备好更新后的 DOM 结构和样式。
- （后续操作）如需将此更新后的 Header 推送到 Figma 中，将需要您提供目标 Figma 文件的 URL 或 File Key，然后运行 `use_figma` 脚本来生成/更新该组件。

## 2. 变更影响范围
仅影响全局 Header 组件及对应页面的顶部间距，不影响页面其他主要模块。