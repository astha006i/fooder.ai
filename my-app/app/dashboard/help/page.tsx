"use client";

import PageShell from "../components/PageShell";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  BookOpen,
  LifeBuoy,
  MessageCircle,
  Send,
  Mail,
  X,
  ArrowRight,
  FileText,
} from "lucide-react";
import { PaperCard, Button, Field, Select, TextArea, useToast } from "../components/ui";
import { FOREST, ORANGE, GOLDEN, DARK } from "../lib/constants";

const FAQS = [
  { q: "How does Fooder.AI create my weekly meal plan?", a: "Our AI analyzes your dietary preferences, budget, fitness goals, and schedule, then curates a balanced weekly meal plan you can tweak anytime." },
  { q: "Can I change my dietary preferences later?", a: "Yes. Open the AI Preferences page from your profile menu and adjust any setting — your future meal plans update automatically." },
  { q: "How do grocery price comparisons work?", a: "We compare live prices across Swiggy Instamart, Zepto, and Blinkit for the items in your plan so you always order from the cheapest platform." },
  { q: "How do I share a recipe or meal plan on WhatsApp?", a: "Open any meal card and tap 'Send to Cook via WhatsApp'. You'll be linked to the recipe card and reminders in your chat." },
  { q: "Can I export my nutrition reports?", a: "Absolutely. Use the Download button on any plan, grocery list, or report to export it as a PDF, CSV, or PNG." },
  { q: "How do I upgrade to Fooder.AI Pro?", a: "Click the 'Upgrade to Fooder.AI Pro' card in your profile menu to compare plans and subscribe in a few taps." },
];

const GUIDES = [
  { icon: BookOpen, title: "Getting Started", desc: "Set up your preferences and generate your first meal plan in under two minutes." },
  { icon: LifeBuoy, title: "Troubleshooting", desc: "Fix common issues with meal plans, grocery sync, and WhatsApp reminders." },
  { icon: FileText, title: "Managing Downloads", desc: "Export, preview, and organize your meal plans and nutrition reports." },
  { icon: MessageCircle, title: "WhatsApp Setup", desc: "Connect your number and configure daily reminders step by step." },
];

const CHAT_SEED = [
  { from: "them", text: "Hi! I'm the Fooder.AI assistant. How can I help you today?" },
];

export default function HelpPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState(CHAT_SEED);
  const [draft, setDraft] = useState("");
  const [ticketSubject, setTicketSubject] = useState("Billing");
  const [ticketCategory, setTicketCategory] = useState("Meal Plans");
  const [ticketMessage, setTicketMessage] = useState("");

  const filteredFaqs = useMemo(
    () => FAQS.filter((f) => f.q.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [...prev, { from: "me", text: draft.trim() }]);
    setDraft("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "them", text: "Thanks for reaching out! A specialist will reply shortly." },
      ]);
    }, 900);
  };

  const createTicket = () => {
    toast(`Support ticket created for "${ticketSubject}"`, "success");
    setTicketMessage("");
  };

  return (
    <PageShell title="Help & Support" subtitle="Search guides, browse FAQs, or reach our team">
      <div className="space-y-8">
        {/* Search */}
        <PaperCard className="p-5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#8B8178" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles and FAQs..."
              className="w-full bg-[#F8F1E6]/60 border border-[#274D2F]/10 rounded-full pl-11 pr-4 py-3 text-sm text-[#2E2B28] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B96A28]/40 transition-all"
            />
          </div>
        </PaperCard>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {filteredFaqs.length === 0 && (
              <PaperCard className="p-6 text-center text-sm" >
                <span style={{ color: "#8B8178" }}>No results for &quot;{search}&quot;. Try a different keyword.</span>
              </PaperCard>
            )}
            <AnimatePresence initial={false}>
              {filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.q;
                return (
                  <motion.div key={faq.q} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <PaperCard>
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : faq.q)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center gap-3 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/40"
                      >
                        <span className="flex-1 text-sm font-semibold" style={{ color: DARK }}>
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          style={{ color: ORANGE }}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#6B6463" }}>
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </PaperCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* Troubleshooting guides */}
        <section>
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>
            Troubleshooting Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GUIDES.map((g) => {
              const Icon = g.icon;
              return (
                <PaperCard key={g.title} className="p-5 group hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F3E2C4" }}>
                      <Icon className="w-5 h-5" style={{ color: ORANGE }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold" style={{ color: FOREST }}>
                        {g.title}
                      </h3>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: "#8B8178" }}>
                        {g.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 mt-1 transition-transform group-hover:translate-x-1" style={{ color: GOLDEN }} />
                  </div>
                </PaperCard>
              );
            })}
          </div>
        </section>

        {/* Support + Ticket */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PaperCard className="p-6">
            <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>
              Still need help?
            </h3>
            <p className="text-sm mb-5" style={{ color: "#8B8178" }}>
              Our team replies within 24 hours on business days.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setChatOpen(true)}>
                <MessageCircle className="w-4 h-4" />
                Start Live Chat
              </Button>
              <Button variant="secondary" onClick={() => toast("Opening email draft...", "info")}>
                <Mail className="w-4 h-4" />
                Email Us
              </Button>
            </div>
          </PaperCard>

          <PaperCard className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>
              Submit a Support Ticket
            </h3>
            <div className="space-y-4">
              <Field label="Subject">
                <Select value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)}>
                  <option>Billing</option>
                  <option>Meal Plans</option>
                  <option>Groceries</option>
                  <option>WhatsApp</option>
                  <option>Account</option>
                </Select>
              </Field>
              <Field label="Category">
                <Select value={ticketCategory} onChange={(e) => setTicketCategory(e.target.value)}>
                  <option>Meal Plans</option>
                  <option>Groceries</option>
                  <option>App Bug</option>
                  <option>Account</option>
                </Select>
              </Field>
              <Field label="Message">
                <TextArea rows={3} value={ticketMessage} onChange={(e) => setTicketMessage(e.target.value)} placeholder="Describe your issue..." />
              </Field>
              <Button onClick={createTicket}>
                <Send className="w-4 h-4" />
                Submit Ticket
              </Button>
            </div>
          </PaperCard>
        </div>
      </div>

      {/* Live chat */}
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-3xl shadow-2xl border border-[#274D2F]/10 overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: FOREST }}>
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="flex-1 text-sm font-semibold text-white">Live Chat</span>
            <button onClick={() => setChatOpen(false)} aria-label="Close chat" className="text-white/70 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto space-y-2 bg-[#F8F1E6]/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs ${
                    m.from === "me" ? "rounded-br-sm text-white" : "bg-white border border-[#274D2F]/10"
                  }`}
                  style={m.from === "me" ? { backgroundColor: FOREST } : { color: DARK }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 p-3 border-t border-[#274D2F]/10">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-[#F8F1E6]/60 border border-[#274D2F]/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#B96A28]/40"
            />
            <button
              onClick={sendMessage}
              aria-label="Send message"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105"
              style={{ backgroundColor: ORANGE }}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </PageShell>
  );
}
