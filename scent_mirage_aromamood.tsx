import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink, 
  Compass, 
  BookOpen, 
  Droplet, 
  Flame, 
  Feather,
  Info
} from 'lucide-react';

// --- CONFIGURATION & SINGLE SOURCE OF TRUTH ---
const CONFIG = {
  brandName: "SCENT MIRAGE × AromaMood",
  tagline: "獨立調香沙龍與日常感官留白探索",
  gumroadJournalUrl: "https://gumroad.com", // 替換為實際 Gumroad URL
  instagramHandle: "@SCENTMIRAGE.LAB",
  instagramUrl: "https://instagram.com",
  products: [
    {
      id: "journal",
      title: "《7 日香氣轉場手札》數位版套裝",
      price: "HK$78",
      type: "數位下載 ｜ 即時交付",
      desc: "專為繁忙節奏設計的 3 分鐘感官留白練習。包含 12 頁 A6 主手札 PDF 與獨立 A6 隨身《香氣轉場記錄卡》列印檔。",
      features: [
        "12 頁精緻 A6 格式排版手札 (PDF)",
        "標準 105 × 148 mm 隨身記錄卡 (PDF)",
        "3 種低壓轉場微儀式指引",
        "無須購買精油亦能隨時開始"
      ],
      ctaText: "立即取得數位手札 (HK$78)",
      isPrimary: true,
      tag: "即時下載"
    },
    {
      id: "roller",
      title: "5ml 客製香氣滾珠油",
      price: "HK$98",
      type: "實體手作 ｜ 按單調配",
      desc: "以有機黃金荷荷芭油為基底，依個人偏好的香氣調性新鮮手工灌裝。配備琥珀色避光玻璃瓶與順滑不鏽鋼鋼珠。",
      features: [
        "按單新鮮調配（調配準備期約 3–5 工作天）",
        "有機冷壓黃金荷荷芭油滋潤基底",
        "5ml 避光琥珀色鋼珠滾珠瓶",
        "全港順豐到付或指定自取（運費另計）"
      ],
      ctaText: "登記客製預約 (HK$98)",
      isPrimary: false,
      tag: "低庫存批次"
    },
    {
      id: "workshop",
      title: "「心靈鏡像」調香工作坊",
      price: "HK$380",
      type: "線下創作體驗 ｜ 90 分鐘",
      desc: "以香氣與個人聯想為素材的創作型感官體驗。在安靜沙龍空間中放慢呼吸，親手探索調香架構，調製專屬個人的香氣靈感。",
      features: [
        "90 分鐘沉浸式調香沙龍指導",
        "認識天然香調家族與嗅覺層次",
        "親手調配專屬香氣隨行作品",
        "非心理治療、非醫療服務"
      ],
      ctaText: "查詢場次與預約 (HK$380)",
      isPrimary: false,
      tag: "預約制"
    }
  ]
};

