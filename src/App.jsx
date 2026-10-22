import { useState, useMemo } from 'react';
import './App.css';

// АВТОНОМНЫЕ АРХИТЕКТУРНЫЕ ВИЗУАЛИЗАЦИИ (РАБОТАЮТ БЕЗ ВНЕШНИХ ФОТОСТОКОВ И VPN)
const svgToDataUri = (svgString) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;

// 1. ЧЕРНОВАЯ БЕТОННАЯ КОРОБКА С РАЗМЕТКОЙ И ЛАЗЕРНЫМ УРОВНЕМ (ДО)
const SVG_RAW_CONCRETE = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600">
  <defs>
    <linearGradient id="concreteWall" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2c2e33"/>
      <stop offset="100%" stop-color="#1e2024"/>
    </linearGradient>
    <linearGradient id="concreteFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#232529"/>
      <stop offset="100%" stop-color="#141518"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <!-- Задняя бетонная стена -->
  <rect width="900" height="430" fill="url(#concreteWall)"/>
  <rect width="900" height="430" fill="url(#grid)"/>
  <!-- Стяжка пола -->
  <polygon points="0,600 900,600 760,430 140,430" fill="url(#concreteFloor)"/>
  <!-- Линии перспективы стен и потолка -->
  <line x1="0" y1="0" x2="140" y2="90" stroke="#454850" stroke-width="2"/>
  <line x1="900" y1="0" x2="760" y2="90" stroke="#454850" stroke-width="2"/>
  <rect x="140" y="90" width="620" height="340" fill="none" stroke="#454850" stroke-width="2"/>
  <line x1="0" y1="600" x2="140" y2="430" stroke="#454850" stroke-width="2"/>
  <line x1="900" y1="600" x2="760" y2="430" stroke="#454850" stroke-width="2"/>
  <!-- Оконный проем в бетоне -->
  <rect x="210" y="130" width="220" height="250" fill="#383c44" stroke="#525660" stroke-width="4"/>
  <line x1="320" y1="130" x2="320" y2="380" stroke="#232529" stroke-width="6"/>
  <line x1="210" y1="240" x2="430" y2="240" stroke="#232529" stroke-width="6"/>
  <!-- Трассировка электрики по бетону (штробы) -->
  <path d="M 550 90 L 550 280 L 630 280" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6,4"/>
  <circle cx="630" cy="280" r="7" fill="#f59e0b"/>
  <circle cx="652" cy="280" r="7" fill="#f59e0b"/>
  <!-- Красный/зеленый луч лазерного нивелира -->
  <line x1="0" y1="310" x2="900" y2="310" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="10,5"/>
  <line x1="480" y1="0" x2="480" y2="600" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="10,5"/>
  <!-- Инженерные отметки -->
  <text x="160" y="75" fill="#9ca3af" font-family="monospace" font-size="13">ОТМ. ПОТОЛКА +2.950 (БЕТОН B25)</text>
  <text x="495" y="210" fill="#f59e0b" font-family="monospace" font-size="12">ШТРОБА ВВГнг-LS 3х2.5</text>
  <text x="260" y="510" fill="#9ca3af" font-family="monospace" font-size="14">ЧЕРНОВАЯ СТЯЖКА • ВЛАЖНОСТЬ 3.8% • ОСИ БТИ</text>
