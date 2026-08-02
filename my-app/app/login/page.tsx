"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ChefHat, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CREAM = "#Fceabc";
const FOREST = "#274D2F";
const ORANGE = "#B96A28";
const GOLDEN = "#C88B42";
const DARK = "#2E2B28";

const IMG = (name: string) => `/transparent_images/${name}.png`;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-full relative overflow-hidden" style={{ backgroundColor: CREAM, color: DARK }}>
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E2B28' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      <img src="/food/login_transparent_images/kitchen.png" alt="" className="absolute pointer-events-none z-[1] hidden lg:block" style={{ width: "500px", right: "66%", top: "50%", transform: "translateY(-50%)", opacity: 1, borderRadius: "16px" }} />
      <img src="/food/login_transparent_images/goodchoices.png" alt="" className="absolute pointer-events-none z-30 hidden lg:block animate-sway" style={{ width: "200px", left: "80%", top: "0%", opacity: 1 }} />
      <img src="/food/login_transparent_images/tea2.png" alt="" className="absolute pointer-events-none z-[1] hidden lg:block " style={{ width: "300px", right: "0%", bottom: "0.3%", opacity: 1 }} />
      <img src="/landing_transparent_images/leaf_01.png" alt="" className="absolute pointer-events-none z-30 hidden lg:block animate-sway" style={{ width: "140px", left: "46.5%", bottom: "30%", opacity: 1 }} />

      <div className="relative z-20 mx-auto flex h-full w-full max-w-[1440px] items-stretch px-12 gap-4">
        {/* ── LEFT COLUMN: MARKETING ── */}
        <div className="flex w-1/2 flex-col justify-start pl-[150px] pt-13">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: FOREST }}>
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>Fooder</span>
              <span className="font-bold text-lg" style={{ fontFamily: "var(--font-cormorant)", color: ORANGE }}>.AI</span>
              <span className="block text-[9px] tracking-wider uppercase" style={{ color: GOLDEN, fontFamily: "var(--font-lora)" }}>Your AI Chef</span>
            </div>
          </div>

          {/* Welcome heading with flourishes */}
          <div className="flex items-center justify-center gap-3 mt-8 mb-4">
            <span className="text-2xl" style={{ color: FOREST }}>✦</span>
            <ChefHat className="h-6 w-6" style={{ color: ORANGE }} />
            <h2 className="text-3xl" style={{ fontFamily: "var(--font-parisienne)", color: FOREST }}>Welcome Back!</h2>
            <span className="text-2xl" style={{ color: FOREST }}>✦</span>
          </div>

          {/* Main headline */}
          <div className="mx-auto text-center" style={{ maxWidth: "400px" }}>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: "var(--font-cormorant)",lineHeight: "1" }}>
              <span style={{ color: FOREST }}>Good Food.</span><br />
              <span style={{ color: ORANGE }}>Smart Choices.</span><br />
              <span style={{ color: FOREST }}>Better You.</span>
            </h1>
          </div>

          {/* Description */}
          <p className="mt-8 text-base leading-relaxed mx-auto text-center" style={{ fontFamily: "var(--font-lora)", color: "#5A5550", maxWidth: "400px", lineHeight: "1.2" }}>
            Continue your healthy, budget-friendly cooking journey with Fooder.AI. Personalized meal plans, smart grocery pricing, and nutrition tracking — all in one place.
          </p>
        </div>

        {/* ── RIGHT COLUMN: LOGIN CARD ── */}
        <div className="flex w-1/2 items-center justify-center -ml-8">
          <div className="rounded-[20px] px-8 py-8" style={{ width: "460px", backgroundColor: "#ebd3af", boxShadow: "0 10px 40px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(200,139,66,0.12)" }}>
            {/* Card header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: FOREST }}>
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-lg" style={{ color: GOLDEN }}>─</span>
                <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>Log In</h2>
                <span className="text-lg" style={{ color: GOLDEN }}>─</span>
              </div>
              <p className="text-lg mt-1" style={{ fontFamily: "var(--font-parisienne)", color: ORANGE }}>Glad to see you again!</p>
              <div className="flex justify-center gap-2 mt-1">
                <span className="text-xs" style={{ color: GOLDEN }}>~</span>
                <span className="text-xs" style={{ color: GOLDEN }}>~</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email field */}
              <div>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#cab193" }} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none rounded-lg pl-10 pr-4"
                    style={{ height: "48px", backgroundColor: "#FDF8F0", border: "1px solid rgba(200,139,66,0.25)", fontFamily: "var(--font-lora)", color: DARK, fontSize: "14px" }}
                    placeholder="Email or username"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#B0AAA3" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none rounded-lg pl-10 pr-10"
                    style={{ height: "48px", backgroundColor: "#FDF8F0", border: "1px solid rgba(200,139,66,0.25)", fontFamily: "var(--font-lora)", color: DARK, fontSize: "14px" }}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: "#B0AAA3" }}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <button type="button" className="text-xs font-medium hover:underline" style={{ fontFamily: "var(--font-inter)", color: FOREST }}>Forgot password?</button>
              </div>

              {error && <p className="text-xs" style={{ color: "#DC2626", fontFamily: "var(--font-inter)" }}>{error}</p>}

              {/* Login button */}
              <button
                type="submit"
                className="w-full rounded-lg text-white font-bold shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{ height: "48px", backgroundColor: FOREST, fontFamily: "var(--font-cormorant)", fontSize: "15px" }}
              >
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1" style={{ height: "1px", backgroundColor: "rgba(200,139,66,0.2)" }} />
              <span className="text-[10px] uppercase tracking-wider font-semibold flex-shrink-0" style={{ fontFamily: "var(--font-inter)", color: "#B0AAA3" }}>or continue with</span>
              <div className="flex-1" style={{ height: "1px", backgroundColor: "rgba(200,139,66,0.2)" }} />
            </div>

            {/* Social buttons */}
            <div className="flex justify-center gap-4 mb-6">
              <button className="flex items-center justify-center rounded-xl transition-all hover:scale-105 hover:shadow-md" style={{ width: "60px", height: "60px", backgroundColor: "#FDF8F0", border: "1px solid rgba(200,139,66,0.2)" }}>
                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              </button>
              <button className="flex items-center justify-center rounded-xl transition-all hover:scale-105 hover:shadow-md" style={{ width: "60px", height: "60px", backgroundColor: "#FDF8F0", border: "1px solid rgba(200,139,66,0.2)" }}>
                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#000" d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              </button>
              <button className="flex items-center justify-center rounded-xl transition-all hover:scale-105 hover:shadow-md" style={{ width: "60px", height: "60px", backgroundColor: "#FDF8F0", border: "1px solid rgba(200,139,66,0.2)" }}>
                <Mail className="h-5 w-5" style={{ color: DARK }} />
              </button>
            </div>

            {/* Sign up link */}
            <p className="text-center text-xs" style={{ fontFamily: "var(--font-lora)", color: "#B0AAA3" }}>
              New here?{" "}
              <Link href="/" className="font-semibold hover:underline" style={{ color: ORANGE }}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
