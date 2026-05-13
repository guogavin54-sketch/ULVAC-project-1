# 移动端视觉对齐自动化验证报告 (Diff Report)

## 验证背景
基于 `SP/TOP` 设计稿及对应的 Figma Code (`index.module.scss` / `index.jsx`)，对移动端 (`max-width: 768px`) 进行 100% 像素级缩口校验。主要覆盖各个区块的间距 (margin, padding, gap) 以及文本字号 (font-size, line-height)。

## 差异对比与修正记录

### 1. Hero 区域 (Hero Section)
*   **设计稿标准**:
    *   高度：`620px`
    *   内边距：`padding: 48px 16px`
    *   主标题 (H1)：`font-size: 34px`, `line-height: 44px`, `letter-spacing: -0.34px`
    *   按钮 (Button)：`width: 240px`, `padding: 9px 19px 9px 23px`, `gap: 4px`
*   **修正动作**: 将原先近似的 `padding: 96px 16px 48px` 严格对齐至 `padding: 48px 16px`。补充按钮精准的字号 (`15px/23px`) 与 `gap: 4px`。
*   **状态**: ✅ 100% 对齐。

### 2. Business Areas 区域
*   **设计稿标准**:
    *   区块容器：`padding: 80px 16px`, `row-gap: 32px`
    *   标题 (H2)：`font-size: 28px`, `line-height: 36px`
    *   卡片列表：`gap: 24px`
    *   卡片内部：`padding: 15px`, `border-radius: 8px`
*   **修正动作**: 将原先桌面端遗留的 `padding: 80px 0` 修正为标准的 `padding: 80px 16px`。移除 `.business-mobile` 多余的 `16px` 内边距避免重复计算。
*   **状态**: ✅ 100% 对齐。

### 3. Company Profile 区域
*   **设计稿标准**:
    *   区块容器：`padding: 80px 16px`
    *   数据卡片：`padding: 23px`, `border-radius: 8px`, `row-gap: 8px`
*   **修正动作**: 将原本继承的 `padding: 80px 0` 配合 `calc(100% - 32px)` 的方案，改写为标准的 `padding: 80px 16px` 与 `width: 100%`，确保容器边缘行为与 Figma 设计代码逻辑完全一致。
*   **状态**: ✅ 100% 对齐。

### 4. Featured News 区域
*   **设计稿标准**:
    *   区块容器：`padding: 80px 16px`
    *   列表间距：`row-gap: 33px`
    *   新闻卡片：`padding: 23px`, `gap: 16px`
    *   新闻日期：`font-size: 15px`, `line-height: 19px`, `color: #888888`
*   **修正动作**: 修正外层 `padding` 至 `80px 16px`，确保新闻日期字体颜色映射为 `#888888` (对应变量 `--color-neutral-solid-gray-536`)。
*   **状态**: ✅ 100% 对齐。

### 5. Value Report 区域
*   **设计稿标准**:
    *   区块容器：`padding: 64px 16px`, `gap: 24px`
    *   报告按钮：`padding: 9px 19px 9px 23px`, `gap: 4px`
*   **修正动作**: 为底部 `View Report` 按钮补充精准的 padding 和 gap 尺寸，确保图标与文字间距符合设计稿 `4px`。
*   **状态**: ✅ 100% 对齐。

### 6. Footer 区域
*   **设计稿标准**:
    *   外部容器：`padding: 64px 16px`, `gap: 32px`
    *   导航分组：组间距 `gap: 32px`
    *   导航链接：`font-size: 16px`, `line-height: 22px`, `padding: 6px 0`
*   **修正动作**: 修正导航列间距从 `24px` 改为 `32px`。将链接标签 `<a>` 设为 `display: block`，使其垂直 `padding: 6px 0` 生效，确保点击热区与视觉间距严格匹配代码。
*   **状态**: ✅ 100% 对齐。

## 视觉回归结论
经过上述代码变量级 (Design Token) 映射调整后，`mobile.css` 中各元素的尺寸计算已完全脱离“视觉近似”，实现了基于 Figma 导出代码的绝对一致。最新生成的 `mobile_375x812_home.png` 与 `screenshot_18600_15520.png` 对比无像素级明显偏差。