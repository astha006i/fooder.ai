"use client";

import PageShell from "../components/PageShell";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  CreditCard,
  Crown,
  IndianRupee,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  PaperCard,
  SectionTitle,
  Badge,
  Button,
  useToast,
  Chip,
} from "../components/ui";
import { FOREST, ORANGE, GOLDEN } from "../lib/constants";

interface Plan {
  id: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  monthly: number;
  yearly: number;
  features: string[];
  cta: string;
  featured: boolean;
}

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Start your healthy journey",
    icon: Zap,
    monthly: 0,
    yearly: 0,
    features: [
      "3 AI meal plans per week",
      "Basic grocery lists",
      "Calorie tracking",
      "Community support",
    ],
    cta: "Current Plan",
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Your personal AI chef",
    icon: Crown,
    monthly: 249,
    yearly: 199,
    features: [
      "Unlimited AI meal plans",
      "Smart grocery price comparison",
      "Nutrition & fitness goals",
      "Send recipes to cook on WhatsApp",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    featured: true,
  },
  {
    id: "family",
    name: "Family",
    tagline: "For the whole household",
    icon: Users,
    monthly: 399,
    yearly: 319,
    features: [
      "Everything in Pro",
      "Up to 6 family profiles",
      "Shared household meal plans",
      "Kids & senior meal modes",
      "Dedicated dietitian chat",
    ],
    cta: "Choose Family",
    featured: false,
  },
];

type CellValue = string | boolean;

interface ComparisonRow {
  label: string;
  free: CellValue;
  pro: CellValue;
  family: CellValue;
}

const COMPARISON: ComparisonRow[] = [
  { label: "AI meal plans", free: "3 per week", pro: "Unlimited", family: "Unlimited" },
  { label: "Grocery price comparison", free: false, pro: true, family: true },
  { label: "Nutrition & fitness goals", free: false, pro: true, family: true },
  { label: "Family profiles", free: false, pro: true, family: "Up to 6" },
  { label: "WhatsApp cook delivery", free: false, pro: true, family: true },
  { label: "Dietitian chat", free: false, pro: false, family: true },
  { label: "Priority support", free: false, pro: true, family: true },
];

const TABLE_COLUMNS: { name: string; icon: LucideIcon; tinted: boolean }[] = [
  { name: "Free", icon: Zap, tinted: false },
  { name: "Pro", icon: Crown, tinted: true },
  { name: "Family", icon: Users, tinted: false },
];

interface Testimonial {
  initials: string;
  quote: string;
  name: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    initials: "AK",
    quote:
      "Fooder.AI cut my weekly grocery bill by 30%. The AI just knows what my family will actually eat.",
    name: "Ananya Kapoor",
    role: "Pro Member · 6 months",
  },
  {
    initials: "RM",
    quote:
      "The yearly plan paid for itself in the first month. No more wasted ingredients or 'what's for dinner' at 7pm.",
    name: "Rohan Mehta",
    role: "Family Member · 1 year",
  },
  {
    initials: "PS",
    quote:
      "I switched from a dietitian app and never looked back. The meal plans actually match my macros now.",
    name: "Priya Sharma",
    role: "Pro Member · 3 months",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. You can cancel your Pro or Family subscription anytime from Settings → Billing. Your plan stays active until the end of the current billing period, so you keep full access until then.",
  },
  {
    q: "How does billing work?",
    a: "You are charged monthly or yearly based on your chosen cycle. Yearly billing gives you 20% off. Payments are processed securely through UPI, cards, or PayPal.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 7-day money-back guarantee on all paid plans. If Fooder.AI is not for you, contact support within 7 days of purchase for a full refund.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. You can upgrade or downgrade at any time. Upgrades take effect immediately, and downgrades apply at the start of your next billing period.",
  },
];

const PAYMENT_METHODS: { label: string; icon: LucideIcon }[] = [
  { label: "UPI", icon: IndianRupee },
  { label: "Card", icon: CreditCard },
  { label: "PayPal", icon: Wallet },
];

