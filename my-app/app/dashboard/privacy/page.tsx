"use client";

import PageShell from "../components/PageShell";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Search, Shield } from "lucide-react";
import { Badge, Chip, Divider, PaperCard, TextInput } from "../components/ui";
import { FOREST, GOLDEN, ORANGE } from "../lib/constants";

interface Section {
  id: string;
  title: string;
  paragraphs: string[];
}

const LAST_UPDATED = "July 28, 2026";
const ACTIVE_OFFSET = 32;

const SECTIONS: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      "Welcome to Fooder.AI (\"we,\" \"us,\" or \"our\"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and related services (collectively, the \"Services\").",
      "By accessing or using the Services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our practices, please do not use the Services.",
      "This policy applies to all visitors, registered users, and anyone who interacts with our platform, including through integrations such as WhatsApp ordering and third-party grocery platforms.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      "Information you provide: When you create an account, complete your profile, or customize your meal plan, we collect details such as your name, email address, dietary preferences, budget, cuisine choices, fitness goals, and household size.",
      "Information collected automatically: We log technical data like your IP address, browser type, device information, pages visited, and interaction timestamps when you use the Services.",
      "Information from third parties: If you link accounts or use integrations with services like WhatsApp, payment processors, or grocery delivery partners, we may receive account information and transaction details consistent with those providers' permissions.",
    ],
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    paragraphs: [
      "We use your data to deliver personalized meal planning, grocery price comparisons, and nutrition insights, as well as to maintain and improve the Services.",
      "Your information helps us communicate with you about your account, send service notifications, and offer relevant recommendations or promotional content when you have opted in.",
      "We may aggregate or de-identify data to analyze usage patterns, conduct research, and enhance our AI recommendations without identifying individual users.",
    ],
  },
  {
    id: "data-sharing-disclosure",
    title: "Data Sharing & Disclosure",
    paragraphs: [
      "We do not sell your personal information. We share data only with service providers who help operate the Services, such as hosting, analytics, payment processing, and delivery partners, under contracts that require them to protect your data.",
      "We may disclose information to comply with legal obligations, enforce our Terms & Conditions, respond to lawful requests, or protect the rights, property, and safety of Fooder.AI, our users, or others.",
      "If Fooder.AI is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction, and we will notify you before this occurs.",
    ],
  },
  {
    id: "cookies-tracking",
    title: "Cookies & Tracking",
    paragraphs: [
      "We use cookies and similar technologies to remember your preferences, keep you signed in, and understand how you use the Services.",
      "Analytics and advertising partners may use tracking pixels or cookies to help us measure performance and deliver relevant content. You can control or disable cookies through your browser settings, though some features may not work as intended.",
      "Our Services do not currently respond to \"Do Not Track\" signals, but we provide the controls described in the Your Rights & Choices section below.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    paragraphs: [
      "We implement reasonable technical and organizational safeguards, including encryption in transit, access controls, and secure storage, to protect your information against unauthorized access, alteration, or destruction.",
      "No method of transmission over the Internet or method of electronic storage is completely secure, and we cannot guarantee absolute security.",
      "You are responsible for safeguarding your account credentials and for any activity that occurs under your account.",
    ],
  },
  {
    id: "your-rights-choices",
    title: "Your Rights & Choices",
    paragraphs: [
      "Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal information, as well as the right to data portability.",
      "You can update or correct most of your profile information directly in the app, and you may request account deletion or data export by contacting us at the address below.",
      "We will not discriminate against you for exercising any of your privacy rights, and we will respond to verifiable requests within the timeframes required by applicable law.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    paragraphs: [
      "We retain personal information only as long as necessary to provide the Services, fulfill the purposes described in this policy, or satisfy legal, accounting, and reporting requirements.",
      "When you delete your account, we will remove or anonymize your personal data within a reasonable period, except where we are required to keep certain records by law.",
      "Backup and archival copies may be retained for a limited time after deletion to ensure the integrity of our systems.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    paragraphs: [
      "The Services are intended for individuals who are at least 13 years old, or the minimum age of digital consent in their jurisdiction, and we do not knowingly collect personal information from children below that age.",
      "If you believe a child has provided us with personal information without parental consent, please contact us, and we will take steps to remove such data promptly.",
      "Where we become aware that we have collected information from a child in violation of this policy, we will delete it as quickly as possible.",
    ],
  },
  {
    id: "international-transfers",
    title: "International Transfers",
    paragraphs: [
      "Your information may be processed and stored in facilities outside your country of residence, and by using the Services you consent to the transfer of your data across international borders.",
      "When we transfer personal data across borders, we rely on appropriate safeguards such as standard contractual clauses or other lawful mechanisms recognized under applicable law.",
      "These transfers enable us to provide a consistent, reliable experience regardless of where you are located.",
    ],
  },
  {
    id: "changes-to-this-policy",
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements.",
      "When we make material changes, we will post the revised policy on this page and update the \"Last updated\" date at the top. Where required, we will provide additional notice or seek your consent.",
      "Continued use of the Services after changes take effect constitutes acceptance of the updated policy.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    paragraphs: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, you can reach us at privacy@fooder.ai.",
      "Our team will acknowledge your inquiry and respond as promptly as possible, usually within 10 business days.",
      "You may also write to us at: Fooder.AI, 100 Kitchen Lane, Bengaluru, Karnataka 560001, India.",
    ],
  },
];

