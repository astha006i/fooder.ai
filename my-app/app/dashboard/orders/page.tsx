"use client";

import PageShell from "../components/PageShell";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Clock,
  Download,
  Receipt,
  RotateCcw,
  Search,
} from "lucide-react";
import {
  Badge,
  Button,
  Chip,
  Divider,
  EmptyState,
  PaperCard,
  Skeleton,
  TextInput,
  useToast,
} from "../components/ui";
import { FOREST, ORANGE, GOLDEN, DARK, CREAM } from "../lib/constants";

type Platform = "Swiggy" | "Zepto" | "Blinkit";
type OrderStatus = "Delivered" | "In Transit" | "Processing";

interface OrderItem {
  name: string;
  qty: number;
  unitPrice: number;
}

interface Order {
  id: string;
  platform: Platform;
  date: string;
  status: OrderStatus;
  total: number;
  deliveryTime: string;
  items: OrderItem[];
  comparison: { platform: Platform; total: number }[];
}

const PLATFORM_COLORS: Record<Platform, string> = {
  Swiggy: "#f60",
  Zepto: "#7c3aed",
  Blinkit: FOREST,
};

const STATUS_TONES: Record<OrderStatus, "forest" | "golden" | "orange"> = {
  Delivered: "forest",
  "In Transit": "golden",
  Processing: "orange",
};

