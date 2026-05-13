# Header Update ALIGNMENT

## 1. 核心目标
将现有的透明/覆盖式 Header 修改为白底样式的 Header，并调整相关元素以还原提供的视觉截图。

## 2. 需求边界 (做与不做)
- **要做**：
  - 修改 `index.html` 中的 `.global-header` 结构，移除绝对定位或修改其表现形式，确保它拥有白底。
  - 使用指定的图片资源：`ULVAC LOGO(Blue) 1.png` 作为左侧 Logo。
  - 使用指定的图片资源：`language.png` 作为右侧的语言选择器图标。
  - 更新 Header 内文本的颜色（如导航链接变为深色）。
  - 更新对应的 CSS 样式（背景色、文本颜色、间距对齐等）。
  - 调用 `figma-generate-design` 和 `6A` 技能的流程。
- **不做**：
  - 不修改 Header 以外的其他页面区块（如 Hero Section, Business Areas 等）。

## 3. 模糊点与待确认项
1. **图片资源路径**：您提到的 `ULVAC LOGO(Blue) 1.png` 和 `language.png` 目前在工作区未找到确切文件。我将默认这些图片存放在 `assets/images/` 目录下（如 `assets/images/ULVAC LOGO(Blue) 1.png`）。如果路径不同，请您在稍后确认。
2. **Figma 更新需求**：您提到需要调用 `figma-generate-design` 技能。该技能主要用于将代码中的设计同步/推送到 Figma 文件中。如果您需要我将这个 Header 的修改应用到某个 Figma 文件中，请提供对应的 **Figma 文件 URL 或 File Key**。如果只是指执行该技能的工作流规范来指导代码开发，我将按照其设计系统理念（使用变量等）来编写代码。

## 4. 初步验收标准
- 页面顶部的 Header 显示为白底。
- 左侧 Logo 替换为蓝色的 ULVAC Logo 图片。
- 中间导航链接清晰可见（深色字体）。
- 右侧有带边框的语言选择器，包含 `language.png` 和 "English" 文字及下拉箭头。
- 在本地预览中能正确显示更新后的样式。