"use client";

import PageShell from "../components/PageShell";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellRing, CheckCheck, Inbox, X } from "lucide-react";
import {
  Badge,
  Button,
  Chip,
  Divider,
  EmptyState,
  PaperCard,
  SectionTitle,
  Skeleton,
  Toggle,
  useToast,
} from "../components/ui";
import { FOREST, ORANGE, DARK } from "../lib/constants";

const FILTERS = [
  "All",
  "Meal Plans",
  "Grocery Deals",
  "Orders",
  "Reminders",
  "System Updates",
] as const;

type Filter = (typeof FILTERS)[number];
type Category = Exclude<Filter, "All">;

const CATEGORY_TONES: Record<
  Category,
  "forest" | "golden" | "orange" | "red" | "neutral"
> = {
  "Meal Plans": "forest",
  "Grocery Deals": "orange",
  Orders: "golden",
  Reminders: "neutral",
  "System Updates": "red",
};

interface NotificationItem {
  id: number;
  category: Category;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    category: "Meal Plans",
    title: "This week's meal plan is ready",
    description:
      "Your AI chef planned 7 dinners around a ₹1,200 budget. Tap to review.",
    time: "12 min ago",
    unread: true,
  },
  {
    id: 2,
    category: "Grocery Deals",
    title: "Tomatoes dropped by 22% on Zepto",
    description:
      "Items from your shopping list are cheaper today. Grab them before midnight.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: 3,
    category: "Orders",
    title: "Order #2841 is out for delivery",
    description:
      "Your Blinkit order with 12 items is on the way. Expected by 6:30 PM.",
    time: "2 hrs ago",
    unread: true,
  },
  {
    id: 4,
    category: "Reminders",
    title: "Time to prep tomorrow's lunch",
    description:
      "Your schedule says Monday. Grill the chicken tonight to save 20 minutes.",
    time: "5 hrs ago",
    unread: false,
  },
  {
    id: 5,
    category: "System Updates",
    title: "Pantry sync is now live",
    description:
      "Fooder.AI now syncs your pantry across all linked devices instantly.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 6,
    category: "Meal Plans",
    title: "Recipe updated: Dal Makhani",
    description:
      "We cut the cream by 40% to hit your fitness goal while keeping the taste.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 7,
    category: "Grocery Deals",
    title: "Weekend bundle: 2 kg rice for ₹180",
    description:
      "Swiggy Instamart has a weekend bundle in your preferred brands.",
    time: "2 days ago",
    unread: false,
  },
];

export default function NotificationsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("All");
  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const unreadCount = items.filter((i) => i.unread).length;
  const filtered =
    filter === "All" ? items : items.filter((i) => i.category === filter);

  const markRead = (id: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, unread: false } : i))
    );
  };

  const dismiss = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const markAll = () => {
    setItems((prev) => prev.map((i) => ({ ...i, unread: false })));
    toast("All notifications marked as read");
  };

  return (
    <PageShell
      panel="notifications"
      title="Notifications"
      subtitle="All your Fooder.AI updates in one place."
    >
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-40 sm:ml-auto" />
            </div>
            {[0, 1, 2, 3, 4].map((n) => (
              <Skeleton key={n} className="h-28" />
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone={unreadCount > 0 ? "red" : "neutral"}>
                  {unreadCount} unread
                </Badge>
                <div className="flex flex-wrap gap-2">
                  {FILTERS.map((f) => (
                    <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
                      {f}
                    </Chip>
                  ))}
                </div>
              </div>
              <Button onClick={markAll} disabled={unreadCount === 0}>
                <CheckCheck className="w-4 h-4" />
                Mark all as read
              </Button>
            </div>

            {filtered.length === 0 ? (
              <PaperCard>
                <EmptyState
                  icon={Inbox}
                  title="No notifications here"
                  description="Nothing in this category yet. Check back soon."
                />
              </PaperCard>
            ) : (
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="mb-4 last:mb-0"
                  >
                    <PaperCard>
                      <div onClick={() => markRead(item.id)} className="p-5 cursor-pointer select-none">
                        <div className="flex items-start gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              {item.unread && (
                                <span
                                  className="inline-block w-2 h-2 rounded-full shrink-0"
                                  style={{ backgroundColor: FOREST }}
                                />
                              )}
                              <Badge tone={CATEGORY_TONES[item.category]}>
                                {item.category}
                              </Badge>
                              <span
                                className="ml-auto text-xs shrink-0"
                                style={{ color: "#8B8178" }}
                              >
                                {item.time}
                              </span>
                            </div>
                            <h3
                              className={`text-[15px] ${
                                item.unread ? "font-bold" : "font-semibold"
                              }`}
                              style={{ color: DARK }}
                            >
                              {item.title}
                            </h3>
                            <p
                              className="text-sm mt-0.5"
                              style={{ color: "#8B8178" }}
                            >
                              {item.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            {item.unread && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markRead(item.id);
                                }}
                                className="text-[11px] font-bold uppercase tracking-wider border border-[#C88B42]/30 rounded-full px-3 py-1.5 hover:bg-[#274D2F]/5 transition-colors"
                                style={{ color: FOREST }}
                              >
                                Mark read
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                dismiss(item.id);
                              }}
                              aria-label="Dismiss notification"
                              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#274D2F]/5 transition-colors"
                            >
                              <X className="w-4 h-4" style={{ color: "#8B8178" }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </PaperCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            <SectionTitle
              title="Preferences"
              subtitle="Choose how Fooder.AI reaches you."
            />
            <PaperCard>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#F3E2C4" }}
                  >
                    <BellRing className="w-5 h-5" style={{ color: ORANGE }} />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                    >
                      Notification preferences
                    </h3>
                    <p className="text-xs" style={{ color: "#8B8178" }}>
                      Switch delivery channels on or off
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold" style={{ color: DARK }}>
                        Email notifications
                      </div>
                      <div className="text-xs" style={{ color: "#8B8178" }}>
                        Weekly digest, deals and account updates
                      </div>
                    </div>
                    <Toggle checked={emailEnabled} onChange={setEmailEnabled} />
                  </div>
                  <Divider />
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold" style={{ color: DARK }}>
                        Push notifications
                      </div>
                      <div className="text-xs" style={{ color: "#8B8178" }}>
                        Real-time alerts on your phone
                      </div>
                    </div>
                    <Toggle checked={pushEnabled} onChange={setPushEnabled} />
                  </div>
                </div>
              </div>
            </PaperCard>
          </>
        )}
      </div>
    </PageShell>
  );
}
