"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const FOREST = "#274D2F";
const ORANGE = "#B96A28";
const GOLDEN = "#C88B42";
const DARK = "#2E2B28";

const CARD_BG = "#ecdcc4";
const INPUT_BG = "#FDF8F0";
const INPUT_BORDER = "1px solid rgba(200,139,66,0.25)";

const inputStyle: CSSProperties = {
  height: "48px",
  backgroundColor: INPUT_BG,
  border: INPUT_BORDER,
  fontFamily: "MV Boli, 'Times New Roman', serif",
  color: DARK,
  fontSize: "14px",
};

const socialBtnStyle: CSSProperties = {
  width: "60px",
  height: "60px",
  backgroundColor: INPUT_BG,
  border: "1px solid rgba(200,139,66,0.2)",
};

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

type AuthView = "signup" | "login";

interface AuthModalProps {
  open: boolean;
  initialView?: AuthView;
  onClose: () => void;
}

export default function AuthModal({ open, initialView = "signup", onClose }: AuthModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [view, setView] = useState<AuthView>(initialView);
  const [lastOpen, setLastOpen] = useState(open);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (open !== lastOpen) {
    setLastOpen(open);
    if (open) {
      setView(initialView);
      setError("");
    }
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = dialogRef.current;
    if (!el) return;

    const getFocusable = () =>
      Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((node) => !node.hasAttribute("disabled"));

    const frame = requestAnimationFrame(() => {
      const items = getFocusable();
      if (items.length) items[0].focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !el.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const switchView = (next: AuthView) => {
    setError("");
    setView(next);
  };

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    onClose();
    router.push("/dashboard");
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    onClose();
    router.push("/dashboard");
  };

  const signupHeader = (
    <div className="text-center mb-5">
      <img src="/fooder_ai_png_assets_transparent_updated (2)/logo.png" alt="Fooder.AI" className="block mx-auto h-14 w-14 object-contain drop-shadow-lg mb-3" />
      <div className="flex items-center justify-center gap-1 mb-1">
        <span className="text-lg leading-none" style={{ color: GOLDEN }}>─</span>
        <h2 className="text-3xl font-bold" style={{ fontFamily: "Harrington, 'Times New Roman', serif", color: FOREST }}>Create Account</h2>
        <span className="text-lg leading-none" style={{ color: GOLDEN }}>─</span>
      </div>
      <p className="text-lg mt-1" style={{ fontFamily: "var(--font-parisienne)", color: ORANGE }}>Begin your delicious journey!</p>
      <div className="flex justify-center gap-2 mt-1">
        <span className="text-xs" style={{ color: GOLDEN }}>~</span>
        <span className="text-xs" style={{ color: GOLDEN }}>~</span>
      </div>
    </div>
  );

  const loginHeader = (
    <div className="text-center mb-6">
      <img src="/fooder_ai_png_assets_transparent_updated (2)/logo.png" alt="Fooder.AI" className="block mx-auto h-15 w-15 object-contain drop-shadow-lg mb-3" />
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-lg leading-none" style={{ color: GOLDEN }}>─</span>
        <h2 className="text-3xl font-bold" style={{ fontFamily: "Harrington, 'Times New Roman', serif", color: FOREST }}>Log In</h2>
        <span className="text-lg leading-none" style={{ color: GOLDEN }}>─</span>
      </div>
      <p className="text-lg mt-1" style={{ fontFamily: "var(--font-parisienne)", color: ORANGE }}>Glad to see you again!</p>
      <div className="flex justify-center gap-2 mt-1">
        <span className="text-xs" style={{ color: GOLDEN }}>~</span>
        <span className="text-xs" style={{ color: GOLDEN }}>~</span>
      </div>
    </div>
  );

  const socialButtons = (
    <div className="flex justify-center gap-4">
      <button type="button" aria-label="Continue with Google" className="flex items-center justify-center rounded-xl transition-all hover:scale-105 hover:shadow-md" style={socialBtnStyle}>
        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      </button>
      <button type="button" aria-label="Continue with Apple" className="flex items-center justify-center rounded-xl transition-all hover:scale-105 hover:shadow-md" style={socialBtnStyle}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#000"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z"/></svg>
      </button>
    </div>
  );

  const signupView = (
    <div>
      {signupHeader}
      <form onSubmit={handleSignup} className="space-y-3">
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#B0AAA3" }} />
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full outline-none rounded-lg pl-10 pr-4" style={inputStyle} />
        </div>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#B0AAA3" }} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full outline-none rounded-lg pl-10 pr-4" style={inputStyle} />
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#B0AAA3" }} />
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full outline-none rounded-lg pl-10 pr-10" style={inputStyle} />
          <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#B0AAA3" }} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {error && <p className="text-xs" style={{ color: "#DC2626", fontFamily: "MV Boli, 'Times New Roman', serif" }}>{error}</p>}
        <button type="submit" className="w-full rounded-lg text-white font-bold shadow-md transition-all hover:shadow-lg hover:scale-[1.02]" style={{ height: "48px", backgroundColor: FOREST, fontFamily: "Harrington, 'Times New Roman', serif", fontSize: "15px" }}>Create Account</button>
      </form>
      <div className="flex items-center gap-4 my-5">
        <div className="flex-1" style={{ height: "1px", backgroundColor: "rgba(200,139,66,0.2)" }} />
        <span className="text-[10px] uppercase tracking-wider font-semibold flex-shrink-0" style={{ fontFamily: "MV Boli, 'Times New Roman', serif", color: "#B0AAA3" }}>or continue with</span>
        <div className="flex-1" style={{ height: "1px", backgroundColor: "rgba(200,139,66,0.2)" }} />
      </div>
      {socialButtons}
      <p className="mt-5 text-center text-xs" style={{ fontFamily: "MV Boli, 'Times New Roman', serif", color: "#B0AAA3" }}>
        Already have an account?{" "}
        <button type="button" onClick={() => switchView("login")} className="font-semibold hover:underline" style={{ color: FOREST }}>Log In</button>
      </p>
    </div>
  );

  const loginView = (
    <div>
      {loginHeader}
      <form onSubmit={handleLogin} className="space-y-3">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#B0AAA3" }} />
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email or username" className="w-full outline-none rounded-lg pl-10 pr-4" style={inputStyle} />
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#B0AAA3" }} />
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full outline-none rounded-lg pl-10 pr-10" style={inputStyle} />
          <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#B0AAA3" }} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <div className="text-right">
          <button type="button" className="text-xs font-medium hover:underline" style={{ fontFamily: "MV Boli, 'Times New Roman', serif", color: FOREST }}>Forgot password?</button>
        </div>
        {error && <p className="text-xs" style={{ color: "#DC2626", fontFamily: "MV Boli, 'Times New Roman', serif" }}>{error}</p>}
        <button type="submit" className="w-full rounded-lg text-white font-bold shadow-md transition-all hover:shadow-lg hover:scale-[1.02]" style={{ height: "48px", backgroundColor: FOREST, fontFamily: "Harrington, 'Times New Roman', serif", fontSize: "15px" }}>Log In</button>
      </form>
      <div className="flex items-center gap-4 my-5">
        <div className="flex-1" style={{ height: "1px", backgroundColor: "rgba(200,139,66,0.2)" }} />
        <span className="text-[10px] uppercase tracking-wider font-semibold flex-shrink-0" style={{ fontFamily: "MV Boli, 'Times New Roman', serif", color: "#B0AAA3" }}>or continue with</span>
        <div className="flex-1" style={{ height: "1px", backgroundColor: "rgba(200,139,66,0.2)" }} />
      </div>
      {socialButtons}
      <p className="mt-5 text-center text-xs" style={{ fontFamily: "MV Boli, 'Times New Roman', serif", color: "#B0AAA3" }}>
        New here?{" "}
        <button type="button" onClick={() => switchView("signup")} className="font-semibold hover:underline" style={{ color: FOREST }}>Sign up</button>
      </p>
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: "rgba(18, 22, 18, 0.5)", backdropFilter: "blur(6px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Authentication"
        >
          <motion.div
            ref={dialogRef}
            className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-[20px] px-6 py-8 sm:px-9"
            style={{ backgroundColor: CARD_BG, boxShadow: "0 24px 80px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(200,139,66,0.15)" }}
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-110 hover:shadow"
              style={{ backgroundColor: "rgba(255,255,255,0.6)", color: DARK }}
            >
              <X className="h-4 w-4" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div key={view} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                {view === "signup" ? signupView : loginView}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