const STATUS_FILTERS = ["All", "Delivered", "In Transit", "Processing"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

const ORDERS: Order[] = [
  {
    id: "#SW-2024",
    platform: "Swiggy",
    date: "24 Jul 2026 · 1:40 PM",
    status: "Delivered",
    total: 738,
    deliveryTime: "Delivered in 32 min",
    items: [
      { name: "Whole Wheat Paneer Wrap", qty: 2, unitPrice: 149 },
      { name: "Greek Salad Bowl", qty: 1, unitPrice: 219 },
      { name: "Kombucha (Ginger)", qty: 2, unitPrice: 110 },
    ],
    comparison: [
      { platform: "Swiggy", total: 738 },
      { platform: "Zepto", total: 701 },
      { platform: "Blinkit", total: 720 },
    ],
  },
  {
    id: "#ZT-1931",
    platform: "Zepto",
    date: "31 Jul 2026 · 8:15 PM",
    status: "In Transit",
    total: 445,
    deliveryTime: "Arriving in 12 min",
    items: [
      { name: "Organic Bananas (dozen)", qty: 1, unitPrice: 68 },
      { name: "Rolled Oats 500g", qty: 2, unitPrice: 120 },
      { name: "Almond Milk 1L", qty: 1, unitPrice: 137 },
    ],
    comparison: [
      { platform: "Swiggy", total: 472 },
      { platform: "Zepto", total: 445 },
      { platform: "Blinkit", total: 458 },
    ],
  },
  {
    id: "#BK-1908",
    platform: "Blinkit",
    date: "1 Aug 2026 · 9:05 AM",
    status: "Processing",
    total: 512,
    deliveryTime: "Estimated 10 min",
    items: [
      { name: "Fresh Salmon Fillet 250g", qty: 1, unitPrice: 320 },
      { name: "Basmati Rice 1kg", qty: 1, unitPrice: 132 },
      { name: "Lemon", qty: 4, unitPrice: 15 },
    ],
    comparison: [
      { platform: "Swiggy", total: 545 },
      { platform: "Zepto", total: 528 },
      { platform: "Blinkit", total: 512 },
    ],
  },
  {
    id: "#SW-1880",
    platform: "Swiggy",
    date: "12 Jul 2026 · 7:30 PM",
    status: "Delivered",
    total: 899,
    deliveryTime: "Delivered in 28 min",
    items: [
      { name: "Butter Chicken with Naan", qty: 1, unitPrice: 449 },
      { name: "Jeera Rice", qty: 1, unitPrice: 189 },
      { name: "Gulab Jamun (2 pc)", qty: 2, unitPrice: 130 },
    ],
    comparison: [
      { platform: "Swiggy", total: 899 },
      { platform: "Zepto", total: 861 },
      { platform: "Blinkit", total: 874 },
    ],
  },
];

export default function OrdersPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ORDERS.filter((order) => {
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      const matchesQuery =
        q === "" || (order.id + order.platform).toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [statusFilter, query]);

  return (
    <PageShell
      panel="order-history"
      title="Order History"
      subtitle="Your past orders, receipts and the cheapest platform for every cart"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((f) => (
            <Chip key={f} active={statusFilter === f} onClick={() => setStatusFilter(f)}>
              {f}
            </Chip>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "#8B8178" }}
            aria-hidden="true"
          />
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search orders..."
            className="pl-10"
            aria-label="Search orders"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <PaperCard key={i} className="p-5">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
            </PaperCard>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <PaperCard>
          <EmptyState
            icon={Receipt}
            title="No orders found"
            description="Try a different search term or status filter to find what you're looking for."
            action={
              <Button
                variant="secondary"
                onClick={() => {
                  setQuery("");
                  setStatusFilter("All");
                }}
              >
                Clear filters
              </Button>
            }
          />
        </PaperCard>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isExpanded = expandedId === order.id;
            const bestTotal = Math.min(...order.comparison.map((c) => c.total));
            const bestPlatform = order.comparison.find((c) => c.total === bestTotal);
            const savings = Math.max(0, order.total - bestTotal);
            return (
              <PaperCard key={order.id}>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  aria-expanded={isExpanded}
                  aria-label={`Toggle details for order ${order.id}`}
                  className="w-full text-left flex items-center gap-4 p-5 hover:bg-[#274D2F]/[0.03] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/40"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ backgroundColor: PLATFORM_COLORS[order.platform] }}
                  >
                    {order.platform[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold" style={{ color: DARK }}>
                        {order.id}
                      </span>
                      <span className="text-xs" style={{ color: "#8B8178" }}>
                        {order.date}
                      </span>
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "#8B8178" }}>
                      {order.platform}
                    </div>
                  </div>
                  <Badge tone={STATUS_TONES[order.status]}>{order.status}</Badge>
                  <span className="text-sm font-bold whitespace-nowrap" style={{ color: FOREST }}>
                    ₹{order.total}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    style={{ color: ORANGE }}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-5">
                        <Divider />

                        <div>
                          <div
                            className="text-[11px] font-semibold uppercase tracking-wider mb-2"
                            style={{ color: GOLDEN }}
                          >
                            Items
                          </div>
                          <div className="divide-y divide-[#274D2F]/5">
                            {order.items.map((item) => (
                              <div key={item.name} className="flex items-center gap-3 py-2">
                                <span className="flex-1 text-sm" style={{ color: DARK }}>
                                  {item.name}
                                </span>
                                <span className="text-xs" style={{ color: "#8B8178" }}>
                                  {item.qty} × ₹{item.unitPrice}
                                </span>
                                <span
                                  className="text-sm font-semibold w-16 text-right"
                                  style={{ color: DARK }}
                                >
                                  ₹{item.qty * item.unitPrice}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Clock
                            className="w-4 h-4"
                            style={{ color: ORANGE }}
                            aria-hidden="true"
                          />
                          <span className="font-semibold" style={{ color: DARK }}>
                            Delivery
                          </span>
                          <span style={{ color: "#8B8178" }}>{order.deliveryTime}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => toast(`Invoice for ${order.id} downloaded`)}
                          >
                            <Download className="w-4 h-4" />
                            Invoice
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => toast(`Reorder placed on ${order.platform}`)}
                          >
                            <RotateCcw className="w-4 h-4" />
                            Reorder
                          </Button>
                        </div>

                        <div className="rounded-2xl p-4" style={{ backgroundColor: CREAM }}>
                          <div className="flex items-center justify-between mb-2 gap-2">
                            <span
                              className="text-[11px] font-semibold uppercase tracking-wider"
                              style={{ color: GOLDEN }}
                            >
                              Price comparison
                            </span>
                            {savings > 0 && bestPlatform && (
                              <span className="text-xs font-semibold" style={{ color: ORANGE }}>
                                Save ₹{savings} on {bestPlatform.platform}
                              </span>
                            )}
                          </div>
                          <div className="space-y-1">
                            {order.comparison.map((c) => {
                              const isBest = c.total === bestTotal;
                              return (
                                <div
                                  key={c.platform}
                                  className="flex items-center gap-3 rounded-xl px-3 py-2"
                                  style={{
                                    backgroundColor: isBest
                                      ? "rgba(39,77,47,0.10)"
                                      : "transparent",
                                  }}
                                >
                                  <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{ backgroundColor: PLATFORM_COLORS[c.platform] }}
                                  />
                                  <span className="flex-1 text-sm font-medium" style={{ color: DARK }}>
                                    {c.platform}
                                  </span>
                                  <span
                                    className="text-sm font-bold"
                                    style={{ color: isBest ? FOREST : DARK }}
                                  >
                                    ₹{c.total}
                                  </span>
                                  {isBest && <Badge tone="forest">Best deal</Badge>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </PaperCard>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
