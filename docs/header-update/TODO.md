# Header Update TODO

## 遗留项与后续优化
1. **图片资源补充**：目前代码中引用了 `assets/images/ULVAC LOGO(Blue) 1.png` 和 `assets/images/language.png`，请确保这些图片文件确实存放在对应目录中。若尚未放入，请将图片放置于 `assets/images/` 目录下，页面即可正常显示。
2. **Figma 设计生成**：
   - 待执行。根据 6A 流程和 `figma-generate-design` 技能的要求，如需将代码中的改动逆向生成/更新至 Figma 设计稿，需要您提供目标 Figma 文件的 URL 或 File Key。
   - 收到链接后，我将调用 Figma MCP 相关 API（如 `use_figma`）在您的 Figma 中自动生成对应的组件结构。