// --- QUIZ QUESTIONS ---
const QUESTIONS = [
  {
    id: 1,
    title: "觀察此刻的生活節奏",
    subtitle: "回想今天的日常步調，哪一種狀態最貼近你目前的狀態？",
    options: [
      { id: "busy", label: "待辦清單密集", desc: "在多個事項與角色間匆忙切換，需要一個清晰的中斷點。" },
      { id: "social_drain", label: "社交或會議後想安靜", desc: "輸入了過多外界資訊，渴望向內收攏感受。" },
      { id: "switching", label: "正在切換不同事情", desc: "剛結束一個階段，準備進入下一個任務或回家。" },
      { id: "need_space", label: "單純想留一點空白", desc: "不追求任何效率，只想花三分鐘讓呼吸自然慢下來。" }
    ]
  },
  {
    id: 2,
    title: "此刻想探索的香氣印象",
    subtitle: "跟隨直覺，哪一種氣味氛圍最能呼應你此刻的嚮往？",
    options: [
      { id: "woody", label: "沉靜木質調", desc: "乾燥的老木工作台、舊書頁與安靜的深色樹林。", family: "Woody" },
      { id: "herbal", label: "舒展開闊的草本調", desc: "微風吹拂的植物園、帶晨露的新鮮迷迭香與乾燥草茶。", family: "Herbal" },
      { id: "citrus", label: "清透開朗的柑橘調", desc: "窗台邊灑落的陽光、剛剝開的清脆柑橘皮與通透空氣。", family: "Citrus" },
      { id: "floral", label: "溫潤柔和的花香調", desc: "晾在日光下的棉麻織物、小陽台盛開的低調淡雅花朵。", family: "Floral" }
    ]
  },
  {
    id: 3,
    title: "偏好的日常氣味質地",
    subtitle: "如果將香氣具象化為日常物品質感，你更偏好哪一種觸感？",
    options: [
      { id: "dry_paper", label: "乾燥紙張與老木紋理", texture: "沉穩、質樸、不黏膩" },
      { id: "crisp_air", label: "清晨微風與通透涼意", texture: "開闊、輕盈、呼吸感" },
      { id: "sunlit_zest", label: "新鮮果汁與明亮酸甜", texture: "清脆、振奮、微光閃爍" },
      { id: "clean_linen", label: "曬乾純棉與溫熱陶瓷", texture: "包裹、溫潤、安穩陪伴" }
    ]
  },
  {
    id: 4,
    title: "為日常安排轉場的時段",
    subtitle: "你最希望在哪一個生活節點，輕輕放下一枚「感官書籤」？",
    options: [
      { id: "morning", label: "晨間出門前", ritual: "玄關前的深呼吸，開啟一天的從容錨點。" },
      { id: "work_end", label: "工作結束、合上螢幕時", ritual: "整理桌面文具，以物理動作宣告公務告一段落。" },
      { id: "evening", label: "晚間環境的安靜收整", ritual: "調暗光源，在房間通風處給自己保留一段純粹留白。" },
      { id: "anytime", label: "隨時需要喘口氣的片刻", ritual: "隨身攜帶微小感官提示，為自己找回邊界。" }
    ]
  }
];

// --- PRESET SCENT PROFILES MAPPING ---
const SCENT_PROFILES = {
  woody: {
    title: "老木與書頁的安靜錨點",
    family: "木質調 (Woody Notes)",
    top: "苦橙葉、黑胡椒微光",
    heart: "檜木、雪松乾燥紋理",
    base: "岩蘭草、溫潤檀木與乾燥紙香",
    quote: "像是在翻開下一頁之前，輕輕放下一枚老木書籤。",
    scene: "工作結束時的物件歸位，或是下班後讓思緒沉澱的書桌旁。"
  },
  herbal: {
    title: "晨露草葉與開闊微風",
    family: "草本調 (Herbal Notes)",
    top: "清爽尤加利、綠薄荷微涼",
    heart: "快樂鼠尾草、迷迭香蒸餾微甘",
    base: "乾燥草本茶葉、微濕泥土氣息",
    quote: "為緊繃的節奏拉開一扇窗，讓空間流通自然的呼吸。",
    scene: "晨間出門前的感官提醒，或思緒紛亂時的清晰轉場。"
  },
  citrus: {
    title: "陽光窗台與清脆果皮",
    family: "柑橘調 (Citrus Notes)",
    top: "佛手柑、清脆葡萄柚果肉",
    heart: "甜橙花蒸氣、柑橘青綠果皮",
    base: "通透白麝香意象、微木質乾燥收尾",
    quote: "剛剝開果皮那一瞬間的清脆提示，提醒日常可以換個調性。",
    scene: "午後精神倦怠時，或是準備從公務切換至個人生活的轉折點。"
  },
  floral: {
    title: "棉麻暖意與庭園淡花",
    family: "溫柔花香調 (Soft Floral Notes)",
    top: "溫和薰衣草、柑橘晨光",
    heart: "天竺葵葉微甘、波旁天竺葵淡雅花瓣",
    base: "安息香脂、曬乾棉麻溫熱觸感",
    quote: "不需要急於證明什麼，靜靜安處於屬於自己的安全角落。",
    scene: "晚間調暗光源後的安靜收整，給自己溫和的放鬆提示。"
  }
};

