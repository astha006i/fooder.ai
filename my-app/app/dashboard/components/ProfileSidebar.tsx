"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Settings,
  Bookmark,
  Heart,
  ShoppingBag,
  Download,
  MessageCircle,
  Bell,
  Trophy,
  HelpCircle,
  Mail,
  Lightbulb,
  Shield,
  ScrollText,
  ChevronRight,
  LogOut,
  Camera,
  Crown,
  Pencil,
  X,
} from "lucide-react";
import { FOREST, ORANGE, GOLDEN, CREAM } from "../lib/constants";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
}

const ACCOUNT_ITEMS: SidebarItem[] = [
  { icon: User, label: "My Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "AI Preferences", href: "/dashboard/ai-preferences" },
  { icon: Bookmark, label: "Saved Meal Plans", href: "/dashboard/saved-meals" },
  { icon: Heart, label: "Favorite Recipes", href: "/dashboard/favorites" },
  { icon: ShoppingBag, label: "Order History", href: "/dashboard/orders" },
  { icon: Download, label: "Download History", href: "/dashboard/downloads" },
  { icon: MessageCircle, label: "WhatsApp Settings", href: "/dashboard/whatsapp" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications", badge: "3" },
  { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
];

const SUPPORT_ITEMS: SidebarItem[] = [
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/help" },
  { icon: Mail, label: "Contact Us", href: "/dashboard/contact" },
  { icon: Lightbulb, label: "Suggest a Feature", href: "/dashboard/suggest" },
  { icon: Shield, label: "Privacy Policy", href: "/dashboard/privacy" },
  { icon: ScrollText, label: "Terms & Conditions", href: "/dashboard/terms" },
];

function SidebarLink({ item, onNavigate }: { item: SidebarItem; onNavigate: () => void }) {
  const pathname = usePathname();
  const active = pathname === item.href;
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`group flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all duration-200 hover:bg-[#274D2F]/5 hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/40 ${
        active ? "bg-[#274D2F]/10" : ""
      }`}
    >
      <Icon
        className="w-[18px] h-[18px] flex-shrink-0 transition-colors group-hover:text-[#274D2F]"
        style={{ color: active ? FOREST : ORANGE }}
      />
      <span
        className="flex-1 text-left text-sm font-medium"
        style={{ color: active ? FOREST : "#2E2B28", fontWeight: active ? 700 : 500 }}
      >
        {item.label}
      </span>
      {item.badge && (
        <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-white text-[10px] font-bold" style={{ backgroundColor: ORANGE }}>
          {item.badge}
        </span>
      )}
      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 transition-all group-hover:text-[#B96A28] group-hover:translate-x-0.5" />
    </Link>
  );
}

function SidebarSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: SidebarItem[];
  onNavigate: () => void;
}) {
  return (
    <div className="px-4">
      <p className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-widest" style={{ color: GOLDEN }}>
        {title}
      </p>
      <div className="space-y-0.5">
        {items.map((item) => (
          <SidebarLink key={item.label} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function ProfileSidebar({ isOpen, onClose, onLogout }: ProfileSidebarProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusable && focusable.length > 0) focusable[0].focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (confirmLogout) {
          setConfirmLogout(false);
        } else {
          onClose();
        }
        return;
      }
      if (e.key === "Tab" && focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose, confirmLogout]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => {
              setConfirmLogout(false);
              onClose();
            }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[8px]"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Profile menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 left-0 z-[100] w-[400px] max-w-[90vw] rounded-r-3xl shadow-2xl shadow-black/30 flex flex-col overflow-hidden focus:outline-none"
            style={{ backgroundColor: CREAM, fontFamily: "var(--font-lora)" }}
          >
            {/* Header */}
            <div className="px-6 pt-8 pb-6 border-b border-[#274D2F]/10">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-md"
                    style={{ backgroundColor: FOREST }}
                  >
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <span
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md"
                    style={{ backgroundColor: ORANGE }}
                  >
                    <Camera className="w-3 h-3 text-white" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h2
                    className="text-xl font-bold leading-tight truncate"
                    style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                  >
                    Hi, User
                  </h2>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "#8B8178" }}>
                    user@fooder.ai
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close profile menu"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/40"
                >
                  <X className="w-4 h-4 text-[#2E2B28]" />
                </button>
              </div>

              <Link
                href="/dashboard/profile"
                onClick={onClose}
                className="mt-5 w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-white border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: "rgba(200,139,66,0.25)" }}
              >
                <Pencil className="w-4 h-4 text-[#B96A28] flex-shrink-0" />
                <span className="flex-1 text-left text-sm font-semibold" style={{ color: FOREST }}>
                  Edit Profile
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
            </div>

            {/* Scrollable Menu */}
            <div className="flex-1 overflow-y-auto py-6 space-y-8">
              <SidebarSection title="My Account" items={ACCOUNT_ITEMS} onNavigate={onClose} />
              <div className="mx-6 border-t border-[#274D2F]/10" />
              <SidebarSection title="Support" items={SUPPORT_ITEMS} onNavigate={onClose} />
            </div>

            {/* Bottom: Upgrade + Logout */}
            <div className="px-6 pb-6 pt-4 border-t border-[#274D2F]/10 space-y-3">
              <Link
                href="/dashboard/upgrade"
                onClick={onClose}
                className="group w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-200 border border-yellow-300/60 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/40"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner"
                  style={{ backgroundColor: GOLDEN }}
                >
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold" style={{ color: FOREST }}>
                    Upgrade to Fooder.AI Pro
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#8B8178" }}>
                    Unlimited meal plans & priority support
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#B96A28] transition-transform group-hover:translate-x-0.5" />
              </Link>

              <button
                onClick={() => setConfirmLogout(true)}
                className="group w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-red-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40"
              >
                <LogOut className="w-[18px] h-[18px] text-red-500 transition-transform group-hover:-translate-x-0.5" />
                <span className="text-sm font-semibold text-red-500">Logout</span>
              </button>
            </div>
          </motion.div>

          {/* Logout Confirmation Modal */}
          {confirmLogout && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmLogout(false)} />
              <motion.div
                role="alertdialog"
                aria-modal="true"
                aria-label="Confirm logout"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-7 text-center"
                style={{ backgroundColor: CREAM }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#FDE8E8" }}
                >
                  <LogOut className="w-6 h-6 text-red-500" />
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                >
                  Log out of Fooder.AI?
                  </h3>
                <p className="text-sm mt-2" style={{ color: "#8B8178" }}>
                  Your meal plans and preferences will be saved. You can sign back in anytime.
                </p>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setConfirmLogout(false)}
                    className="flex-1 px-4 py-2.5 rounded-full text-sm font-semibold bg-white border border-[#274D2F]/15 text-[#274D2F] hover:bg-[#274D2F]/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onLogout}
                    className="flex-1 px-4 py-2.5 rounded-full text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all shadow-md"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
