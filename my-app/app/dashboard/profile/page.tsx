"use client";

import PageShell from "../components/PageShell";
import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  User,
  Camera,
  Save,
  Lock,
  UtensilsCrossed,
  Flame,
  Wallet,
  Globe2,
  Dumbbell,
  Bell,
  Mail,
  MessageSquare,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import {
  PaperCard,
  SectionTitle,
  Button,
  Field,
  TextInput,
  Toggle,
  useToast,
  Divider,
  Chip,
} from "../components/ui";
import { FOREST, ORANGE, GOLDEN, DARK } from "../lib/constants";

const GOALS = ["Weight Loss", "Muscle Gain", "Maintain", "General Health"];

const DIETARY_STATS: {
  label: string;
  value: string;
  caption: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Diet",
    value: "Balanced Veg",
    caption: "High protein focus",
    icon: UtensilsCrossed,
  },
  {
    label: "Calorie Target",
    value: "1,850",
    caption: "kcal per day",
    icon: Flame,
  },
  {
    label: "Weekly Budget",
    value: "₹1,000–2,000",
    caption: "per week",
    icon: Wallet,
  },
  {
    label: "Preferred Cuisine",
    value: "North Indian",
    caption: "Home-style meals",
    icon: Globe2,
  },
];

export default function ProfilePage() {
  const { toast } = useToast();

  const [name, setName] = useState("Aarav Sharma");
  const [email, setEmail] = useState("aarav.sharma@example.com");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [goal, setGoal] = useState("Weight Loss");
  const [activityReminders, setActivityReminders] = useState(true);
  const [mealPrepReminders, setMealPrepReminders] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const strength =
    newPassword.length === 0
      ? 0
      : newPassword.length < 6
        ? 1
        : newPassword.length < 10
          ? 2
          : 3;

  const strengthLabel =
    strength === 1
      ? "Weak — add more characters"
      : strength === 2
        ? "Fair — add uppercase, numbers & symbols"
        : strength === 3
          ? "Strong password"
          : "";

  const handleUpdatePassword = () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast("New passwords do not match", "error");
      return;
    }
    toast("Password updated successfully", "success");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <PageShell
      panel="profile"
      title="My Profile"
      subtitle="Manage your personal details and account preferences."
    >
      <div className="space-y-10">
        <div>
          <SectionTitle
            title="Personal Information"
            subtitle="Update the name and email shown on your account."
          />
          <PaperCard className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: FOREST }}
                  >
                    <User className="w-9 h-9 text-white" />
                  </div>
                  <button
                    onClick={() => toast("Profile picture updated", "success")}
                    aria-label="Change profile picture"
                    className="absolute -bottom-0.5 -right-0.5 w-8 h-8 rounded-full bg-white border border-[#C88B42]/25 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50"
                  >
                    <Camera className="w-4 h-4" style={{ color: ORANGE }} />
                  </button>
                </div>
                <span className="text-xs font-medium" style={{ color: "#8B8178" }}>
                  Change photo
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
                <Field label="Full Name">
                  <TextInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Email Address">
                  <TextInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => toast("Profile saved successfully", "success")}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </PaperCard>
        </div>

        <div>
          <SectionTitle
            title="Change Password"
            subtitle="Keep your account secure with a strong password."
          />
          <PaperCard className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Field label="Current Password">
                <TextInput
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </Field>
              <Field label="New Password">
                <TextInput
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </Field>
              <Field label="Confirm New Password">
                <TextInput
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </Field>
            </div>

            {newPassword.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-1 mb-2 max-w-xs">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-1.5 flex-1 rounded-full transition-colors"
                      style={{
                        backgroundColor:
                          i <= strength
                            ? strength >= 3
                              ? FOREST
                              : strength === 2
                                ? GOLDEN
                                : "#C0392B"
                            : "#EFEBE3",
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: "#8B8178" }}>
                  {strengthLabel}
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <Button onClick={handleUpdatePassword}>
                <Lock className="w-4 h-4" />
                Update Password
              </Button>
            </div>
          </PaperCard>
        </div>

        <div>
          <SectionTitle
            title="Dietary Summary"
            subtitle="A quick snapshot of your current meal preferences."
          />
          <PaperCard className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DIETARY_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-5 border border-[#C88B42]/25 bg-[#F8F1E6]/50"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: "#F3E2C4" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: ORANGE }} />
                    </div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-wider mb-1"
                      style={{ color: GOLDEN }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "Harrington, 'Times New Roman', serif",
                        color: DARK,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "#8B8178" }}>
                      {stat.caption}
                    </div>
                  </div>
                );
              })}
            </div>
          </PaperCard>
        </div>

        <div>
          <SectionTitle
            title="Fitness Goals"
            subtitle="Tell us what you are working towards."
          />
          <PaperCard className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell className="w-4 h-4" style={{ color: ORANGE }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: GOLDEN }}
              >
                Primary Goal
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {GOALS.map((g) => (
                <Chip
                  key={g}
                  active={goal === g}
                  onClick={() => {
                    setGoal(g);
                    toast(`Fitness goal set to ${g}`, "info");
                  }}
                >
                  {g}
                </Chip>
              ))}
            </div>

            <Divider className="mb-6" />

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4" style={{ color: ORANGE }} />
                <Toggle
                  checked={activityReminders}
                  onChange={(v) => {
                    setActivityReminders(v);
                    toast(
                      v
                        ? "Weekly activity reminders enabled"
                        : "Weekly activity reminders disabled",
                      "info"
                    );
                  }}
                  label="Weekly activity reminders"
                />
              </div>
              <div className="flex items-center gap-3 pl-7">
                <Toggle
                  checked={mealPrepReminders}
                  onChange={(v) => {
                    setMealPrepReminders(v);
                    toast(
                      v
                        ? "Meal prep reminders enabled"
                        : "Meal prep reminders disabled",
                      "info"
                    );
                  }}
                  label="Meal prep reminders"
                />
              </div>
            </div>
          </PaperCard>
        </div>

        <div>
          <SectionTitle
            title="Account Settings"
            subtitle="Control notifications, security and your account."
          />
          <PaperCard className="p-6 sm:p-8">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" style={{ color: ORANGE }} />
                <Toggle
                  checked={emailNotifications}
                  onChange={(v) => {
                    setEmailNotifications(v);
                    toast(
                      v
                        ? "Email notifications enabled"
                        : "Email notifications disabled",
                      "info"
                    );
                  }}
                  label="Email Notifications"
                />
              </div>
              <div className="flex items-center gap-3 pl-7">
                <MessageSquare className="w-4 h-4" style={{ color: ORANGE }} />
                <Toggle
                  checked={smsUpdates}
                  onChange={(v) => {
                    setSmsUpdates(v);
                    toast(
                      v ? "SMS updates enabled" : "SMS updates disabled",
                      "info"
                    );
                  }}
                  label="SMS Updates"
                />
              </div>
              <div className="flex items-center gap-3 pl-7">
                <ShieldCheck className="w-4 h-4" style={{ color: ORANGE }} />
                <Toggle
                  checked={twoFactor}
                  onChange={(v) => {
                    setTwoFactor(v);
                    toast(
                      v
                        ? "Two-factor authentication enabled"
                        : "Two-factor authentication disabled",
                      "info"
                    );
                  }}
                  label="Two-Factor Authentication"
                />
              </div>
            </div>

            <Divider className="my-6" />

            <div>
              <div className="text-sm font-semibold mb-1" style={{ color: DARK }}>
                Delete Account
              </div>
              <p className="text-xs mb-4" style={{ color: "#8B8178" }}>
                Permanently remove your profile and all saved meal data.
              </p>

              {!confirmDelete ? (
                <Button
                  variant="danger"
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  <PaperCard className="p-5 bg-red-50/60">
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{ color: "#C0392B" }}
                    >
                      Are you sure?
                    </p>
                    <p className="text-xs mb-4" style={{ color: "#8B8178" }}>
                      This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setConfirmDelete(false);
                          toast("Account deletion cancelled", "info");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setConfirmDelete(false);
                          toast("Account deletion requested", "error");
                        }}
                      >
                        Confirm Delete
                      </Button>
                    </div>
                  </PaperCard>
                </motion.div>
              )}
            </div>
          </PaperCard>
        </div>
      </div>
    </PageShell>
  );
}
