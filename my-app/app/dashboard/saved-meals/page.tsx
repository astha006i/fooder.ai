"use client";

import PageShell from "../components/PageShell";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  RefreshCw,
  Pencil,
  Copy,
  FileDown,
  Trash2,
  ClipboardList,
} from "lucide-react";
import {
  PaperCard,
  Badge,
  Button,
  TextInput,
  Field,
  Chip,
  useToast,
  EmptyState,
  Skeleton,
  Divider,
} from "../components/ui";
import { FOREST } from "../lib/constants";

type Category = "Breakfast" | "Lunch" | "Dinner" | "Vegetarian" | "High-Protein";

interface MealPlan {
  id: number;
  title: string;
  category: Category;
  createdAt: string;
  items: number;
  kcal: number;
  protein: number;
  carbs: number;
  image: string;
  busy: boolean;
}

const INITIAL_PLANS: MealPlan[] = [
  {
    id: 1,
    title: "Avocado Toast & Eggs",
    category: "Breakfast",
    createdAt: "Jun 12, 2026",
    items: 5,
    kcal: 480,
    protein: 22,
    carbs: 34,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&h=400&fit=crop",
    busy: false,
  },
  {
    id: 2,
    title: "Grilled Chicken Quinoa Bowl",
    category: "Lunch",
    createdAt: "Jun 10, 2026",
    items: 4,
    kcal: 520,
    protein: 38,
    carbs: 42,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop",
    busy: false,
  },
  {
    id: 3,
    title: "Teriyaki Salmon & Rice",
    category: "Dinner",
    createdAt: "Jun 8, 2026",
    items: 6,
    kcal: 610,
    protein: 41,
    carbs: 55,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=400&fit=crop",
    busy: false,
  },
  {
    id: 4,
    title: "Mediterranean Veggie Buddha Bowl",
    category: "Vegetarian",
    createdAt: "Jun 5, 2026",
    items: 7,
    kcal: 430,
    protein: 18,
    carbs: 48,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop",
    busy: false,
  },
  {
    id: 5,
    title: "High-Protein Muscle Prep",
    category: "High-Protein",
    createdAt: "Jun 2, 2026",
    items: 8,
    kcal: 720,
    protein: 58,
    carbs: 60,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&h=400&fit=crop",
    busy: false,
  },
  {
    id: 6,
    title: "Greek Yogurt Berry Parfait",
    category: "Breakfast",
    createdAt: "May 28, 2026",
    items: 3,
    kcal: 320,
    protein: 19,
    carbs: 28,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=400&fit=crop",
    busy: false,
  },
];

const FILTERS = ["All", "Breakfast", "Lunch", "Dinner", "Vegetarian", "High-Protein"] as const;

const COMPACT_PRIMARY =
  "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50 disabled:opacity-50 disabled:cursor-not-allowed";

const COMPACT_SECONDARY =
  "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#274D2F] bg-white/70 border border-[#C88B42]/30 hover:bg-[#274D2F]/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50";

const ICON_SECONDARY =
  "inline-flex items-center justify-center w-9 h-9 rounded-full text-[#B96A28] bg-orange-50 hover:bg-orange-100 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50";

const ICON_DANGER =
  "inline-flex items-center justify-center w-9 h-9 rounded-full text-[#C0392B] bg-red-50 hover:bg-red-100 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300";

function PlansSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <PaperCard key={i}>
          <Skeleton className="h-40 w-full rounded-none" />
          <div className="p-5 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
            <Skeleton className="h-9 w-full" />
          </div>
        </PaperCard>
      ))}
    </div>
  );
}

