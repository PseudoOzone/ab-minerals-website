import fs from 'fs';
import path from 'path';

const newKeys = {
  about: {
    storyEyebrow: {
      en: "Our Story",
      de: "Unsere Geschichte",
      "zh-CN": "我们的故事",
      "zh-TW": "我們的故事",
      ar: "قصتنا"
    },
    heroTitle: {
      en: "About A B Minerals",
      de: "Über A B Minerals",
      "zh-CN": "关于A B Minerals",
      "zh-TW": "關於A B Minerals",
      ar: "عن A B Minerals"
    },
    heroDescription: {
      en: "Trusted manufacturer and quarry owner of premium granite from Odisha. From our exclusive 100-acre Lavender Blue quarry to our state-of-the-art factory in Chamakhandi, we control every step of the granite supply chain — extraction, processing, finishing, and delivery.",
      de: "Vertrauenswürdiger Hersteller und Steinbruchbesitzer von Premium-Granit aus Odisha. Von unserem exklusiven 100-Hektar-Lavender-Blue-Steinbruch bis zu unserer hochmodernen Fabrik in Chamakhandi kontrollieren wir jeden Schritt der Granit-Lieferkette — Gewinnung, Verarbeitung, Veredelung und Lieferung.",
      "zh-CN": "值得信赖的奥迪沙优质花岗岩制造商和采石场主。从我们独有的100英亩薰衣草蓝采石场到位于Chamakhandi的先进工厂，我们控制着花岗岩供应链的每一个环节——开采、加工、精加工和交付。",
      "zh-TW": "值得信賴的奧迪沙優質花崗岩製造商和採石場主。從我們獨有的100英畝薰衣草藍採石場到位於Chamakhandi的先進工廠，我們控制著花崗岩供應鏈的每一個環節——開採、加工、精加工和交付。",
      ar: "مصنّع موثوق ومالك محجر للجرانيت الفاخر من أوديشا. من محجرنا الحصري البالغ مساحته 100 فدان من اللافندر الأزرق إلى مصنعنا المتطور في شاماخاندي، نتحكم في كل خطوة من سلسلة توريد الجرانيت — الاستخراج والمعالجة والتشطيب والتوصيل."
    },
    statYears: {
      en: "Years of Excellence",
      de: "Jahre Exzellenz",
      "zh-CN": "卓越年份",
      "zh-TW": "卓越年份",
      ar: "سنوات التميز"
    },
    statCapacity: {
      en: "{unit}/Month",
      de: "{unit}/Monat",
      "zh-CN": "{unit}/月",
      "zh-TW": "{unit}/月",
      ar: "{unit}/شهر"
    },
    statProjects: {
      en: "Projects Delivered",
      de: "Projekte geliefert",
      "zh-CN": "已交付项目",
      "zh-TW": "已交付項目",
      ar: "مشاريع منجزة"
    },
    statQuarry: {
      en: "Own Quarry (Lavender Blue)",
      de: "Eigener Steinbruch (Lavender Blue)",
      "zh-CN": "自有采石场（薰衣草蓝）",
      "zh-TW": "自有採石場（薰衣草藍）",
      ar: "محجر خاص (لافندر أزرق)"
    },
    our_quarry: {
      en: "Our Quarry",
      de: "Unser Steinbruch",
      "zh-CN": "我们的采石场",
      "zh-TW": "我們的採石場",
      ar: "محجرنا"
    },
    journeyEyebrow: {
      en: "Our Journey",
      de: "Unsere Reise",
      "zh-CN": "我们的历程",
      "zh-TW": "我們的歷程",
      ar: "رحلتنا"
    },
    journeyTitle: {
      en: "Excellence from Source to Site",
      de: "Exzellenz von der Quelle bis zur Baustelle",
      "zh-CN": "从源头到工地的卓越品质",
      "zh-TW": "從源頭到工地的卓越品質",
      ar: "التميز من المصدر إلى الموقع"
    },
    storyParagraph1: {
      en: "Founded with a simple vision — to supply the finest granite directly from our own quarry — A B Minerals has grown into one of Odisha's most trusted granite companies. With over 25 years in the industry, we combine deep geological expertise with modern processing technology.",
      de: "Gegründet mit einer einfachen Vision — feinsten Granit direkt aus unserem eigenen Steinbruch zu liefern — hat sich A B Minerals zu einem der vertrauenswürdigsten Granitunternehmen Odishas entwickelt. Mit über 25 Jahren Branchenerfahrung verbinden wir tiefes geologisches Fachwissen mit moderner Verarbeitungstechnologie.",
      "zh-CN": "A B Minerals成立于一个简单的愿景——直接从自有采石场供应最优质的花岗岩。如今已发展成为奥迪沙最受信赖的花岗岩企业之一。凭借超过25年的行业经验，我们将深厚的地质专业知识与现代加工技术相结合。",
      "zh-TW": "A B Minerals成立於一個簡單的願景——直接從自有採石場供應最優質的花崗岩。如今已發展成為奧迪沙最受信賴的花崗岩企業之一。憑藉超過25年的行業經驗，我們將深厚的地質專業知識與現代加工技術相結合。",
      ar: "تأسست A B Minerals برؤية بسيطة — توريد أجود أنواع الجرانيت مباشرة من محجرنا الخاص. نمت لتصبح واحدة من أكثر شركات الجرانيت موثوقية في أوديشا. مع أكثر من 25 عامًا في الصناعة، نجمع بين الخبرة الجيولوجية العميقة وتكنولوجيا المعالجة الحديثة."
    },
    storyParagraph2: {
      en: "We own and operate a 100-acre Lavender Blue granite quarry in Berhampur, Odisha — giving us complete control over extraction, quality, and pricing. This vertical integration means no middlemen, no markup, and consistent supply for projects of any scale.",
      de: "Wir besitzen und betreiben einen 100-Hektar-Lavender-Blue-Granitsteinbruch in Berhampur, Odisha — was uns vollständige Kontrolle über Gewinnung, Qualität und Preisgestaltung gibt. Diese vertikale Integration bedeutet keine Zwischenhändler, keinen Aufschlag und eine konsistente Versorgung für Projekte jeder Größe.",
      "zh-CN": "我们在奥迪沙贝兰布尔拥有并运营一个100英亩的薰衣草蓝花岗岩采石场——这使我们能够完全控制开采、质量和定价。这种垂直整合意味着没有中间商、没有加价，为任何规模的项目提供稳定供应。",
      "zh-TW": "我們在奧迪沙貝蘭布爾擁有並運營一個100英畝的薰衣草藍花崗岩採石場——這使我們能夠完全控制開採、品質和定價。這種垂直整合意味著沒有中間商、沒有加價，為任何規模的項目提供穩定供應。",
      ar: "نملك ونشغل محجر جرانيت لافندر أزرق بمساحة 100 فدان في بيرهامبور، أوديشا — مما يمنحنا سيطرة كاملة على الاستخراج والجودة والتسعير. هذا التكامل الرأسي يعني عدم وجود وسطاء أو هامش ربح إضافي، وتوريد مستمر للمشاريع بأي حجم."
    },
    storyParagraph3: {
      en: "Our state-of-the-art factory in Chamakhandi processes over 250,000 sqft of granite monthly. Equipped with gang saws, multi-cutters, and 12-head line polishers, we deliver factory-finished slabs, tiles, and custom cuts to projects across India and international markets.",
      de: "Unsere hochmoderne Fabrik in Chamakhandi verarbeitet monatlich über 250.000 Quadratfuß Granit. Ausgestattet mit Gattersägen, Multi-Cuttern und 12-Kopf-Poliermaschinen liefern wir werksfertige Platten, Fliesen und Sonderzuschnitte an Projekte in ganz Indien und auf internationalen Märkten.",
      "zh-CN": "我们位于Chamakhandi的先进工厂每月加工超过250,000平方英尺的花岗岩。配备框架锯、多刀切割机和12头抛光线，我们为印度及国际市场的项目提供工厂精加工的板材、瓷砖和定制切割。",
      "zh-TW": "我們位於Chamakhandi的先進工廠每月加工超過250,000平方英尺的花崗岩。配備框架鋸、多刀切割機和12頭拋光線，我們為印度及國際市場的項目提供工廠精加工的板材、瓷磚和定制切割。",
      ar: "يعالج مصنعنا المتطور في شاماخاندي أكثر من 250,000 قدم مربع من الجرانيت شهريًا. مجهز بمناشير إطارية وقواطع متعددة وخطوط تلميع بـ12 رأسًا، نقدم ألواحًا وبلاطات وقطعًا مخصصة جاهزة للمشاريع في جميع أنحاء الهند والأسواق الدولية."
    },
    leadershipEyebrow: {
      en: "Leadership",
      de: "Führung",
      "zh-CN": "领导团队",
      "zh-TW": "領導團隊",
      ar: "القيادة"
    },
    leadershipTitle: {
      en: "The Team Behind the Stone",
      de: "Das Team hinter dem Stein",
      "zh-CN": "石材背后的团队",
      "zh-TW": "石材背後的團隊",
      ar: "الفريق وراء الحجر"
    },
    leadershipDescription: {
      en: "Meet the visionaries driving A B Minerals' commitment to excellence.",
      de: "Lernen Sie die Visionäre kennen, die A B Minerals' Engagement für Exzellenz vorantreiben.",
      "zh-CN": "认识推动A B Minerals追求卓越的远见者。",
      "zh-TW": "認識推動A B Minerals追求卓越的遠見者。",
      ar: "تعرّف على أصحاب الرؤية الذين يقودون التزام A B Minerals بالتميز."
    },
    valuesEyebrow: {
      en: "Our Values",
      de: "Unsere Werte",
      "zh-CN": "我们的价值观",
      "zh-TW": "我們的價值觀",
      ar: "قيمنا"
    },
    valuesTitle: {
      en: "What We Stand For",
      de: "Wofür wir stehen",
      "zh-CN": "我们的信念",
      "zh-TW": "我們的信念",
      ar: "ما نمثله"
    },
    valueQualityTitle: {
      en: "Quality First",
      de: "Qualität zuerst",
      "zh-CN": "品质至上",
      "zh-TW": "品質至上",
      ar: "الجودة أولاً"
    },
    valueQualityDesc: {
      en: "Every slab is inspected for colour consistency, structural integrity, and finish quality before leaving our factory.",
      de: "Jede Platte wird vor dem Verlassen unserer Fabrik auf Farbkonsistenz, strukturelle Integrität und Oberflächenqualität geprüft.",
      "zh-CN": "每块板材在离开工厂前都经过颜色一致性、结构完整性和表面质量检查。",
      "zh-TW": "每塊板材在離開工廠前都經過顏色一致性、結構完整性和表面品質檢查。",
      ar: "يتم فحص كل لوح من حيث تناسق اللون والسلامة الهيكلية وجودة التشطيب قبل مغادرة مصنعنا."
    },
    valuePanIndiaTitle: {
      en: "Pan-India Reach",
      de: "Ganz-Indien-Reichweite",
      "zh-CN": "覆盖全印度",
      "zh-TW": "覆蓋全印度",
      ar: "تغطية عموم الهند"
    },
    valuePanIndiaDesc: {
      en: "Efficient logistics network delivering to project sites across India and international export markets.",
      de: "Effizientes Logistiknetzwerk für Lieferungen an Projektstandorte in ganz Indien und internationale Exportmärkte.",
      "zh-CN": "高效的物流网络，可向印度各地的项目现场和国际出口市场交付。",
      "zh-TW": "高效的物流網絡，可向印度各地的項目現場和國際出口市場交付。",
      ar: "شبكة لوجستية فعالة تقوم بالتوصيل إلى مواقع المشاريع في جميع أنحاء الهند وأسواق التصدير الدولية."
    },
    valueDeliveryTitle: {
      en: "On-Time Delivery",
      de: "Pünktliche Lieferung",
      "zh-CN": "准时交付",
      "zh-TW": "準時交付",
      ar: "التسليم في الموعد"
    },
    valueDeliveryDesc: {
      en: "Reliable scheduling and dispatch — because your project timeline depends on our commitment.",
      de: "Zuverlässige Planung und Versand — denn Ihr Projektzeitplan hängt von unserem Engagement ab.",
      "zh-CN": "可靠的排程和调度——因为您的项目时间表取决于我们的承诺。",
      "zh-TW": "可靠的排程和調度——因為您的項目時間表取決於我們的承諾。",
      ar: "جدولة موثوقة وإرسال منتظم — لأن جدول مشروعك يعتمد على التزامنا."
    },
    qaEyebrow: {
      en: "Quality Assurance",
      de: "Qualitätssicherung",
      "zh-CN": "质量保证",
      "zh-TW": "品質保證",
      ar: "ضمان الجودة"
    },
    qaTitle: {
      en: "Certified Excellence",
      de: "Zertifizierte Exzellenz",
      "zh-CN": "认证卓越",
      "zh-TW": "認證卓越",
      ar: "تميز معتمد"
    },
    qaDescription: {
      en: "Our granite meets the highest industry standards, verified by independent laboratory testing.",
      de: "Unser Granit erfüllt die höchsten Industriestandards, bestätigt durch unabhängige Laborprüfungen.",
      "zh-CN": "我们的花岗岩达到最高行业标准，经独立实验室测试验证。",
      "zh-TW": "我們的花崗岩達到最高行業標準，經獨立實驗室測試驗證。",
      ar: "يلبي الجرانيت الخاص بنا أعلى معايير الصناعة، تم التحقق منه من خلال اختبارات مختبرية مستقلة."
    },
    qaCertTitle: {
      en: "Safe Bearing Capacity Test Report",
      de: "Prüfbericht zur sicheren Tragfähigkeit",
      "zh-CN": "安全承载力测试报告",
      "zh-TW": "安全承載力測試報告",
      ar: "تقرير اختبار قدرة التحمل الآمنة"
    },
    viewFullReport: {
      en: "View Full Report",
      de: "Vollständigen Bericht anzeigen",
      "zh-CN": "查看完整报告",
      "zh-TW": "查看完整報告",
      ar: "عرض التقرير الكامل"
    }
  },
  capabilities: {
    heroDescription: {
      en: "From quarry extraction to final delivery, we control every step of the granite production process. Discover our vertically integrated capabilities that ensure quality at every stage.",
      de: "Von der Steinbruchgewinnung bis zur Endlieferung kontrollieren wir jeden Schritt des Granitproduktionsprozesses. Entdecken Sie unsere vertikal integrierten Fähigkeiten, die Qualität in jeder Phase gewährleisten.",
      "zh-CN": "从采石场开采到最终交付，我们控制花岗岩生产过程的每一步。了解我们垂直整合的能力，确保每个环节的质量。",
      "zh-TW": "從採石場開採到最終交付，我們控制花崗岩生產過程的每一步。了解我們垂直整合的能力，確保每個環節的品質。",
      ar: "من استخراج المحجر إلى التسليم النهائي، نتحكم في كل خطوة من عملية إنتاج الجرانيت. اكتشف قدراتنا المتكاملة رأسياً التي تضمن الجودة في كل مرحلة."
    },
    ourProcess: {
      en: "Our Process",
      de: "Unser Prozess",
      "zh-CN": "我们的流程",
      "zh-TW": "我們的流程",
      ar: "عمليتنا"
    },
    fromQuarryToProject: {
      en: "From Quarry Block to Your Project",
      de: "Vom Steinbruchblock zu Ihrem Projekt",
      "zh-CN": "从石材原块到您的项目",
      "zh-TW": "從石材原塊到您的項目",
      ar: "من كتلة المحجر إلى مشروعك"
    },
    capQuarryTitle: {
      en: "Own Quarry",
      de: "Eigener Steinbruch",
      "zh-CN": "自有采石场",
      "zh-TW": "自有採石場",
      ar: "محجر خاص"
    },
    capQuarryDesc: {
      en: "Secure, traceable supply from our own granite reserves in Odisha",
      de: "Sichere, rückverfolgbare Versorgung aus unseren eigenen Granitreserven in Odisha",
      "zh-CN": "来自我们在奥迪沙自有花岗岩储备的安全、可追溯供应",
      "zh-TW": "來自我們在奧迪沙自有花崗岩儲備的安全、可追溯供應",
      ar: "إمداد آمن وقابل للتتبع من احتياطياتنا الخاصة من الجرانيت في أوديشا"
    },
    capFactoryTitle: {
      en: "Factory Processing",
      de: "Fabrikverarbeitung",
      "zh-CN": "工厂加工",
      "zh-TW": "工廠加工",
      ar: "معالجة المصنع"
    },
    capFactoryDesc: {
      en: "In-house cutting, shaping, and processing with modern machinery",
      de: "Hausinterne Schneid-, Form- und Verarbeitungsarbeiten mit modernen Maschinen",
      "zh-CN": "使用现代化机械进行内部切割、成型和加工",
      "zh-TW": "使用現代化機械進行內部切割、成型和加工",
      ar: "قطع وتشكيل ومعالجة داخلية بآلات حديثة"
    },
    capPolishingTitle: {
      en: "Line Polishing",
      de: "Polierstraße",
      "zh-CN": "生产线抛光",
      "zh-TW": "生產線拋光",
      ar: "تلميع خطي"
    },
    capPolishingDesc: {
      en: "Premium finish with automated line polishing for consistent quality",
      de: "Premium-Finish mit automatisierter Polierstraße für gleichbleibende Qualität",
      "zh-CN": "自动化生产线抛光，提供优质一致的表面效果",
      "zh-TW": "自動化生產線拋光，提供優質一致的表面效果",
      ar: "تشطيب فاخر مع تلميع خطي آلي لجودة متسقة"
    },
    capQcTitle: {
      en: "Quality Control",
      de: "Qualitätskontrolle",
      "zh-CN": "质量控制",
      "zh-TW": "品質控制",
      ar: "مراقبة الجودة"
    },
    capQcDesc: {
      en: "Rigorous shade matching and quality checks for project consistency",
      de: "Strenge Farbabstimmung und Qualitätsprüfungen für Projektkonsistenz",
      "zh-CN": "严格的色调匹配和质量检查，确保项目一致性",
      "zh-TW": "嚴格的色調匹配和品質檢查，確保項目一致性",
      ar: "مطابقة دقيقة للألوان وفحوصات جودة لاتساق المشروع"
    },
    capPackingTitle: {
      en: "Packing & Dispatch",
      de: "Verpackung & Versand",
      "zh-CN": "包装和发货",
      "zh-TW": "包裝和發貨",
      ar: "التعبئة والإرسال"
    },
    capPackingDesc: {
      en: "Professional packing and logistics for safe delivery across India",
      de: "Professionelle Verpackung und Logistik für sichere Lieferung in ganz Indien",
      "zh-CN": "专业包装和物流，确保在印度各地安全交付",
      "zh-TW": "專業包裝和物流，確保在印度各地安全交付",
      ar: "تعبئة احترافية ولوجستيات للتوصيل الآمن في جميع أنحاء الهند"
    },
    capExportTitle: {
      en: "Export Ready",
      de: "Exportbereit",
      "zh-CN": "出口就绪",
      "zh-TW": "出口就緒",
      ar: "جاهز للتصدير"
    },
    capExportDesc: {
      en: "Documentation and packaging standards for international shipping",
      de: "Dokumentation und Verpackungsstandards für den internationalen Versand",
      "zh-CN": "符合国际运输标准的文档和包装",
      "zh-TW": "符合國際運輸標準的文檔和包裝",
      ar: "معايير التوثيق والتعبئة للشحن الدولي"
    }
  },
  factory: {
    ctaEyebrow: {
      en: "Get Started",
      de: "Loslegen",
      "zh-CN": "开始",
      "zh-TW": "開始",
      ar: "ابدأ الآن"
    },
    ctaTitle: {
      en: "Need custom sizes or finishes?",
      de: "Benötigen Sie Sondergrößen oder Oberflächenbehandlungen?",
      "zh-CN": "需要定制尺寸或表面处理？",
      "zh-TW": "需要定制尺寸或表面處理？",
      ar: "هل تحتاج أحجام أو تشطيبات مخصصة؟"
    },
    ctaDescription: {
      en: "Our factory team will guide you on the best specifications for your project. Get a quote within hours.",
      de: "Unser Fabrikteam berät Sie zu den besten Spezifikationen für Ihr Projekt. Erhalten Sie ein Angebot innerhalb von Stunden.",
      "zh-CN": "我们的工厂团队将为您的项目提供最佳规格指导。几小时内获得报价。",
      "zh-TW": "我們的工廠團隊將為您的項目提供最佳規格指導。幾小時內獲得報價。",
      ar: "سيرشدك فريق المصنع لدينا إلى أفضل المواصفات لمشروعك. احصل على عرض أسعار في غضون ساعات."
    },
    contactFactory: {
      en: "Contact Factory",
      de: "Fabrik kontaktieren",
      "zh-CN": "联系工厂",
      "zh-TW": "聯繫工廠",
      ar: "اتصل بالمصنع"
    }
  },
  quarry: {
    mediaTitle1: {
      en: "Lavender Blue Quarry",
      de: "Lavender Blue Steinbruch",
      "zh-CN": "薰衣草蓝采石场",
      "zh-TW": "薰衣草藍採石場",
      ar: "محجر اللافندر الأزرق"
    },
    mediaDesc1: {
      en: "Our exclusive granite quarry in the heart of Odisha, where premium Lavender Blue granite is extracted.",
      de: "Unser exklusiver Granitsteinbruch im Herzen von Odisha, wo Premium-Lavender-Blue-Granit gewonnen wird.",
      "zh-CN": "我们位于奥迪沙中心的独家花岗岩采石场，在此开采优质薰衣草蓝花岗岩。",
      "zh-TW": "我們位於奧迪沙中心的獨家花崗岩採石場，在此開採優質薰衣草藍花崗岩。",
      ar: "محجر الجرانيت الحصري في قلب أوديشا، حيث يتم استخراج جرانيت لافندر أزرق الفاخر."
    },
    mediaTitle2: {
      en: "Quarry Operations",
      de: "Steinbruchbetrieb",
      "zh-CN": "采石场运营",
      "zh-TW": "採石場運營",
      ar: "عمليات المحجر"
    },
    mediaDesc2: {
      en: "State-of-the-art extraction techniques ensuring minimal waste and maximum quality.",
      de: "Modernste Gewinnungstechniken für minimalen Abfall und maximale Qualität.",
      "zh-CN": "先进的开采技术，确保最少浪费和最高质量。",
      "zh-TW": "先進的開採技術，確保最少浪費和最高品質。",
      ar: "تقنيات استخراج متطورة تضمن الحد الأدنى من الهدر وأقصى جودة."
    },
    mediaTitle3: {
      en: "Lavender Blue Granite",
      de: "Lavender Blue Granit",
      "zh-CN": "薰衣草蓝花岗岩",
      "zh-TW": "薰衣草藍花崗岩",
      ar: "جرانيت لافندر أزرق"
    },
    mediaDesc3: {
      en: "The signature stone of A B Minerals — elegant waves of blue and grey.",
      de: "Der Signaturstein von A B Minerals — elegante Wellen in Blau und Grau.",
      "zh-CN": "A B Minerals的标志性石材——优雅的蓝灰色波纹。",
      "zh-TW": "A B Minerals的標誌性石材——優雅的藍灰色波紋。",
      ar: "الحجر المميز لـ A B Minerals — موجات أنيقة من الأزرق والرمادي."
    },
    mediaTitle4: {
      en: "Raw Granite Blocks",
      de: "Rohe Granitblöcke",
      "zh-CN": "原始花岗岩石块",
      "zh-TW": "原始花崗岩石塊",
      ar: "كتل الجرانيت الخام"
    },
    mediaDesc4: {
      en: "Freshly extracted blocks ready for processing at our factory.",
      de: "Frisch gewonnene Blöcke, bereit zur Verarbeitung in unserer Fabrik.",
      "zh-CN": "刚开采的石块，准备在我们工厂加工。",
      "zh-TW": "剛開採的石塊，準備在我們工廠加工。",
      ar: "كتل مستخرجة حديثًا وجاهزة للمعالجة في مصنعنا."
    },
    mediaTitle5: {
      en: "Premium Block Selection",
      de: "Premium-Blockauswahl",
      "zh-CN": "优质石块精选",
      "zh-TW": "優質石塊精選",
      ar: "اختيار الكتل الفاخرة"
    },
    mediaDesc5: {
      en: "Each block is hand-selected for quality before processing.",
      de: "Jeder Block wird vor der Verarbeitung manuell auf Qualität geprüft.",
      "zh-CN": "每块石材在加工前都经过人工精选。",
      "zh-TW": "每塊石材在加工前都經過人工精選。",
      ar: "يتم اختيار كل كتلة يدويًا للتأكد من الجودة قبل المعالجة."
    },
    locationLabel: {
      en: "Location",
      de: "Standort",
      "zh-CN": "位置",
      "zh-TW": "位置",
      ar: "الموقع"
    }
  }
};

const locales = ["en", "de", "zh-CN", "zh-TW", "ar"];

for (const locale of locales) {
  const filePath = path.join("messages", `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  
  for (const [namespace, keys] of Object.entries(newKeys)) {
    if (!data[namespace]) data[namespace] = {};
    for (const [key, translations] of Object.entries(keys)) {
      data[namespace][key] = translations[locale];
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
  console.log(`Updated ${locale}.json`);
}

console.log("Done - all locale files updated");
