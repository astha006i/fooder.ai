"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Mail, Lock, Eye, EyeOff, ArrowUpRight, Search, ShoppingCart,
  Clock, Heart, Smartphone, BarChart3, ClipboardList, Utensils, Leaf,
  Menu, X, ChefHat, Users, TrendingDown,
  Zap, Award, Recycle, BrainCircuit, Sparkles, BookOpen, CircleCheck,
} from "lucide-react";

const CREAM = "#fceabc";
const BEIGE = "#f0d4a6";
const FOREST = "#274D2F";
const OLIVE = "#355F39";
const ORANGE = "#B96A28";
const GOLDEN = "#C88B42";
const DARK = "#2E2B28";

const IMG = (name: string) => `/transparent_images/${name}.png`;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function StatItem({ stat }: { stat: { value: number; suffix: string; label: string; icon: React.ElementType } }) {
  const { ref, count } = useCountUp(stat.value);
  return (
    <div ref={ref} className="text-center">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: "rgba(39,77,47,0.08)" }}><stat.icon className="h-6 w-6" style={{ color: FOREST }} /></div>
      <div className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>{count}{stat.suffix}</div>
      <div className="text-xs sm:text-sm mt-1" style={{ fontFamily: "var(--font-lora)", color: "#8A8580" }}>{stat.label}</div>
    </div>
  );
}

function AnimDiv({ children, className = "", delay = 0, id, style }: { children: React.ReactNode; className?: string; delay?: number; id?: string; style?: React.CSSProperties }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} id={id} className={className} style={{ ...style, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return { ref, count };
}

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: 1000, suffix: "+", label: "Healthy Recipes", icon: BookOpen },
  { value: 50, suffix: "+", label: "Real-time Grocery Prices", icon: BarChart3 },
  { value: 3, suffix: "+", label: "Top Grocery Partners", icon: ShoppingCart },
  { value: 24, suffix: "/7", label: "WhatsApp Support", icon: Smartphone },
];

const FEATURES = [
  { img: IMG("plan_your_meals"), title: "Plan Your Meals", desc: "AI creates personalized weekly menus based on your diet, budget, and lifestyle preferences." },
  { img: IMG("compare_prices"), title: "Compare Prices", desc: "Real-time price comparison across Swiggy Instamart, Zepto, and Blinkit for every item." },
  { img: IMG("discover_recipes"), title: "Discover Recipes", desc: "Browse curated recipes with step-by-step instructions matched to your taste profile." },
  { img: IMG("whatsapp_logo"), title: "WhatsApp Reminders", desc: "Get meal prep reminders and grocery lists delivered directly to your WhatsApp." },
  { img: IMG("track_nutrition"), title: "Track Nutrition", desc: "Monitor calories, macros, and nutrition goals with clear visual progress tracking." },
];

const WHY_ITEMS = [
  { icon: Clock, label: "Saves Time" },
  { icon: TrendingDown, label: "Saves Money" },
  { icon: Heart, label: "Healthy Eating" },
  { icon: Recycle, label: "Less Food Waste" },
  { icon: Sparkles, label: "Zero Meal Planning Stress" },
];

const STEPS = [
  { img: IMG("tell_us_about_you"), title: "Tell Us About You", desc: "Share your dietary preferences, budget, and schedule." },
  { img: IMG("ai_creates_your_weekly_menu"), title: "AI Creates Your Weekly Menu", desc: "Our AI curates balanced, budget-friendly meal plans." },
  { img: IMG("compare_grocery_prices"), title: "Compare Grocery Prices", desc: "Find the best deals across top grocery platforms." },
  { img: IMG("cook_enjoy_and_track"), title: "Cook, Enjoy & Track", desc: "Follow recipes, enjoy meals, and track your progress." },
];

const SOCIAL_USERS = [
  { icon: Users, label: "Students" },
  { icon: Zap, label: "Professionals" },
  { icon: Heart, label: "Families" },
  { icon: ChefHat, label: "Fitness Enthusiasts" },
  { icon: Users, label: "Home Cooks" },
];

