"use client";

import PageShell from "../components/PageShell";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Clock,
  MessageCircle,
  QrCode,
  RefreshCw,
  Save,
  Share2,
  ShoppingCart,
  Unplug,
  UtensilsCrossed,
} from "lucide-react";
import {
  Button,
  Chip,
  Field,
  PaperCard,
  TextInput,
  Toggle,
  useToast,
} from "../components/ui";
import { FOREST, ORANGE, GOLDEN, DARK } from "../lib/constants";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const QR_SIZE = 21;

function buildQrMatrix(size: number, seed: number): boolean[][] {
  const matrix: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
  );

  const drawFinder = (row: number, col: number) => {
    for (let r = 0; r < 7; r += 1) {
      for (let c = 0; c < 7; c += 1) {
        const outer = r === 0 || r === 6 || c === 0 || c === 6;
        const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[row + r][col + c] = outer || core;
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  for (let i = 0; i < size; i += 1) {
    matrix[7][i] = false;
    matrix[i][7] = false;
    matrix[size - 8][i] = false;
    matrix[i][size - 8] = false;
  }

  for (let i = 8; i < size - 8; i += 1) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  let state = seed;
  const random = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };

  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      if (!matrix[r][c]) matrix[r][c] = random() > 0.5;
    }
  }

  return matrix;
}

const QR_MATRIX = buildQrMatrix(QR_SIZE, 1337);

function QRCode({ size, matrix }: { size: number; matrix: boolean[][] }) {
  return (
    <div
      role="img"
      aria-label="WhatsApp pairing QR code"
      className="shrink-0 rounded-xl border-4 border-[#C88B42]/30 bg-[#FDF9F0] p-2 shadow-sm"
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          width: 168,
          height: 168,
        }}
      >
        {matrix.flatMap((row, r) =>
          row.map((filled, c) => (
            <div key={`${r}-${c}`} className={filled ? "bg-[#1F2937]" : "bg-white"} />
          ))
        )}
      </div>
    </div>
  );
}

function PreferenceRow({
  icon: Icon,
  title,
  description,
  checked,
  onToggle,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  checked: boolean;
  onToggle: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-start gap-3 min-w-0">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "rgba(39,77,47,0.1)" }}
        >
          <Icon className="w-4 h-4" style={{ color: ORANGE }} />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold" style={{ color: DARK }}>
            {title}
          </div>
          <div className="text-xs" style={{ color: "#8B8178" }}>
            {description}
          </div>
        </div>
      </div>
      <Toggle checked={checked} onChange={onToggle} />
    </div>
  );
}

