# 移动端 TOP 页面设计方案

## 1. 设计目标
- 在现有 `index.html` 上补充移动端结构，不新增第二份页面。
- 单独创建 `css/mobile.css`，专门承载 `375px-768px` 范围内的移动端覆盖样式。
- 复用桌面端导航项作为移动端侧边菜单内容。
- Footer 改为纵向结构，参考 `footerSp` 的信息层级与排列逻辑。
- 重点精细还原：
  - `SP/TOP` 头部与 Hero 区
  - Business Section 折叠面板
  - Footer 纵向布局

## 2. 文件设计

### 2.1 需要修改的文件
- `index.html`
- `js/main.js`

### 2.2 需要新增的文件
- `css/mobile.css`
- `docs/mobile-top/TASK.md`
- `docs/mobile-top/FINAL.md`

## 3. HTML 结构方案

### 3.1 Header 移动端结构
在现有 `.global-header` 内补充移动端专用节点，但不删除桌面端结构。

建议结构：

```html
<header class="global-header">
  <div class="header-container">
    <div class="logo">...</div>

    <button
      class="menu-toggle"
      type="button"
      aria-label="Open navigation menu"
      aria-expanded="false"
      aria-controls="mobile-side-nav"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="main-nav">...</nav>
  </div>

  <div class="mobile-nav-overlay"></div>
  <aside id="mobile-side-nav" class="mobile-side-nav">
    <button class="mobile-nav-close" type="button" aria-label="Close navigation menu"></button>
    <ul class="mobile-nav-list">...</ul>
  </aside>
</header>
```

#### 说明
- 桌面端继续使用 `.main-nav`。
- 移动端使用新抽屉 `.mobile-side-nav`。
- 内容直接复用桌面导航文案：
  - Home
  - About ULVAC
  - News
  - Investor Relations
  - Contact

### 3.2 Business Section 移动端结构
桌面端卡片网格不删除；移动端单独增加 accordion 容器，在移动端显示，桌面端隐藏。

建议结构：

```html
<section class="business-section">
  <div class="container business-container">...</div>

  <div class="business-mobile">
    <h2 class="business-mobile-title">ULVAC Operates Businesses in Six Areas</h2>

    <div class="business-accordion-list">
      <article class="business-accordion-item is-collapsed">
        <button
          class="business-accordion-trigger"
          type="button"
          aria-expanded="false"
          aria-controls="business-panel-1"
        >
          <span class="business-accordion-label">...</span>
          <span class="business-accordion-icon"></span>
        </button>
        <div id="business-panel-1" class="business-accordion-panel">
          <p>...</p>
          <img src="..." alt="...">
        </div>
      </article>
    </div>

    <a href="#" class="btn-business-mobile">See Business Overview</a>
  </div>
</section>
```

#### 说明
- `.business-container` 保留给桌面端。
- `.business-mobile` 仅在 `max-width: 768px` 下显示。
- 每个 item 默认收起，首项是否默认展开将在实现时保持与设计图一致，建议默认全部收起。

### 3.3 Footer 纵向结构
在现有 footer 基础上调整为移动端纵向排列，不新建第二套 footer DOM。

结构目标：
- logo
- 地址/电话
- SITEMAP 分组
- ULVAC Sites 分组
- 版权信息
- Privacy Policy / Terms of Use

## 4. CSS 架构设计

### 4.1 样式文件拆分
- `css/style.css`
  - 保留桌面端和现有基础样式
- `css/mobile.css`
  - 仅承载移动端断点覆盖
  - 在 `index.html` 中于 `style.css` 后引入，保证覆盖优先级

### 4.2 mobile.css 分层

```css
/* 1. Header Mobile */
/* 2. Hero Mobile */
/* 3. Business Accordion Mobile */
/* 4. Profile / News / Value Report 基础移动端 */
/* 5. Footer Mobile */
/* 6. 状态类与过渡动画 */
```

### 4.3 断点策略
- `@media (max-width: 768px)`：主移动端样式入口
- `@media (max-width: 480px)`：针对 375px 左右设备收口

