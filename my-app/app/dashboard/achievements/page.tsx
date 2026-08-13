"use client";

import PageShell from "../components/PageShell";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Trophy,
  Flame,
  ChefHat,
  UtensilsCrossed,
  BookOpen,
  ShoppingCart,
  CircleDollarSign,
  Leaf,
  Crown,
} from "lucide-react";
import { Badge, PaperCard, SectionTitle } from "../components/ui";
import { FOREST, GOLDEN, ORANGE, DARK } from "../lib/constants";

const UNLOCKED_COUNT = 3;
const DAY_STREAK = 7;
const COOKING_PROGRESS = 68;

interface Achievement {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  progress: number;
  status: "unlocked" | "in-progress" | "locked";
  date?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    icon: UtensilsCrossed,
    title: "First Meal Plan",
    description: "Generated your very first AI-crafted weekly meal plan.",
    progress: 100,
    status: "unlocked",
    date: "Mar 12, 2026",
  },
  {
    id: 2,
    icon: Flame,
    title: "7-Day Streak",
    description: "Followed your meal plan for seven days in a row.",
    progress: 100,
    status: "unlocked",
    date: "Apr 3, 2026",
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Recipe Explorer",
    description: "Cooked 10 recipes from your Fooder.AI collection.",
    progress: 100,
    status: "unlocked",
    date: "May 21, 2026",
  },
  {
    id: 4,
    icon: ChefHat,
    title: "Meal Prep Pro",
    description: "Batch-cooked a full week of meals in a single session.",
    progress: 65,
    status: "in-progress",
  },
  {
    id: 5,
    icon: ShoppingCart,
    title: "Grocery Guru",
    description: "Placed 5 orders using AI-powered price comparison.",
    progress: 40,
    status: "in-progress",
  },
  {
    id: 6,
    icon: CircleDollarSign,
    title: "Budget Saver",
    description: "Cut weekly grocery spend by 20% with smart swaps.",
    progress: 75,
    status: "in-progress",
  },
  {
    id: 7,
    icon: Leaf,
    title: "Zero Waste Hero",
    description: "Used every ingredient in your pantry before buying more.",
    progress: 0,
    status: "locked",
  },
  {
    id: 8,
    icon: Crown,
    title: "Pro Member",
    description: "Upgrade to Pro and unlock premium chef features.",
    progress: 0,
    status: "locked",
  },
];

interface Milestone {
  title: string;
  date: string;
  achieved: boolean;
}

const MILESTONES: Milestone[] = [
  { title: "Signed up for Fooder.AI", date: "Mar 1, 2026", achieved: true },
  { title: "First Meal Plan generated", date: "Mar 12, 2026", achieved: true },
  { title: "7-Day Streak reached", date: "Apr 3, 2026", achieved: true },
  { title: "First grocery order placed", date: "Apr 18, 2026", achieved: true },
  { title: "Become a Pro Member", date: "Upcoming", achieved: false },
];

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <PaperCard>
      <div className="p-6 flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "#F3E2C4" }}
        >
          <Icon className="w-5 h-5" style={{ color: ORANGE }} />
        </div>
        <div>
          <div
            className="text-3xl font-bold leading-none"
            style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
          >
            {value}
          </div>
          <div
            className="text-xs font-semibold uppercase tracking-wider mt-1.5"
            style={{ color: "#8B8178" }}
          >
            {label}
          </div>
        </div>
      </div>
    </PaperCard>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = achievement.icon;
  const locked = achievement.status === "locked";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        delay: achievement.id * 0.05,
      }}
      className="h-full"
    >
      <PaperCard className={`h-full ${locked ? "grayscale opacity-60" : ""}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-md shrink-0"
              style={{ background: "linear-gradient(135deg, #C88B42, #B96A28)" }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            {achievement.status === "unlocked" ? (
              <div className="text-right">
                <Badge tone="golden">Unlocked</Badge>
                <div className="text-[11px] mt-1.5" style={{ color: "#8B8178" }}>
                  {achievement.date}
                </div>
              </div>
            ) : achievement.status === "locked" ? (
              <Badge tone="neutral">Locked</Badge>
            ) : null}
          </div>
          <h3
            className="text-lg font-bold leading-snug"
            style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
          >
            {achievement.title}
          </h3>
          <p
            className="text-sm mt-1 flex-1"
            style={{ color: "#8B8178" }}
          >
            {achievement.description}
          </p>
          <div className="mt-4">
            {achievement.status === "in-progress" && (
              <>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: GOLDEN }}
                  >
                    In progress
                  </span>
                  <span className="text-xs font-bold" style={{ color: FOREST }}>
                    {achievement.progress}%
                  </span>
                </div>
                <div className="h-2 bg-[#274D2F]/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: GOLDEN }}
                    initial={{ width: 0 }}
                    animate={{ width: `${achievement.progress}%` }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </>
            )}
            {achievement.status === "unlocked" && (
              <div className="h-2 bg-[#274D2F]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: FOREST }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            )}
          </div>
        </div>
      </PaperCard>
    </motion.div>
  );
}

export default function AchievementsPage() {
  return (
    <PageShell
      panel="achievements"
      title="Achievements"
      subtitle="Track your cooking milestones and unlock rewards."
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon={Trophy}
            value={`${UNLOCKED_COUNT}`}
            label="Total Unlocked"
          />
          <StatCard icon={Flame} value={`${DAY_STREAK}`} label="Day Streak" />
          <StatCard
            icon={ChefHat}
            value={`${COOKING_PROGRESS}%`}
            label="Cooking Progress"
          />
        </div>

        <SectionTitle
          title="Your achievements"
          subtitle="Keep cooking to unlock every badge."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>

        <SectionTitle
          title="Milestones"
          subtitle="Key moments on your journey so far."
        />
        <PaperCard>
          <div className="p-6">
            <div className="relative pl-8">
              <div className="absolute left-[5px] top-2 bottom-2 w-[2px] rounded-full bg-[#274D2F]/10" />
              {MILESTONES.map((m) => (
                <div
                  key={m.title}
                  className={`relative pb-7 last:pb-0 ${
                    m.achieved ? "" : "opacity-50"
                  }`}
                >
                  <div
                    className="absolute left-0 top-0.5 w-3 h-3 rounded-full border-2 bg-white"
                    style={{ borderColor: m.achieved ? GOLDEN : "#C9C2B8" }}
                  />
                  <div
                    className="text-sm font-bold"
                    style={{ color: m.achieved ? FOREST : DARK }}
                  >
                    {m.title}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#8B8178" }}>
                    {m.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PaperCard>
      </div>
    </PageShell>
  );
}
