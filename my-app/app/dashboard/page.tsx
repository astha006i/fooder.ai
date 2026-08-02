"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProfileSidebar from "./components/ProfileSidebar";
import {
  ArrowLeft,
  ArrowRight,
  LogOut,
  Download,
  ShoppingCart,
  ChefHat,
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
  MessageCircle,
  UtensilsCrossed,
  Leaf,
  CircleDollarSign,
  Briefcase,
  Dumbbell,
  Users,
  ChevronDown,
  Plus,
} from "lucide-react";

const FOREST = "#274D2F";

const WOOD_BG = "/gingham_desktop_background/gingham_desktop_background.png";
const FOOD_IMG = "/scrapbook/fooder_assets/Untitled - 19 July 2026 at 18.45.00 (1).png";

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
      setIsProfileOpen(true);
      window.history.replaceState({}, "", "/dashboard");
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

  return (
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
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/20" />

      {/* Food Image - Oversized, dramatically cropped by left edge */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 z-[2] pointer-events-none"
        style={{ left: "-414px", width: "966px", height: "966px" }}
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

      {/* Navigation Bar - Top Center */}
      <nav className="absolute top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/20">
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
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Top Left: Avatar + Hi User */}
      <button
        onClick={() => setIsProfileOpen((prev) => !prev)}
        aria-expanded={isProfileOpen}
        aria-haspopup="dialog"
        className="absolute top-5 left-5 z-30 flex items-center gap-3 rounded-full transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-medium text-sm drop-shadow-md">Hi, User</span>
      </button>

      {/* Top Right: Logout */}
      <button onClick={() => router.push("/")} className="absolute top-5 right-5 z-30 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-all">
        <LogOut className="w-4 h-4" />
        Logout
      </button>

      {/* Section Content */}
      <div className="absolute inset-0 z-20">
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
            <div className="w-full max-w-2xl">
              {/* Heading */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: FOREST }}><ChefHat className="h-5 w-5 text-white" /></div>
                  <div>
                    <div className="flex items-baseline gap-0">
                      <span className="font-bold text-lg tracking-tight drop-shadow-lg" style={{ fontFamily: "var(--font-cormorant)", color: "#FFFFFF" }}>Fooder</span>
                      <span className="font-bold text-lg drop-shadow-lg" style={{ fontFamily: "var(--font-cormorant)", color: "#FFFFFF" }}>.AI</span>
                    </div>
                    <span className="block text-[9px] tracking-wider uppercase drop-shadow-md" style={{ color: "#FFFFFF", fontFamily: "var(--font-lora)" }}>Your AI Chef</span>
                  </div>
                </div>
                <p className="text-white/90 text-base md:text-lg max-w-lg leading-relaxed drop-shadow-md">
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
                        className="bg-white rounded-full px-4 py-3 flex items-center gap-2 shadow-xl shadow-black/25 border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{input.label}</div>
                          <div className="text-sm text-gray-700 font-medium truncate">{value || input.placeholder}</div>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-gray-300 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                      {isOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl shadow-black/20 border border-gray-100 overflow-hidden z-50">
                          {DROPDOWN_OPTIONS[input.label]?.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => {
                                setSelectedValues((prev) => ({ ...prev, [input.label]: opt }));
                                setOpenDropdown(null);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${value === opt ? "text-[#274D2F] font-semibold bg-[#274D2F]/5" : "text-gray-700"}`}
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
                        className="bg-white rounded-full px-4 py-3 flex items-center gap-2 shadow-xl shadow-black/25 border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{input.label}</div>
                          <div className="text-sm text-gray-700 font-medium truncate">{value || input.placeholder}</div>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-gray-300 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                      {isOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl shadow-black/20 border border-gray-100 overflow-hidden z-50">
                          {DROPDOWN_OPTIONS[input.label]?.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => {
                                setSelectedValues((prev) => ({ ...prev, [input.label]: opt }));
                                setOpenDropdown(null);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${value === opt ? "text-[#274D2F] font-semibold bg-[#274D2F]/5" : "text-gray-700"}`}
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

              <button className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-5 py-2.5 rounded-full font-medium text-sm border border-white/25 hover:bg-white/25 transition-all duration-300 shadow-md">
                <Download className="w-4 h-4" />
                Download Food Chart
              </button>
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
              <div className="mb-8">
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-lg"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  Your AI has curated 3 perfect meals for today.
                </h2>
                <p className="text-white/70 text-sm drop-shadow-md">
                  Tap any card to see full recipe details
                </p>
              </div>

              {/* Horizontally Scrollable Meal Cards */}
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
                {MEALS.map((meal) => (
                  <div
                    key={meal.id}
                    className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    {/* Food Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={meal.image}
                        alt={meal.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#274D2F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                        {meal.category}
                      </div>
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {meal.calories} cal
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug line-clamp-2">
                        {meal.title}
                      </h3>
                      <button className="w-full flex items-center justify-center gap-2 bg-[#274D2F] hover:bg-[#1d3a22] text-white py-2.5 rounded-xl font-semibold text-sm transition-colors duration-200 shadow-md shadow-[#274D2F]/20">
                        <MessageCircle className="w-4 h-4" />
                        Send to Cook via WhatsApp
                      </button>
                    </div>
                  </div>
                ))}

                {/* Extra card peek to imply more */}
                <div className="flex-shrink-0 w-16 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                </div>
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
            className="absolute inset-0 flex items-center justify-center pl-[38%] pr-8 md:pr-12 lg:pr-16"
          >
            <div className="w-full max-w-lg">
              {/* Grocery Comparison Card */}
              <div className="bg-white rounded-3xl shadow-2xl shadow-black/40 border border-gray-100 overflow-hidden">
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    Grocery Price Comparison
                  </h2>
                  <p className="text-gray-500 text-xs">Compare prices across platforms</p>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-4 gap-2 px-6 py-3 bg-gray-50 border-b border-gray-100">
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
                <div className="divide-y divide-gray-50 max-h-[260px] overflow-y-auto">
                  {GROCERY_ITEMS.map((item, i) => (
                    <div key={item.name} className="grid grid-cols-4 gap-2 px-6 py-3 hover:bg-gray-50/50 transition-colors">
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
                <div className="grid grid-cols-4 gap-2 px-6 py-3 bg-gray-50 border-t border-gray-100">
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
                <div className="px-6 py-4 flex justify-end">
                  <button className="flex items-center gap-2 bg-[#274D2F] text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-[#274D2F]/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <ShoppingCart className="w-4 h-4" />
                    Order Now
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
              <div className="bg-white rounded-3xl shadow-2xl shadow-black/40 border border-gray-200 overflow-hidden">
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    Your Progress
                  </h2>
                  <p className="text-gray-500 text-xs">Track your nutrition journey</p>
                </div>

                {/* Stats Grid */}
                <div className="p-6 max-h-[280px] overflow-y-auto">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#274D2F]/10 rounded-2xl p-4 text-center border border-[#274D2F]/20">
                      <div className="w-10 h-10 rounded-full bg-[#274D2F]/20 flex items-center justify-center mx-auto mb-2">
                        <Flame className="w-5 h-5 text-[#274D2F]" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">1,850</div>
                      <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Calories</div>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-4 text-center border border-blue-100">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">42g</div>
                      <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Protein</div>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-4 text-center border border-orange-100">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                        <Timer className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">7</div>
                      <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Day Streak</div>
                    </div>
                  </div>

                  {/* Weekly Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-700">Weekly Goal</span>
                      <span className="text-xs font-bold text-[#274D2F]">85%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#274D2F] rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Healthy</div>
                        <div className="text-[10px] text-gray-500">BMI in range</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Balanced</div>
                        <div className="text-[10px] text-gray-500">Nutrition score</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="px-6 pb-6 flex justify-center">
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

            {/* Sparkle */}
            <div className="absolute bottom-6 right-6">
              <Sparkles className="w-5 h-5 text-white/30" />
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {currentSection > 0 && (
        <button
          onClick={handleLeftClick}
          className="absolute left-[36%] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      )}

      {currentSection < 3 && (
        <button
          onClick={handleRightClick}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
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
  );
}