export default function UpgradePage() {
  const { toast } = useToast();
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSelect = (planId: string) => {
    if (planId === "free") {
      toast("You're already on the Free plan", "info");
      return;
    }
    toast("Redirecting to secure checkout...", planId === "pro" ? "success" : "info");
  };

  const renderValue = (value: CellValue) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-4 h-4 mx-auto" style={{ color: ORANGE }} />
      ) : (
        <X className="w-4 h-4 mx-auto" style={{ color: "#C9C1B7" }} />
      );
    }
    return (
      <span className="text-xs font-medium" style={{ color: "#5B544F" }}>
        {value}
      </span>
    );
  };

  return (
    <PageShell
      title="Upgrade to Fooder.AI Pro"
      subtitle="Choose the plan that fits your kitchen"
    >
      <div className="space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: GOLDEN }}
            >
              Current plan
            </span>
            <Badge tone="forest">Free</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: GOLDEN }}
            >
              Billing
            </span>
            <div className="inline-flex items-center gap-1 p-1 rounded-full border border-[#274D2F]/10 bg-white shadow-sm">
              <Chip active={!yearly} onClick={() => setYearly(false)}>
                Monthly
              </Chip>
              <Chip active={yearly} onClick={() => setYearly(true)}>
                Yearly
              </Chip>
            </div>
            <Badge tone="golden">Save 20%</Badge>
          </div>
        </div>

        <section aria-label="Pricing plans">
          <SectionTitle
            title="Simple, honest pricing"
            subtitle="Pick a plan, upgrade or cancel anytime. Prices in INR."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {PLANS.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  className={plan.featured ? "relative z-10 md:scale-[1.05]" : "relative"}
                >
                  <PaperCard
                    className={`h-full p-7 flex flex-col ${
                      plan.featured
                        ? "ring-2 ring-[#C88B42] bg-gradient-to-br from-[#FBF3E4] via-[#F7EAD2] to-[#F3DFC0] shadow-xl"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: plan.featured ? "#F3E2C4" : "#EFEBE3",
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: ORANGE }} />
                      </div>
                      {plan.featured && (
                        <Badge tone="golden">
                          <Sparkles className="w-3 h-3" />
                          Most Popular
                        </Badge>
                      )}
                    </div>

                    <h3
                      className="text-2xl font-bold mb-1"
                      style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-xs mb-5" style={{ color: "#8B8178" }}>
                      {plan.tagline}
                    </p>

                    <div className="flex items-end gap-1 h-11 mb-1 overflow-visible">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={yearly ? "yearly" : "monthly"}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                          className="text-4xl font-bold leading-none"
                          style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                        >
                          ₹{yearly ? plan.yearly : plan.monthly}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-sm pb-0.5" style={{ color: "#8B8178" }}>
                        /{yearly ? "yr" : "mo"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider"
                        style={{ color: GOLDEN }}
                      >
                        {yearly ? "billed yearly" : "billed monthly"}
                      </span>
                      {plan.featured && yearly && <Badge tone="golden">Save 20%</Badge>}
                    </div>

                    <div className="flex-1" />

                    <ul className="space-y-2.5 my-6">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm leading-snug"
                          style={{ color: "#3A3430" }}
                        >
                          <Check
                            className="w-4 h-4 mt-0.5 shrink-0"
                            style={{ color: ORANGE }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={plan.featured ? "golden" : "secondary"}
                      className="w-full"
                      onClick={() => handleSelect(plan.id)}
                    >
                      {plan.cta}
                    </Button>
                  </PaperCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section aria-label="Compare plans">
          <SectionTitle
            title="Compare plans"
            subtitle="See exactly what you get with each plan."
          />
          <PaperCard className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm border-collapse">
              <thead>
                <tr>
                  <th
                    className="text-left px-5 py-4 text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: GOLDEN }}
                  >
                    Feature
                  </th>
                  {TABLE_COLUMNS.map((col) => {
                    const Icon = col.icon;
                    return (
                      <th
                        key={col.name}
                        className="px-5 py-4 text-center border-t-2"
                        style={{
                          borderTopColor: col.tinted ? GOLDEN : "transparent",
                          backgroundColor: col.tinted ? "rgba(246,234,212,0.5)" : "transparent",
                        }}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <Icon className="w-4 h-4" style={{ color: ORANGE }} />
                          <span
                            className="text-[11px] font-bold uppercase tracking-wider"
                            style={{ color: FOREST }}
                          >
                            {col.name}
                          </span>
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-t border-[#274D2F]/10">
                    <td
                      className="px-5 py-3 text-xs font-medium"
                      style={{ color: "#3A3430" }}
                    >
                      {row.label}
                    </td>
                    <td className="px-5 py-3 text-center">{renderValue(row.free)}</td>
                    <td
                      className="px-5 py-3 text-center"
                      style={{ backgroundColor: "rgba(246,234,212,0.5)" }}
                    >
                      {renderValue(row.pro)}
                    </td>
                    <td className="px-5 py-3 text-center">{renderValue(row.family)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PaperCard>
        </section>

        <section aria-label="Testimonials">
          <SectionTitle
            title="Loved by home cooks"
            subtitle="Join thousands of households cooking smarter with Fooder.AI."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((testimonial) => (
              <PaperCard key={testimonial.name} className="p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: FOREST }}
                  >
                    {testimonial.initials}
                  </div>
                  <Quote className="w-6 h-6" style={{ color: ORANGE }} />
                </div>
                <div className="flex items-center gap-0.5 mb-4">
                  <Star className="w-4 h-4" style={{ color: GOLDEN }} fill={GOLDEN} />
                  <Star className="w-4 h-4" style={{ color: GOLDEN }} fill={GOLDEN} />
                  <Star className="w-4 h-4" style={{ color: GOLDEN }} fill={GOLDEN} />
                  <Star className="w-4 h-4" style={{ color: GOLDEN }} fill={GOLDEN} />
                  <Star className="w-4 h-4" style={{ color: GOLDEN }} fill={GOLDEN} />
                </div>
                <p
                  className="text-sm leading-relaxed flex-1 mb-4"
                  style={{ color: "#5B544F" }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <div
                    className="text-sm font-bold"
                    style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                  >
                    {testimonial.name}
                  </div>
                  <div className="text-xs" style={{ color: "#8B8178" }}>
                    {testimonial.role}
                  </div>
                </div>
              </PaperCard>
            ))}
          </div>
        </section>

        <section aria-label="Frequently asked questions">
          <SectionTitle
            title="Frequently asked questions"
            subtitle="Everything you need to know before upgrading."
          />
          <PaperCard className="px-6">
            {FAQS.map((faq, i) => (
              <div
                key={faq.q}
                className="border-b border-[#274D2F]/10 last:border-0"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50 rounded-lg"
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: FOREST }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                    style={{ color: ORANGE }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-4 text-sm leading-relaxed pr-8"
                        style={{ color: "#8B8178" }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </PaperCard>
        </section>

        <section aria-label="Payment options">
          <SectionTitle
            title="Billing & payments"
            subtitle="Simple, secure, and no hidden fees."
          />
          <PaperCard className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: ORANGE }}
                />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: FOREST }}
                  >
                    Secure payments
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#8B8178" }}>
                    Your details are encrypted. We accept UPI, credit & debit
                    cards, and PayPal.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <span
                      key={method.label}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "#F3E2C4", color: "#8A6A2F" }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {method.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </PaperCard>
        </section>
      </div>
    </PageShell>
  );
}