</svg>
`);

// 2. ГОТОВЫЙ ДИЗАЙНЕРСКИЙ ИНТЕРЬЕР (ПОСЛЕ)
const SVG_FINISHED_INTERIOR = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600">
  <defs>
    <linearGradient id="warmWall" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ede8df"/>
      <stop offset="100%" stop-color="#dcd4c6"/>
    </linearGradient>
    <linearGradient id="oakFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b89369"/>
      <stop offset="100%" stop-color="#8c6740"/>
    </linearGradient>
    <linearGradient id="windowGlow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#dbeafe"/>
    </linearGradient>
  </defs>
  <!-- Стены в теплой декоративной штукатурке -->
  <rect width="900" height="430" fill="url(#warmWall)"/>
  <!-- Инженерная доска (паркет) -->
  <polygon points="0,600 900,600 760,430 140,430" fill="url(#oakFloor)"/>
  <!-- Теневой профиль потолка -->
  <polygon points="0,0 900,0 760,90 140,90" fill="#f8f6f2"/>
  <rect x="140" y="90" width="620" height="340" fill="#e6dfd3" stroke="#c9bfb0" stroke-width="2"/>
  <!-- Трековый магнитный свет -->
  <rect x="260" y="45" width="380" height="6" fill="#18181b"/>
  <circle cx="330" cy="48" r="18" fill="rgba(253,224,71,0.28)"/>
  <circle cx="570" cy="48" r="18" fill="rgba(253,224,71,0.28)"/>
  <!-- Панорамное окно с мягким дневным светом -->
  <rect x="195" y="120" width="235" height="285" fill="url(#windowGlow)" stroke="#27272a" stroke-width="6"/>
  <line x1="312" y1="120" x2="312" y2="405" stroke="#27272a" stroke-width="5"/>
  <!-- Декоративные стеновые панели из шпона ореха -->
  <rect x="470" y="110" width="250" height="320" fill="#9c7349"/>
  <line x1="510" y1="110" x2="510" y2="430" stroke="#6e4e2e" stroke-width="3"/>
  <line x1="550" y1="110" x2="550" y2="430" stroke="#6e4e2e" stroke-width="3"/>
  <line x1="590" y1="110" x2="590" y2="430" stroke="#6e4e2e" stroke-width="3"/>
  <line x1="630" y1="110" x2="630" y2="430" stroke="#6e4e2e" stroke-width="3"/>
  <!-- Большая интерьерная картина -->
  <rect x="535" y="155" width="135" height="150" fill="#f5f2eb" stroke="#18181b" stroke-width="4"/>
  <circle cx="602" cy="230" r="38" fill="#a67c52"/>
  <!-- Дизайнерский диван Minotti -->
  <rect x="330" y="365" width="360" height="80" rx="10" fill="#d6d1c7" stroke="#b5ada0" stroke-width="2"/>
  <rect x="315" y="390" width="390" height="65" rx="8" fill="#c7c0b4"/>
  <rect x="355" y="345" width="95" height="45" rx="6" fill="#e5e0d8"/>
  <rect x="465" y="345" width="95" height="45" rx="6" fill="#e5e0d8"/>
  <rect x="575" y="345" width="90" height="45" rx="6" fill="#a67c52"/>
  <!-- Ковер и журнальный столик -->
  <polygon points="240,565 730,565 660,465 310,465" fill="#e7e2d8" opacity="0.85"/>
  <ellipse cx="495" cy="500" rx="85" ry="24" fill="#27272a"/>
  <!-- Дизайнерский подвесной светильник -->
  <line x1="610" y1="90" x2="610" y2="215" stroke="#18181b" stroke-width="2"/>
  <circle cx="610" cy="225" r="16" fill="#fef08a" stroke="#a67c52" stroke-width="3"/>
</svg>
`);

// 3. КАРТОЧКИ ПОРТФОЛИО (АВТОНОМНЫЕ РЕНДЕРЫ ОБЪЕКТОВ)
const makePortfolioSvg = (bgTop, bgFloor, accentColor, labelText) =>
  svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="360" fill="${bgTop}"/>
  <polygon points="0,500 800,500 680,360 120,360" fill="${bgFloor}"/>
  <rect x="120" y="60" width="560" height="300" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="2"/>
  <!-- Панорамное остекление -->
  <rect x="160" y="95" width="180" height="230" fill="#f8fafc" stroke="#27272a" stroke-width="5"/>
  <line x1="250" y1="95" x2="250" y2="325" stroke="#27272a" stroke-width="4"/>
  <!-- Акцентная архитектурная панель -->
  <rect x="385" y="95" width="250" height="265" fill="${accentColor}" opacity="0.88"/>
  <rect x="435" y="135" width="150" height="110" fill="#faf8f5" stroke="#18181b" stroke-width="3"/>
  <!-- Мебельная группа -->
  <rect x="290" y="310" width="290" height="75" rx="8" fill="#ffffff" stroke="#d4d4d8" stroke-width="2"/>
  <rect x="320" y="290" width="80" height="35" rx="5" fill="${accentColor}"/>
  <ellipse cx="435" cy="425" rx="95" ry="22" fill="#18181b"/>
  <!-- Водяной знак проекта -->
  <rect x="30" y="26" width="230" height="30" fill="rgba(22,22,24,0.82)"/>
  <text x="44" y="46" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1">${labelText}</text>
