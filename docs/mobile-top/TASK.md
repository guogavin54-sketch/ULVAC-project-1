# 移动端 TOP 页面任务拆解

## 执行原则
- 基于现有 `index.html` 增量修改，不新建第二份页面。
- 所有移动端样式写入独立文件 `css/mobile.css`。
- 桌面端样式与结构优先保持稳定。
- 每个任务控制在可独立验证的粒度内完成。

## 任务清单

- [ ] T1. 引入移动端样式文件
  - 输入：现有 `index.html`
  - 输出：在页面中新增 `css/mobile.css` 引用
  - 验收：页面加载 `mobile.css` 后桌面端无明显回归

- [ ] T2. 补充移动端 Header 结构
  - 输入：现有 Header DOM
  - 输出：
    - 新增 `.menu-toggle`
    - 新增 `.mobile-nav-overlay`
    - 新增 `.mobile-side-nav`
    - 复用桌面端导航项生成移动端菜单项
  - 验收：DOM 语义完整，包含 `aria-label / aria-expanded / aria-controls`

- [ ] T3. 补充移动端 Business Section DOM
  - 输入：现有 Business Section
  - 输出：
    - 新增 `.business-mobile`
    - 新增 accordion 列表结构
    - 每项包含标题、按钮、文案、图片面板
  - 验收：桌面端原网格结构仍存在，移动端专用结构独立

- [ ] T4. 新建 `css/mobile.css`
  - 输入：Figma 移动稿与导出代码
  - 输出：独立移动端样式文件，包含：
    - Header Mobile
    - Hero Mobile
    - Business Accordion Mobile
    - 其余区块基础移动端排布
    - Footer Mobile
  - 验收：文件独立存在，断点集中管理

- [ ] T5. 实现移动端 Header / Hero 视觉还原
  - 输入：`SP/TOP` 头部与首屏导出代码
  - 输出：
    - 移动端 logo / Global 文案布局
    - 汉堡菜单按钮样式
    - Hero 标题、正文、按钮样式
  - 验收：375px 下首屏结构与设计稿一致，无溢出

- [ ] T6. 实现移动端 Business Accordion 视觉样式
  - 输入：`18664_3284` 导出代码与截图
  - 输出：
    - 28px 标题
    - 358px 卡片宽逻辑的自适应映射
    - 18px 标题字号
    - 15px 按钮文字
    - 卡片圆角、边框、阴影、间距
  - 验收：列表卡片与按钮样式对齐移动稿

- [ ] T7. 重排其他模块的基础移动端布局
  - 输入：现有 Company Profile / Featured News / Value Report / Footer
  - 输出：
    - 纵向堆叠
    - 图片比例收口
    - 宽度与留白适配
  - 验收：375px-768px 区间无明显溢出和错位

- [ ] T8. 实现汉堡菜单交互
  - 输入：移动端 Header 结构
  - 输出：
    - `initMobileNav()`
    - 打开 / 关闭 / 遮罩点击 / ESC 关闭
    - `body.mobile-nav-open` 状态控制
  - 验收：菜单可平滑滑入滑出，遮罩与滚动锁定生效

- [ ] T9. 实现 Business Accordion 交互
  - 输入：移动端 accordion 结构
  - 输出：
    - `initBusinessAccordion()`
    - 单开模式切换
    - 图标旋转
    - panel 高度动画
  - 验收：点击展开/收起顺滑，无内容截断

- [ ] T10. 重排移动端 Footer 为纵向结构
  - 输入：现有 Footer DOM 与 `footerSp` 参考结构
  - 输出：
    - Logo
    - 地址/电话
    - 导航组
    - 法务信息纵向重排
  - 验收：层级清晰，375px 下可读性良好

- [ ] T11. 验证与收尾
  - 输入：全部代码变更
  - 输出：
    - 运行截图验证
    - 检查诊断错误
    - 更新任务勾选状态
  - 验收：关键文件无新增诊断错误，移动端主路径可用

## 依赖顺序
- T1 → T2/T3 → T4 → T5/T6/T7 → T8/T9/T10 → T11

## 实施备注
- JS 交互优先追加到 `js/main.js`，除非拆分明显更清晰。
- Business accordion 默认采用单开模式。
- Footer 本轮以纵向可用和接近设计稿为目标，不额外引入二级复杂交互。