const getScrollParent = (el: HTMLElement | null): HTMLElement | null => {
  let node: HTMLElement | null = el;
  while (node) {
    const overflowY = getComputedStyle(node).overflowY;
    if (/(auto|scroll)/.test(overflowY) && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

export default function PrivacyPolicyPage() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [query, setQuery] = useState("");

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS.filter((s) => s.title.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const scrollParent = getScrollParent(sectionRefs.current[SECTIONS[0].id] ?? null);
    if (!scrollParent) return;

    const updateActive = () => {
      const parentTop = scrollParent.getBoundingClientRect().top;
      let current = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const el = sectionRefs.current[section.id];
        if (!el) continue;
        const top = el.getBoundingClientRect().top - parentTop;
        if (top <= ACTIVE_OFFSET) current = section.id;
      }
      const atBottom =
        scrollParent.scrollTop + scrollParent.clientHeight >= scrollParent.scrollHeight - 8;
      if (atBottom) current = SECTIONS[SECTIONS.length - 1].id;
      setActiveId(current);
    };

    updateActive();
    scrollParent.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      scrollParent.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const first = filteredSections[0];
    if (first) scrollToSection(first.id);
  };

  return (
    <PageShell
      panel="privacy-terms"
      title="Privacy Policy"
      subtitle="How Fooder.AI collects, uses, and protects your information."
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="mx-auto w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:sticky lg:top-0 lg:block">
            <PaperCard>
              <div className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4" style={{ color: ORANGE }} />
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: GOLDEN }}
                  >
                    On this page
                  </span>
                </div>
                <div className="relative mb-2">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: "#8B8178" }}
                  />
                  <TextInput
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search sections"
                    aria-label="Search privacy policy sections"
                    className="pl-10"
                  />
                </div>
                <nav className="mt-3 space-y-1 lg:max-h-[calc(100vh-13rem)] lg:overflow-y-auto lg:pr-1">
                  {filteredSections.length > 0 ? (
                    filteredSections.map((section) => {
                      const isActive = section.id === activeId;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2 text-left text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/40 ${
                            isActive ? "text-white shadow-md" : "hover:bg-[#274D2F]/5"
                          }`}
                          style={
                            isActive
                              ? { backgroundColor: FOREST, color: "#ffffff" }
                              : { color: "#2E2B28" }
                          }
                        >
                          <span className="truncate">{section.title}</span>
                          <ChevronRight
                            className="h-4 w-4 flex-shrink-0"
                            style={{ color: isActive ? "#ffffff" : ORANGE }}
                          />
                        </button>
                      );
                    })
                  ) : (
                    <p className="px-3.5 py-2 text-xs" style={{ color: "#8B8178" }}>
                      No sections match &ldquo;{query}&rdquo;.
                    </p>
                  )}
                </nav>
              </div>
            </PaperCard>
          </aside>

          <div className="min-w-0">
            <div className="sticky top-0 z-20 mb-5 lg:hidden">
              <PaperCard className="p-4">
                <div className="relative mb-3">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: "#8B8178" }}
                  />
                  <TextInput
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search sections"
                    aria-label="Search privacy policy sections"
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {filteredSections.length > 0 ? (
                    filteredSections.map((section) => (
                      <Chip
                        key={section.id}
                        active={section.id === activeId}
                        onClick={() => scrollToSection(section.id)}
                      >
                        {section.title}
                      </Chip>
                    ))
                  ) : (
                    <span className="py-1.5 text-xs" style={{ color: "#8B8178" }}>
                      No sections match &ldquo;{query}&rdquo;
                    </span>
                  )}
                </div>
              </PaperCard>
            </div>

            <PaperCard className="mx-auto max-w-3xl">
              <div className="px-6 py-8 sm:px-10">
                <div className="mb-8 flex flex-wrap items-center gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: "#F3E2C4" }}
                  >
                    <Shield className="h-5 w-5" style={{ color: ORANGE }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      className="block text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: GOLDEN }}
                    >
                      Last updated
                    </span>
                    <span className="block text-sm font-medium" style={{ color: "#4A4540" }}>
                      {LAST_UPDATED}
                    </span>
                  </div>
                  <Badge tone="neutral">Privacy Policy</Badge>
                </div>
                <Divider className="mb-8" />
                {SECTIONS.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={(el) => {
                      sectionRefs.current[section.id] = el;
                    }}
                    className="scroll-mt-40 lg:scroll-mt-8"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className="text-xs font-bold tracking-wider"
                        style={{ color: GOLDEN }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2
                        className="text-xl font-bold tracking-tight sm:text-2xl"
                        style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                      >
                        {section.title}
                      </h2>
                    </div>
                    <div className="space-y-3">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-sm leading-relaxed"
                          style={{ fontFamily: "var(--font-lora)", color: "#4A4540" }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {index < SECTIONS.length - 1 && <Divider className="my-8" />}
                  </section>
                ))}
              </div>
            </PaperCard>
          </div>
        </div>
      </motion.div>
    </PageShell>
  );
}