</svg>
`);

const INITIAL_CRM_LEADS = [
  {
    id: 'EST-8491',
    date: 'Сегодня, 11:20',
    name: 'Александр Воронов',
    phone: '+7 (916) 442-19-08',
    channel: 'Прямой звонок инженера',
    object: 'Новостройка (Бетон), 78 м², Бизнес-класс',
    total: '2 418 000 ₽',
    status: 'Замер назначен'
  },
  {
    id: 'EST-8490',
    date: 'Вчера, 18:45',
    name: 'Елена Смирнова',
    phone: '+7 (925) 810-33-12',
    channel: 'Отправка сметы на Email',
    object: 'Вторичное жилье, 54 м², Неоклассика',
    total: '1 674 000 ₽',
    status: 'Договор подписан'
  }
];

const PORTFOLIO_ITEMS = [
  {
    title: 'ЖК «Садовые Кварталы»',
    tag: 'Минимализм • 92 м²',
    duration: '110 дней',
    budget: '3 150 000 ₽',
    img: makePortfolioSvg('#e7e2d8', '#9c7a54', '#a67c52', 'ОБЪЕКТ СДАН • АКТ КС-2')
  },
  {
    title: 'Резиденция на Патриарших',
    tag: 'Тихая роскошь • 124 м²',
    duration: '135 дней',
    budget: '4 890 000 ₽',
    img: makePortfolioSvg('#dcd7ce', '#6e5a47', '#52525b', 'АВТОРСКИЙ НАДЗОР • 124 М²')
  },
  {
    title: 'ЖК «Зиларт Тауэр»',
    tag: 'Современная классика • 68 м²',
    duration: '85 дней',
    budget: '2 180 000 ₽',
    img: makePortfolioSvg('#ece8e1', '#ab8762', '#78593c', 'ГАРАНТИЯ 5 ЛЕТ • СРО')
  }
];

function App() {
  // Ползунок До/После
  const [sliderPos, setSliderPos] = useState(48);

  // Шаги квиза (1..4)
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('newbuild');
  const [area, setArea] = useState(65);
  const [tier, setTier] = useState('business');
  const [extras, setExtras] = useState({
    soundproof: true,
    smartHome: false,
    hvac: false,
    customFurniture: false
  });

  // Поля формы лида
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [contactMethod, setContactMethod] = useState('Прямой звонок инженера');
  const [submittedLeadId, setSubmittedLeadId] = useState(null);

  // Встроенная Демо-CRM
  const [crmOpen, setCrmOpen] = useState(false);
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('forma_crm_leads');
    return saved ? JSON.parse(saved) : INITIAL_CRM_LEADS;
  });

  // Инженерный расчет сметы
  const estimate = useMemo(() => {
    const baseRateMap = {
      standard: 22000,
      business: 31000,
      premium: 44000
    };
    const typeMultiplier = {
      newbuild: 1.0,
      secondary: 1.14,
      penthouse: 1.22
    };

    const rate = baseRateMap[tier] * typeMultiplier[propertyType];
    const baseTotal = Math.round(area * rate);

    const roughWorks = Math.round(baseTotal * 0.36);
    const MEPWorks = Math.round(baseTotal * 0.24);
    const finishWorks = Math.round(baseTotal * 0.40);

    let extrasCost = 0;
    if (extras.soundproof) extrasCost += area * 2400;
    if (extras.smartHome) extrasCost += 145000;
    if (extras.hvac) extrasCost += 190000;
    if (extras.customFurniture) extrasCost += 260000;

    const grandTotal = roughWorks + MEPWorks + finishWorks + extrasCost;
    const durationDays = Math.round(45 + area * 0.75 + (propertyType === 'secondary' ? 14 : 0));

    return {
      roughWorks,
      MEPWorks,
      finishWorks,
      extrasCost,
      grandTotal,
      durationDays,
      docNumber: `СМ-${2026}-${area}${tier === 'business' ? 'Б' : 'П'}`
    };
  }, [propertyType, area, tier, extras]);

  const formatRUB = (num) => num.toLocaleString('ru-RU') + ' ₽';

  const toggleExtra = (key) => {
    setExtras((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    const newId = `EST-${Math.floor(1000 + Math.random() * 9000)}`;
    const typeLabel =
      propertyType === 'newbuild'
        ? 'Новостройка'
        : propertyType === 'secondary'
        ? 'Вторичка (с демонтажем)'
        : 'Коттедж / Пентхаус';
    const tierLabel =
      tier === 'standard'
        ? 'Базовый Архитектурный'
        : tier === 'business'
        ? 'Бизнес-класс'
        : 'Премиум (Коллекционный)';

    const newLead = {
      id: newId,
      date: 'Только что',
      name: clientName,
      phone: clientPhone,
      channel: contactMethod + (clientEmail ? ` (${clientEmail})` : ''),
      object: `${typeLabel}, ${area} м², ${tierLabel}`,
      total: formatRUB(estimate.grandTotal),
      status: 'Новая заявка'
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem('forma_crm_leads', JSON.stringify(updated));
    setSubmittedLeadId(newId);

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_OWNER_CHAT_ID;
    if (botToken && chatId) {
      const text = [
        `🏛 НОВАЯ СМЕТА — FORMA STUDIO (${newId})`,
        `👤 Клиент: ${clientName}`,
        `📞 Телефон: ${clientPhone}`,
        `📬 Способ связи: ${contactMethod}`,
        `📐 Объект: ${typeLabel}, ${area} м² (${tierLabel})`,
        `💰 Расчет сметы: ${formatRUB(estimate.grandTotal)}`,
        `⏱ Срок по договору: ${estimate.durationDays} дн.`
      ].join('\n');

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text })
        });
      } catch {
        // Не блокируем интерфейс
      }
    }
  };

  const updateLeadStatus = (id, newStatus) => {
    const updated = leads.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setLeads(updated);
    localStorage.setItem('forma_crm_leads', JSON.stringify(updated));
  };

  const exportCSV = () => {
    const headers = ['ID Сметы;Дата;Клиент;Телефон;Канал связи;Параметры объекта;Сумма сметы;Статус'];
    const rows = leads.map(
      (l) => `${l.id};${l.date};${l.name};${l.phone};${l.channel};${l.object};${l.total};${l.status}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'forma_studio_leads.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* ШАПКА САЙТА */}
      <header className="header">
        <div className="container header-inner">
          <a href="#" className="logo">
            <div className="logo-mark">F</div>
            <div>
              <div className="logo-text">FORMA STUDIO</div>
              <span className="logo-sub">Архитектурное бюро & Генподряд</span>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#calculator">Сметный калькулятор</a>
            <a href="#portfolio">Реализованные объекты</a>
            <button className="btn-crm-toggle" onClick={() => setCrmOpen(true)}>
              🔐 Кабинет прораба (CRM) <span className="crm-badge">{leads.length}</span>
            </button>
          </nav>

          <div className="header-actions">
            <div className="phone-block">
              <a href="tel:+74951284490" className="phone-number">+7 (495) 128-44-90</a>
              <div className="phone-status">
                <span className="status-dot"></span> Инженерная служба на линии
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ПЕРВЫЙ ЭКРАН С ПОЛЗУНКОМ ДО/ПОСЛЕ */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="hero-tag">Фиксация сметы в договоре • СРО №0482-99</div>
            <h1 className="hero-title">
              Инженерный ремонт квартир <span>под ключ</span> с точностью до миллиметра
            </h1>
            <p className="hero-desc">
              Превращаем бетонную коробку в готовое для жизни пространство. Полная комплектация чистовыми материалами, технический надзор и поэтапная оплата по актам КС-2.
            </p>

            <div className="hero-Transfer-btns">
              <a href="#calculator" className="btn-primary">
                Рассчитать ведомость работ →
              </a>
              <button className="btn-secondary" onClick={() => window.print()}>
                🖨️ Скачать образец сметы (PDF)
              </button>
            </div>

            <div className="hero-metrics">
              <div>
                <div className="metric-val">100%</div>
                <div className="metric-label">Фиксация итоговой цены в договоре подряда</div>
              </div>
              <div>
                <div className="metric-val">5 лет</div>
                <div className="metric-label">Юридическая гарантия на инженерию и отделку</div>
              </div>
              <div>
                <div className="metric-val">0 ₽</div>
                <div className="metric-label">Аванс за работы — оплата только по факту этапа</div>
              </div>
            </div>
          </div>

          {/* ИНТЕРАКТИВНЫЙ СЛАЙДЕР ДО / ПОСЛЕ */}
          <div className="ba-wrapper">
            <div className="ba-header">
              <span>Интерактивное сравнение этапа</span>
              <span>Потяните ползунок ↔</span>
            </div>

            <div className="ba-container">
              {/* Слой ПОСЛЕ (Готовый интерьер) */}
              <img
                src={SVG_FINISHED_INTERIOR}
                alt="Готовый интерьер"
                className="ba-image"
              />

              {/* Слой ДО (Черновой этап с лазерной разметкой) */}
              <div
                className="ba-before-layer"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={SVG_RAW_CONCRETE}
                  alt="Черновая коробка"
                  className="ba-before-img"
                />
              </div>

              <span className="ba-badge left">Черновой бетон (День 1)</span>
              <span className="ba-badge right">Сдача объекта (День 95)</span>

              <div className="ba-divider" style={{ left: `${sliderPos}%` }}>
                <div className="ba-handle">↔</div>
              </div>

              <input
                type="range"
                min="5"
                max="95"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="ba-range"
                aria-label="Сравнение До и После"
              />
            </div>

            <div className="ba-caption">
              <span>📍 Объект: ЖК «Символ», 74 м²</span>
              <span>Срок реализации: 95 дней</span>
            </div>
          </div>
        </div>
      </section>

      {/* СМЕТНЫЙ КВИЗ-КАЛЬКУЛЯТОР + ОФИЦИАЛЬНАЯ ВЕДОМОСТЬ */}
      <section id="calculator" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle">Интерактивный сметный модуль</div>
            <h2 className="section-title">Онлайн-формирование предварительной сметы</h2>
          </div>

          <div className="calculator-layout">
            {/* ЛЕВАЯ КОЛОНКА: ПОШАГОВЫЙ КВИЗ */}
            <div className="quiz-box">
              <div className="quiz-progress-header">
                <span>Шаг {step} из 4</span>
                <span>Готовность расчета: {step * 25}%</span>
              </div>
              <div className="quiz-progress-bar">
                <div className="quiz-progress-fill" style={{ width: `${step * 25}%` }} />
              </div>

              {step === 1 && (
                <div>
                  <h3 className="quiz-step-title">1. Укажите тип вашего объекта и площадь</h3>
                  <div className="options-grid">
                    <div
                      className={`option-card ${propertyType === 'newbuild' ? 'active' : ''}`}
                      onClick={() => setPropertyType('newbuild')}
                    >
                      <div className="option-title">
                        <span>Новостройка (Бетон / WhiteBox)</span>
                        <span>✓</span>
                      </div>
                      <div className="option-desc">Возведение перегородок, трассировка с нуля</div>
                    </div>

                    <div
                      className={`option-card ${propertyType === 'secondary' ? 'active' : ''}`}
                      onClick={() => setPropertyType('secondary')}
                    >
                      <div className="option-title">
                        <span>Вторичный фонд</span>
                        <span>+14%</span>
                      </div>
                      <div className="option-desc">Включает полный демонтаж старых покрытий и вывоз мусора</div>
                    </div>
                  </div>

                  <div className="area-control">
                    <div className="area-display">
                      <span>Общая площадь по БТИ:</span>
                      <span className="area-number">{area} м²</span>
                    </div>
                    <input
                      type="range"
                      min="28"
                      max="180"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="area-slider"
                    />
                    <div className="area-presets">
                      {[42, 65, 85, 110, 145].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          className={`preset-btn ${area === preset ? 'active' : ''}`}
                          onClick={() => setArea(preset)}
                        >
                          {preset} м²
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="quiz-step-title">2. Выберите класс отделки и инженерии</h3>
                  <div className="checkbox-list">
                    <div
                      className={`option-card ${tier === 'standard' ? 'active' : ''}`}
                      onClick={() => setTier('standard')}
                    >
                      <div className="option-title">
                        <span>Базовый Архитектурный</span>
                        <span>22 000 ₽ / м²</span>
                      </div>
                      <div className="option-desc">
                        Выравнивание по маякам, электрика ABB/Schneider, укладка кварцвинила и керамогранита до 60х60, покраска стен.
                      </div>
                    </div>

                    <div
                      className={`option-card ${tier === 'business' ? 'active' : ''}`}
                      onClick={() => setTier('business')}
                    >
                      <div className="option-title">
                        <span>Бизнес-класс (Выбор 70% клиентов)</span>
                        <span>31 000 ₽ / м²</span>
                      </div>
                      <div className="option-desc">
                        Теневые профили Eurokraab, двери скрытого монтажа, широкоформатный керамогранит, коллекторная сантехника Rehau.
                      </div>
                    </div>

                    <div
                      className={`option-card ${tier === 'premium' ? 'active' : ''}`}
                      onClick={() => setTier('premium')}
                    >
                      <div className="option-title">
                        <span>Премиум / Авторский надзор</span>
                        <span>44 000 ₽ / м²</span>
                      </div>
                      <div className="option-desc">
                        Сложная геометрия, натуральный камень и инженерная доска, трековое магнитное освещение, внутрипольные конвекторы.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="quiz-step-title">3. Дополнительные инженерные системы</h3>
                  <div className="checkbox-list">
                    <div
                      className={`checkbox-item ${extras.soundproof ? 'active' : ''}`}
                      onClick={() => toggleExtra('soundproof')}
                    >
                      <div>
                        <strong>Комплексная шумоизоляция (Потолок + Стены)</strong>
                        <div className="option-desc">Акустические мембраны ТехноСонус (+2 400 ₽/м²)</div>
                      </div>
                      <span>{extras.soundproof ? '☑ Включено' : '☐ Добавить'}</span>
                    </div>

                    <div
                      className={`checkbox-item ${extras.smartHome ? 'active' : ''}`}
                      onClick={() => toggleExtra('smartHome')}
                    >
                      <div>
                        <strong>Система «Умный дом» + Защита от протечек</strong>
                        <div className="option-desc">Сервер автоматизации, приводы Нептун, мастер-выключатель (+145 000 ₽)</div>
                      </div>
                      <span>{extras.smartHome ? '☑ Включено' : '☐ Добавить'}</span>
                    </div>

                    <div
                      className={`checkbox-item ${extras.hvac ? 'active' : ''}`}
                      onClick={() => toggleExtra('hvac')}
                    >
                      <div>
                        <strong>Приточная вентиляция и канальное кондиционирование</strong>
                        <div className="option-desc">Проектирование и скрытый монтаж воздуховодов (+190 000 ₽)</div>
                      </div>
                      <span>{extras.hvac ? '☑ Включено' : '☐ Добавить'}</span>
                    </div>

                    <div
                      className={`checkbox-item ${extras.customFurniture ? 'active' : ''}`}
                      onClick={() => toggleExtra('customFurniture')}
                    >
                      <div>
                        <strong>Столярное производство корпусной мебели</strong>
                        <div className="option-desc">Кухонный гарнитур и гардеробные в потолок по чертежам (+260 000 ₽)</div>
                      </div>
                      <span>{extras.customFurniture ? '☑ Включено' : '☐ Добавить'}</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="quiz-step-title">4. Закрепление сметы и вызов инженера-замерщика</h3>
                  {submittedLeadId ? (
                    <div className="success-banner">
                      <h4>✅ Смета №{submittedLeadId} успешно зарегистрирована в базе!</h4>
                      <p style={{ marginTop: '8px', fontSize: '13px' }}>
                        Ведущий инженер свяжется с вами выбранным способом ({contactMethod}) в течение 15 минут. Вы также можете проверить свою заявку в <strong>«Кабинете прораба (CRM)»</strong> в шапке сайта.
                      </p>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ marginTop: '14px' }}
                        onClick={() => setSubmittedLeadId(null)}
                      >
                        Оформить еще один расчет
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="lead-form-grid">
                      <div className="form-group">
                        <label>Как к вам обращаться *</label>
                        <input
                          type="text"
                          required
                          placeholder="Например: Сергей Викторович"
                          className="form-input"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Контактный телефон для связи *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+7 (999) 000-00-00"
                          className="form-input"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Выберите удобный способ получения полной ведомости (без VPN):</label>
                        <div className="contact-methods">
                          {[
                            'Прямой звонок инженера',
                            'Отправка сметы на Email',
                            'Мессенджер MAX / VK'
                          ].map((method) => (
                            <button
                              type="button"
                              key={method}
                              className={`method-btn ${contactMethod === method ? 'active' : ''}`}
                              onClick={() => setContactMethod(method)}
                            >
                              {method}
                            </button>
                          ))}
                        </div>
                      </div>

                      {contactMethod === 'Отправка сметы на Email' && (
                        <div className="form-group">
                          <label>Ваш Email (Яндекс / Mail / Корпоративный)</label>
                          <input
                            type="email"
                            placeholder="name@yandex.ru"
                            className="form-input"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                          />
                        </div>
                      )}

                      <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                        Зафиксировать стоимость и заказать бесплатный обмер →
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* КНОПКИ НАВИГАЦИИ КВИЗА */}
              <div className="quiz-nav">
                <button
                  type="button"
                  className="btn-secondary"
                  disabled={step === 1}
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                >
                  ← Назад
                </button>
                {step < 4 && (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setStep((s) => Math.min(4, s + 1))}
                  >
                    Следующий шаг →
                  </button>
                )}
              </div>
            </div>

            {/* ПРАВАЯ КОЛОНКА: ЖИВАЯ СМЕТНАЯ ВЕДОМОСТЬ */}
            <div className="estimate-sheet">
              <div className="sheet-top">
                <div>
                  <div className="sheet-doc-title">Сметная ведомость №{estimate.docNumber}</div>
                  <div className="sheet-doc-meta">Дата формирования: {new Date().toLocaleDateString('ru-RU')}</div>
                </div>
                <div className="sheet-stamp">Расчет по СНиП</div>
              </div>

              <div className="sheet-params">
                <div className="param-item">
                  <span>Тип фонда:</span>
                  <strong>{propertyType === 'newbuild' ? 'Новостройка' : 'Вторичное жилье'}</strong>
                </div>
                <div className="param-item">
                  <span>Площадь БТИ:</span>
                  <strong>{area} м²</strong>
                </div>
                <div className="param-item">
                  <span>Регламент работ:</span>
                  <strong>{tier === 'standard' ? 'Базовый' : tier === 'business' ? 'Бизнес-класс' : 'Премиум'}</strong>
                </div>
                <div className="param-item">
                  <span>Нормативный срок:</span>
                  <strong>{estimate.durationDays} календарных дней</strong>
                </div>
              </div>

              <table className="sheet-table">
                <thead>
                  <tr>
                    <th>Этап работ по договору</th>
                    <th>Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1. Черновые работы и геометрия стен</td>
                    <td>{formatRUB(estimate.roughWorks)}</td>
                  </tr>
                  <tr>
                    <td>2. Инженерные узлы (Электрика + Сантехника)</td>
                    <td>{formatRUB(estimate.MEPWorks)}</td>
                  </tr>
                  <tr>
                    <td>3. Чистовая отделка и монтаж покрытий</td>
                    <td>{formatRUB(estimate.finishWorks)}</td>
                  </tr>
                  <tr>
                    <td>4. Спецразделы и доп. оснащение</td>
                    <td>{formatRUB(estimate.extrasCost)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="sheet-total-box">
                <div className="sheet-total-row">
                  <span>ИТОГО ПО СМЕТЕ:</span>
                  <span className="sheet-total-price">{formatRUB(estimate.grandTotal)}</span>
                </div>
                <div className="sheet-total-sub">
                  <span>Стоимость за 1 м²:</span>
                  <span>{formatRUB(Math.round(estimate.grandTotal / area))} / м²</span>
                </div>
              </div>

              <div className="sheet-actions">
                <button type="button" className="btn-print" onClick={() => window.print()}>
                  🖨️ Скачать официальный бланк сметы в PDF / Печать
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ПОРТФОЛИО СДАННЫХ ОБЪЕКТОВ */}
      <section id="portfolio" className="section portfolio-section">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle">Акт приемки с первого раза</div>
            <h2 className="section-title">Сданные объекты за 2025–2026 гг.</h2>
          </div>

          <div className="portfolio-grid">
            {PORTFOLIO_ITEMS.map((item, idx) => (
              <div className="project-card" key={idx}>
                <img src={item.img} alt={item.title} className="project-img" />
                <div className="project-body">
                  <div className="project-tag">{item.tag}</div>
                  <h3 className="project-title">{item.title}</h3>
                  <div className="project-meta">
                    <span>⏱ Срок: {item.duration}</span>
                    <span>💰 Бюджет: {item.budget}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ВСТРОЕННАЯ МИНИ-CRM ДЛЯ ДЕМОНСТРАЦИИ ЗАКАЗЧИКАМ */}
      {crmOpen && (
        <div className="crm-overlay" onClick={() => setCrmOpen(false)}>
          <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="crm-header">
              <div>
                <h3>🔐 Внутренняя CRM-система учета заявок (Демо для заказчика)</h3>
                <p style={{ fontSize: '12px', color: '#64646b', marginTop: '4px' }}>
                  Все расчеты с сайта мгновенно попадают в эту таблицу без необходимости использовать внешние мессенджеры.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: '12px' }} onClick={exportCSV}>
                  📥 Выгрузить в Excel (CSV)
                </button>
                <button className="btn-primary" style={{ padding: '8px 14px', fontSize: '12px' }} onClick={() => setCrmOpen(false)}>
                  Закрыть ✕
                </button>
              </div>
            </div>

            <table className="crm-table">
              <thead>
                <tr>
                  <th>№ Сметы</th>
                  <th>Дата</th>
                  <th>Клиент & Телефон</th>
                  <th>Способ связи</th>
                  <th>Параметры объекта</th>
                  <th>Сумма</th>
                  <th>Статус в CRM</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td><strong>{lead.id}</strong></td>
                    <td>{lead.date}</td>
                    <td>
                      <strong>{lead.name}</strong>
                      <div style={{ fontSize: '11px', color: '#64646b' }}>{lead.phone}</div>
                    </td>
                    <td>{lead.channel}</td>
                    <td>{lead.object}</td>
                    <td><strong>{lead.total}</strong></td>
                    <td>
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        style={{ padding: '5px', fontSize: '12px' }}
                      >
                        <option value="Новая заявка">🔥 Новая заявка</option>
                        <option value="Замер назначен">📐 Замер назначен</option>
                        <option value="Смета на согласовании">📄 Смета на согласовании</option>
                        <option value="Договор подписан">✅ Договор подписан</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ПОДВАЛ */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong style={{ color: '#fff' }}>FORMA STUDIO — Архитектурный ремонт и инжиниринг</strong>
            <div style={{ marginTop: '4px' }}>ИНН 7704928110 • ОГРН 1187746009120 • Все права защищены</div>
          </div>
          <button className="btn-crm-toggle" onClick={() => setCrmOpen(true)}>
            🔐 Панель управления лидами ({leads.length})
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;