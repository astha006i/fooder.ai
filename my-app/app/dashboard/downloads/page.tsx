"use client";

import PageShell from "../components/PageShell";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Download,
  FileImage,
  FileSpreadsheet,
  FileText,
  Search,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  Badge,
  Button,
  Chip,
  EmptyState,
  PaperCard,
  Skeleton,
  TextInput,
  useToast,
} from "../components/ui";
import { FOREST, GOLDEN, DARK, CREAM } from "../lib/constants";

type FileType = "PDF" | "CSV" | "PNG";

interface DownloadEntry {
  id: string;
  name: string;
  type: FileType;
  date: string;
  size: string;
}

interface TypeMeta {
  icon: LucideIcon;
  circle: string;
  iconColor: string;
  badge: "red" | "forest" | "golden";
}

const TYPE_META: Record<FileType, TypeMeta> = {
  PDF: { icon: FileText, circle: "#FDE8E8", iconColor: "#C0392B", badge: "red" },
  CSV: {
    icon: FileSpreadsheet,
    circle: "rgba(39,77,47,0.10)",
    iconColor: FOREST,
    badge: "forest",
  },
  PNG: { icon: FileImage, circle: "#F3E2C4", iconColor: GOLDEN, badge: "golden" },
};

const TYPE_FILTERS = ["All", "PDF", "CSV", "PNG"] as const;
type TypeFilter = (typeof TYPE_FILTERS)[number];

const INITIAL_ENTRIES: DownloadEntry[] = [
  {
    id: "dl-1",
    name: "weekly-meal-plan.pdf",
    type: "PDF",
    date: "28 Jul 2026",
    size: "1.2 MB",
  },
  {
    id: "dl-2",
    name: "grocery-price-compare.csv",
    type: "CSV",
    date: "26 Jul 2026",
    size: "342 KB",
  },
  {
    id: "dl-3",
    name: "nutrition-progress-report.png",
    type: "PNG",
    date: "22 Jul 2026",
    size: "4.8 MB",
  },
  {
    id: "dl-4",
    name: "shopping-list-raw.pdf",
    type: "PDF",
    date: "19 Jul 2026",
    size: "890 KB",
  },
  {
    id: "dl-5",
    name: "calorie-log-march.csv",
    type: "CSV",
    date: "15 Jul 2026",
    size: "128 KB",
  },
];

export default function DownloadsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [entries, setEntries] = useState<DownloadEntry[]>(INITIAL_ENTRIES);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = entries.filter((entry) => {
    const matchesType = typeFilter === "All" || entry.type === typeFilter;
    const matchesQuery = q === "" || entry.name.toLowerCase().includes(q);
    return matchesType && matchesQuery;
  });

  const handleDelete = (id: string) => {
    const entry = entries.find((e) => e.id === id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setConfirmId(null);
    if (entry) toast(`${entry.name} deleted`);
  };

  const handleClear = () => {
    if (entries.length === 0) return;
    setEntries([]);
    setConfirmId(null);
    toast("Download history cleared");
  };

  return (
    <PageShell
      panel="download-history"
      title="Download History"
      subtitle="Files you've generated, ready to grab again whenever you need them"
    >
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "#8B8178" }}
              aria-hidden="true"
            />
            <TextInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search downloads..."
              className="pl-10"
              aria-label="Search downloads"
            />
          </div>
          <Button variant="secondary" onClick={handleClear} disabled={entries.length === 0}>
            <Trash2 className="w-4 h-4" />
            Clear history
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {TYPE_FILTERS.map((f) => (
            <Chip key={f} active={typeFilter === f} onClick={() => setTypeFilter(f)}>
              {f}
            </Chip>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <PaperCard key={i} className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-11 h-11 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </PaperCard>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <PaperCard>
          <EmptyState
            icon={Download}
            title="Nothing here yet"
            description="Your download history is empty. Clear the filters or restore your previous files."
            action={
              entries.length === 0 ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEntries(INITIAL_ENTRIES);
                    toast("History restored");
                  }}
                >
                  Restore history
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuery("");
                    setTypeFilter("All");
                  }}
                >
                  Clear filters
                </Button>
              )
            }
          />
        </PaperCard>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {filtered.map((entry) => {
              const meta = TYPE_META[entry.type];
              const Icon = meta.icon;
              const confirming = confirmId === entry.id;
              return (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  <PaperCard className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: meta.circle }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: meta.iconColor }}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate" style={{ color: DARK }}>
                            {entry.name}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: "#8B8178" }}>
                            {entry.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Badge tone={meta.badge}>{entry.type}</Badge>
                        <span className="text-sm font-medium" style={{ color: "#8B8178" }}>
                          {entry.size}
                        </span>
                        <div
                          className="w-12 h-12 rounded-xl border border-[#C88B42]/25 flex items-center justify-center"
                          style={{ backgroundColor: CREAM }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: meta.iconColor }}
                            aria-hidden="true"
                          />
                        </div>

                        {confirming ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold" style={{ color: "#C0392B" }}>
                              Delete?
                            </span>
                            <Button
                              variant="danger"
                              className="px-4 py-2"
                              onClick={() => handleDelete(entry.id)}
                            >
                              <Check className="w-4 h-4" />
                              Yes
                            </Button>
                            <Button
                              variant="secondary"
                              className="px-4 py-2"
                              onClick={() => setConfirmId(null)}
                            >
                              <X className="w-4 h-4" />
                              No
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="secondary"
                              className="px-4 py-2"
                              onClick={() => toast(`Downloading ${entry.name}`)}
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </Button>
                            <button
                              onClick={() => setConfirmId(entry.id)}
                              aria-label={`Delete ${entry.name}`}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#FDE8E8] hover:bg-[#FBD5D5] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]/50"
                            >
                              <Trash2
                                className="w-4 h-4"
                                style={{ color: "#C0392B" }}
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </PaperCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </PageShell>
  );
}
