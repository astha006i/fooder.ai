"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, rgba } from "framer-motion";
import ProfileSidebar from "./components/ProfileSidebar";
import { DashboardPanelsProvider } from "./components/DashboardPanels";
import {
  ArrowLeft,
  ArrowRight,
  LogOut,
  ShoppingCart,
  Zap,
  TrendingUp,
  Star,
  Heart,
  CheckCircle2,
  Sparkles,
  User,
  Settings,
  Flame,
  Timer,
  UtensilsCrossed,
  Leaf,
  CircleDollarSign,
  Briefcase,
  Dumbbell,
  Users,
  ChevronDown,
} from "lucide-react";

const FOREST = "#274D2F";

const WOOD_BG = "/green_gingham_texture/green_gingham_texture.png";
const FOOD_IMG = "/salad_bowl_image/Untitled - 07 August 2026 at 00.56.34(1).png";

const NAV_TABS = [
  { id: 0, label: "Preference", icon: Settings },
  { id: 1, label: "Meal Plan", icon: UtensilsCrossed },
  { id: 2, label: "Groceries", icon: ShoppingCart },
  { id: 3, label: "Progress", icon: TrendingUp },
];

const PILL_INPUTS_ROW1 = [
  { icon: Leaf, label: "Diet", placeholder: "Select preference" },
  { icon: CircleDollarSign, label: "Budget", placeholder: "Weekly budget" },
  { icon: Flame, label: "Cuisine", placeholder: "Select cuisines" },
];

const PILL_INPUTS_ROW2 = [
  { icon: Briefcase, label: "Work Schedule", placeholder: "Select schedule" },
  { icon: Dumbbell, label: "Fitness Goal", placeholder: "Select goal" },
  { icon: Users, label: "Household Size", placeholder: "Members" },
];

const MEALS = [
  {
    id: 1,
    category: "BREAKFAST",
    title: "Avocado Toast with Poached Eggs",
    calories: 380,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    category: "LUNCH",
    title: "Grilled Chicken Quinoa Bowl",
    calories: 520,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    category: "DINNER",
    title: "Salmon Teriyaki with Steamed Rice",
    calories: 610,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
  },
];

/* Polaroid frames sliced from /frames_transparent/frames_transparent_final.png.
   `aspect` = frame width/height ratio; `slot` = the transparent photo cutout
   as % of the frame (left, top, width, height) measured from the sliced PNGs. */
const POLAROID_FRAMES = [
  { img: "/frames_transparent/breakfast_frame.png", aspect: 441 / 706, slot: { left: 12.47, top: 14.87, width: 72.56, height: 41.78 } },
  { img: "/frames_transparent/lunch_frame.png", aspect: 440 / 700, slot: { left: 13.18, top: 13.29, width: 72.27, height: 43.14 } },
  { img: "/frames_transparent/dinner_frame.png", aspect: 458 / 700, slot: { left: 14.85, top: 13, width: 69, height: 43 } },
];

