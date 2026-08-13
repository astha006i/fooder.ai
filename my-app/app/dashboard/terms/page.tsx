"use client";

import PageShell from "../components/PageShell";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, FileText, Search } from "lucide-react";
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
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    paragraphs: [
      "These Terms & Conditions (\"Terms\") govern your access to and use of the Fooder.AI website, mobile application, and services (collectively, the \"Services\"). By creating an account or using the Services in any way, you agree to be bound by these Terms.",
      "If you do not agree with any part of these Terms, you must not access or use the Services.",
      "We may provide translations of these Terms for convenience; the English version shall prevail in the event of any conflict.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    paragraphs: [
      "You must be at least 13 years old, or the minimum age of digital consent in your jurisdiction, to use the Services. If you are using the Services on behalf of a business or organization, you represent that you have authority to bind that entity.",
      "The Services are available only to individuals who are legally capable of forming binding contracts and who are not barred from using them under applicable law.",
      "By using the Services, you confirm that the information you provide is accurate, current, and complete.",
    ],
  },
  {
    id: "accounts-registration",
    title: "Accounts & Registration",
    paragraphs: [
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      "You agree to notify us immediately of any unauthorized use of your account or any other security breach.",
      "We reserve the right to refuse registration, suspend, or terminate accounts that we reasonably believe violate these Terms or applicable law.",
    ],
  },
  {
    id: "use-of-services",
    title: "Use of Services",
    paragraphs: [
      "The Services provide AI-generated meal plans, grocery price comparisons, nutrition tracking, and related tools. Results are generated based on the information you provide and are intended as general guidance only.",
      "You agree to use the Services only for lawful purposes and in accordance with these Terms, and you will not attempt to interfere with, disrupt, or compromise the Services.",
      "We may modify, suspend, or discontinue any part of the Services at any time without liability, subject to your rights under applicable law.",
    ],
  },
  {
    id: "payments-subscriptions",
    title: "Payments & Subscriptions",
    paragraphs: [
      "Certain features of the Services may be offered on a subscription or one-time purchase basis. Prices, billing cycles, and payment terms will be clearly presented before you commit to any purchase.",
      "You authorize us to charge your chosen payment method for the applicable fees, including recurring subscription charges, until you cancel in accordance with the cancellation terms shown at the time of purchase.",
      "Unless otherwise stated, all fees are exclusive of applicable taxes, and refunds are governed by our refund policy as published on the Services.",
    ],
  },
  {
    id: "user-content",
    title: "User Content",
    paragraphs: [
      "You retain ownership of any content, preferences, and data you submit to the Services (\"User Content\").",
      "By submitting User Content, you grant us a non-exclusive, worldwide, royalty-free license to store, process, and use it solely to provide, improve, and personalize the Services.",
      "You are solely responsible for your User Content and warrant that it does not infringe the rights of any third party or violate applicable law.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    paragraphs: [
      "You agree not to use the Services to upload, transmit, or share content that is unlawful, harmful, deceptive, harassing, or infringing.",
      "You may not attempt to access the Services through automated means, harvest data, reverse engineer the platform, or use it in a way that could impair its availability.",
      "We may investigate violations and take appropriate action, including suspending or terminating accounts and reporting unlawful activity to authorities.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    paragraphs: [
      "All software, design, text, graphics, logos, and other materials comprising the Services are owned by Fooder.AI or its licensors and are protected by copyright, trademark, and other intellectual property laws.",
      "You may not copy, modify, distribute, or create derivative works from any portion of the Services without our prior written consent.",
      "You retain no ownership rights to the AI-generated content provided through the Services beyond a personal, non-exclusive, non-transferable license to use it for your own meal planning.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    paragraphs: [
      "The Services are provided \"as is\" and \"as available\" without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "Meal plans and nutrition information are generated for general guidance and are not a substitute for professional medical, dietary, or nutritional advice. Consult a qualified professional before making significant changes to your diet.",
      "We do not warrant that the Services will be uninterrupted, error-free, or free of harmful components, or that results will meet your expectations.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, Fooder.AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or goodwill arising from your use of the Services.",
      "Our total aggregate liability arising out of or relating to these Terms or the Services shall not exceed the amount you paid to us in the twelve months preceding the event giving rise to the liability.",
      "Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    paragraphs: [
      "You may stop using the Services at any time and may delete your account in accordance with the deletion options available in the Services.",
      "We may suspend or terminate your access to the Services at our discretion if you breach these Terms, where the breach is serious or repeated.",
      "Upon termination, provisions that by their nature should survive, including intellectual property, disclaimers, limitation of liability, and governing law, will continue in effect.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of India, without regard to its conflict-of-law principles, and the courts of Bengaluru, Karnataka shall have exclusive jurisdiction over any disputes.",
      "You agree to resolve any disputes through good-faith negotiation first, and where negotiations fail, through the courts specified above.",
      "If any provision of these Terms is held invalid or unenforceable, the remaining provisions will remain in full force and effect.",
    ],
  },
  {
    id: "changes-to-these-terms",
    title: "Changes to These Terms",
    paragraphs: [
      "We may revise these Terms from time to time to reflect changes in our Services, business, or legal requirements.",
      "When we make material changes, we will notify you by updating the \"Last updated\" date and, where appropriate, by email or in-app notice. Your continued use of the Services constitutes acceptance of the revised Terms.",
      "You can review the current version of these Terms at any time on this page.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      "If you have questions about these Terms, you can reach us at support@fooder.ai.",
      "For legal correspondence, write to: Fooder.AI Legal, 100 Kitchen Lane, Bengaluru, Karnataka 560001, India.",
      "We aim to respond to all inquiries within 10 business days.",
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

export default function TermsAndConditionsPage() {
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
      panelTab="terms"
      title="Terms & Conditions"
      subtitle="The agreement that governs your use of Fooder.AI."
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
                  <FileText className="h-4 w-4" style={{ color: ORANGE }} />
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
                    aria-label="Search terms and conditions sections"
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
                    aria-label="Search terms and conditions sections"
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
                    <FileText className="h-5 w-5" style={{ color: ORANGE }} />
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
                  <Badge tone="neutral">Terms &amp; Conditions</Badge>
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
