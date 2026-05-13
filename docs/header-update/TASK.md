# Header Update TASK

## 任务清单

- [x] **Task 1: 更新 HTML 结构 (`index.html`)**
  - [x] 移除旧的内联 SVG Logo，替换为 `<img src="assets/images/ULVAC LOGO(Blue) 1.png" alt="ULVAC">`。
  - [x] 修改 Logo 旁边的 "Global" 文本结构，以便后续样式对齐。
  - [x] 修改语言选择器，移除旧的 SVG 图标，替换为 `<img src="assets/images/language.png" alt="Language">`。

- [x] **Task 2: 更新 CSS 样式 (`css/style.css`)**
  - [x] 将 `.global-header` 设置为 `position: sticky; top: 0; background-color: var(--color-bg-white); border-bottom: 1px solid var(--color-border); color: var(--color-text-main); z-index: 100;`。
  - [x] 调整 `.logo` 样式：使用 flex 布局，图片限高（如 `height: 24px`），文本颜色改为 `#666` 或 `var(--color-text-muted)`。
  - [x] 调整 `.main-nav a` 的颜色为黑色/深灰色，悬停效果不变或改为蓝色。
  - [x] 调整 `.lang-selector` 样式：添加 1px 实线边框、内边距、圆角，使图片和文本水平居中。

- [x] **Task 3: 更新交互脚本 (`js/main.js`)**
  - [x] 找到处理 `.global-header` 滚动的代码块。
  - [x] 移除背景变深的逻辑。
  - [x] 修改为：滚动超过 50px 时，添加底部阴影 `box-shadow: var(--shadow-sm)`，回到顶部时移除阴影。

- [x] **Task 4: 触发 figma-generate-design 技能**
  - [x] 本地代码更新完毕并验证后，提示用户提供 Figma File URL。
  - [x] 编写 Figma 生成脚本（如果用户提供 URL），将更新后的 Header 结构同步到 Figma 中。