export default function SavedMealsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<MealPlan[]>(INITIAL_PLANS);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [renameTarget, setRenameTarget] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const idRef = useRef(INITIAL_PLANS.length + 1);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredPlans = useMemo(() => {
    const q = search.trim().toLowerCase();
    return plans.filter((plan) => {
      const matchesFilter = activeFilter === "All" || plan.category === activeFilter;
      const matchesSearch = q === "" || plan.title.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [plans, search, activeFilter]);

  const handleNewPlan = () => {
    toast("New meal plan draft created!");
  };

  const handleRegenerate = (id: number) => {
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, busy: true } : p)));
    setTimeout(() => {
      setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, busy: false } : p)));
      toast("Meal plan regenerated successfully!");
    }, 900);
  };

  const handleRenameOpen = (plan: MealPlan) => {
    setRenameTarget(plan.id);
    setRenameValue(plan.title);
  };

  const handleRenameCancel = () => {
    setRenameTarget(null);
    setRenameValue("");
  };

  const handleRenameConfirm = () => {
    const nextTitle = renameValue.trim();
    if (!nextTitle || renameTarget === null) return;
    setPlans((prev) =>
      prev.map((p) => (p.id === renameTarget ? { ...p, title: nextTitle } : p))
    );
    setRenameTarget(null);
    setRenameValue("");
    toast("Meal plan renamed!");
  };

  const handleDuplicate = (id: number) => {
    setPlans((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      const source = prev[idx];
      if (!source) return prev;
      const copy: MealPlan = {
        ...source,
        id: idRef.current++,
        title: `${source.title} (copy)`,
        busy: false,
      };
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
    toast("Meal plan duplicated!");
  };

  const handleDownload = () => {
    toast("Preparing your PDF...");
  };

  const handleDelete = (id: number) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
    setConfirmDelete(null);
    toast("Meal plan deleted.");
  };

  const handleRestore = () => {
    setPlans(INITIAL_PLANS.map((p) => ({ ...p })));
    setSearch("");
    setActiveFilter("All");
    toast("Sample meal plans restored!");
  };

  return (
    <PageShell
      panel="saved-meal-plans"
      title="Saved Meal Plans"
      subtitle="Your regenerated and downloaded plans, kept in one place."
    >
      {loading ? (
        <PlansSkeleton />
      ) : (
        <>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
            <div className="relative flex-1 lg:max-w-xs">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#8B8178" }}
              />
              <TextInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search meal plans..."
                className="pl-11"
                aria-label="Search meal plans"
              />
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {FILTERS.map((f) => (
                <Chip key={f} active={activeFilter === f} onClick={() => setActiveFilter(f)}>
                  {f}
                </Chip>
              ))}
            </div>
            <Button variant="primary" onClick={handleNewPlan}>
              <Plus className="w-4 h-4" />
              New Plan
            </Button>
          </div>

          {filteredPlans.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filteredPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                  >
                    <PaperCard>
                      <div className="relative h-40">
                        <img
                          src={plan.image}
                          alt={plan.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge tone="orange">{plan.category}</Badge>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3
                          className="text-lg font-bold leading-snug"
                          style={{ fontFamily: "Harrington, 'Times New Roman', serif", color: FOREST }}
                        >
                          {plan.title}
                        </h3>
                        <div
                          className="flex items-center justify-between text-xs mt-1.5"
                          style={{ color: "#8B8178" }}
                        >
                          <span>{plan.createdAt}</span>
                          <span>{plan.items} items</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {[
                            { label: "kcal", value: plan.kcal },
                            { label: "protein", value: `${plan.protein}g` },
                            { label: "carbs", value: `${plan.carbs}g` },
                          ].map((stat) => (
                            <div
                              key={stat.label}
                              className="rounded-xl bg-[#274D2F]/5 px-2 py-2 text-center"
                            >
                              <div className="text-sm font-bold" style={{ color: FOREST }}>
                                {stat.value}
                              </div>
                              <div
                                className="text-[10px] font-medium uppercase tracking-wider mt-0.5"
                                style={{ color: "#8B8178" }}
                              >
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <Divider className="my-4" />

                        <div className="flex items-center gap-2 flex-wrap">
                          <Button
                            variant="primary"
                            className={COMPACT_PRIMARY}
                            onClick={() => handleRegenerate(plan.id)}
                            disabled={plan.busy}
                          >
                            {plan.busy ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <RefreshCw className="w-3.5 h-3.5" />
                            )}
                            {plan.busy ? "Regenerating" : "Regenerate"}
                          </Button>
                          <Button
                            variant="secondary"
                            className={COMPACT_SECONDARY}
                            onClick={() => handleRenameOpen(plan)}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            Rename
                          </Button>
                          <Button
                            variant="secondary"
                            className={COMPACT_SECONDARY}
                            onClick={handleDownload}
                          >
                            <FileDown className="w-3.5 h-3.5" />
                            PDF
                          </Button>
                          <Button
                            variant="golden"
                            className={ICON_SECONDARY}
                            onClick={() => handleDuplicate(plan.id)}
                            aria-label={`Duplicate ${plan.title}`}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="danger"
                            className={ICON_DANGER}
                            onClick={() =>
                              setConfirmDelete(confirmDelete === plan.id ? null : plan.id)
                            }
                            aria-label={`Delete ${plan.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <AnimatePresence>
                          {confirmDelete === plan.id && (
                            <motion.div
                              key="delete-confirm"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 flex items-center justify-between gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                                <span
                                  className="text-xs font-semibold"
                                  style={{ color: "#C0392B" }}
                                >
                                  Delete this plan?
                                </span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleDelete(plan.id)}
                                    className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-full px-3 py-1.5 transition-colors"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="text-xs font-semibold rounded-full px-3 py-1.5 border border-[#C88B42]/30 text-[#2E2B28] hover:bg-[#274D2F]/5 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </PaperCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <PaperCard>
              <EmptyState
                icon={ClipboardList}
                title={
                  plans.length === 0 ? "No saved meal plans" : "No plans match your search"
                }
                description={
                  plans.length === 0
                    ? "Your regenerated and downloaded meal plans will appear here."
                    : "Try a different search term or filter."
                }
                action={
                  plans.length === 0 ? (
                    <Button variant="primary" onClick={handleRestore}>
                      Restore sample plans
                    </Button>
                  ) : undefined
                }
              />
            </PaperCard>
          )}
        </>
      )}

      <AnimatePresence>
        {renameTarget !== null && (
          <motion.div
            key="rename-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={handleRenameCancel}
              aria-hidden="true"
            />
            <motion.div
              initial={{ scale: 0.95, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm"
            >
              <PaperCard className="p-6">
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: "Harrington, 'Times New Roman', serif", color: FOREST }}
                >
                  Rename plan
                </h3>
                <p className="text-xs mb-4" style={{ color: "#8B8178" }}>
                  Give this meal plan a new name.
                </p>
                <Field label="Plan title">
                  <TextInput
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    placeholder="e.g. Summer high-protein prep"
                    autoFocus
                  />
                </Field>
                <div className="flex justify-end gap-3 mt-5">
                  <Button variant="secondary" onClick={handleRenameCancel}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleRenameConfirm}
                    disabled={!renameValue.trim()}
                  >
                    Save
                  </Button>
                </div>
              </PaperCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
