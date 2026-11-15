"use client";

import PageShell from "../components/PageShell";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  ArrowUp,
  CheckCircle2,
  Clock,
  Rocket,
  Inbox,
} from "lucide-react";
import { PaperCard, Button, Field, Select, TextArea, useToast, Badge } from "../components/ui";
import { FOREST, ORANGE, DARK } from "../lib/constants";

interface Suggestion {
  id: number;
  title: string;
  category: string;
  votes: number;
  status: "Under Review" | "In Progress" | "Shipped" | "Planned";
}

const INITIAL_SUGGESTIONS: Suggestion[] = [
  { id: 1, title: "Add voice input for meal preferences", category: "UI/UX", votes: 48, status: "In Progress" },
  { id: 2, title: "Family-sharing for grocery lists", category: "Groceries", votes: 37, status: "Under Review" },
  { id: 3, title: "Export weekly reports as PDF digest", category: "Tracking", votes: 29, status: "Shipped" },
  { id: 4, title: "Integration with fitness wearables", category: "Tracking", votes: 21, status: "Planned" },
  { id: 5, title: "Regional language support for recipes", category: "Meal Planning", votes: 15, status: "Under Review" },
];

const STATUS_TONES: Record<Suggestion["status"], "golden" | "orange" | "forest" | "neutral"> = {
  "Under Review": "golden",
  "In Progress": "orange",
  Shipped: "forest",
  Planned: "neutral",
};

export default function SuggestPage() {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS);
  const [category, setCategory] = useState("Meal Planning");
  const [description, setDescription] = useState("");
  const [impact, setImpact] = useState("High");
  const [voted, setVoted] = useState<Set<number>>(new Set());

  const sorted = useMemo(
    () => [...suggestions].sort((a, b) => b.votes - a.votes),
    [suggestions]
  );

  const submitIdea = () => {
    if (!description.trim()) {
      toast("Please describe your feature idea", "error");
      return;
    }
    const newSuggestion: Suggestion = {
      id: Date.now(),
      title: description.trim(),
      category,
      votes: 1,
      status: "Under Review",
    };
    setSuggestions((prev) => [newSuggestion, ...prev]);
    setVoted((prev) => new Set(prev).add(newSuggestion.id));
    setDescription("");
    toast("Your idea has been submitted!", "success");
  };

  const upvote = (id: number) => {
    setVoted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setSuggestions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, votes: Math.max(0, s.votes - 1) } : s))
        );
        return next;
      }
      next.add(id);
      setSuggestions((prev) => prev.map((s) => (s.id === id ? { ...s, votes: s.votes + 1 } : s)));
      toast("Thanks for the vote!", "success");
      return next;
    });
  };

  return (
    <PageShell title="Suggest a Feature" subtitle="Help shape the future of Fooder.AI" panel="suggest-feature">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submission form */}
        <PaperCard className="p-6 h-fit">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F3E2C4" }}>
              <Lightbulb className="w-5 h-5" style={{ color: ORANGE }} />
            </div>
            <h3 className="text-lg font-bold" style={{ fontFamily: "Harrington, 'Times New Roman', serif", color: FOREST }}>
              Share your idea
            </h3>
          </div>
          <div className="space-y-4">
            <Field label="Category">
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Meal Planning</option>
                <option>Groceries</option>
                <option>Tracking</option>
                <option>UI/UX</option>
                <option>Other</option>
              </Select>
            </Field>
            <Field label="Feature Description">
              <TextArea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the feature you'd love to see..."
              />
            </Field>
            <Field label="Expected Impact">
              <Select value={impact} onChange={(e) => setImpact(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Select>
            </Field>
            <Button onClick={submitIdea}>
              <Lightbulb className="w-4 h-4" />
              Submit Idea
            </Button>
          </div>
        </PaperCard>

        {/* Existing suggestions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ fontFamily: "Harrington, 'Times New Roman', serif", color: FOREST }}>
              Community Suggestions
            </h3>
            <Badge tone="neutral">{sorted.length} ideas</Badge>
          </div>
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {sorted.map((s) => {
                const isVoted = voted.has(s.id);
                const StatusIcon =
                  s.status === "Shipped" ? CheckCircle2 : s.status === "In Progress" ? Clock : s.status === "Planned" ? Inbox : Rocket;
                return (
                  <motion.div
                    key={s.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <PaperCard className="p-4 flex items-center gap-4">
                      <button
                        onClick={() => upvote(s.id)}
                        aria-label="Upvote"
                        className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50 ${
                          isVoted ? "border-transparent text-white" : "hover:bg-[#274D2F]/5"
                        }`}
                        style={isVoted ? { backgroundColor: FOREST } : { borderColor: "rgba(39,77,47,0.15)" }}
                      >
                        <ArrowUp className="w-4 h-4" />
                        <span className="text-xs font-bold">{s.votes}</span>
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-snug" style={{ color: DARK }}>
                          {s.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <Badge tone="neutral">{s.category}</Badge>
                          <Badge tone={STATUS_TONES[s.status]}>
                            <StatusIcon className="w-3 h-3" />
                            {s.status}
                          </Badge>
                        </div>
                      </div>
                    </PaperCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
