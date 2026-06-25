import os

# Get all html files in the root directory
html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'login.html']

if not os.path.exists('jp'):
    os.makedirs('jp')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update paths
    content = content.replace('href="css/', 'href="../css/')
    content = content.replace('src="assets/', 'src="../assets/')
    content = content.replace('href="assets/', 'href="../assets/')
    content = content.replace('src="js/', 'src="../js/')
    content = content.replace('poster="assets/', 'poster="../assets/')
    content = content.replace('srcset="assets/', 'srcset="../assets/')
    content = content.replace("url('assets/", "url('../assets/")
    
    # Change lang attribute
    content = content.replace('<html lang="en">', '<html lang="ja">')
    
    # Set default language selector text to Japanese for jp files
    content = content.replace('<span class="current-lang">English</span>', '<span class="current-lang">日本語</span>')
    content = content.replace('<span class="mobile-lang-text">English</span>', '<span class="mobile-lang-text">日本語</span>')

    replacements = [
        ('data-text="About ULVAC"><span>About ULVAC</span>', 'data-text="アルバックを知る"><span>アルバックを知る</span>'),
        ('data-text="Overview"><span>Overview</span>', 'data-text="概要"><span>概要</span>'),
        ('data-text="Our Business"><span>Our Business</span>', 'data-text="事業領域"><span>事業領域</span>'),
        ('data-text="Business Areas"><span>Business Areas</span>', 'data-text="事業領域"><span>事業領域</span>'),
        ('data-text="R&amp;D"><span>R&amp;D</span>', 'data-text="研究・開発"><span>研究・開発</span>'),
        ('data-text="Group Companies"><span>Group Companies</span>', 'data-text="グループ会社"><span>グループ会社</span>'),
        ('data-text="News"><span>News</span>', 'data-text="ニュース"><span>ニュース</span>'),
        ('data-text="Investor Relations"><span>Investor Relations</span>', 'data-text="株主・投資家情報"><span>株主・投資家情報</span>'),
        ('data-text="Contact"><span>Contact</span>', 'data-text="お問い合わせ"><span>お問い合わせ</span>'),
        ('<li><a href="about.html" class="hover-color-effect">About ULVAC</a></li>', '<li><a href="about.html" class="hover-color-effect">アルバックを知る</a></li>'),
        ('<li><a href="news.html" class="hover-color-effect">News</a></li>', '<li><a href="news.html" class="hover-color-effect">ニュース</a></li>'),
        ('<li><a href="investor-relations.html" class="hover-color-effect">Investor Relations</a></li>', '<li><a href="investor-relations.html" class="hover-color-effect">株主・投資家情報</a></li>'),
        ('<li><a href="contact.html" class="hover-color-effect">Contact</a></li>', '<li><a href="contact.html" class="hover-color-effect">お問い合わせ</a></li>'),
        ('<p>ULVAC, Inc.<br>2500 Hagisono, Chigasaki, Kanagawa 253-8543, Japan</p>', '<p>株式会社アルバック<br>〒253-8543 神奈川県茅ヶ崎市萩園2500番地</p>'),
        ('>SITEMAP</a>', '>サイトマップ</a>'),
        ('>ULVAC Sites</a>', '>ULVACウェブサイト</a>'),
        ('<li><a href="index.html" class="hover-color-effect">Home</a></li>', '<li><a href="index.html" class="hover-color-effect">トップ</a></li>'),
        ('<li><a href="about.html" class="hover-color-effect">About ULVAC</a></li>', '<li><a href="about.html" class="hover-color-effect">アルバックを知る</a></li>'),
        ('<li><a href="news.html" class="hover-color-effect">News</a></li>', '<li><a href="news.html" class="hover-color-effect">ニュース</a></li>'),
        ('<li><a href="investor-relations.html" class="hover-color-effect">Investor Relations</a></li>', '<li><a href="investor-relations.html" class="hover-color-effect">株主・投資家情報</a></li>'),
        ('<li><a href="contact.html" class="hover-color-effect">Contact</a></li>', '<li><a href="contact.html" class="hover-color-effect">お問い合わせ</a></li>'),
        ('>ULVAC, Inc. (EN)</a>', '>ULVAC, Inc.（英語）</a>'),
        ('>ULVAC, Inc. (JP)</a>', '>ULVAC, Inc.（日本語）</a>'),
        ('class="hover-color-effect">Privacy Policy</a>', 'class="hover-color-effect">個人情報保護方針</a>'),
        ('class="hover-color-effect">Terms of Use</a>', 'class="hover-color-effect">ご利用規約</a>')
    ]

    for old, new in replacements:
        content = content.replace(old, new)

    if file == 'index.html':
        index_replacements = [
            ('<title>Global Leader in Vacuum Technology for Over 70 Years | ULVAC Global</title>', '<title>真空技術をコアに社会課題に挑む | ULVAC Global</title>'),
            ('<meta name="description" content="With vacuum technology at our core, we provide manufacturing solutions from cutting-edge semiconductors and quantum computing to rare-earth magnets and batteries.">', '<meta name="description" content="真空技術をコアに、先端半導体や量子コンピューティングの最先端分野からレアアース磁石、バッテリー等の社会基盤分野まで、革新的な製造ソリューションを提供します。">'),
            (
                'ULVAC, Global Leader in<span class="desktop-br"></span> Vacuum Technology for Over 70 Years',
                '真空技術をコアに社会課題に挑む―<span class="desktop-br"></span> ULVAC'
            ),
            (
                'With vacuum technology at our core, we provide manufacturing solutions ranging from cutting-edge fields like advanced semiconductors and quantum computing to social-foundational industries such as rare-earth magnets and batteries.',
                '当社は真空技術をコアとして、先端半導体や量子コンピューティングなどの最先端分野から、レアアース磁石やバッテリーなど社会基盤分野に至るまで、製造ソリューションを提供しています。'
            ),
            ('<span>Discover UVLAC</span>', '<span>アルバックをもっと知る</span>'),
            (
                'UVLAC’s<span class="desktop-br"></span> 6 Business Areas',
                'アルバックの<span class="desktop-br"></span>6つの事業領域'
            ),
            ('UVLAC’s 6 Business Areas', 'アルバックの6つの事業領域'),
            ('<span>See Business Overview</span>', '<span>事業内容を見る</span>'),
            ('Semiconductor and Electronic Device Production Equipment', '半導体及び電子部品製造装置'),
            (
                'Technologies and equipment supporting scaling advancements essential for higher-performance next-generation devices',
                '次世代デバイスの高性能化に不可欠な微細化の進展を支える技術・装置'
            ),
            ('Display and Energy-Related Production Equipment', 'ディスプレイ・エネルギー関連製造装置'),
            (
                'Coating and processing solutions for various materials including glass substrates, plastics, and films',
                'ガラス基板、プラスチック、フィルムなど多様な材料に対応する成膜・加工ソリューション'
            ),
            ('Industrial Equipment', '一般産業用装置'),
            ('Thermal processing and freeze-drying solutions for diverse industries', '多様な産業向け熱処理・凍結乾燥ソリューション'),
            ('Components', 'コンポーネント'),
            ('Vacuum pumps, measurement and analysis equipment, power generators, and vacuum valves', '真空ポンプ、計測・分析機器、電源装置、真空バルブなど'),
            ('Materials', '材料'),
            (
                'High-performance, high-quality materials, including sputtering targets and functional materials',
                'スパッタリングターゲットや機能材料など、高機能・高品質の材料'
            ),
            ('Surface analysis and Coating', '表面分析・コーティング'),
            (
                'Advanced surface analysis instruments and coating technologies designed to meet diverse customer needs',
                '顧客ニーズに応える先進的な表面分析装置、コーティング技術'
            ),
            ('At a Glance', '数字でみるアルバック'),
            ('<span class="stat-currency">¥</span>', '<span class="stat-currency"></span>'),
            ('<span class="stat-value">251.2B</span>', '<span class="stat-value">2,512億円</span>'),
            ('<div class="stat-label">net sales</div>', '<div class="stat-label">売上高</div>'),
            ('<span class="stat-value">6,132</span>', '<span class="stat-value">6,132人</span>'),
            ('<div class="stat-label">group employees worldwide</div>', '<div class="stat-label">従業員数 (連結)</div>'),
            ('<span class="stat-value">41</span>', '<span class="stat-value">41社</span>'),
            ('<div class="stat-label">group companies</div>', '<div class="stat-label">グループ会社数</div>'),
            ('<span class="stat-currency">¥ </span>', '<span class="stat-currency"></span>'),
            ('<span class="stat-value">22.8B</span>', '<span class="stat-value">228億円</span>'),
            ('<div class="stat-label">R&amp;D capital expenditure</div>', '<div class="stat-label">研究開発投資額</div>'),
            ('*As of FY2025 (ended June 30, 2025)', '※2025年6月30日現在'),
            ('Featured News', 'ニュース'),
            ('ULVAC Receives the “2025 TSMC Excellent Performance Award”', 'TSMCより「2025 TSMC Excellent Performance Award」を受賞しました'),
            ('ULVAC Receives “Best Partner Award” from SK hynix', 'SK hynixより「Best Partner Award」を受賞〜技術力と品質への継続的な挑戦が高評価〜'),
            (
                'ULVAC Recognized with CDP “Climate Change 2024” and “Water Security 2024” B Score',
                'CDP「気候変動2024」「水セキュリティ2024」で「B」スコアに認定されました'
            ),
            ('<span class="news-tag tag-corporate">Corporate</span>', '<span class="news-tag tag-corporate">コーポレート</span>'),
            ('<span class="news-tag tag-sustainability">Sustainability</span>', '<span class="news-tag tag-sustainability">サステナビリティ</span>'),
            ('<span>See All News</span>', '<span>ニュース一覧を見る</span>'),
            ('ULVAC Global Operations', 'アルバックの主要拠点'),
            ('<span>See All Group Companies</span>', '<span>グループ会社一覧を見る</span>'),
            ('Our approach to sustainable growth and long-term value creation', '持続的成長と企業価値向上に向けた取り組み'),
            ('<span>View Report</span>', '<span>統合レポートを見る</span>')
        ]

        for old, new in index_replacements:
            content = content.replace(old, new)

    if file == 'about.html':
        about_replacements = [
            ('<title>About ULVAC | ULVAC Global</title>', '<title>アルバックについて | ULVAC Global</title>'),
            ('<meta name="description" content="Founded in 1952, ULVAC is a comprehensive vacuum equipment manufacturer supporting industries and science worldwide through cutting-edge vacuum technology.">', '<meta name="description" content="1952年創業のアルバックは、真空技術で世界の産業と科学を支える総合真空装置メーカーです。">'),
            ('<h2 class="title2 animate-on-scroll reveal-pop text-spotlight">About ULVAC</h2>', '<h2 class="title2 animate-on-scroll reveal-pop text-spotlight">アルバックを知る</h2>'),
            ('<a href="about.html" class="tab-nav-item is-active" aria-current="page" data-text="Overview"><span>Overview</span></a>', '<a href="about.html" class="tab-nav-item is-active" aria-current="page" data-text="概要"><span>概要</span></a>'),
            ('<a href="business.html" class="tab-nav-item" data-text="Our Business"><span>Our Business</span></a>', '<a href="business.html" class="tab-nav-item" data-text="事業領域"><span>事業領域</span></a>'),
            ('<a href="research-development.html" class="tab-nav-item" data-text="R&amp;D"><span>R&amp;D</span></a>', '<a href="research-development.html" class="tab-nav-item" data-text="研究・開発"><span>研究・開発</span></a>'),
            ('<a href="group-companies.html" class="tab-nav-item" data-text="Group Companies"><span>Group Companies</span></a>', '<a href="group-companies.html" class="tab-nav-item" data-text="グループ会社"><span>グループ会社</span></a>'),
            ('<h2 class="topMessage animate-on-scroll reveal-pop text-spotlight">Top Message</h2>', '<h2 class="topMessage animate-on-scroll reveal-pop text-spotlight">トップメッセージ</h2>'),
            ('Pioneering the Future of Industry and Science Through Vacuum Technology', '真空技術で、産業と科学の未来を切り拓く'),
            ('Junya Kiyota, President and Executive Officer', '社長執行役員　清田 淳也'),
            ('ULVAC has long been committed to contributing to the development of industries and science, with vacuum technology at its core.', 'アルバックは、真空技術を核に、産業と科学の発展に貢献することを目指してきました。'),
            ('As society increasingly embraces AI, the semiconductors and electronic devices that power this progress are more vital than ever. We have positioned our Semiconductor and Electronic Devices business at the core of our growth, with the aim of becoming indispensable to society. This is the direct embodiment of our Basic Corporate Philosophy. By bridging R&D and business, and transforming technology into value, we will deliver tangible results.', '今、AIを前提とした社会が本格化し、その発展を支える半導体や電子デバイスの重要性は、ますます高まっています。アルバックは、半導体・電子機器事業を成長の中核に据え、社会にとって「なくてはならない存在」となるべく、挑戦を続けています。これは経営基本理念そのものの実行です。研究開発と事業をつなぎ、技術を価値に変え、成果へと結びつけてまいります。'),
            ('As society increasingly embraces AI, the semiconductors and electronic devices that power this progress are more vital than ever. We have positioned our Semiconductor and Electronic Devices business at the core of our growth, with the aim of becoming indispensable to society. This is the direct embodiment of our Basic Corporate Philosophy. By bridging R&D and business, and transforming technology into value, we will deliver tangible results."', '今、AIを前提とした社会が本格化し、その発展を支える半導体や電子デバイスの重要性は、ますます高まっています。アルバックは、半導体・電子機器事業を成長の中核に据え、社会にとって「なくてはならない存在」となるべく、挑戦を続けています。これは経営基本理念そのものの実行です。研究開発と事業をつなぎ、技術を価値に変え、成果へと結びつけてまいります。"'),
            ('A vacuum is not an empty space; it holds limitless potential.', '真空は、何もない空間ではありません。無限の可能性を秘めています。'),
            ('At ULVAC, generations of expertise and wisdom have accumulated—built by those who came before us and continually refined by every employee. By bringing these strengths together, developing our technology into products, and working alongside our customers to ensure successful implementation, we will rise to meet the challenges that our customers and society face.', 'アルバックの現場には、先輩方が築き、社員一人ひとりが磨いてきた技術と知恵が積み重なっています。その力をつなぎ、技術を製品に育て、お客様のもとに届け切ることで、お客様や社会の挑戦に応えていきます。'),
            ('I am committed to making ULVAC a company that pioneers new paths through technology. With management and all employees united in purpose, together with our customers and other stakeholders, we will confidently take ULVAC’s next step forward.', '私は、アルバックを技術で道を切り拓く会社にしていきたいと考えています。経営と現場が志を一つにし、お客様をはじめとするステークホルダーの皆さまとともに、アルバックの次の一歩を力強く踏み出してまいります。'),
            ('I sincerely appreciate your continued support and trust in the ULVAC Group.', '今後とも、アルバックグループへの変わらぬご支援を賜りますよう、よろしくお願い申し上げます。'),
            ('<p class="top-message-toggle-text">Show More</p>', '<p class="top-message-toggle-text">続きを読む</p>'),
            ('<h2 class="whoWeAre animate-on-scroll reveal-pop text-spotlight">Who We Are</h2>', '<h2 class="whoWeAre animate-on-scroll reveal-pop text-spotlight">Who We Are</h2>'),
            ('With vacuum technology at our core, we provide manufacturing solutions ranging from cutting-edge fields like advanced semiconductors and quantum computing to social-foundational industries such as rare-earth magnets and batteries.', '当社は真空技術をコアとして、先端半導体や量子コンピューティングなどの最先端分野から、レアアース磁石やバッテリーなど社会基盤分野に至るまで、製造ソリューションを提供しています。'),
            ('<p class="who-we-are-detail-title">Basic Corporate Philosophy</p>', '<p class="who-we-are-detail-title">経営基本理念</p>'),
            ('ULVAC Group aims to contribute to the development of industries and science by comprehensively utilizing its vacuum and peripheral technologies through the mutual cooperation and collaboration of the Group companies.', 'アルバックグループは、互いに協力・連携し、真空技術及びその周辺技術を総合利用することにより、産業と科学の発展に貢献することを目指す。'),
            ('<p class="companyProfile animate-on-scroll reveal-pop text-spotlight">Company Profile</p>', '<p class="companyProfile animate-on-scroll reveal-pop text-spotlight">会社概要</p>'),
            ('<p class="company-profile-label">Name</p>', '<p class="company-profile-label">商号</p>'),
            ('<p class="company-profile-value">ULVAC, Inc.</p>', '<p class="company-profile-value">株式会社アルバック　ULVAC, Inc.</p>'),
            ('<p class="company-profile-label">Trademark</p>', '<p class="company-profile-label">商標</p>'),
            ('<p class="company-profile-label">ULVAC Head Office / Plant</p>', '<p class="company-profile-label">本社・工場</p>'),
            ('<p class="company-profile-value">2500 Hagisono, Chigasaki, Kanagawa 253-8543, Japan</p>', '<p class="company-profile-value">神奈川県茅ヶ崎市萩園2500番地</p>'),
            ('<p class="company-profile-label">Established</p>', '<p class="company-profile-label">設立</p>'),
            ('<p class="company-profile-value">August 23, 1952</p>', '<p class="company-profile-value">1952年8月23日</p>'),
            ('<p class="company-profile-label">Representative</p>', '<p class="company-profile-label">代表者</p>'),
            ('<p class="company-profile-value">Setsuo Iwashita, Representative Director, Chairman</p>', '<p class="company-profile-value">代表取締役会長　岩下節生</p>'),
            ('<p class="company-profile-label">Capital</p>', '<p class="company-profile-label">資本金</p>'),
            ('<p class="company-profile-value">20,873,042,500 yen</p>', '<p class="company-profile-value">208億7,304万2,500円</p>'),
            ('<p class="company-profile-label">Number of Employees</p>', '<p class="company-profile-label">従業員数</p>'),
            ('<p class="company-profile-value">1,648, Consolidated: 6,132 (As of June 30, 2025)</p>', '<p class="company-profile-value">1,648名、連結6,132名（2025年6月30日現在）</p>'),
            ('<p class="company-profile-label">Business Areas</p>', '<p class="company-profile-label">事業内容</p>'),
            ('Development, manufacture, sales, customer support and machinery importing/exporting activities related to vacuum equipment, peripheral devices, vacuum components and materials for the display, semiconductor, electronics, electrics, metals, machinery, automotive, chemical, food and pharmaceutical industries, and for universities and research centers. Research guidance and technical consulting on all aspects of vacuum technology.', 'ディスプレイ・半導体・電子・電気・金属・機械・自動車・化学・食品・医薬品業界及び大学・研究所向け真空装置、周辺機器、真空コンポーネント、材料の開発・製造・販売・カスタマーサポ−ト及び諸機械の輸出入。<br>また、真空技術全般に関する研究指導・技術顧問。'),
            ('<p class="company-profile-label">Principal Shareholders</p>', '<p class="company-profile-label">大株主</p>'),
            ('The Master Trust Bank of Japan, Ltd. (Trust Account)<br>\nNippon Life Insurance Company<br>\nBBH (LUX) FOR FIDELITY FUNDS-GLOBAL TECHNOLOGY POOL<br>\nCustody Bank of Japan, Ltd. (Trust Account)<br>\nSTATE STREET BANK AND TRUST COMPANY 505227<br>\nJPMorgan Securities Japan Co., Ltd.<br>\nBNYM AS AGT/CLTS NON TREATY JASDEC<br>\nBNYM SA/NV FOR BNYM FOR BNYM GCM CLIENT ACCTS M ILM FE<br>\nSTATE STREET BANK AND TRUST COMPANY 505038<br>\nBNYM AS AGT/CLTS 10 PERCENT<br>\n(As of June 30, 2025)', '日本マスタートラスト信託銀行株式会社（信託口）<br>\n日本生命保険相互会社<br>\nBBH (LUX) FOR FIDELITY FUNDS-GLOBAL TECHNOLOGY POOL<br>\n株式会社日本カストディ銀行（信託口）<br>\nSTATE STREET BANK AND TRUST COMPANY 505227<br>\nJPモルガン証券株式会社<br>\nBNYM AS AGT/CLTS NON TREATY JASDEC<br>\nBNYM SA/NV FOR BNYM FOR BNYM GCM CLIENT ACCTS M ILM FE<br>\nSTATE STREET BANK AND TRUST COMPANY 505038<br>\nBNYM AS AGT/CLTS 10 PERCENT<br>\n（2025年6月30日現在）'),
            ('<p class="company-profile-label">Banks</p>', '<p class="company-profile-label">取引銀行</p>'),
            ('Mizuho Bank, Ltd.; Sumitomo Mitsui Banking Corporation; Nippon Life Insurance Company', '株式会社みずほ銀行<br>株式会社三井住友銀行<br>日本生命保険相互会社'),
            ('<h2 class="topMessage animate-on-scroll reveal-pop text-spotlight">Company History</h2>', '<h2 class="topMessage animate-on-scroll reveal-pop text-spotlight">沿革</h2>'),
            ('When ULVAC was founded back in 1952, vacuum technology had not yet entered widespread use in Japan. As a trailblazer, we championed vacuum technology by introducing new technologies to the market and addressing the needs of customers in diverse industries.', '当社は、1952年米国 NRC Equipment Corporation と技術提携を前提とした総代理店契約を結び各種真空装置の輸入販売を目的として創立しました。創立後の主要事項は次のとおりです。'),
            ('<span>Read More</span>', '<span>詳細を見る</span>'),
            ('<h2 class="more-information-title animate-on-scroll reveal-pop text-spotlight">More Information</h2>', '<h2 class="more-information-title animate-on-scroll reveal-pop text-spotlight">関連情報</h2>'),
            ('<p class="more-info-card-title">Management Structure</p>', '<p class="more-info-card-title">役員紹介</p>'),
            ('<p class="more-info-card-title">Organization</p>', '<p class="more-info-card-title">組織図</p>'),
            ('<p class="more-info-card-title">Sustainability</p>', '<p class="more-info-card-title">サステナビリティ</p>'),
            ('<p class="more-info-card-title">Corporate Profile</p>', '<p class="more-info-card-title">会社概要</p>'),
            ('<p class="more-info-card-link-text">View Details</p>', '<p class="more-info-card-link-text">詳細を見る</p>')
        ]

        for old, new in about_replacements:
            content = content.replace(old, new)

    if file == 'business.html':
        business_replacements = [
            ('<title>Our Business | ULVAC Global</title>', '<title>事業領域 | ULVAC Global</title>'),
            ('<meta name="description" content="ULVAC operates across six business areas, including semiconductor and display equipment, industrial systems, components, materials, and surface analysis.">', '<meta name="description" content="半導体・ディスプレイ製造装置をはじめ、一般産業用装置、コンポーネント、材料、表面分析まで、アルバックの6つの事業領域をご紹介します。">'),
            ('<h1 class="our-business-title animate-on-scroll reveal-pop text-spotlight">Our Business</h1>', '<h1 class="our-business-title animate-on-scroll reveal-pop text-spotlight">事業領域</h1>'),
            (
                'Through its six business segments, ULVAC delivers a diverse portfolio of products and technologies that address the evolving needs of customers and markets across a broad range of industries.',
                'アルバックは、6つの事業領域を通じて、幅広い産業分野のお客様や市場のニーズに応える多彩な製品・技術を提供しています。'
            ),
            ('Semiconductor and Electronic Device Production Equipment', '半導体及び電子部品製造装置'),
            (
                'We provide manufacturing equipment for memory, logic, power semiconductors, MEMS, communication devices, and optical devices, supporting advances in semiconductor and electronic devices that drive next-generation technologies such as generative AI, autonomous driving, and EVs. Through our global network, we deliver cutting-edge solutions that support technological innovation worldwide.',
                '生成AI、自動運転、EVなど、次世代社会を支える半導体・電子デバイスの進化に対応し、メモリ、ロジック、パワー半導体、MEMS、通信・光デバイス向け製造装置を提供しています。最先端技術を支える装置を、グローバルに展開し、タイムリーに提供しています。'
            ),
            ('Display and Energy-Related Production Equipment', 'ディスプレイ・エネルギー関連製造装置'),
            (
                'Leveraging our vacuum technologies, we provide evaporation roll coaters for EV battery component production as well as deposition equipment for manufacturing displays used in smartphones, TVs, and other electronic devices. Our solutions contribute to lightweight design, resource conservation, and enhanced safety while addressing evolving social and environmental challenges.',
                '真空技術を活用し、EVバッテリー部材向け巻取式成膜装置や、スマートフォン・TVなどのディスプレイ製造装置を提供しています。軽量化、省資源化、安全性向上に貢献し、多様化する社会課題の解決に向けた製造ソリューションを展開しています。'
            ),
            ('Industrial Equipment', '一般産業用装置'),
            (
                'We offer a wide range of industrial equipment, including vacuum melting furnaces, vacuum sintering furnaces, vacuum brazing furnaces, and leak test systems for industries such as metals, automotive, and consumer electronics. We also serve the life sciences sector with solutions such as lyophilizers for pharmaceutical applications, supporting diverse industrial needs worldwide.',
                '金属、自動車、家電など幅広い産業分野に向け、真空溶解炉、真空焼結炉、真空ろう付け炉、リークテスト装置などを提供しています。さらに、医薬品用凍結真空乾燥装置などライフサイエンス分野にも展開し、多彩な産業ニーズに応えています。'
            ),
            ('Components', 'コンポーネント'),
            (
                'We supply a broad range of high-performance vacuum-related products, including vacuum pumps, vacuum gauges, process gas monitors, helium leak detectors, cryopumps, and cryogenic equipment. These value-added solutions support semiconductor and electronic device manufacturing and contribute to the efficiency and reliability of our customers’ production processes.',
                '真空ポンプ、真空計、プロセスガスモニタ、ヘリウムリークディテクタをはじめ、クライオポンプや低温機器など、高機能な真空関連製品をグローバルに提供しています。半導体や電子部品製造を支える高付加価値ソリューションで、お客様の生産現場に貢献します。'
            ),
            ('Materials', '材料'),
            (
                'We develop and manufacture advanced materials, including sputtering targets used in thin-film deposition processes for semiconductors and electronic devices. We also provide high-melting-point reactive metal materials and fabricated components, such as tantalum and niobium, supporting the development and production of advanced devices across a wide range of industries.',
                '半導体・電子部品の成膜プロセスに使用されるスパッタリングターゲットなど、高品質な先端材料を開発・製造しています。さらに、タンタルやニオブなどの高融点活性金属材料や加工部品を提供し、最先端デバイスや多様な産業分野の発展に貢献しています。'
            ),
            ('Surface Analysis and Coating', '表面分析・コーティング'),
            (
                'We develop and provide surface analysis instruments capable of highly precise analysis of surface and interface structures and compositions. Leveraging world-class analytical technologies such as XPS, AES, and SIMS, we support research and development, quality control, and failure analysis. We also supply mask blanks, an essential material for semiconductor and flat panel display manufacturing.',
                '表面・界面の微細構造や組成を高精度に解析する表面分析装置を開発・提供しています。XPS、AES、SIMSなど世界トップクラスの分析技術で、研究開発や品質管理を支援。また、半導体・フラットパネルディスプレイ製造に不可欠なマスクブランクスも展開しています。'
            ),
            ('<span class="our-business-button-text">View Details</span>', '<span class="our-business-button-text">詳細を見る</span>'),
            ('<span class="our-business-button-text">Surface analysis</span>', '<span class="our-business-button-text">表面分析</span>'),
            ('<span class="our-business-button-text"> Coating</span>', '<span class="our-business-button-text">コーティング</span>'),
            ('href="https://www.ulvac.co.jp/en/business/display_energy_production_equipment/"', 'href="https://www.ulvac.co.jp/business/display_energy_production_equipment/"'),
            ('href="https://www.ulvac.co.jp/en/business/industrial_equipment/"', 'href="https://www.ulvac.co.jp/business/industrial_equipment/"'),
            ('href="https://www.ulvac.co.jp/en/business/components/"', 'href="https://www.ulvac.co.jp/business/components/"'),
            ('href="https://www.ulvac.co.jp/en/business/materials/"', 'href="https://www.ulvac.co.jp/business/materials/"'),
            ('href="https://www.ulvac-phi.com/en/"', 'href="https://www.ulvac-phi.com/"'),
            ('href="https://www.ulcoat.co.jp/en/"', 'href="https://www.ulcoat.co.jp/"')
        ]

        for old, new in business_replacements:
            content = content.replace(old, new)

        semiconductor_single_button = '''                <a href="#" target="_blank" rel="noopener noreferrer" class="our-business-button">
                  <span class="our-business-button-text">詳細を見る</span>
                  <span class="our-business-button-icon-wrap">
                    <img src="../assets/images/our_business_button_icon_blue.svg" alt="" class="our-business-button-icon our-business-button-icon--default">
                    <img src="../assets/images/icon_chevron_right_white.svg" alt="" class="our-business-button-icon our-business-button-icon--hover">
                  </span>
                </a>'''
        semiconductor_button_group = '''                <div class="our-business-button-group">
                  <a href="https://www.ulvac.co.jp/business/semiconductor_production_equipment/" target="_blank" rel="noopener noreferrer" class="our-business-button">
                    <span class="our-business-button-text">半導体製造装置</span>
                    <span class="our-business-button-icon-wrap">
                      <img src="../assets/images/our_business_button_icon_blue.svg" alt="" class="our-business-button-icon our-business-button-icon--default">
                      <img src="../assets/images/icon_chevron_right_white.svg" alt="" class="our-business-button-icon our-business-button-icon--hover">
                    </span>
                  </a>
                  <a href="https://www.ulvac.co.jp/business/electronic_device_production_equipment/" target="_blank" rel="noopener noreferrer" class="our-business-button">
                    <span class="our-business-button-text">電子部品製造装置</span>
                    <span class="our-business-button-icon-wrap">
                      <img src="../assets/images/our_business_button_icon_blue.svg" alt="" class="our-business-button-icon our-business-button-icon--default">
                      <img src="../assets/images/icon_chevron_right_white.svg" alt="" class="our-business-button-icon our-business-button-icon--hover">
                    </span>
                  </a>
                </div>'''
        content = content.replace(semiconductor_single_button, semiconductor_button_group, 1)

    if file == 'research-development.html':
        rnd_replacements = [
            ('<title>Research & Development | ULVAC Global</title>', '<title>研究・開発 | ULVAC Global</title>'),
            ('<meta name="description" content="Discover how ULVAC drives innovation through vacuum technology, with focused R&amp;D in semiconductors, core vacuum technologies, and global co-creation.">', '<meta name="description" content="半導体、コア技術となる真空技術、グローバルな共創を軸に、アルバックが真空技術で切り拓く研究開発の取り組みをご紹介します。">'),
            ('<h1 class="rnd-title animate-on-scroll reveal-pop text-spotlight">Research &amp; Development</h1>', '<h1 class="rnd-title animate-on-scroll reveal-pop text-spotlight">研究・開発</h1>'),
            ('Driving Innovation and Co-Creation with Vacuum Technology at Our Core', '真空技術をコアとしたイノベーションの創出・共創の推進'),
            (
                'We have long provided products and materials based on vacuum technology that is essential to a wide range of industries. With our integrated group-wide development organization, we create high value-added products and technologies through innovative and advanced R&D to meet the speed requirements of overseas device manufacturers and to satisfy the explicit and latent needs of our customers.',
                '当社は、さまざまな産業に不可欠な真空技術を基盤とした製品や材料を提供してきました。グループ一体となった開発体制のもと、革新的かつ先進的な技術開発を通じて、海外のデバイスメーカーが求めるスピードに応え、お客様の顕在的・潜在的なニーズを満たす高付加価値な製品・技術を創出しています。'
            ),
            ('Accelerating Focus on Semiconductors & Electronic Devices ', '半導体・電子デバイス分野への注力加速'),
            (
                'We are strengthening technological capabilities in logic, memory, and advanced packaging—expanding our Metal Hard Mask (MHM) process for advanced logic and entering new process steps for DRAM and 3D NAND flash memory. Additionally, in the advanced packaging field, which contributes to energy efficiency and where higher device density and performance improvements are accelerating, we are enhancing our deposition and processing technologies, while introducing ENTRON-EXX as a next-generation semiconductor manufacturing system.　　',
                'ULVACは、ロジック、メモリ、先端パッケージングなどの半導体分野における技術強化に注力しています。ロジックでは、最先端ロジック分野で培ったMetal Hard Mask工程の実績を基に、他工程への展開や成膜プロセスの性能向上に取り組んでいます。また、メモリの微細化や高積層化の進展に対応し、DRAMおよび3D NANDフラッシュメモリ向けの新たな工程参入を目指して、装置および成膜プロセスの開発を加速しています。さらに、省エネルギー社会の実現に貢献する先端パッケージング分野では、デバイスの高密度化・高性能化が加速する中、成膜・加工技術の強化を進めています。'
            ),
            ('Advancement & Exploration of Core Vacuum Technologies', 'コア真空技術の深化と新領域の探索'),
            (
                "Led by the Institute of Advanced Technology, we enhance equipment functionality, reliability, and productivity to support next-generation manufacturing processes. Simultaneously, we actively explore promising next-generation fields. These include lithium metal anode production technology under NEDO's Green Innovation (GI) Fund and advanced dilution refrigerator systems for quantum computing under the JST Moonshot Program.",
                'アルバックグループは、持続可能な社会を実現するために、コア技術である真空技術の深化と探索を目指した研究開発を進めています。成長戦略を実現するため、真空技術をより深める研究開発を担う先進技術研究所と、 次世代技術として期待されるテーマや真空技術の新たな貢献分野を探索する未来技術研究所が、それぞれの役割を担い、研究開発を進めています。'
            ),
            ('Global Co-Creation & Intellectual Property Governance', 'グローバルな技術共創と知財ガバナンス'),
            (
                'We actively participate in advanced R&D programs such as imec and the "US-JOINT" consortium and explore new vacuum applications through close customer collaboration at global technology centers, including the Technology Center in Pyeongtaek, Korea. We also foster collaborative partnerships with top-tier domestic universities such as Institute of Science Tokyo and Osaka University, while implementing open-close strategies based on IP landscapes and backcasting-driven IP planning.',
                '先端半導体製造の高度化が進む中で、お客様との緊密な共同開発がこれまで以上に重要になっています。アルバックは、グローバルな技術拠点を活用したお客様との共創を推進するとともに、Technology Center PYEONGTAEK（韓国）などにおける開発体制の強化や、imec等の研究開発プログラムや「US-JOINT」といったコンソーシアムへの参画を通じて、新たな技術価値の創出とグローバルな技術発展に貢献しています。'
            ),
            ('<p class="rnd-stat-label">R&amp;D bases</p>', '<p class="rnd-stat-label">研究開発拠点</p>'),
            ('<p class="rnd-stat-value stat-value">9</p>', '<p class="rnd-stat-value stat-value">9施設</p>'),
            ('<p class="rnd-stat-label">Patents held</p>', '<p class="rnd-stat-label">特許保有件数</p>'),
            ('<p class="rnd-stat-value stat-value">4,099</p>', '<p class="rnd-stat-value stat-value">4,099件</p>'),
            ('<p class="rnd-stat-label">R&amp;D investment</p>', '<p class="rnd-stat-label">研究開発設備投資及び研究開発費総額</p>'),
            ('<p class="rnd-stat-value stat-value">&#165;22.8B</p>', '<p class="rnd-stat-value stat-value">228億円</p>'),
            ('<p class="rnd-banner-note">*As of June 30, 2025</p>', '<p class="rnd-banner-note">※2025年6月30日現在</p>'),
            ('href="https://www.ulvac.co.jp/en/research_development/"', 'href="https://www.ulvac.co.jp/research_development/"'),
            ('<span class="rnd-banner-button-text">Learn more about R&amp;D</span>', '<span class="rnd-banner-button-text">研究・開発について詳しくみる</span>')
        ]

        for old, new in rnd_replacements:
            content = content.replace(old, new)

    if file == 'news.html':
        news_replacements = [
            ('<title>News | ULVAC Global</title>', '<title>ニュース | ULVAC Global</title>'),
            ('<meta name="description" content="Read the latest news, announcements, and corporate and technology updates from ULVAC and the ULVAC Group.">', '<meta name="description" content="アルバックおよびアルバックグループの最新ニュース、お知らせ、企業・技術に関する情報をお届けします。">'),
            ('<h2 class="news-page-section-title animate-on-scroll reveal-pop text-spotlight">Featured News</h2>', '<h2 class="news-page-section-title animate-on-scroll reveal-pop text-spotlight">ニュース</h2>'),
            ('ULVAC Receives the “2025 TSMC Excellent Performance Award”', 'TSMCより「2025 TSMC Excellent Performance Award」を受賞しました'),
            ('<span class="news-tag tag-corporate">Corporate</span>', '<span class="news-tag tag-corporate">コーポレート</span>'),
            ('ULVAC Receives “Best Partner Award” from SK hynix', 'SK hynixより「Best Partner Award」を受賞〜技術力と品質への継続的な挑戦が高評価〜'),
            ('ULVAC Recognized with CDP “Climate Change 2024” and “Water Security 2024” B Score', 'CDP「気候変動2024」「水セキュリティ2024」で「B」スコアに認定されました'),
            ('<span class="news-tag tag-sustainability">Sustainability </span>', '<span class="news-tag tag-sustainability">サステナビリティ</span>'),
            ('<h2 class="latest-news-title animate-on-scroll reveal-pop text-spotlight">Latest News</h2>', '<h2 class="latest-news-title animate-on-scroll reveal-pop text-spotlight">最新ニュース</h2>'),
            ('<span class="latest-news-tag latest-news-tag--technology">Corporate</span>', '<span class="latest-news-tag latest-news-tag--technology">コーポレート</span>'),
            ('<span class="latest-news-tag latest-news-tag--corporate">Corporate</span>', '<span class="latest-news-tag latest-news-tag--corporate">コーポレート</span>'),
            ('<span class="latest-news-tag latest-news-tag--technology">Technology</span>', '<span class="latest-news-tag latest-news-tag--technology">テクノロジー</span>'),
            ('USA-Japan Semiconductor Packaging Consortium “US‑JOINT” Begins Operations in Silicon Valley', '日米企業による次世代半導体パッケージ開発・コンソーシアム「US-JOINT」本格稼働'),
            (
                'Union City, California―April 20, 2026―ULVAC, Inc. announced that US‑JOINT, a consortium comprising 12 Japanese and U.S. materials and equipment companies, has commenced full‑scale operations with the aim of establishing a new technology development model in the field of next‑generation semiconductor packaging.',
                '株式会社アルバックは、次世代半導体パッケージ分野における新たな技術開発モデルの構築を目指し、日米の材料・装置メーカーなど12社が参画するコンソーシアム「US-JOINT」が本格稼働を開始したことをお知らせします。'
            ),
            ('ULVAC Establishes Japan-Based Production for Rare-Earth Magnet Vacuum Melting Furnaces', 'アルバック、レアアース磁石向け真空溶解炉の国内生産体制を構築 ～欧米を中心に受注が前期比約3倍に拡大見込み～'),
            (
                'ULVAC, Inc. anticipates that orders for its continuous vacuum melting furnaces dedicated to rare-earth magnets will approximately triple year on year, driven primarily by magnet manufacturers in Europe and North America.',
                '株式会社アルバックのレアアース磁石向け連続式真空溶解炉の受注が、欧米の磁石メーカーを中心に前期比約3倍に拡大する見通しです。'
            ),
            ('Presentation at the 2026 IEEE 76th Electronic Components and Technology Conference (ECTC2026)', 'IEEE-ECTC2026にてドライフィルムと微細ビアエッチング工程を用いた低反り多層RDL技術について発表します'),
            ('ULVAC, Inc. has been participating since 2022 in the Chiplet Integration Platform Consortium at Institute of Science Tokyo.', '株式会社アルバックは、2022年より参画している東京科学大学チップレット集積プラットフォームコンソーシアムを通じて、'),
            ('Through this consortium, ULVAC will present its low-warpage multilayer RDL technology using dry film and fine via etching processes at the 2026 IEEE 76th Electronic Components and Technology Conference (ECTC 2026), the world\'s largest conference on semiconductor packaging.', '世界最大規模の半導体実装学会である「The 2026 IEEE 76th Electronic Components and Technology Conference（ECTC 2026）」において、ドライフィルムと微細ビアエッチング工程を用いた低反り多層RDL技術に関する発表を行います。'),
            ('ULVAC Group Receives Three Awards Including the Grand Prize at the 2025 JVIA Awards', '2025年度JVIA表彰にて大賞を含む3賞を受賞'),
            (
                'The ULVAC Group received three awards at the 2025 Awards presented by the Japan Vacuum Industry Association (JVIA), including the Grand Prize for Vacuum Equipment, a Vacuum Equipment Award, and a Skills and Operations Award.',
                'アルバックグループは、2025年度 一般社団法人日本真空工業会（JVIA）表彰において、真空装置部門2件、技能・業務部門1件の計3件を受賞いたしました。'
            ),
            ('<span>Read More</span>', '<span>詳細を見る</span>'),
            ('<span>View All News</span>', '<span>全てのニュースを見る</span>')
        ]

        for old, new in news_replacements:
            content = content.replace(old, new)

    if file == 'investor-relations.html':
        ir_replacements = [
            ('<title>Investor Relations | ULVAC Global</title>', '<title>株主・投資家情報 | ULVAC Global</title>'),
            ('<meta name="description" content="Access ULVAC’s investor information, including financial results, annual reports, stock information, corporate governance, and IR events.">', '<meta name="description" content="決算情報、アニュアルレポート、株式情報、コーポレート・ガバナンス、IRイベントなど、アルバックの投資家向け情報をご覧いただけます。">'),
            ('<h1 class="ir-information-title animate-on-scroll reveal-pop text-spotlight">Investor Information</h1>', '<h1 class="ir-information-title animate-on-scroll reveal-pop text-spotlight">株主・投資家情報</h1>'),
            (
                "A summary of ULVAC's investor information. For full details, visit the IR site below.",
                'アルバックの株主・投資家向け情報の概要です。詳しくはIRサイトをご覧ください。'
            ),
            ('<p class="more-info-card-title">Financial Results</p>', '<p class="more-info-card-title">決算短信</p>'),
            ('<p class="more-info-card-title">Integrated Report</p>', '<p class="more-info-card-title">統合レポート</p>'),
            ('<p class="more-info-card-title">Fact Sheet</p>', '<p class="more-info-card-title">ファクトシート</p>'),
            ('<p class="more-info-card-title">Stock Information</p>', '<p class="more-info-card-title">株主・株式情報</p>'),
            ('<p class="more-info-card-title">Corporate Governance</p>', '<p class="more-info-card-title">コーポレート・ガバナンス</p>'),
            ('<p class="more-info-card-title">IR Events</p>', '<p class="more-info-card-title">IRイベント</p>'),
            ('<p class="more-info-card-link-text">View Details</p>', '<p class="more-info-card-link-text">詳細をみる</p>'),
            ('<p class="more-info-card-title">ULVAC Investor Relations Site</p>', '<p class="more-info-card-title">アルバックIRサイトへ</p>'),
            ('<p class="more-info-card-link-text"> View Full Site</p>', '<p class="more-info-card-link-text">詳細はこちら</p>'),
            ('href="https://www.ulvac.co.jp/en/sustainability/report/"', 'href="https://www.ulvac.co.jp/sustainability/report/"'),
            ('href="https://ir.ulvac.co.jp/en/ir/library/factsheets.html"', 'href="https://ir.ulvac.co.jp/ja/ir/library/factsheets.html"'),
            ('href="https://ir.ulvac.co.jp/en/ir/stock.html"', 'href="https://ir.ulvac.co.jp/ja/ir/stock.html"'),
            ('href="https://www.ulvac.co.jp/en/sustainability/corporate_governance/"', 'href="https://www.ulvac.co.jp/sustainability/corporate_governance/"'),
            ('href="https://ir.ulvac.co.jp/en/"', 'href="https://ir.ulvac.co.jp/ja/ir.html"')
        ]

        for old, new in ir_replacements:
            content = content.replace(old, new)

    if file == 'contact.html':
        contact_replacements = [
            ('<title>Contact | ULVAC Global</title>', '<title>お問い合わせ | ULVAC Global</title>'),
            ('<meta name="description" content="Contact ULVAC for investor relations inquiries or general questions about products, business partnerships, and other matters.">', '<meta name="description" content="投資家向けのお問い合わせのほか、製品、事業提携、その他のご質問について、アルバックへお問い合わせいただけます。">'),
            ('<h1 class="contact-title animate-on-scroll reveal-pop text-spotlight">Contact Us</h1>', '<h1 class="contact-title animate-on-scroll reveal-pop text-spotlight">お問い合わせ</h1>'),
            ('For Our Investors', '投資家の皆様へ'),
            ('<h2 class="contact-card__title">Investor Relations</h2>', '<h2 class="contact-card__title">IR・投資家情報</h2>'),
            (
                'Stock information, financial results, IR events, and other investor inquiries',
                '株式情報、決算情報、IRイベント、その他投資家の皆様からのお問い合わせ'
            ),
            ('<p class="contact-card__cta-text">Contact IR</p>', '<p class="contact-card__cta-text">IRに関するお問い合わせ</p>'),
            ('General', '全般'),
            ('Products and Other Inquiries', '製品・その他のお問い合わせ'),
            (
                'Products, business partnerships, corporate information, media, and all other inquiries',
                '製品、業務提携、会社情報、メディア、その他すべてのお問い合わせ'
            ),
            ('<p class="contact-card__cta-text">Contact ULVAC</p>', '<p class="contact-card__cta-text">アルバックへのお問い合わせ</p>'),
            ('href="https://www.ulvac.co.jp/en/contact/"', 'href="https://www.ulvac.co.jp/contact/"')
        ]

        for old, new in contact_replacements:
            content = content.replace(old, new)

    if file == 'group-companies.html':
        group_replacements = [
            ('<title>Group Companies | ULVAC Global</title>', '<title>グループ会社 | ULVAC Global</title>'),
            ('<meta name="description" content="Explore the ULVAC Group’s companies across Japan, China, Korea, Taiwan, the USA, Europe, and Southeast Asia, delivering vacuum technology worldwide.">', '<meta name="description" content="日本、中国、韓国、台湾、米国、欧州、東南アジアに広がるアルバックグループの各社をご紹介します。真空技術を世界へ届けています。">'),
            ('<h1 class="group-companies-title animate-on-scroll reveal-pop text-spotlight">Group Companies</h1>', '<h1 class="group-companies-title animate-on-scroll reveal-pop text-spotlight">グループ会社</h1>'),
            ('<h3 class="bases-info-card__title">Japan</h3>', '<h3 class="bases-info-card__title">日本</h3>'),
            ('<h3 class="bases-info-card__title">USA</h3>', '<h3 class="bases-info-card__title">アメリカ</h3>'),
            ('<li><span>Sales &amp; Service:</span> <strong>35</strong></li>', '<li><span>販売・サービス:</span> <strong>35</strong></li>'),
            ('<li><span>R&amp;D:</span> <strong>4</strong></li>', '<li><span>研究開発:</span> <strong>4</strong></li>'),
            ('<li><span>Manufacturing:</span> <strong>11</strong></li>', '<li><span>生産:</span> <strong>11</strong></li>'),
            ('<li><span>Sales &amp; Service:</span> <strong>1</strong></li>', '<li><span>販売・サービス:</span> <strong>1</strong></li>'),
            ('<a href="#group-japan" class="group-region-nav__link is-active">Japan</a>', '<a href="#group-japan" class="group-region-nav__link is-active">日本</a>'),
            ('<a href="#group-china" class="group-region-nav__link">China</a>', '<a href="#group-china" class="group-region-nav__link">中国</a>'),
            ('<a href="#group-korea" class="group-region-nav__link">Korea</a>', '<a href="#group-korea" class="group-region-nav__link">韓国</a>'),
            ('<a href="#group-taiwan" class="group-region-nav__link">Taiwan</a>', '<a href="#group-taiwan" class="group-region-nav__link">台湾</a>'),
            ('<a href="#group-usa" class="group-region-nav__link">USA</a>', '<a href="#group-usa" class="group-region-nav__link">アメリカ</a>'),
            ('<a href="#group-europe" class="group-region-nav__link">Europe</a>', '<a href="#group-europe" class="group-region-nav__link">ヨーロッパ</a>'),
            ('<a href="#group-southeast-asia" class="group-region-nav__link">Southeast Asia</a>', '<a href="#group-southeast-asia" class="group-region-nav__link">東南アジア</a>'),
            ('<span class="group-region-title">Japan</span>', '<span class="group-region-title">日本</span>'),
            ('<span class="group-region-title">China</span>', '<span class="group-region-title">中国</span>'),
            ('<span class="group-region-title">Korea</span>', '<span class="group-region-title">韓国</span>'),
            ('<span class="group-region-title">Taiwan</span>', '<span class="group-region-title">台湾</span>'),
            ('<span class="group-region-title">USA</span>', '<span class="group-region-title">アメリカ</span>'),
            ('<span class="group-region-title">Europe</span>', '<span class="group-region-title">ヨーロッパ</span>'),
            ('<span class="group-region-title">Southeast Asia</span>', '<span class="group-region-title">東南アジア</span>'),
            ('<a href="https://www.ulvac.co.jp/en" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC, Inc.</span><span class="group-company-location">Kanagawa</span></a>', '<a href="https://www.ulvac.co.jp/en" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">株式会社アルバック</span><span class="group-company-location">神奈川</span></a>'),
            ('<a href="https://www.ulvac-techno.co.jp/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC TECHNO, Ltd.</span><span class="group-company-location">Kanagawa</span></a>', '<a href="https://www.ulvac-techno.co.jp/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">アルバックテクノ株式会社</span><span class="group-company-location">神奈川</span></a>'),
            ('<a href="http://www.ulvac-kiko.com/en" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC KIKO, Inc.</span><span class="group-company-location">Miyazaki</span></a>', '<a href="http://www.ulvac-kiko.com/en" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">アルバック機工株式会社</span><span class="group-company-location">宮崎</span></a>'),
            ('<a href="http://www.ulvac-es.co.jp/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC EQUIPMENT SALES, Inc.</span><span class="group-company-location">Tokyo</span></a>', '<a href="http://www.ulvac-es.co.jp/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">アルバック販売株式会社</span><span class="group-company-location">東京</span></a>'),
            ('<a href="http://www.ulvac-cryo.com/english" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC CRYOGENICS INCORPORATED</span><span class="group-company-location">Kanagawa</span></a>', '<a href="http://www.ulvac-cryo.com/english" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">アルバック・クライオ株式会社</span><span class="group-company-location">神奈川</span></a>'),
            ('<a href="https://www.ulvac-phi.com/en/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC-PHI, Inc.</span><span class="group-company-location">Kanagawa</span></a>', '<a href="https://www.ulvac-phi.com/en/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">アルバック・ファイ株式会社</span><span class="group-company-location">神奈川</span></a>'),
            ('<a href="http://www.ulcoat.co.jp/en/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC COATING CORPORATION</span><span class="group-company-location">Saitama</span></a>', '<a href="http://www.ulcoat.co.jp/en/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">アルバック成膜株式会社</span><span class="group-company-location">埼玉</span></a>'),
            ('<div class="group-company-row group-company-row--disabled"><span class="group-company-name">NISSIN SEIGYO Co., LTD.</span><span class="group-company-location">Kanagawa</span></div>', '<div class="group-company-row group-company-row--disabled"><span class="group-company-name">日真制御株式会社</span><span class="group-company-location">神奈川</span></div>'),
            ('<div class="group-company-row group-company-row--disabled"><span class="group-company-name">FINE SURFACE TECHNOLOGY CO., LTD.</span><span class="group-company-location">Saitama</span></div>', '<div class="group-company-row group-company-row--disabled"><span class="group-company-name">株式会社ファインサーフェス技術</span><span class="group-company-location">埼玉</span></div>'),
            ('<a href="http://www.showashinku.co.jp/corp_e" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">SHOWA SHINKU CO., LTD.</span><span class="group-company-location">Kanagawa</span></a>', '<a href="http://www.showashinku.co.jp/corp_e" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">株式会社昭和真空</span><span class="group-company-location">神奈川</span></a>'),
            ('<a href="http://www.ulvac-china.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (CHINA) HOLDING CO., LTD.</span><span class="group-company-location">Shanghai</span></a>', '<a href="http://www.ulvac-china.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (CHINA) HOLDING CO., LTD.<br>愛発科（中国）投資有限公司</span><span class="group-company-location">上海</span></a>'),
            ('<a href="http://www.ulvac.com.cn/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (NINGBO) CO., LTD.</span><span class="group-company-location">Ningbo</span></a>', '<a href="http://www.ulvac.com.cn/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (NINGBO) CO., LTD.<br>寧波愛発科真空技術有限公司</span><span class="group-company-location">寧波</span></a>'),
            ('<a href="http://www.ulvac-suzhou.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (SUZHOU) CO., LTD.</span><span class="group-company-location">Suzhou</span></a>', '<a href="http://www.ulvac-suzhou.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (SUZHOU) CO., LTD.<br>愛発科真空技術（蘇州）有限公司</span><span class="group-company-location">蘇州</span></a>'),
            ('<a href="https://www.ulvac-cdoi.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC Orient (Chengdu) Co., Ltd.</span><span class="group-company-location">Chengdu</span></a>', '<a href="https://www.ulvac-cdoi.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC Orient (Chengdu) Co., Ltd.<br>愛発科東方真空（成都）有限公司</span><span class="group-company-location">成都</span></a>'),
            ('<a href="https://www.ulvac-cdoi.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC ORIENT TEST AND MEASUREMENT TECHNOLOGY (CHENGDU) CO., LTD.</span><span class="group-company-location">Chengdu</span></a>', '<a href="https://www.ulvac-cdoi.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC ORIENT TEST AND MEASUREMENT TECHNOLOGY (CHENGDU) CO., LTD.<br>愛発科東方検測技術（成都）有限公司</span><span class="group-company-location">成都</span></a>'),
            ('<a href="http://www.ulvac-auto.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC Automation Technology (Shanghai) Corporation</span><span class="group-company-location">Shanghai</span></a>', '<a href="http://www.ulvac-auto.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC Automation Technology (Shanghai) Corporation<br>愛発科自動化科技（上海）有限公司</span><span class="group-company-location">上海</span></a>'),
            ('<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC Tianma Electric (Jingjiang) Co., Ltd.</span><span class="group-company-location">Jingjiang</span></div>', '<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC Tianma Electric (Jingjiang) Co., Ltd.<br>愛発科天馬電機（靖江）有限公司</span><span class="group-company-location">靖江</span></div>'),
            ('<a href="https://www.ulvac-usy.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (Shenyang) Co., Ltd.</span><span class="group-company-location">Shenyang</span></a>', '<a href="https://www.ulvac-usy.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (Shenyang) Co., Ltd.<br>愛発科真空技術（沈陽）有限公司</span><span class="group-company-location">沈陽</span></a>'),
            ('<a href="http://www.ulvac-shanghai.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (Shanghai) Trading Co., Ltd.</span><span class="group-company-location">Shanghai</span></a>', '<a href="http://www.ulvac-shanghai.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (Shanghai) Trading Co., Ltd.<br>愛発科商貿（上海）有限公司</span><span class="group-company-location">上海</span></a>'),
            ('<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC CRYOGENICS (NINGBO) INCORPORATED</span><span class="group-company-location">Ningbo</span></div>', '<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC CRYOGENICS (NINGBO) INCORPORATED<br>寧波愛発科低温泵有限公司</span><span class="group-company-location">寧波</span></div>'),
            ('<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC Research Center SUZHOU Co., Ltd.</span><span class="group-company-location">Suzhou</span></div>', '<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC Research Center SUZHOU Co., Ltd.<br>愛発科（蘇州）技術研究開発有限公司</span><span class="group-company-location">蘇州</span></div>'),
            ('<div class="group-company-row group-company-row--disabled"><span class="group-company-name">Hong Kong ULVAC Co., Ltd.</span><span class="group-company-location">Hong Kong</span></div>', '<div class="group-company-row group-company-row--disabled"><span class="group-company-name">Hong Kong ULVAC Co., Ltd.<br>香港真空有限公司</span><span class="group-company-location">香港</span></div>'),
            ('<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC VACUUM EQUIPMENT (SHANGHAI) CO., LTD.</span><span class="group-company-location">Shanghai</span></div>', '<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC VACUUM EQUIPMENT (SHANGHAI) CO., LTD.<br>愛発科真空設備（上海）有限公司</span><span class="group-company-location">上海</span></div>'),
            ('<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC Coating Technology (HEFEI) Co., Ltd.</span><span class="group-company-location">Hefei</span></div>', '<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC Coating Technology (HEFEI) Co., Ltd.<br>愛発科成膜技術(合肥)有限公司</span><span class="group-company-location">合肥</span></div>'),
            ('<a href="http://www.ulvac-upn.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC PHI Instruments Co., Ltd.</span><span class="group-company-location">Nanjing</span></a>', '<a href="http://www.ulvac-upn.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC PHI Instruments Co., Ltd.<br>愛発科費恩斯(南京)儀器有限公司</span><span class="group-company-location">南京</span></a>'),
            ('<a href="http://www.ulvackorea.co.kr/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC KOREA, Ltd.</span><span class="group-company-location">Pyeongtaek</span></a>', '<a href="http://www.ulvackorea.co.kr/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC KOREA, Ltd.</span><span class="group-company-location">平沢</span></a>'),
            ('<a href="http://www.pstechltd.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">Pure Surface Technology, Ltd.</span><span class="group-company-location">Pyeongtaek</span></a>', '<a href="http://www.pstechltd.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">Pure Surface Technology, Ltd.</span><span class="group-company-location">平沢</span></a>'),
            ('<a href="http://www.ulvac-cryo.co.kr/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC CRYOGENICS KOREA INCORPORATED</span><span class="group-company-location">Pyeongtaek</span></a>', '<a href="http://www.ulvac-cryo.co.kr/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC CRYOGENICS KOREA INCORPORATED</span><span class="group-company-location">平沢</span></a>'),
            ('<a href="http://www.ulvac.com.tw/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC TAIWAN INC.</span><span class="group-company-location">Hsinchu</span></a>', '<a href="http://www.ulvac.com.tw/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC TAIWAN INC.<br>優貝克科技股份有限公司</span><span class="group-company-location">新竹</span></a>'),
            ('<a href="http://www.ucpt.com.tw/welcome.shtml" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULTRA CLEAN PRECISION TECHNOLOGIES CORP.</span><span class="group-company-location">Tainan</span></a>', '<a href="http://www.ucpt.com.tw/welcome.shtml" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULTRA CLEAN PRECISION TECHNOLOGIES CORP.<br>超浄精密科技股份有限公司</span><span class="group-company-location">台南</span></a>'),
            ('<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULCOAT TAIWAN, Inc.</span><span class="group-company-location">Tainan</span></div>', '<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULCOAT TAIWAN, Inc.<br>台湾成膜光電股份有限公司</span><span class="group-company-location">台南</span></div>'),
            ('<a href="http://www.ulvac-auto.tw/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC AUTOMATION TAIWAN Inc.</span><span class="group-company-location">New Taipei</span></a>', '<a href="http://www.ulvac-auto.tw/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC AUTOMATION TAIWAN Inc.<br>優貝克自動化股份有限公司</span><span class="group-company-location">新北</span></a>'),
            ('<a href="http://www.usct.com.tw/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC SOFTWARE CREATIVE TECHNOLOGY, CO.,LTD.</span><span class="group-company-location">New Taipei</span></a>', '<a href="http://www.usct.com.tw/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC SOFTWARE CREATIVE TECHNOLOGY, CO.,LTD.<br>優貝克軟体研発股份有限公司</span><span class="group-company-location">新北</span></a>'),
            ('<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC Materials Taiwan, Inc.</span><span class="group-company-location">Taichung</span></div>', '<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC Materials Taiwan, Inc.<br>優貝克材料股份有限公司</span><span class="group-company-location">台中</span></div>'),
            ('<a href="http://www.ulvac.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC Technologies, Inc.</span><span class="group-company-location">Methuen, MA</span></a>', '<a href="http://www.ulvac.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC Technologies, Inc.</span><span class="group-company-location">マサチューセッツ州</span></a>'),
            ('<a href="http://www.phi.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">Physical Electronics USA, Inc.</span><span class="group-company-location">Chanhassen, MN</span></a>', '<a href="http://www.phi.com/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">Physical Electronics USA, Inc.</span><span class="group-company-location">ミネソタ州</span></a>'),
            ('<a href="https://ulvac.eu/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC GmbH</span><span class="group-company-location">Munich, Germany</span></a>', '<a href="https://ulvac.eu/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC GmbH</span><span class="group-company-location">ドイツ・ミュンヘン</span></a>'),
            ('<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC SINGAPORE PTE LTD.</span><span class="group-company-location">Singapore</span></div>', '<div class="group-company-row group-company-row--disabled"><span class="group-company-name">ULVAC SINGAPORE PTE LTD.</span><span class="group-company-location">シンガポール</span></div>'),
            ('<a href="https://www.ulvac.co.th/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (THAILAND) LTD.</span><span class="group-company-location">Samutprakarn, Thailand</span></a>', '<a href="https://www.ulvac.co.th/" target="_blank" rel="noopener noreferrer" class="group-company-row"><span class="group-company-name">ULVAC (THAILAND) LTD．</span><span class="group-company-location">タイ</span></a>')
        ]

        for old, new in group_replacements:
            content = content.replace(old, new)
    
    out_path = os.path.join('jp', file)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print(f"Done copying and updating paths for jp folder: {html_files}")
