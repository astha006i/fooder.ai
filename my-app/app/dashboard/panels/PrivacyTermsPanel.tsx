"use client";

import { useState } from "react";
import PrivacyPage from "../privacy/page";
import TermsPage from "../terms/page";
import { FOREST } from "../lib/constants";

type Tab = "privacy" | "terms";

export default function PrivacyTermsPanel({ arg }: { arg?: string }) {
  const [tab, setTab] = useState<Tab>(arg === "terms" ? "terms" : "privacy");

  const tabClass = (active: boolean) =>
    `px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
      active ? "text-white shadow-md" : "text-[#2E2B28] hover:bg-[#274D2F]/5"
    }`;

  return (
    <>
      <div className="px-6 sm:px-10 pt-6 pb-2 shrink-0">
        <div className="inline-flex items-center gap-1 bg-[#C88B42]/10 border border-[#C88B42]/30 rounded-full p-1">
          <button
            type="button"
            onClick={() => setTab("privacy")}
            className={tabClass(tab === "privacy")}
            style={tab === "privacy" ? { backgroundColor: FOREST } : {}}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => setTab("terms")}
            className={tabClass(tab === "terms")}
            style={tab === "terms" ? { backgroundColor: FOREST } : {}}
          >
            Terms &amp; Conditions
          </button>
        </div>
      </div>
      {tab === "privacy" ? <PrivacyPage /> : <TermsPage />}
    </>
  );
}
