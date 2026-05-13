# Business Section 技术债务与后续优化 (TODO)

- [ ] **字体引入**: 引入项目依赖的商业字体 `Dunbar Text` 以消除剩余的 Visual Diff。
- [ ] **真实组件库整合**: 若项目中存在全局的 `Button` 或 `Card` 组件，应将当前的 `<BusinessCard>` 和按钮逻辑抽离并复用。
- [ ] **图片懒加载与优化**: 对于 `assets/images` 里的占位 SVG 和高分辨率图，后续可增加 `loading="lazy"` 和 WebP 自适应标签。