export default function App() {
  const [currentStep, setCurrentStep] = useState('home'); // 'home' | 'quiz' | 'result'
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [copied, setCopied] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  // Quiz navigation
  const handleSelectOption = (questionId, option) => {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    if (quizIndex < QUESTIONS.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setCurrentStep('result');
    }
  };

  const handlePrevQuiz = () => {
    if (quizIndex > 0) {
      setQuizIndex(quizIndex - 1);
    } else {
      setCurrentStep('home');
    }
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setQuizIndex(0);
    setCurrentStep('quiz');
  };

  // Determine scent profile based on step 2 answer
  const chosenFamily = answers[2]?.family?.toLowerCase() || 'woody';
  const profile = SCENT_PROFILES[chosenFamily] || SCENT_PROFILES.woody;

  const copyResultToClipboard = () => {
    const text = `【SCENT MIRAGE × AromaMood 個人香氣靈感卡】\n` +
      `氣味風格：${profile.title} (${profile.family})\n` +
      `前調意象：${profile.top}\n` +
      `中調質感：${profile.heart}\n` +
      `基調餘韻：${profile.base}\n` +
      `生活轉場建議：${profile.scene}\n\n` +
      `*註：僅作生活感官聯想記錄，非醫療診斷或精油處方。`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EA] text-[#302C28] font-sans antialiased selection:bg-[#E9E1D5] selection:text-[#302C28]">
      {/* 頂部極簡導覽列 */}
      <header className="sticky top-0 z-40 bg-[#F5F1EA]/90 backdrop-blur-md border-b border-[#D8CFC4]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div 
            onClick={() => { setCurrentStep('home'); setQuizIndex(0); }}
            className="cursor-pointer group flex items-center space-x-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#A87545] group-hover:scale-125 transition-transform"></span>
            <span className="font-serif tracking-widest text-base sm:text-lg font-medium text-[#302C28]">
              SCENT MIRAGE
            </span>
            <span className="text-xs tracking-wider text-[#7D746B] font-light">× AromaMood</span>
          </div>
          <nav className="flex items-center space-x-4 text-xs tracking-wider text-[#7D746B]">
            <button 
              onClick={() => {
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setCurrentStep('home');
              }}
              className="hover:text-[#302C28] transition-colors py-1 px-2"
            >
              三項提案
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('safety-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#302C28] transition-colors py-1 px-2 hidden sm:inline-block"
            >
              安全須知
            </button>
          </nav>
        </div>
      </header>

      {/* 主要內容切換 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* VIEW 1: HOME PAGE */}
        {currentStep === 'home' && (
          <div className="space-y-16 animate-fadeIn">
            {/* Hero Section */}
            <section className="text-center space-y-6 pt-6 sm:pt-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E9E1D5]/70 border border-[#D8CFC4] text-xs text-[#7D746B] tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#A87545]" />
                <span>1 分鐘日常感官留白探索</span>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#302C28] leading-tight">
                用 1 分鐘探索此刻偏好的<br className="hidden sm:inline" />香氣氛圍
              </h1>
              
              <p className="text-sm sm:text-base text-[#7D746B] leading-relaxed font-light">
                氣味不是解決疲勞的靈丹妙藥，它只是一枚溫和的感官提示。<br />
                隨心記錄當下的生活節奏與偏好，為自己整理一張專屬的香氣靈感卡。
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => { setCurrentStep('quiz'); setQuizIndex(0); }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#302C28] hover:bg-[#48423C] text-[#F5F1EA] text-sm tracking-wider font-medium flex items-center justify-center space-x-2 transition-all shadow-[0_4px_16px_rgba(48,44,40,0.12)] hover:shadow-[0_6px_20px_rgba(48,44,40,0.18)]"
                >
                  <Compass className="w-4 h-4 text-[#A87545]" />
                  <span>開始香氣探索</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <a
                  href="#products-section"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#D8CFC4] bg-white/40 hover:bg-white/80 text-[#302C28] text-sm tracking-wider transition-all text-center"
                >
                  查看三項商品
                </a>
              </div>

              <p className="text-xs text-[#7D746B]/80 pt-2 font-light">
                只供感官探索與生活筆記，不作醫療或心理診斷，亦不保證任何生理效果。
              </p>
            </section>

            {/* 3 Core Highlights (Micro-Rituals) */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="p-6 rounded-2xl bg-[#E9E1D5]/40 border border-[#D8CFC4] space-y-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#A87545]">
                  <Feather className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base font-medium text-[#302C28]">晨間出門前的感官提醒</h3>
                <p className="text-xs text-[#7D746B] leading-relaxed">
                  出門前花一分鐘，留意玄關空氣、清晨微風或剛切開的新鮮果皮香，作為開啟新一天的清爽錨點。
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#E9E1D5]/40 border border-[#D8CFC4] space-y-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#77806B]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base font-medium text-[#302C28]">工作結束時的物件歸位</h3>
                <p className="text-xs text-[#7D746B] leading-relaxed">
                  合上筆電螢幕，將桌面筆筒與紙張歸位，配合室內原有的木質氣息，以物理動作宣告公務告一段落。
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#E9E1D5]/40 border border-[#D8CFC4] space-y-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#A66F60]">
                  <Droplet className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base font-medium text-[#302C28]">晚間環境的安靜收整</h3>
                <p className="text-xs text-[#7D746B] leading-relaxed">
                  調暗光源，打開窗戶流通新鮮空氣，靜靜感受空間氣流與呼吸，在日常中保留一段無目的的純粹留白。
                </p>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: QUIZ STEP FLOW */}
        {currentStep === 'quiz' && (
          <div className="max-w-xl mx-auto space-y-8 animate-fadeIn">
            {/* Quiz Navigation & Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#7D746B]">
                <button 
                  onClick={handlePrevQuiz}
                  className="flex items-center space-x-1 hover:text-[#302C28] transition-colors py-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>返回上一題</span>
                </button>
                <span className="tracking-widest font-serif">
                  步驟 {quizIndex + 1} / {QUESTIONS.length}
                </span>
                <button 
                  onClick={handleResetQuiz}
                  className="flex items-center space-x-1 hover:text-[#302C28] transition-colors py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>重置</span>
                </button>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-1 bg-[#D8CFC4]/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#A87545] transition-all duration-300 ease-out"
                  style={{ width: `${((quizIndex + 1) / QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white/70 border border-[#D8CFC4] rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_4px_24px_rgba(48,44,40,0.04)]">
              <div className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#302C28]">
                  {QUESTIONS[quizIndex].title}
                </h2>
                <p className="text-xs sm:text-sm text-[#7D746B] font-light">
                  {QUESTIONS[quizIndex].subtitle}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {QUESTIONS[quizIndex].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(QUESTIONS[quizIndex].id, opt)}
                    className="w-full text-left p-4 rounded-xl border border-[#D8CFC4]/80 bg-[#F5F1EA]/30 hover:bg-[#E9E1D5]/60 hover:border-[#A87545] transition-all group focus:outline-none focus:ring-1 focus:ring-[#A87545]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm sm:text-base text-[#302C28] group-hover:text-[#A87545] transition-colors">
                        {opt.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#7D746B] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    {opt.desc && (
                      <p className="text-xs text-[#7D746B] mt-1 font-light leading-relaxed">
                        {opt.desc}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-[11px] text-[#7D746B]">
              本測試不保存任何個人私隱資料，結果僅供感官生活記錄參考。
            </p>
          </div>
        )}

        {/* VIEW 3: RESULTS CARD */}
        {currentStep === 'result' && (
          <div className="max-w-2xl mx-auto space-y-12 animate-fadeIn">
            {/* The Scent Inspiration Card */}
            <div className="bg-[#FAF8F5] border-2 border-[#D8CFC4] rounded-3xl p-6 sm:p-10 shadow-[0_12px_32px_rgba(48,44,40,0.06)] relative overflow-hidden">
              {/* Top Card Badge */}
              <div className="flex items-center justify-between border-b border-[#D8CFC4]/60 pb-4 mb-6">
                <div>
                  <span className="text-[10px] tracking-widest text-[#7D746B] uppercase font-mono">
                    SCENT MIRAGE × AROMAMOOD
                  </span>
                  <h3 className="font-serif text-xs text-[#A87545] tracking-wider mt-0.5">
                    個人香氣靈感卡 ｜ SCENT INSPIRATION CARD
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#E9E1D5] text-[11px] text-[#302C28] font-medium">
                  {profile.family}
                </span>
              </div>

              {/* Main Scent Title */}
              <div className="space-y-2 mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#302C28] font-normal">
                  {profile.title}
                </h2>
                <p className="italic text-xs sm:text-sm text-[#7D746B] font-serif">
                  "{profile.quote}"
                </p>
              </div>

              {/* Olfactory Structure */}
              <div className="bg-[#F5F1EA]/60 rounded-xl p-4 sm:p-5 border border-[#D8CFC4]/70 space-y-3 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[#A87545] block font-mono text-[10px] uppercase">Top Note ｜ 前調意象</span>
                    <span className="text-[#302C28] font-medium mt-0.5 block">{profile.top}</span>
                  </div>
                  <div>
                    <span className="text-[#77806B] block font-mono text-[10px] uppercase">Heart Note ｜ 中調質感</span>
                    <span className="text-[#302C28] font-medium mt-0.5 block">{profile.heart}</span>
                  </div>
                  <div>
                    <span className="text-[#7D746B] block font-mono text-[10px] uppercase">Base Note ｜ 尾韻留白</span>
                    <span className="text-[#302C28] font-medium mt-0.5 block">{profile.base}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Moment */}
              <div className="space-y-1 text-xs text-[#7D746B] mb-6">
                <span className="font-medium text-[#302C28] block">適合安排轉場的日常節點：</span>
                <p className="leading-relaxed font-light">{profile.scene}</p>
              </div>

              {/* User Selections Summary */}
              <div className="border-t border-[#D8CFC4]/60 pt-4 flex flex-wrap gap-2 text-[11px] text-[#7D746B]">
                <span className="px-2 py-0.5 rounded bg-white/70 border border-[#D8CFC4]/50">
                  節奏：{answers[1]?.label || '留白'}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/70 border border-[#D8CFC4]/50">
                  偏好：{answers[3]?.label || '自然木質'}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/70 border border-[#D8CFC4]/50">
                  時段：{answers[4]?.label || '晚間收整'}
                </span>
              </div>

              {/* Card Footer Warning */}
              <p className="text-[10px] text-[#7D746B]/80 mt-6 border-t border-[#D8CFC4]/40 pt-3 text-center">
                本卡僅供個人生活感官聯想記錄，無任何醫療、心理診斷或生理療效承諾。
              </p>
            </div>

            {/* Action Buttons for Card */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={copyResultToClipboard}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#D8CFC4] bg-white hover:bg-[#E9E1D5]/40 text-xs text-[#302C28] font-medium flex items-center justify-center space-x-1.5 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#7D746B]" />}
                <span>{copied ? '已複製靈感筆記' : '複製靈感文字'}</span>
              </button>
              <button
                onClick={handleResetQuiz}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-transparent hover:border-[#D8CFC4] text-xs text-[#7D746B] hover:text-[#302C28] transition-all flex items-center justify-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重新探索</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 4: THE 3 CORE VERIFIED OFFERINGS (Single Source of Truth) */}
        <section id="products-section" className="pt-16 border-t border-[#D8CFC4]/80 space-y-10">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono tracking-widest text-[#A87545] uppercase">
              Curated Offerings
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#302C28] font-normal">
              為日常轉場安排的 3 項具體提案
            </h2>
            <p className="text-xs sm:text-sm text-[#7D746B] font-light leading-relaxed">
              從零負擔的數位手札，到按單手作的實體滾珠油，以及線下的沉浸式沙龍體驗。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {CONFIG.products.map((prod) => (
              <div 
                key={prod.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative border ${
                  prod.isPrimary 
                    ? 'bg-white border-[#A87545] shadow-[0_8px_24px_rgba(168,117,69,0.08)] ring-1 ring-[#A87545]/30' 
                    : 'bg-[#F5F1EA]/80 border-[#D8CFC4] hover:bg-white hover:border-[#7D746B]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono tracking-wider px-2 py-0.5 rounded bg-[#E9E1D5] text-[#302C28]">
                      {prod.tag}
                    </span>
                    <span className="text-xs text-[#7D746B]">{prod.type}</span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#302C28] mb-1">
                    {prod.title}
                  </h3>
                  
                  <div className="text-2xl font-serif text-[#302C28] mb-3">
                    {prod.price}
                  </div>

                  <p className="text-xs text-[#7D746B] font-light leading-relaxed mb-6">
                    {prod.desc}
                  </p>

                  <div className="space-y-2 border-t border-[#D8CFC4]/50 pt-4 mb-6">
                    {prod.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start text-xs text-[#7D746B]">
                        <Check className="w-3.5 h-3.5 text-[#A87545] mr-2 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {prod.id === 'journal' ? (
                    <a
                      href={CONFIG.gumroadJournalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-[#302C28] hover:bg-[#48423C] text-[#F5F1EA] text-xs font-medium tracking-wider flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                    >
                      <span>{prod.ctaText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setActiveModalProduct(prod)}
                      className="w-full py-3 rounded-xl border border-[#D8CFC4] bg-white hover:bg-[#E9E1D5]/50 text-xs text-[#302C28] font-medium tracking-wider transition-colors"
                    >
                      {prod.ctaText}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#E9E1D5]/40 border border-[#D8CFC4] text-xs text-[#7D746B] text-center max-w-2xl mx-auto">
            * 價格為 2026 年當前生效版本。全站已完全廢止舊版 HK$580 / HK$1,060 及 75 分鐘工作坊方案。
          </div>
        </section>

        {/* VIEW 5: SAFETY DISCLAIMER (BILINGUAL) */}
        <section id="safety-section" className="pt-16 max-w-2xl mx-auto space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#E9E1D5]/50 border border-[#D8CFC4] space-y-4">
            <div className="flex items-center space-x-2 text-[#A87545]">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-serif text-sm font-medium tracking-wider text-[#302C28]">
                安全與使用須知 ｜ Precautionary Notes
              </h3>
            </div>

            <div className="space-y-3 text-xs text-[#7D746B] leading-relaxed font-light">
              <p>
                <strong>繁體中文：</strong> 本內容與手札只供個人感官探索與生活記錄，不提供醫療診斷、心理治療或個人化健康建議，亦不保證任何生理或情緒效果。完成測驗或手札不需要使用精油。若在日常使用香氛產品，請遵照產品標示並保持空氣流通；切勿口服精油，亦勿將未稀釋純精油直接塗抹於皮膚。若感到不適，請立即停止使用並通風。若空間內有嬰幼兒、寵物，或正值孕期、哺乳及氣道敏感人士，請先確認產品適用性。
              </p>
              <p className="border-t border-[#D8CFC4]/50 pt-3">
                <strong>English:</strong> This material is for personal sensory exploration and everyday journaling only. It does not provide medical diagnosis, psychological treatment, or individualized health advice, and makes no claim of physiological benefit. No essential oils are required. If you use fragrance products, follow labels and ventilate spaces. Do not ingest or apply undiluted oils to skin. Stop and ventilate if discomfort occurs.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 預約/查詢彈窗 (無 alert, 純 UI Modal) */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FAF8F5] border border-[#D8CFC4] rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-wider text-[#A87545] uppercase">
                {activeModalProduct.type}
              </span>
              <h3 className="font-serif text-xl text-[#302C28] font-normal">
                {activeModalProduct.title} ({activeModalProduct.price})
              </h3>
            </div>

            <div className="text-xs text-[#7D746B] space-y-3 leading-relaxed">
              <p>
                {activeModalProduct.id === 'roller' 
                  ? '本滾珠油採極小批次「按單新鮮調製」，確保原料品質。目前提供 5ml 琥珀色鋼珠瓶規格，下單後需 3–5 個工作天調配準備，運費按順鋒到付實收。'
                  : '「心靈鏡像」90 分鐘調香工作坊為創作型感官體驗（非心理治療服務）。目前採預約審核制，歡迎透過 Instagram 私訊查詢近期開放場次、地點與名額。'}
              </p>
              <div className="p-3 bg-[#E9E1D5]/60 rounded-lg text-[#302C28]">
                <strong>聯絡與查詢途徑：</strong><br />
                Instagram: {CONFIG.instagramHandle}<br />
                工作沙龍：香港指定預約空間
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <a
                href={CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-[#302C28] text-[#F5F1EA] text-xs font-medium text-center hover:bg-[#48423C] transition-colors"
              >
                前往 Instagram 查詢
              </a>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="px-4 py-2.5 rounded-xl border border-[#D8CFC4] text-xs text-[#7D746B] hover:text-[#302C28] transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 頁尾 Footer */}
      <footer className="border-t border-[#D8CFC4]/60 bg-[#E9E1D5]/30 py-10 mt-16 text-xs text-[#7D746B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-serif tracking-widest text-sm text-[#302C28]">SCENT MIRAGE APOTHECARY</span>
            <p className="text-[11px] font-light">© 2026 All Rights Reserved. 個人感官留白練習。</p>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <a 
              href={CONFIG.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#302C28] transition-colors"
            >
              {CONFIG.instagramHandle}
            </a>
            <span>•</span>
            <span>aromamood.lovable.app</span>
          </div>
        </div>
      </footer>
    </div>
  );
}