const GROCERY_ITEMS = [
  { name: "Bread", qty: "2 lbs", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop" },
  { name: "Rice", qty: "2 kg", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80&h=80&fit=crop" },
  { name: "Potatoes", qty: "2 kilos", image: "https://images.unsplash.com/photo-1518977676601-b53f82ber630?w=80&h=80&fit=crop" },
  { name: "Tomatoes", qty: "1 kg", image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=80&h=80&fit=crop" },
  { name: "Eggs", qty: "12 pcs", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=80&h=80&fit=crop" },
  { name: "Chicken Breast", qty: "1 kg", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=80&h=80&fit=crop" },
];

const PRICES = {
  swiggy: [45, 82, 60, 35, 72, 180],
  zepto: [42, 78, 55, 32, 68, 175],
  blinkit: [48, 85, 62, 38, 75, 190],
};

const DROPDOWN_OPTIONS: Record<string, string[]> = {
  Diet: ["Vegetarian", "Vegan", "Non-Vegetarian", "Pescatarian", "Keto", "Paleo", "Mediterranean"],
  Budget: ["Under ₹500/week", "₹500-₹1000/week", "₹1000-₹2000/week", "₹2000+/week"],
  Cuisine: ["Indian", "Italian", "Chinese", "Mexican", "Japanese", "Thai", "French", "American"],
  "Work Schedule": ["Remote", "Hybrid", "Office 9-5", "Shift Work", "Student", "Freelancer"],
  "Fitness Goal": ["Weight Loss", "Muscle Gain", "Maintain Weight", "General Health", "Athletic Performance"],
  "Household Size": ["1 (Just Me)", "2 (Couple)", "3-4 (Family)", "5+ (Large Family)"],
};

export default function DashboardPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("open") === "menu") {
      window.history.replaceState({}, "", "/dashboard");
      const id = window.requestAnimationFrame(() => setIsProfileOpen(true));
      return () => window.cancelAnimationFrame(id);
    }
  }, []);

  const handleLeftClick = () => {
    setCurrentSection((prev) => Math.max(0, prev - 1));
  };

  const handleRightClick = () => {
    setCurrentSection((prev) => Math.min(3, prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") handleRightClick();
    if (e.key === "ArrowLeft") handleLeftClick();
  };

  const handleSendToCook = () => {
    const mealList = MEALS.map((meal) => `${meal.category} - ${meal.title} (${meal.calories} cal)`).join("\n");
    const message = `Hi! Here's my Fooder.AI meal plan for today:\n\n${mealList}\n\nPlease help me cook these!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <DashboardPanelsProvider>
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative w-full h-screen overflow-hidden outline-none"
      style={{
        backgroundImage: `url('${WOOD_BG}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "var(--font-lora)",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/10" />

      {/* Left illustration container - bowl + decorative scrapbook assets */}
      <div
        className="absolute top-1/2 -translate-y-1/2 z-[2] pointer-events-none"
        style={{ left: "-259px", width: "604px", height: "604px" }}
      >
        {/* Salad bowl - keeps its animations; static spoon & note stay fixed */}
        <motion.div
          className="absolute inset-0 z-[2]"
          animate={{
            rotate: currentSection * 90,
            scale: [1, 1.05, 1],
            filter: [
              "drop-shadow(0 0 0px rgba(0,0,0,0))",
              "drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
              "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
            ],
          }}
          transition={{
            rotate: { duration: 1, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 1, ease: [0.4, 0, 0.2, 1], times: [0, 0.5, 1] },
            filter: { duration: 1, ease: [0.4, 0, 0.2, 1], times: [0, 0.5, 1] },
          }}
        >
          <img
            src={FOOD_IMG}
            alt="Healthy meal"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Wooden spoon - static, diagonal in upper-right area of the bowl */}
        <img
          src="/transparent_pngs/spoon_spices.png"
          alt=""
          className="absolute pointer-events-none z-[1]"
          style={{
            width: "320px",
            right: "-190px",
            top: "40px",
            transform: "rotate(3deg)",
            filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.35))",
          }}
        />

        {/* Note card - static, tucked under the bottom-right edge of the bowl */}
        <img
          src="/transparent_pngs/note_card.png"
          alt=""
          className="absolute pointer-events-none z-[1]"
          style={{
            width: "260px",
            right: "-100px",
            top: "380px",
            transform: "rotate(-20deg)",
            filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.4))",
          }}
        />
      </div>

      {/* Navigation Bar - Top Center */}
      <nav className="absolute top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/20">
        {NAV_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentSection(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[#274D2F] text-white shadow-lg shadow-[#274D2F]/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[15px]" style={{ fontFamily: "var(--font-caveat)" }}>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Top Left: Avatar + Hi User */}
      <button
        onClick={() => setIsProfileOpen((prev) => !prev)}
        aria-expanded={isProfileOpen}
        aria-haspopup="dialog"
        className="absolute top-5 left-5 z-50 flex items-center gap-3 rounded-full transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-medium text-sm drop-shadow-md">Hi, User</span>
      </button>

      {/* Top Right: Logout */}
      <button onClick={() => router.push("/")} className="absolute top-5 right-5 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-all">
        <LogOut className="w-4 h-4" />
        Logout
      </button>

      {/* Section Content */}
      <div className="absolute inset-0 z-40">
        <AnimatePresence mode="wait">
          {/* Section 0: Preferences */}
          {currentSection === 0 && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex items-center justify-center pl-[38%] pr-8 md:pr-12 lg:pr-16"
            >
            <div className="w-full max-w-2xl mt-8">
              {/* Heading */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-19 w-19 object-contain drop-shadow-lg">
                    <img src="/fooder_ai_png_assets_transparent_updated (2)/logo.png" alt="Fooder.AI" className="h-full w-full object-contain drop-shadow-lg" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-0">
                      <span className="font-bold text-lg tracking-tight drop-shadow-lg" style={{ fontFamily: "var(--font-cormorant)", color: "#FFFFFF" }}>Fooder</span>
                      <span className="font-bold text-lg drop-shadow-lg" style={{ fontFamily: "var(--font-cormorant)", color: "#FFFFFF" }}>.AI</span>
                    </div>
                    <span className="block text-[9px] tracking-wider uppercase drop-shadow-md" style={{ color: "#FFFFFF", fontFamily: "var(--font-lora)" }}>Your AI Chef</span>
                  </div>
                </div>
                <p className="text-FOREST/90 text-base md:text-lg max-w-lg leading-relaxed drop-shadow-md">
                  Your AI will plan weekly meal preps tailored to your lifestyle.
                  <br />
                  Enter your preferences below to get started.
                </p>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                {PILL_INPUTS_ROW1.map((input) => {
                  const Icon = input.icon;
                  const isOpen = openDropdown === input.label;
                  const value = selectedValues[input.label];
                  return (
                    <div key={input.label} className="relative">
                      <div
                        onClick={() => setOpenDropdown(isOpen ? null : input.label)}
                        className="overflow-hidden rounded-lg px-8 py-5 flex items-center gap-2  shadow-black/60 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                        style={{
                          backgroundImage: "url('/assets/preference.png')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <Icon className="w-4 h-4 text-[#4A3520] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[20px] font-bold leading-tight" style={{ fontFamily: "var(--font-caveat)", color: "#3B2A18" }}>{input.label}</div>
                          <div className="text-[11px] text-[#5B4632] font-medium truncate">{value || input.placeholder}</div>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-[#4A3520] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                      {isOpen && (
                        <div
                          className="scrap-scroll absolute top-full left-0 right-0 mt-2 z-50 max-h-52 overflow-y-auto rounded-xl shadow-xl shadow-black/40 border border-[#D4B98A]"
                          style={{
                            backgroundImage: "url('/assets/preference.png')",
                            backgroundPosition: "center",
                            backgroundColor: "#F0DFC0",
                          }}
                        >
                          {DROPDOWN_OPTIONS[input.label]?.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => {
                                setSelectedValues((prev) => ({ ...prev, [input.label]: opt }));
                                setOpenDropdown(null);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-[16px] transition-colors hover:bg-[#3B2A18]/10 ${
                                value === opt ? "text-[#274D2F] font-bold bg-[#274D2F]/10" : "text-[#4A3520]"
                              }`}
                              style={{ fontFamily: "var(--font-caveat)" }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {PILL_INPUTS_ROW2.map((input) => {
                  const Icon = input.icon;
                  const isOpen = openDropdown === input.label;
                  const value = selectedValues[input.label];
                  return (
                    <div key={input.label} className="relative">
                      <div
                        onClick={() => setOpenDropdown(isOpen ? null : input.label)}
                        className="overflow-hidden rounded-lg px-8 py-5 flex items-center gap-2 shadow-black/60 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                        style={{
                          backgroundImage: "url('/assets/preference.png')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <Icon className="w-4 h-4 text-[#4A3520] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[20px] font-bold leading-tight" style={{ fontFamily: "var(--font-caveat)", color: "#3B2A18" }}>{input.label}</div>
                          <div className="text-[11px] text-[#5B4632] font-medium truncate">{value || input.placeholder}</div>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-[#4A3520] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                      {isOpen && (
                        <div
                          className="scrap-scroll absolute top-full left-0 right-0 mt-2 z-50 max-h-52 overflow-y-auto rounded-xl shadow-xl shadow-black/40 border border-[#D4B98A]"
                          style={{
                            backgroundImage: "url('/assets/preference.png')",
                            backgroundPosition: "center",
                            backgroundColor: "#F0DFC0",
                          }}
                        >
                          {DROPDOWN_OPTIONS[input.label]?.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => {
                                setSelectedValues((prev) => ({ ...prev, [input.label]: opt }));
                                setOpenDropdown(null);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-[16px] transition-colors hover:bg-[#3B2A18]/10 ${
                                value === opt ? "text-[#274D2F] font-bold bg-[#274D2F]/10" : "text-[#4A3520]"
                              }`}
                              style={{ fontFamily: "var(--font-caveat)" }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-start pt-0" >
                <button
                  type="button"
                  aria-label="Download Food Chart"
                  className="block w-full max-w-[220px]  transition-transform duration-300 hover:scale-[1.02] active:scale-[0.97] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent" 
                >
                  <img src="/assets/download.png" alt="Download Food Chart" className="w-full h-auto" />
                </button>
              </div>
            </div>

            {/* Sparkle */}
            <div className="absolute bottom-6 right-6">
              <Sparkles className="w-5 h-5 text-white/30" />
            </div>
          </motion.div>
        )}

        {/* Section 1: Meal Plan */}
        {currentSection === 1 && (
          <motion.div
            key="mealplan"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex items-center justify-center pl-[38%] pr-8 md:pr-12 lg:pr-16"
          >
            <div className="w-full max-w-3xl">
              {/* Heading */}
              <div className="mt-16 mb-8">
                <h2
                  className="text-2xl md:text-3xl mt-1 text-black mb-2 tracking-tight drop-shadow-lg"
                  style={{ fontFamily: "Algerian, 'Times New Roman', serif" }}
                >
                  Your AI has curated 3 perfect meals for today.
                </h2>
                <p className="text-white/70 text-sm drop-shadow-md">
                  Tap any card to see full recipe details
                </p>
              </div>

              {/* Meal Polaroid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5 place-items-center mt-[-12px] ">
                {MEALS.map((meal, i) => {
                  const frame = POLAROID_FRAMES[i];
                  return (
                    <div key={meal.id} className="w-full max-w-[240px]">
                      {/* Polaroid frame with the food photo inside its slot */}
                      <div
                        className="relative z-10 w-full cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:-rotate-1 drop-shadow-[0_22px_30px_rgba(0,0,0,0.45)]"
                        style={{ aspectRatio: frame.aspect }}
                      >
                        {/* Food photo, sized to fill the frame's transparent slot */}
                        <div
                          className="absolute overflow-hidden"
                          style={{
                            left: `${frame.slot.left - 0.5}%`,
                            top: `${frame.slot.top - 0.5}%`,
                            width: `${frame.slot.width + 1}%`,
                            height: `${frame.slot.height + 1}%`,
                          }}
                        >
                          <img
                            src={meal.image}
                            alt={meal.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Polaroid frame overlay */}
                        <img
                          src={frame.img}
                          alt=""
                          draggable={false}
                          className="absolute inset-0 w-full h-full pointer-events-none select-none"
                        />

                        {/* Meal name handwritten on the torn-paper flap */}
                        <div className="absolute left-0 right-0 text-center px-5" style={{ top: "60%" }}>
                          <span
                            className="inline-block font-bold leading-tight text-[15px] md:text-[16px]"
                            style={{ fontFamily: "var(--font-caveat)", color: "#2E2B28" }}
                          >
                            {meal.title}
                          </span>
                        </div>
                      </div>

                      {/* Info card below the polaroid */}
                      <div className="relative -mt-25 px-3 py-2 text-center z-20">
                        <h3
                          className="text-[17px] font-bold leading-snug line-clamp-2"
                          style={{ fontFamily: "var(--font-cormorant)", color: "#274D2F" }}
                        >
                          {meal.title}
                        </h3>
                        <div className="flex items-center justify-center gap-1 mt-1.5">
                          <Flame className="w-3.5 h-3.5 text-[#B96A28]" />
                          <span
                            className="text-[13px] font-semibold"
                            style={{ fontFamily: "var(--font-lora)", color: "#5B4632" }}
                          >
                            Calories: {meal.calories} cal
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Shared WhatsApp button below all cards */}
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleSendToCook}
                  aria-label="Send to Cook via WhatsApp"
                  className="block cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#274D2F]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <img
                    src="/fooder_ai_png_assets_transparent_updated (2)/whatsapp.png"
                    alt="Send to Cook via WhatsApp"
                    className="w-[260px] h-auto object-contain select-none"
                  />
                </button>
              </div>
            </div>

            {/* Sparkle */}
            <div className="absolute bottom-6 right-6">
              <Sparkles className="w-5 h-5 text-white/30" />
            </div>
          </motion.div>
        )}

        {/* Section 2: Groceries */}
        {currentSection === 2 && (
          <motion.div
            key="groceries"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex items-center justify-center pl-[38%] pr-8 md:pr-6 lg:pr-2 right-6 "
          >
            <div className="w-full max-w-lg">
              {/* Grocery Comparison Card */}
              <div
                style={{
                  backgroundImage: "url('/assets/groceries.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Card Header */}
                <div className="px-5 py-5 mt-4 border-b border-gray-100">

                  <p className=" mt-11 text-gray-500 text-xs">Compare prices across platforms</p>
                </div>
                
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-2 px-6 py-3 mt-[-8px] border-b border-gray-100 bg-black/7">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-wider">Swiggy</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-[10px] font-semibold text-purple-600 uppercase tracking-wider">Zepto</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-[10px] font-semibold text-[#274D2F] uppercase tracking-wider">Blinkit</span>
                  </div>
                </div>

                {/* Grocery Items */}
                <div className="grocery-scroll divide-y divide-gray-50 max-h-[260px] overflow-y-auto">
                  {GROCERY_ITEMS.map((item, i) => (
                    <div key={item.name} className="grid grid-cols-4 gap-2 px-5 py-3 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                          <div className="text-[10px] text-gray-400">{item.qty}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center text-sm font-bold text-gray-700">
                        ₹{PRICES.swiggy[i]}
                      </div>
                      <div className="flex items-center justify-center text-sm font-bold text-gray-700">
                        ₹{PRICES.zepto[i]}
                      </div>
                      <div className="flex items-center justify-center text-sm font-bold text-gray-700">
                        ₹{PRICES.blinkit[i]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Row */}
                <div className="grid grid-cols-4 gap-2 px-6 py-3 border-t border-gray-100 bg-black/10">
                  <div className="text-sm font-bold text-gray-900">Total</div>
                  <div className="text-sm font-bold text-orange-600 text-center">
                    ₹{PRICES.swiggy.reduce((a, b) => a + b, 0)}
                  </div>
                  <div className="text-sm font-bold text-purple-600 text-center">
                    ₹{PRICES.zepto.reduce((a, b) => a + b, 0)}
                  </div>
                  <div className="text-sm font-bold text-[#274D2F] text-center">
                    ₹{PRICES.blinkit.reduce((a, b) => a + b, 0)}
                  </div>
                </div>

                {/* Order Button */}
                <div className="px-3 py-1 flex justify-end">
                  <button
                    type="button"
                    aria-label="Order Now"
                    className="block cursor-pointer rounded-xl transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    <img
                      src="/order_now_transparent/order_now_transparent.png"
                      alt="Order Now"
                      className="w-[180px] h-auto object-contain select-none"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Sparkle */}
            <div className="absolute bottom-6 right-6">
              <Sparkles className="w-5 h-5 text-white/30" />
            </div>
          </motion.div>
        )}

        {/* Section 3: Progress */}
        {currentSection === 3 && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex items-center justify-center pl-[38%] pr-8 md:pr-12 lg:pr-16"
          >
            <div className="w-full max-w-md">
              {/* Progress Card */}
              <div className="relative">
                {/* Parchment background layer */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-[calc(100%+3.5rem)] aspect-[1228/960] "
                  style={{
                    backgroundImage: "url('/assets/progress.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "drop-shadow(0 16px 26px rgba(0,0,0,0.45))",
                  }}
                />
                {/* Foreground content */}
                <div className="relative z-10">
                {/* Card Header */}
                <div className="px-5 py-3  border-b border-gray-100">
                  <h2 className="text-xl font-bold mb-0" style={{ fontFamily: "var(--font-parisienne)", color: "#6F4E37" }}>
                    Your Nutrition Stats
                  </h2>
                  <p className="text-gray-500 text-xs">Track your nutrition journey</p>
                </div>

                {/* Stats Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-3 mb-2">
                    <div className="bg-[#274D2F]/10 rounded-2xl p-4 text-center border border-[#274D2F]/20">
                      <div className="w-10 h-10 rounded-full bg-[#274D2F]/20 flex items-center justify-center mx-auto mb-2">
                        <Flame className="w-5 h-5 text-[#274D2F]" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-cormorant)" }}>1,850</div>
                      <div className="text-[10px] text-[#274D2F] font-medium uppercase tracking-wider">Calories</div>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-cormorant)" }}>42g</div>
                      <div className="text-[10px] text-[#274D2F] font-medium uppercase tracking-wider">Protein</div>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-4 text-center border border-orange-100">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-1">
                        <Timer className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-cormorant)" }}>7</div>
                      <div className="text-[10px] text-[#274D2F] font-medium uppercase tracking-wider">Day Streak</div>
                    </div>
                  </div>

                  {/* Weekly Progress Bar */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-[#274D2F]" style={{ fontFamily: "var(--font-cormorant)" }}>Weekly Goal</span>
                      <span className="text-xs font-bold text-[#274D2F]">85%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#274D2F] rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900" style={{ fontFamily: "var(--font-cormorant)" }}>Healthy</div>
                        <div className="text-[10px] text-[#5B4632]">BMI in range</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900" style={{ fontFamily: "var(--font-cormorant)" }}>Balanced</div>
                        <div className="text-[10px] text-[#5B4632]">Nutrition score</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="px-3 pb-3 flex justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-[#274D2F] flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#274D2F] flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Sparkle */}
            <div className="absolute bottom-6 right-6">
              <Sparkles className="w-4 h-4 text-white/30" />
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {currentSection > 0 && (
        <button
          onClick={handleLeftClick}
          className="absolute bottom-6 left-130 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all" style={{ backgroundColor: FOREST }}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      )}

      {currentSection < 3 && (
        <button
          onClick={handleRightClick}
          className="absolute bottom-6 right-12 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all" style={{ backgroundColor: FOREST }}
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {NAV_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentSection(tab.id)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === tab.id
                ? "bg-[#274D2F] w-6"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Profile Sidebar */}
      <ProfileSidebar
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={() => router.push("/")}
      />
      </div>
    </DashboardPanelsProvider>
  );
}
