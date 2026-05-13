# 15520 移动端字号对表

基准文件：

- Figma 导出代码：[index.module.scss](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/.figma/18600_15520/index.module.scss)
- 当前实现：[mobile.css](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/css/mobile.css)

## 对表结果

| 模块 | Figma 字号/行高 | 项目选择器 | 当前结果 |
| --- | --- | --- | --- |
| Header `Global` | `14px / 22px` | `body.is-mobile .logo-text` | 一致 |
| Hero 标题 | `34px / 44px` | `body.is-mobile .hero-content h1` | 一致 |
| Hero 描述 | `16px / 24px` | `body.is-mobile .hero-description` | 一致 |
| Hero 按钮文字 | `15px / 23px` | `body.is-mobile .btn-hero-white span` | 已补齐 |
| Business 标题 | `28px / 36px` | `body.is-mobile .business-mobile-title` | 一致 |
| Business 卡片标题 | `18px / 27px` | `body.is-mobile .business-accordion-label` | 一致 |
| Business 卡片描述 | `15px / 19px` | `body.is-mobile .business-accordion-panel p` | 一致 |
| Business 按钮文字 | `15px / 23px` | `body.is-mobile .btn-business-mobile` | 一致 |
| Profile 标题 | `28px / 36px` | `body.is-mobile .profile-container h2` | 一致 |
| Profile 期间文字 | `13px / 18px` | `body.is-mobile .stat-period` | 已显式锁定 |
| Profile 主数字 | `28px / 28px` | `body.is-mobile .stat-value` | 已修正 |
| Profile 货币符号 | `20px / 28px` | `body.is-mobile .stat-currency` | 已显式锁定 |
| Profile 标签文字 | `16px / 24px` | `body.is-mobile .stat-label` | 已显式锁定 |
| Featured News 标题 | `28px / 36px` | `body.is-mobile .news-container h2` | 一致 |
| Featured News 日期 | `15px / 19px` | `body.is-mobile .news-date` | 一致 |
| Featured News 卡片标题 | `16px / 24px` | `body.is-mobile .news-card.large .news-content h3` / `.news-card.small .news-content h3` | 已修正 |
| Featured News 标签 | `13px / 18px` | `body.is-mobile .news-tag` | 一致 |
| Main Bases 占位文案 | `58px / 87px` | `body.is-mobile .bases-title-large` | 一致 |
| Value Report 标题 | `32px / 42px` | `body.is-mobile .report-text h2` | 一致 |
| Value Report 描述 | `15px / 19px` | `body.is-mobile .report-text p` | 一致 |
| Value Report 按钮文字 | `16px / 24px` | `body.is-mobile .btn-report span` | 已显式锁定 |
| Footer 地址/电话 | `16px / 22px` | `body.is-mobile .footer-contact-row p` | 一致 |
| Footer 分组标题 | `18px / 22px` | `body.is-mobile .footer-nav-group h4` | 一致 |
| Footer 导航链接 | `16px / 22px` | `body.is-mobile .footer-nav-group a` | 一致 |
| Footer 版权 | `12px / 21px` | `body.is-mobile .footer-bottom p` | 一致 |
| Footer 法务链接 | `13px / 21px` | `body.is-mobile .footer-legal a` | 一致 |

## 本轮修正点

- 把 `Hero` 按钮文字从仅设置容器字号改为显式设置 `span`，避免继承桌面 `16px / 24px`。
- 把 `Company Profile` 数字主值 `stat-value` 从桌面 `36px / 36px` 改成移动端 `28px / 28px`。
- 显式补齐 `stat-period`、`stat-currency`、`stat-label`，避免未来被桌面规则回灌。
- 把 `Featured News` 标题锁到更高权重的移动端选择器，避免被桌面 `18px / 27px` 覆盖。
- 把 `Value Report` 按钮文字显式锁定到 `16px / 24px`。

## 验证

- 自动化断言报告：[MOBILE_STYLE_TEST_REPORT.md](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/docs/mobile-top/MOBILE_STYLE_TEST_REPORT.md)
- 当前移动端样式文件：[mobile.css](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/css/mobile.css)
