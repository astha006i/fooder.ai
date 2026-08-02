"use client";

import PageShell from "../components/PageShell";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Paperclip,
  Share2,
  AtSign,
  MessageCircle,
  Globe,
  Rss,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { PaperCard, Button, Field, TextInput, Select, TextArea, useToast } from "../components/ui";
import { FOREST, ORANGE, GOLDEN, DARK } from "../lib/constants";

const SOCIALS = [
  { icon: Share2, label: "Instagram" },
  { icon: AtSign, label: "X (Twitter)" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Globe, label: "Website" },
  { icon: Rss, label: "Newsletter" },
];

const OFFICE = [
  { icon: MapPin, label: "Address", value: "14 Recipe Row, Indiranagar, Bengaluru 560038" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: Mail, label: "Email", value: "hello@fooder.ai" },
  { icon: Clock, label: "Hours", value: "Mon – Sat, 9:00 AM – 6:00 PM IST" },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast("Please fill in your name, email, and message", "error");
      return;
    }
    setSubmitted(true);
    toast("Message sent successfully!", "success");
  };

  return (
    <PageShell title="Contact Us" subtitle="We'd love to hear from you">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <PaperCard className="p-6">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-10"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#E8F0E9" }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: FOREST }} />
              </div>
              <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>
                Message Sent!
              </h3>
              <p className="text-sm mt-2 max-w-xs" style={{ color: "#8B8178" }}>
                Thanks {name || "friend"}, we&apos;ll get back to you within 24 hours.
              </p>
              <div className="mt-5">
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>
                Send us a message
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Your Name">
                  <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
                </Field>
                <Field label="Your Email">
                  <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
                </Field>
              </div>
              <Field label="Subject">
                <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
                  <option>General Inquiry</option>
                  <option>Feedback</option>
                  <option>Partnership</option>
                  <option>Press</option>
                  <option>Bug Report</option>
                </Select>
              </Field>
              <Field label="Message">
                <TextArea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us how we can help..." />
              </Field>
              <Field label="Attachment (optional)">
                <label className="flex items-center gap-3 bg-[#F8F1E6]/60 border border-[#274D2F]/10 rounded-xl px-4 py-3 cursor-pointer hover:bg-[#F8F1E6] transition-colors">
                  <Paperclip className="w-4 h-4" style={{ color: ORANGE }} />
                  <span className="text-sm" style={{ color: fileName ? DARK : "#8B8178" }}>
                    {fileName ?? "Attach a file (max 10 MB)"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                  />
                </label>
              </Field>
              <Button onClick={handleSubmit}>
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </div>
          )}
        </PaperCard>

        {/* Info + Socials */}
        <div className="space-y-6">
          <PaperCard className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>
              Office Information
            </h3>
            <div className="space-y-4">
              {OFFICE.map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F3E2C4" }}>
                      <Icon className="w-4 h-4" style={{ color: ORANGE }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: GOLDEN }}>
                        {row.label}
                      </p>
                      <p className="text-sm mt-0.5" style={{ color: DARK }}>
                        {row.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </PaperCard>

          <PaperCard className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}>
              Follow us
            </h3>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.label}
                    aria-label={s.label}
                    onClick={() => toast(`Opening ${s.label}...`, "info")}
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50"
                    style={{ backgroundColor: ORANGE }}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </PaperCard>
        </div>
      </div>
    </PageShell>
  );
}
