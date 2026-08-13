"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { FOREST, ORANGE, GOLDEN, DARK, CREAM } from "../lib/constants";

/* ---------------------------------- Card --------------------------------- */

export function PaperCard({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`scrapbook-card overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* --------------------------- Scrapbook Icon ------------------------------ */

export function ScrapbookIcon({
  icon: Icon,
  className = "",
  ...props
}: {
  icon: React.ElementType;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`scrapbook-icon ${className}`} {...props}>
      <Icon className="w-5 h-5" />
    </span>
  );
}

/* ------------------------------- SectionTitle ---------------------------- */

export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h2
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-sm mt-1"
          style={{ fontFamily: "var(--font-lora)", fontStyle: "italic", color: "#8A8580" }}
        >
          {subtitle}
        </p>
      )}
      <div className="scrapbook-underline mt-2 w-16" aria-hidden />
    </div>
  );
}

/* --------------------------------- Badge --------------------------------- */

export function Badge({
  children,
  tone = "forest",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "forest" | "golden" | "orange" | "red" | "neutral";
  className?: string;
}) {
  const tones: Record<string, { bg: string; text: string }> = {
    forest: { bg: "#274D2F", text: "#ffffff" },
    golden: { bg: "#F3E2C4", text: "#8A6A2F" },
    orange: { bg: "#F6E2D0", text: "#B96A28" },
    red: { bg: "#FDE8E8", text: "#C0392B" },
    neutral: { bg: "#EFEBE3", text: "#6B6463" },
  };
  const toneStyle = tones[tone];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${className}`}
      style={{ backgroundColor: toneStyle.bg, color: toneStyle.text }}
    >
      {children}
    </span>
  );
}

/* -------------------------------- Buttons -------------------------------- */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "golden";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary: "text-white shadow-md hover:shadow-lg hover:scale-[1.02]",
    secondary:
      "bg-white/70 border border-[#C88B42]/30 hover:bg-[#274D2F]/5 hover:scale-[1.02]",
    danger: "text-white bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg",
    golden:
      "bg-gradient-to-r from-[#C88B42] to-[#B96A28] text-white shadow-md hover:shadow-lg hover:scale-[1.02]",
  };
  const styles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: FOREST },
    secondary: { color: FOREST },
    danger: {},
    golden: {},
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} style={styles[variant]} {...props}>
      {children}
    </button>
  );
}

/* --------------------------------- Inputs -------------------------------- */

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span
        className="block mb-1.5 text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: GOLDEN, fontFamily: "var(--font-lora)" }}
      >
        {label}
      </span>
      {children}
      {hint && (
        <span className="block mt-1 text-xs" style={{ color: "#8B8178" }}>
          {hint}
        </span>
      )}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full scrapbook-input px-4 py-3 text-sm placeholder-[#A89E90] transition-all ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full scrapbook-input px-4 py-3 text-sm transition-all appearance-none ${props.className ?? ""}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full scrapbook-input px-4 py-3 text-sm placeholder-[#A89E90] transition-all resize-none ${props.className ?? ""}`}
    />
  );
}

/* --------------------------------- Toggle -------------------------------- */

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3 group"
    >
      <span
        className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ${
          checked ? "" : "bg-[#E7DFCF]"
        }`}
        style={checked ? { backgroundColor: FOREST } : {}}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </span>
      {label && <span className="text-sm text-[#2E2B28] font-medium">{label}</span>}
    </button>
  );
}

/* ---------------------------------- Toast --------------------------------- */

type ToastVariant = "success" | "error" | "info";
interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

const ToastContext = createContext<{
  toast: (message: string, variant?: ToastVariant) => void;
}>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const iconFor = (variant: ToastVariant) => {
    if (variant === "success") return <CheckCircle2 className="w-4 h-4 text-white" />;
    if (variant === "error") return <AlertCircle className="w-4 h-4 text-white" />;
    return <Info className="w-4 h-4 text-white" />;
  };

  const colorFor = (variant: ToastVariant) =>
    variant === "success" ? FOREST : variant === "error" ? "#C0392B" : "#8A6A2F";

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-xl min-w-[240px] max-w-sm"
              style={{ backgroundColor: colorFor(t.variant) }}
            >
              {iconFor(t.variant)}
              <span className="flex-1">{t.message}</span>
              <button
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

/* ------------------------------- Empty State ------------------------------ */

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: "#F3E2C4" }}
      >
        <Icon className="w-7 h-7 text-[#B96A28]" />
      </div>
      <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>
        {title}
      </h3>
      <p className="text-sm mt-1 max-w-xs" style={{ color: "#8B8178" }}>
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ------------------------------ Loading Skeleton -------------------------- */

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-[#E8DFCE]/80 ${className}`}
    />
  );
}

export function PageSkeleton() {
  return (
    <div className="p-8 space-y-6">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-4 w-96 max-w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  );
}

/* ------------------------------ Chip/Divider ------------------------------ */

export function Divider({ className = "" }: { className?: string }) {
  return <div className={`scrapbook-divider ${className}`} />;
}

export function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
        active ? "text-white shadow-md" : "bg-white/70 hover:bg-[#274D2F]/5"
      }`}
      style={
        active
          ? { backgroundColor: FOREST, borderColor: FOREST }
          : { color: DARK, borderColor: "rgba(200,139,66,0.25)" }
      }
    >
      {children}
    </button>
  );
}

export { FOREST, ORANGE, GOLDEN, DARK, CREAM };
