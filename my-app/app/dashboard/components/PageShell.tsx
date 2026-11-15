"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Settings,
  UtensilsCrossed,
  ShoppingCart,
  TrendingUp,
  LogOut,
  User,
  Sparkles,
  X,
} from "lucide-react";
import { WOOD_BG, FOOD_IMG } from "../lib/constants";
import ProfileSidebar from "./ProfileSidebar";
import { ToastProvider } from "./ui";
import { useDashboardPanels } from "./DashboardPanelsContext";

const NAV_TABS = [
  { label: "Preference", icon: Settings },
  { label: "Meal Plan", icon: UtensilsCrossed },
  { label: "Groceries", icon: ShoppingCart },
  { label: "Progress", icon: TrendingUp },
];

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="scrapbook-title text-3xl md:text-4xl">{title}</h1>
      {subtitle && <p className="scrapbook-eyebrow text-lg md:text-xl mt-1.5">{subtitle}</p>}
      <div className="scrapbook-underline mt-3 w-20" aria-hidden />
    </div>
  );
}

interface PageShellProps {
  title: string;
  subtitle?: string;
  panel?: string;
  panelTab?: string;
  children: React.ReactNode;
}

export default function PageShell({ title, subtitle, panel, panelTab, children }: PageShellProps) {
  const router = useRouter();
  const { isModal, closePanel } = useDashboardPanels();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isModal && panel) {
      const url = panelTab
        ? `/dashboard?panel=${panel}&tab=${panelTab}`
        : `/dashboard?panel=${panel}`;
      router.replace(url);
    }
  }, [isModal, panel, panelTab, router]);

  if (!isModal && panel) return null;

  if (isModal) {
    return (
      <>
        <div className="px-6 sm:px-10 pt-8 pb-4 border-b border-[rgba(200,139,66,0.25)] shrink-0 flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <PageHeader title={title} subtitle={subtitle} />
          </div>
          <button
            onClick={closePanel}
            aria-label="Close panel"
            title="Close"
            className="w-10 h-10 rounded-full bg-[#C88B42]/10 border border-[#C88B42]/25 flex items-center justify-center shrink-0 transition-all duration-200 hover:rotate-90 hover:bg-[#B96A28]/10 hover:border-[#B96A28]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50"
          >
            <X className="w-5 h-5" style={{ color: "#2E2B28" }} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6">
          {children}
        </div>
      </>
    );
  }

  const handleLogout = () => router.push("/");

  return (
    <ToastProvider>
      <div
        className="relative w-full h-screen overflow-hidden"
        style={{
          backgroundImage: `url('${WOOD_BG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "MV Boli, 'Times New Roman', serif",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 z-[1] bg-black/10" />

        {/* Salad bowl - same size, position and opacity as the dashboard */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 z-[2] pointer-events-none"
          style={{ left: "-414px", width: "966px", height: "966px" }}
        >
          <img src={FOOD_IMG} alt="Healthy meal" className="w-full h-full object-contain" />
        </motion.div>

        {/* Top navigation */}
        <nav className="absolute top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/20">
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.label}
                href="/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[15px]" style={{ fontFamily: "Harrington, 'Times New Roman', serif" }}>{tab.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Top left: profile trigger */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          aria-haspopup="dialog"
          className="absolute top-5 left-5 z-30 flex items-center gap-3 rounded-full transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-medium text-sm drop-shadow-md" style={{ fontFamily: "Harrington, 'Times New Roman', serif" }}>Hi, User</span>
        </button>

        {/* Top right: logout */}
        <button
          onClick={handleLogout}
          className="absolute top-5 right-5 z-30 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-all"
          style={{ fontFamily: "Harrington, 'Times New Roman', serif" }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-8 pt-20 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-5xl h-full max-h-[calc(100vh-6rem)] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-black/40 border border-white/10 overflow-hidden flex flex-col"
            style={{ backgroundColor: "#FDF9F0" }}
          >
            <div className="px-6 sm:px-10 pt-8 pb-4 border-b border-[rgba(200,139,66,0.25)] shrink-0 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <PageHeader title={title} subtitle={subtitle} />
              </div>
              <button
                onClick={() => router.push("/dashboard?open=menu")}
                aria-label="Exit page and open menu"
                title="Menu"
                className="w-10 h-10 rounded-full bg-[#C88B42]/10 border border-[#C88B42]/25 flex items-center justify-center shrink-0 transition-all duration-200 hover:rotate-90 hover:bg-[#B96A28]/10 hover:border-[#B96A28]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50"
              >
                <X className="w-5 h-5" style={{ color: "#2E2B28" }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6">
              {children}
            </div>
          </motion.div>
        </div>

        {/* Decorative sparkle */}
        <div className="absolute bottom-6 right-6 z-30">
          <Sparkles className="w-5 h-5 text-white/30" />
        </div>

        {/* Sidebar */}
        <ProfileSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
        />
      </div>
    </ToastProvider>
  );
}
