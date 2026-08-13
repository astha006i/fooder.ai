"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DashboardPanelsContext,
  useDashboardPanels,
} from "./DashboardPanelsContext";
import { ToastProvider } from "./ui";
import { Sparkles } from "lucide-react";
import ProfilePage from "../profile/page";
import AiPreferencesPage from "../ai-preferences/page";
import SavedMealsPage from "../saved-meals/page";
import FavoritesPage from "../favorites/page";
import OrdersPage from "../orders/page";
import DownloadsPage from "../downloads/page";
import WhatsappPage from "../whatsapp/page";
import NotificationsPage from "../notifications/page";
import AchievementsPage from "../achievements/page";
import HelpPage from "../help/page";
import ContactPage from "../contact/page";
import SuggestPage from "../suggest/page";
import UpgradePage from "../upgrade/page";
import PrivacyTermsPanel from "../panels/PrivacyTermsPanel";

type PanelComponent = React.ComponentType<{ arg?: string }>;

const PANELS: Record<string, PanelComponent> = {
  profile: ProfilePage,
  "ai-preferences": AiPreferencesPage,
  "saved-meal-plans": SavedMealsPage,
  "favorite-recipes": FavoritesPage,
  "order-history": OrdersPage,
  "download-history": DownloadsPage,
  "whatsapp-settings": WhatsappPage,
  notifications: NotificationsPage,
  achievements: AchievementsPage,
  "help-support": HelpPage,
  "contact-us": ContactPage,
  "suggest-feature": SuggestPage,
  "privacy-terms": PrivacyTermsPanel,
  upgrade: UpgradePage,
};

function DashboardModal() {
  const ctx = useDashboardPanels();
  const { activePanel, panelArg, closePanel } = ctx;
  const Panel = activePanel ? PANELS[activePanel] : null;
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activePanel) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const node = panelRef.current;
    const focusable = node?.querySelector<HTMLElement>(
      'input, button, [href], select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const focusTimer = window.setTimeout(() => focusable?.focus(), 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [activePanel, closePanel]);

  return (
    <AnimatePresence>
      {activePanel && Panel && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closePanel}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={activePanel}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-5xl h-full max-h-[calc(100vh-6rem)] rounded-3xl shadow-[0_20px_60px_rgba(46,43,40,0.4),0_8px_24px_rgba(46,43,40,0.25)] border border-[#C88B42]/30 overflow-hidden flex flex-col focus:outline-none scrapbook-panel"
            style={{ backgroundColor: "#FDF9F0" }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 scrapbook-tape rounded-b-md -rotate-2 z-10 pointer-events-none"
              aria-hidden
            />
            <Sparkles
              className="absolute bottom-4 right-5 w-6 h-6 text-[#C88B42]/25 pointer-events-none"
              aria-hidden
            />
            <DashboardPanelsContext.Provider value={{ ...ctx, isModal: true }}>
              <Panel arg={panelArg} />
            </DashboardPanelsContext.Provider>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function DashboardPanelsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [panelArg, setPanelArg] = useState<string | undefined>(undefined);

  useEffect(() => {
    const readFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const panel = params.get("panel");
      if (panel && PANELS[panel]) {
        setActivePanel(panel);
        setPanelArg(params.get("tab") ?? undefined);
      } else {
        setActivePanel(null);
        setPanelArg(undefined);
      }
    };

    readFromUrl();
    window.addEventListener("popstate", readFromUrl);
    return () => window.removeEventListener("popstate", readFromUrl);
  }, []);

  const openPanel = useCallback((id: string, arg?: string) => {
    if (!PANELS[id]) return;
    setActivePanel(id);
    setPanelArg(arg);
    const url = arg
      ? `/dashboard?panel=${id}&tab=${arg}`
      : `/dashboard?panel=${id}`;
    window.history.pushState({ panel: id, tab: arg }, "", url);
  }, []);

  const closePanel = useCallback(() => {
    setActivePanel(null);
    setPanelArg(undefined);
    window.history.replaceState({}, "", "/dashboard");
  }, []);

  const value = { activePanel, panelArg, isModal: false, openPanel, closePanel };

  return (
    <DashboardPanelsContext.Provider value={value}>
      <ToastProvider>
        {children}
        <DashboardModal />
      </ToastProvider>
    </DashboardPanelsContext.Provider>
  );
}