export default function WhatsAppPage() {
  const { toast } = useToast();
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [days, setDays] = useState<string[]>(["Mon", "Wed", "Fri"]);
  const [morningTime, setMorningTime] = useState("09:00");
  const [eveningTime, setEveningTime] = useState("19:00");
  const [prefs, setPrefs] = useState({
    recipeSharing: true,
    groceryNotifications: true,
    mealReminders: false,
  });

  const toggleDay = (day: string) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <PageShell
      panel="whatsapp-settings"
      title="WhatsApp Settings"
      subtitle="Manage how Fooder.AI stays in touch over WhatsApp."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PaperCard>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#F3E2C4" }}
                >
                  <MessageCircle className="w-5 h-5" style={{ color: ORANGE }} />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                  >
                    Connection status
                  </h3>
                  <p className="text-xs" style={{ color: "#8B8178" }}>
                    Your linked WhatsApp account
                  </p>
                </div>
                <span
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold shrink-0"
                  style={{ color: "#2E7D32" }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  Connected
                </span>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: GOLDEN }}
                  >
                    Linked number
                  </span>
                  <span className="font-semibold" style={{ color: DARK }}>
                    +91 98765 43210
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: GOLDEN }}
                  >
                    Connected since
                  </span>
                  <span className="font-medium" style={{ color: DARK }}>
                    14 June 2026
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: GOLDEN }}
                  >
                    Last synced
                  </span>
                  <span className="font-medium" style={{ color: DARK }}>
                    Just now
                  </span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => toast("Reconnecting WhatsApp…", "info")}
                >
                  <RefreshCw className="w-4 h-4" />
                  Reconnect
                </Button>
                <Button
                  variant="danger"
                  onClick={() => toast("WhatsApp disconnected", "error")}
                >
                  <Unplug className="w-4 h-4" />
                  Disconnect
                </Button>
              </div>
            </div>
          </PaperCard>

          <PaperCard>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#F3E2C4" }}
                >
                  <QrCode className="w-5 h-5" style={{ color: ORANGE }} />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                  >
                    Pair a new device
                  </h3>
                  <p className="text-xs" style={{ color: "#8B8178" }}>
                    Link another phone or tablet
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <QRCode size={QR_SIZE} matrix={QR_MATRIX} />
                <ol
                  className="list-decimal pl-5 space-y-2 text-sm flex-1"
                  style={{ color: DARK }}
                >
                  <li>Open WhatsApp on the device you want to link.</li>
                  <li>Go to Settings → Linked devices.</li>
                  <li>Tap “Link a device” and scan this code.</li>
                  <li>You will be connected in seconds.</li>
                </ol>
              </div>
              <div className="mt-6">
                <Button
                  variant="secondary"
                  onClick={() => toast("QR code refreshed", "info")}
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh QR
                </Button>
              </div>
            </div>
          </PaperCard>
        </div>

        <PaperCard>
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#F3E2C4" }}
                >
                  <Clock className="w-5 h-5" style={{ color: ORANGE }} />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                  >
                    Reminder scheduling
                  </h3>
                  <p className="text-xs" style={{ color: "#8B8178" }}>
                    Daily nudges, sent straight to WhatsApp
                  </p>
                </div>
              </div>
              <Toggle
                checked={remindersEnabled}
                onChange={setRemindersEnabled}
                label="Enabled"
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {DAYS.map((day) => (
                <Chip
                  key={day}
                  active={days.includes(day)}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </Chip>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Morning time">
                <TextInput
                  type="time"
                  value={morningTime}
                  onChange={(e) => setMorningTime(e.target.value)}
                />
              </Field>
              <Field label="Evening time">
                <TextInput
                  type="time"
                  value={eveningTime}
                  onChange={(e) => setEveningTime(e.target.value)}
                />
              </Field>
            </div>
          </div>
        </PaperCard>

        <PaperCard>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#F3E2C4" }}
              >
                <Bell className="w-5 h-5" style={{ color: ORANGE }} />
              </div>
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                >
                  Preferences
                </h3>
                <p className="text-xs" style={{ color: "#8B8178" }}>
                  What Fooder.AI may share with you
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <PreferenceRow
                icon={Share2}
                title="Recipe sharing"
                description="Send recipes to your cook on WhatsApp"
                checked={prefs.recipeSharing}
                onToggle={(v) => setPrefs((p) => ({ ...p, recipeSharing: v }))}
              />
              <div className="border-t border-[#C88B42]/25" />
              <PreferenceRow
                icon={ShoppingCart}
                title="Grocery notifications"
                description="Price drops and shopping list updates"
                checked={prefs.groceryNotifications}
                onToggle={(v) =>
                  setPrefs((p) => ({ ...p, groceryNotifications: v }))
                }
              />
              <div className="border-t border-[#C88B42]/25" />
              <PreferenceRow
                icon={UtensilsCrossed}
                title="Meal reminders"
                description="Nudges before breakfast and dinner"
                checked={prefs.mealReminders}
                onToggle={(v) => setPrefs((p) => ({ ...p, mealReminders: v }))}
              />
            </div>
          </div>
        </PaperCard>

        <div className="flex justify-end">
          <Button onClick={() => toast("Settings saved successfully")}>
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