export default function HomePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [mobileNav, setMobileNav] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setError("Please fill in both fields."); return; }
    setError(""); router.push("/dashboard");
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden" style={{ backgroundColor: CREAM, color: DARK }}>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E2B28' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header id="top" className="sticky top-0 z-50 py-4">
            <nav className="flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3" style={{ backgroundColor: "rgba(233, 210, 171, 0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,139,66,0.15)" }}>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: FOREST }}><ChefHat className="h-5 w-5 text-white" /></div>
                <div>
                  <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>Fooder</span>
                  <span className="font-bold text-lg" style={{ fontFamily: "var(--font-cormorant)", color: ORANGE }}>.AI</span>
                  <span className="block text-[9px] tracking-wider uppercase" style={{ color: GOLDEN, fontFamily: "var(--font-lora)" }}>Your AI Chef</span>
                </div>
              </div>
              <nav className="hidden lg:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <a key={link.label} href={link.href} onClick={() => setActiveNav(link.label)} className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors" style={{ fontFamily: "var(--font-lora)", color: activeNav === link.label ? FOREST : DARK }}>
                    {link.label}
                    {activeNav === link.label && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full" style={{ backgroundColor: ORANGE }} />}
                  </a>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                <Link href="/login" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg" style={{ backgroundColor: FOREST, fontFamily: "var(--font-lora)" }}>Log In / Sign Up</Link>
                <button onClick={() => setMobileNav(!mobileNav)} className="lg:hidden p-2 rounded-lg" style={{ color: FOREST }}>{mobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
              </div>
            </nav>
            {mobileNav && (
              <div className="lg:hidden mt-2 rounded-2xl p-4 space-y-1" style={{ backgroundColor: "rgba(225, 206, 174, 0.95)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,139,66,0.15)" }}>
                {NAV_LINKS.map((link) => (
                  <a key={link.label} href={link.href} onClick={() => { setActiveNav(link.label); setMobileNav(false); }} className="block px-4 py-2.5 rounded-lg text-sm font-medium" style={{ fontFamily: "var(--font-lora)", color: activeNav === link.label ? FOREST : DARK }}>{link.label}</a>
                ))}
                <Link href="/login" className="block text-center px-4 py-2.5 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: FOREST }}>Log In / Sign Up</Link>
              </div>
            )}
          </header>
        </div>

        {/* ========== HERO SECTION ========== */}
        <section className="relative overflow-hidden" style={{ minHeight: "90vh", paddingBottom: "0px" }}>
          <img src={IMG("leaf_01")} alt="" className="absolute pointer-events-none z-[60] hidden lg:block animate-sway" style={{ width: "220px", left: "3%", top: "10%", opacity: 0.12 }} />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
            <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-8">
              {/* ── LEFT COLUMN ── */}
              <div className="relative lg:w-[55%] flex-shrink-0">
                <div className="relative z-[3] flex flex-col gap-6 pr-4">
                  <AnimDiv>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-0" style={{ backgroundColor: "rgba(221, 203, 188, 0.1)", border: "1px dashed rgba(185,106,40,0.3)" }}>
                      <ChefHat className="h-4 w-4" style={{ color: ORANGE }} />
                      <span style={{ fontFamily: "var(--font-caveat)", color: ORANGE, fontSize: "1.1rem" }}>Votre Chef.</span>
                    </div>
                  </AnimDiv>

                  <AnimDiv delay={0.1} className="relative">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-[-0.06em]" style={{ fontFamily: "var(--font-cormorant)" }}>
                      <span style={{ color: FOREST }}>SMARTER MEALS,</span><br /><span style={{ color: ORANGE }}>BETTER YOU.</span>
                    </h1>
                  </AnimDiv>

                  <AnimDiv delay={0.2}>
                    <p className="text-sm sm:text-base italic leading-relaxed w-full" style={{ fontFamily: "var(--font-lora)", color: "#5A5550" }}>
                      <span> Fooder.AI helps you create healthy, budget-friendly meals in minutes using</span><br />
                      ingredients already available in your fridge.
                    </p>
                  </AnimDiv>

                  <AnimDiv delay={0.3}>
                    <div className="flex flex-wrap gap-6">
                      {[{ icon: Leaf, label: "Eat Better", sub: "Balanced nutrition" }, { icon: TrendingDown, label: "Save Money", sub: "Smart grocery prices" }, { icon: Heart, label: "Live Healthier", sub: "Track your goals" }].map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(39,77,47,0.08)" }}><item.icon className="h-5 w-5" style={{ color: FOREST }} /></div>
                          <div><div className="text-sm font-bold" style={{ fontFamily: "var(--font-lora)", color: DARK }}>{item.label}</div><div className="text-xs" style={{ fontFamily: "var(--font-lora)", color: "#8A8580" }}>{item.sub}</div></div>
                        </div>
                      ))}
                    </div>
                  </AnimDiv>

                  <AnimDiv delay={0.4}>
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <Link href="/login" className="inline-flex items-center justify-center gap-2 px-1 py-2 rounded-full text-[10px] font-semibold text-white transition-all hover:scale-105 hover:shadow-lg flex-1 min-w-[50px]" style={{ backgroundColor: FOREST, fontFamily: "var(--font-lora)" }}>Get Started</Link>
                        <Link href="/login" className="inline-flex items-center justify-center gap-2 px-1 py-2 rounded-full text-[10px] font-semibold transition-all hover:scale-105 flex-1 min-w-[50px]" style={{ backgroundColor: "rgba(177, 159, 109, 0.7)", border: "1px solid rgba(200,139,66,0.15)", color: FOREST, fontFamily: "var(--font-lora)" }}>Log In</Link>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm italic animate-sway" style={{ fontFamily: "var(--font-caveat)", color: GOLDEN }}>It&apos;s free &amp; takes less than a minute!</span>
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" style={{ color: GOLDEN, transform: "rotate(180deg)" }}><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                  </AnimDiv>
                </div>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div className="relative lg:w-[45%] flex-shrink-0 flex items-start justify-center">
                <img src="/food/login_transparent_images/goodchoices.png" alt="" className="absolute pointer-events-none hidden lg:block z-[10] animate-sway" style={{ width: "190px", right: "60px", top: "-100px", opacity: 1 }} />
                <img src={IMG("large_salad_bowl")} alt="" className="absolute pointer-events-none hidden lg:block z-[2]" style={{ width: "190px", left: "-112px", top: "-5px", opacity: 1 }} />
                <img src={IMG("tea")} alt="" className="absolute pointer-events-none hidden lg:block z-30" style={{ width: "290px", right: "-150px", bottom: "-120px", opacity: 1 }} />
                <img src={IMG("eiffel_tower")} alt="" className="absolute pointer-events-none hidden lg:block z-[6]" style={{ width: "290px", right: "-75px", bottom: "-10px", opacity: 1 }} />
                <img src={IMG("croissant")} alt="" className="absolute pointer-events-none hidden lg:block z-[30]" style={{ width: "170px", right: "-100px", bottom: "160px", opacity: 1 }} />

                {/* Login card */}
                <AnimDiv delay={0.3} className="relative z-[5] w-full max-w-[390px]">
                  <div className="rounded-[20px] px-8 py-10" style={{ backgroundColor: "#ecdcc4", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
                    <div className="text-center mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: "rgba(39,77,47,0.1)" }}><ChefHat className="h-5 w-5" style={{ color: FOREST }} /></div>
                      <h2 className="text-[2.5rem] font-bold" style={{ fontFamily: "var(--font-caveat)", color: DARK }}>Bienvenue!</h2>
                      <p className="text-xs mt-0.5" style={{ fontFamily: "var(--font-lora)", color: "#434b3a" }}>Let&apos;s continue your delicious journey.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2.5 w-full">
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: "#B0AAA3" }} />
                        <input type="text" placeholder="Email or username" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-full py-2.5 pl-10 pr-3 text-xs outline-none" style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,139,66,0.2)", fontFamily: "var(--font-lora)", color: DARK }} />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: "#B0AAA3" }} />
                        <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-full py-2.5 pl-10 pr-9 text-xs outline-none" style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,139,66,0.2)", fontFamily: "var(--font-lora)", color: DARK }} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#B0AAA3" }}>{showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</button>
                      </div>
                      {error && <p className="text-[10px] text-red-500">{error}</p>}
                      <div className="flex justify-end"><a href="#" className="text-[10px] font-medium hover:underline" style={{ color: GOLDEN }}>Forgot password?</a></div>
                      {!success ? (
                        <button type="submit" className="w-full rounded-full py-2.5 text-white font-semibold text-xs shadow-md transition-all hover:shadow-lg hover:scale-[1.02]" style={{ backgroundColor: FOREST, fontFamily: "var(--font-lora)" }}>Log In</button>
                      ) : (
                        <div className="rounded-full py-2.5 text-center font-semibold text-xs" style={{ backgroundColor: "rgba(39,77,47,0.1)", color: FOREST }}>You&apos;re in! Welcome back!</div>
                      )}
                    </form>
                    <div className="my-4 flex items-center gap-2 w-full">
                      <span className="flex-1 h-px" style={{ backgroundColor: "rgba(200,139,66,0.2)" }} />
                      <span className="text-[9px] uppercase tracking-wider font-semibold" style={{ fontFamily: "var(--font-lora)", color: "#B0AAA3" }}>or continue with</span>
                      <span className="flex-1 h-px" style={{ backgroundColor: "rgba(200,139,66,0.2)" }} />
                    </div>
                    <div className="grid grid-cols-3 gap-2.5 w-full">
                      <button type="button" className="flex items-center justify-center rounded-xl py-2.5 transition-all hover:scale-105" style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,139,66,0.15)" }}>
                        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      </button>
                      <button type="button" className="flex items-center justify-center rounded-xl py-2.5 transition-all hover:scale-105" style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,139,66,0.15)" }}>
                        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#000" d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                      </button>
                      <button type="button" className="flex items-center justify-center rounded-xl py-2.5 transition-all hover:scale-105" style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,139,66,0.15)" }}><Mail className="h-4 w-4" style={{ color: DARK }} /></button>
                    </div>
                    <p className="mt-4 text-center text-[10px]" style={{ fontFamily: "var(--font-lora)", color: "#B0AAA3" }}>New here? <Link href="/login" className="font-semibold hover:underline" style={{ color: FOREST }}>Sign up</Link></p>
                  </div>
                </AnimDiv>
              </div>
            </div>
          </div>
        </section>

        {/* ========== STATS SECTION ========== */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimDiv className="mb-20 relative">
            <img src={IMG("tomato")} alt="" className="absolute pointer-events-none hidden lg:block z-30 animate-sway" style={{ width: "270px", left: "-100px", top: "-70px", opacity: 1 }} />
            <img src={IMG("chair")} alt="" className="absolute pointer-events-none hidden lg:block z-30" style={{ width: "170px", left: "-120px", top: "-475px", opacity: 1 }} />
            <div className="rounded-3xl p-6 sm:p-8" style={{ backgroundColor: BEIGE, border: "1px solid rgba(200,139,66,0.15)" }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat) => (
                  <StatItem key={stat.label} stat={stat} />
                ))}
              </div>
            </div>
          </AnimDiv>

          {/* ========== FEATURES SECTION ========== */}
          <section id="features" className="mb-20 relative">
            <AnimDiv className="text-center mb-12 relative">
              <img src={IMG("croissant")} alt="" className="absolute pointer-events-none hidden lg:block z-10" style={{ width: "250px", left: "100%", transform: "translateX(-50%)", top: "-50px", opacity: 1 }} />
              <p className="text-xl m-1" style={{ fontFamily: "var(--font-caveat)", color: ORANGE }}>Here&apos;s what we offer</p>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>What You Can Do</h2>
            </AnimDiv>
            <div className="grid gap-6 grid-cols-5">
              {FEATURES.map((feat, i) => (
                <AnimDiv key={feat.title} delay={i * 0.1}>
                  <div className="group rounded-2xl p-6 transition-all hover:shadow-xl hover:-translate-y-1 cursor-default h-full" style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(200,139,66,0.12)" }}>
                    <img src={feat.img} alt={feat.title} className="w-[120px] h-[120px] object-contain mb-4 group-hover:scale-110 transition-transform mx-auto" />
                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-cormorant)", color: DARK }}>{feat.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-lora)", color: "#8A8580" }}>{feat.desc}</p>
                  </div>
                </AnimDiv>
              ))}
            </div>
            <AnimDiv delay={0.5} className="mt-8 relative">
              <img src={IMG("small_salad_bowl")} alt="" className="absolute pointer-events-none hidden lg:block z-10" style={{ width: "290px", right: "-130px", top: "-30px", opacity: 1, transform: "scaleX(-1)" }} />
              <div className="flex items-center gap-6 rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(200,139,66,0.12)" }}>
                <img src={IMG("export_gricery_list")} alt="Export Grocery List" className="w-28 h-28 object-contain flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-cormorant)", color: DARK }}>Export Grocery Lists</h3>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-lora)", color: "#8A8580" }}>One-click export of optimized shopping lists sorted by platform for easy ordering.</p>
                </div>
              </div>
            </AnimDiv>
          </section>

          {/* ========== WHY USERS LOVE SECTION ========== */}
          <AnimDiv className="mb-20 relative" style={{ marginTop: "60px" }}>
            <img src={IMG("garlic")} alt="" className="absolute pointer-events-none hidden lg:block z-30 animate-sway" style={{ width: "350px", left: "-160px", top: "-60px", opacity: 1 }} />
            <img src={IMG("garlic")} alt="" className="absolute -right-4 bottom-8 w-20 lg:w-28 pointer-events-none animate-sway-reverse z-10 hidden sm:block" />
            <div className="rounded-3xl p-8 sm:p-10 text-center relative z-20" style={{ backgroundColor: FOREST }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>Why Users Love Fooder.AI</h2>
              <p className="text-sm mb-8" style={{ fontFamily: "var(--font-lora)", color: "rgba(255,255,255,0.7)" }}>Trusted by thousands of happy meal planners</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {WHY_ITEMS.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}><item.icon className="h-5 w-5 text-white" /></div>
                    <span className="text-xs font-medium text-white text-center" style={{ fontFamily: "var(--font-lora)" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimDiv>

          {/* ========== HOW IT WORKS SECTION ========== */}
          <section id="how-it-works" className="mb-20">
            <AnimDiv className="text-center mb-12">
              <p className="text-xl mb-2" style={{ fontFamily: "var(--font-caveat)", color: ORANGE }}>Simple as 1-2-3-4</p>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>How It Works</h2>
            </AnimDiv>
            <div className="relative">
              <div className="hidden lg:block absolute top-28 left-[12%] right-[12%] h-0.5" style={{ backgroundImage: `repeating-linear-gradient(90deg, ${GOLDEN}40 0, ${GOLDEN}40 8px, transparent 8px, transparent 16px)` }} />
              <div className="grid gap-8 lg:grid-cols-4">
                {STEPS.map((step, i) => (
                  <AnimDiv key={step.title} delay={i * 0.15}>
                    <div className="relative text-center">
                      <img src={step.img} alt={step.title} className="w-[216px] h-[216px] object-contain mx-auto mb-4" />
                      {i < 3 && <div className="hidden lg:block absolute top-24 -right-4 text-2xl" style={{ color: GOLDEN }}>&rarr;</div>}
                      <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-cormorant)", color: DARK }}>{step.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-lora)", color: "#8A8580" }}>{step.desc}</p>
                    </div>
                  </AnimDiv>
                ))}
              </div>
            </div>
            <AnimDiv className="text-center mt-10">
              <p className="text-xl italic" style={{ fontFamily: "var(--font-caveat)", color: GOLDEN }}>We plan. You cook. AI handles the rest!</p>
            </AnimDiv>
          </section>

          {/* ========== ABOUT SECTION ========== */}
          <section id="about" className="mb-20 relative">
            <img src={IMG("avocado")} alt="" className="absolute right-0 bottom-0 w-32 lg:w-55 pointer-events-none animate-sway z-30 hidden sm:block" />
            <div className="grid grid-cols-3 gap-16 relative z-20 items-center" style={{ minHeight: "580px" }}>

              {/* ── LEFT COLUMN ── */}
              <AnimDiv delay={0} className="flex flex-col items-start h-full">
                <img src={IMG("robot_chef")} alt="Robot Chef" className="object-contain mb-6" style={{ width: "120px", height: "auto", maxHeight: "40%" }} />
                <p className="text-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-lora)", color: "#5A5550", maxWidth: "320px", lineHeight: "1.9" }}>
                  Fooder.AI was built to help students, busy professionals, families, and budget-conscious users simplify meal planning. We believe everyone deserves healthy, delicious meals without the stress of planning and price shopping.
                </p>

              </AnimDiv>

              {/* ── CENTER COLUMN ── */}
              <AnimDiv delay={0.15} className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg leading-none" style={{ color: FOREST }}>─</span>
                  <h2 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>About Fooder.AI</h2>
                  <span className="text-lg leading-none" style={{ color: FOREST }}>─</span>
                </div>
                <p className="text-lg mb-6" style={{ fontFamily: "var(--font-caveat)", color: ORANGE }}>Inspired by real kitchens.</p>
                <img src={IMG("dinner_room")} alt="Dinner Room" className="object-cover rounded-lg mb-4" style={{ width: "280px" }} />
                <p className="text-sm text-center italic" style={{ fontFamily: "var(--font-caveat)", color: GOLDEN }}>A cosy vintage kitchen where culinary dreams come alive.</p>
              </AnimDiv>

              {/* ── RIGHT COLUMN ── */}
              <AnimDiv delay={0.3} className="flex flex-col items-start h-full">
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>Our Mission</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-lora)", color: "#5A5550", maxWidth: "320px", lineHeight: "1.9" }}>
                  We believe everyone deserves healthy, delicious meals without the stress of planning and price shopping.
                </p>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>Powered By</h3>
                <div className="space-y-2 mb-6">
                  {["Artificial Intelligence", "Machine Learning", "Recommendation Systems", "Real-time Grocery Pricing", "Nutrition Analysis"].map((text) => (
                    <div key={text} className="flex items-center gap-2">
                      <CircleCheck className="h-3.5 w-3.5" style={{ color: FOREST }} />
                      <span className="text-xs" style={{ fontFamily: "var(--font-lora)", color: "#5A5550" }}>{text}</span>
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>Built For</h3>
                <div className="flex items-center justify-between w-full max-w-[320px] gap-2">
                  {[{ icon: Users, label: "Students" }, { icon: Zap, label: "Professionals" }, { icon: Heart, label: "Families" }, { icon: ChefHat, label: "Fitness" }, { icon: Users, label: "Home Cooks" }].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-1.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ border: "1.5px solid rgba(39,77,47,0.25)" }}><item.icon className="h-3.5 w-3.5" style={{ color: FOREST }} /></div>
                      <span className="text-[7px] leading-tight text-center" style={{ color: "#5A5550", fontFamily: "var(--font-lora)" }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </AnimDiv>

            </div>
          </section>

          {/* ========== CONTACT SECTION ========== */}
          <AnimDiv className="mb-16" id="contact">
            <div className="relative rounded-3xl p-8 sm:p-12 text-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${FOREST} 0%, ${OLIVE} 100%)` }}>
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-caveat)", fontSize: "2.5rem" }}>Ready to eat smarter?</h2>
                <p className="text-sm sm:text-base mb-8" style={{ fontFamily: "var(--font-lora)", color: "rgba(255,255,255,0.8)" }}>Healthy meals. Best prices. Zero stress.</p>
                <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold shadow-xl transition-all hover:scale-105 hover:shadow-2xl" style={{ backgroundColor: ORANGE, fontFamily: "var(--font-lora)" }}>Get Started Now <ArrowUpRight className="h-5 w-5" /></Link>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(30%, -30%)" }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(-30%, 30%)" }} />
            </div>
          </AnimDiv>

          {/* ========== FOOTER ========== */}
          <footer className="pb-8">
            <div className="rounded-3xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: "rgba(255,255,255,0.4)", border: "1px solid rgba(200,139,66,0.1)" }}>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: FOREST }}><ChefHat className="h-4 w-4 text-white" /></div>
                <span className="font-bold" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>Fooder.AI</span>
              </div>
              <p className="text-xs" style={{ fontFamily: "var(--font-lora)", color: "#B0AAA3" }}>&copy; 2024 Fooder.AI. All rights reserved.</p>
              <div className="flex items-center gap-3">
                {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <a key={social} href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: "rgba(39,77,47,0.08)" }}><span className="text-xs font-bold" style={{ color: FOREST }}>{social[0]}</span></a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