### 4.4 关键尺寸原则
- 以 Figma 移动稿 `390px` 宽作为还原基准
- 375px-390px 区间以固定 padding + 自适应宽度方式兼容
- 页面左右留白优先采用：
  - `padding-left: 16px`
  - `padding-right: 16px`
- 区块纵向间距按设计稿映射：
  - 常用块间距 `32px`
  - 内部文字与内容间距 `8px / 16px / 24px`

## 5. 交互设计

### 5.1 汉堡菜单交互

#### 状态类
- `body.mobile-nav-open`
- `.mobile-nav-overlay.is-open`
- `.mobile-side-nav.is-open`
- `.menu-toggle.is-active`

#### 交互流
1. 点击 `.menu-toggle`
2. `body` 增加 `mobile-nav-open`
3. overlay 显示
4. side nav 从右侧平滑滑入
5. 再次点击关闭按钮 / 遮罩 / 菜单项后关闭

#### 动画
- overlay：`opacity 0.3s ease`
- side nav：`transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1)`
- menu icon：三条线切换为 close 状态

#### 交互细节
- 打开菜单时 `body` 禁止滚动
- 支持 `Escape` 关闭
- 菜单项点击区域至少 `44px` 高

### 5.2 Business Accordion 交互

#### 状态类
- `.business-accordion-item.is-open`
- `.business-accordion-trigger[aria-expanded="true"]`
- `.business-accordion-panel`

#### 交互流
1. 点击 trigger
2. 当前 item 切换展开/收起
3. 箭头图标旋转 180deg
4. panel 高度从 `0` 过渡到内容高度
5. 展开后显示文案与图片

#### 动画
- panel：`max-height 0.35s ease`, `opacity 0.25s ease`
- icon：`transform 0.3s ease`

#### 行为策略
- 采用单开模式更符合主流移动端 accordion 习惯：
  - 打开新项时关闭其他项

## 6. JS 设计

### 6.1 main.js 扩展点
在现有 `DOMContentLoaded` 初始化函数中增加两个模块：

#### `initMobileNav()`
- 查找：
  - `.menu-toggle`
  - `.mobile-nav-overlay`
  - `.mobile-side-nav`
  - `.mobile-nav-close`
  - `.mobile-side-nav a`
- 负责：
  - 打开
  - 关闭
  - Esc 关闭
  - 菜单项点击关闭

#### `initBusinessAccordion()`
- 查找：
  - `.business-accordion-trigger`
- 负责：
  - 控制 `aria-expanded`
  - 切换 `.is-open`
  - 计算 panel 的 `scrollHeight`

### 6.2 与现有脚本的兼容
- 不复用 `.is-visible` 作为菜单和 accordion 状态类，避免与滚动动画冲突
- Header 滚动阴影逻辑保留，但增加 `mobile-nav-open` 时的兼容判断，避免视觉冲突

## 7. 可访问性设计
- 汉堡按钮：
  - `aria-label`
  - `aria-expanded`
  - `aria-controls`
- 侧边菜单：
  - 使用 `aside`
  - 关闭按钮可聚焦
- Accordion：
  - 使用 `button` 作为 trigger
  - `aria-expanded`
  - `aria-controls`
- 图片保留合理 `alt`

## 8. 验收方式

### 8.1 视觉验收
- 375px 宽度下与 `screenshot_18600_15520.png` 结构一致
- Business 折叠区与 `screenshot_18664_3284.png` 一致

### 8.2 交互验收
- 汉堡菜单：
  - 可打开/关闭
  - 有遮罩
  - 有滑动动画
- Accordion：
  - 可展开/收起
  - 箭头旋转
  - 高度过渡平滑

### 8.3 代码验收
- `mobile.css` 独立存在
- 不引入新的诊断错误
- 桌面端已有结构不被破坏

## 9. 风险与处理
- 风险：桌面端现有 DOM 较复杂，直接重构可能影响桌面样式
  - 处理：新增移动端专用容器，使用媒体查询控制显示
- 风险：背景图和卡片图片在移动端比例可能失真
  - 处理：通过 `object-fit: cover` 和独立高度控制
- 风险：Footer 现有桌面结构较重
  - 处理：移动端只重排，不重建第二套 footer DOM
