"use client";

import PageShell from "../components/PageShell";
import { useState } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Save,
  RotateCcw,
  Leaf,
  Globe2,
  AlertTriangle,
  Flame,
  Wallet,
  Briefcase,
  Clock,
  Dumbbell,
  Users,
  ThumbsDown,
  Heart,
  Sparkles,
  Plus,
} from "lucide-react";
import {
  PaperCard,
  Button,
  TextInput,
  Select,
  useToast,
  Chip,
} from "../components/ui";
import { ORANGE, DARK } from "../lib/constants";

const DIET_OPTIONS = ["Vegetarian", "Vegan", "Non-Veg", "Keto", "Mediterranean"];
const CUISINE_OPTIONS = ["Indian", "Italian", "Chinese", "Mexican", "Japanese"];
const ALLERGY_OPTIONS = ["Peanuts", "Gluten", "Dairy", "Shellfish", "Soy"];
const BUDGET_OPTIONS = ["Under ₹500", "₹500-1000", "₹1000-2000", "₹2000+"];
const SCHEDULE_OPTIONS = ["Remote", "Hybrid", "Office", "Shift", "Student"];
const COOKING_OPTIONS = ["<15min", "15-30", "30-60", "60+"];
const GOAL_OPTIONS = ["Weight Loss", "Muscle Gain", "Maintain", "General Health"];
const HOUSEHOLD_OPTIONS = [
  "1 (Just Me)",
  "2 (Couple)",
  "3-4 (Family)",
  "5+ (Large Family)",
];
const STYLE_OPTIONS = ["Balanced", "Adventurous", "Strict"];
const FAVORITE_CUISINE_OPTIONS = [
  "Indian",
  "Italian",
  "Chinese",
  "Mexican",
  "Japanese",
  "Thai",
  "French",
];

const DEFAULT_DIET = ["Vegetarian"];
const DEFAULT_CUISINE = ["Indian"];
const DEFAULT_ALLERGIES: string[] = [];
const DEFAULT_DISLIKED = ["Coriander", "Okra"];
const DEFAULT_FAVORITE_CUISINES = ["Indian", "Italian"];
const DEFAULT_CALORIES = 1850;
const DEFAULT_BUDGET = "₹1000-2000";
const DEFAULT_SCHEDULE = "Remote";
const DEFAULT_COOKING = "15-30";
const DEFAULT_GOAL = "Weight Loss";
const DEFAULT_HOUSEHOLD = "2 (Couple)";
const DEFAULT_STYLE = "Balanced";

function ChipGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Chip
          key={option}
          active={selected.includes(option)}
          onClick={() => onToggle(option)}
        >
          {option}
        </Chip>
      ))}
    </div>
  );
}

function PreferenceCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#F3E2C4" }}
        >
          <Icon className="w-4 h-4" style={{ color: ORANGE }} />
        </div>
        <div>
          <div className="text-sm font-bold" style={{ color: DARK }}>
            {title}
          </div>
          {description && (
            <div className="text-xs" style={{ color: "#8B8178" }}>
              {description}
            </div>
          )}
        </div>
      </div>
      {children}
    </PaperCard>
  );
}

export default function AIPreferencesPage() {
  const { toast } = useToast();

  const [diet, setDiet] = useState<string[]>(DEFAULT_DIET);
  const [cuisine, setCuisine] = useState<string[]>(DEFAULT_CUISINE);
  const [allergies, setAllergies] = useState<string[]>(DEFAULT_ALLERGIES);
  const [calories, setCalories] = useState(DEFAULT_CALORIES);
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
  const [cookingTime, setCookingTime] = useState(DEFAULT_COOKING);
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [household, setHousehold] = useState(DEFAULT_HOUSEHOLD);
  const [disliked, setDisliked] = useState<string[]>(DEFAULT_DISLIKED);
  const [dislikeInput, setDislikeInput] = useState("");
  const [favoriteCuisines, setFavoriteCuisines] = useState<string[]>(
    DEFAULT_FAVORITE_CUISINES
  );
  const [style, setStyle] = useState(DEFAULT_STYLE);

  const toggleIn = (list: string[], value: string) =>
    list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];

  const handleAddDislike = () => {
    const value = dislikeInput.trim();
    if (!value) return;
    if (disliked.includes(value)) {
      toast("Ingredient already listed", "info");
      return;
    }
    setDisliked((prev) => [...prev, value]);
    setDislikeInput("");
    toast(`Added ${value} to disliked ingredients`, "success");
  };

  const handleSave = () => {
    toast("Preferences saved successfully", "success");
  };

  const handleReset = () => {
    setDiet(DEFAULT_DIET);
    setCuisine(DEFAULT_CUISINE);
    setAllergies(DEFAULT_ALLERGIES);
    setCalories(DEFAULT_CALORIES);
    setBudget(DEFAULT_BUDGET);
    setSchedule(DEFAULT_SCHEDULE);
    setCookingTime(DEFAULT_COOKING);
    setGoal(DEFAULT_GOAL);
    setHousehold(DEFAULT_HOUSEHOLD);
    setDisliked(DEFAULT_DISLIKED);
    setDislikeInput("");
    setFavoriteCuisines(DEFAULT_FAVORITE_CUISINES);
    setStyle(DEFAULT_STYLE);
    toast("Preferences reset to defaults", "info");
  };

  return (
    <PageShell
      title="AI Preferences"
      subtitle="Fine-tune how Fooder.AI plans your weekly meals."
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <p className="text-sm" style={{ color: "#8B8178" }}>
          Every preference shapes the meal plan your AI chef creates for you.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4" />
            Save Preferences
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <PreferenceCard
          icon={Leaf}
          title="Diet"
          description="Select all that apply"
        >
          <ChipGroup
            options={DIET_OPTIONS}
            selected={diet}
            onToggle={(option) => setDiet((prev) => toggleIn(prev, option))}
          />
        </PreferenceCard>

        <PreferenceCard
          icon={Globe2}
          title="Cuisine"
          description="Cuisines you enjoy most"
        >
          <ChipGroup
            options={CUISINE_OPTIONS}
            selected={cuisine}
            onToggle={(option) => setCuisine((prev) => toggleIn(prev, option))}
          />
        </PreferenceCard>

        <PreferenceCard
          icon={AlertTriangle}
          title="Allergies"
          description="Your AI chef will strictly avoid these"
        >
          <ChipGroup
            options={ALLERGY_OPTIONS}
            selected={allergies}
            onToggle={(option) =>
              setAllergies((prev) => toggleIn(prev, option))
            }
          />
        </PreferenceCard>

        <PreferenceCard
          icon={Flame}
          title="Calorie Target"
          description="Daily calorie goal"
        >
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1200}
              max={3000}
              step={50}
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              aria-label="Daily calorie target slider"
              className="flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50 rounded-full"
              style={{ accentColor: ORANGE }}
            />
            <div className="flex items-center gap-2 shrink-0">
              <input
                type="number"
                min={1200}
                max={3000}
                step={50}
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                aria-label="Daily calorie target value"
                className="w-20 bg-white border border-[#274D2F]/10 rounded-xl px-3 py-2 text-sm text-[#2E2B28] focus:outline-none focus:ring-2 focus:ring-[#B96A28]/40 focus:border-transparent transition-all"
              />
              <span className="text-sm font-bold" style={{ color: ORANGE }}>
                kcal
              </span>
            </div>
          </div>
        </PreferenceCard>

        <PreferenceCard
          icon={Wallet}
          title="Weekly Budget"
          description="How much you want to spend"
        >
          <Select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            aria-label="Weekly budget"
          >
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </PreferenceCard>

        <PreferenceCard
          icon={Briefcase}
          title="Work Schedule"
          description="Helps plan prep-friendly meals"
        >
          <Select
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            aria-label="Work schedule"
          >
            {SCHEDULE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </PreferenceCard>

        <PreferenceCard
          icon={Clock}
          title="Cooking Time"
          description="Time you can spend per meal"
        >
          <Select
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            aria-label="Cooking time"
          >
            {COOKING_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </PreferenceCard>

        <PreferenceCard
          icon={Dumbbell}
          title="Fitness Goal"
          description="Aligns calories with your objective"
        >
          <Select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            aria-label="Fitness goal"
          >
            {GOAL_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </PreferenceCard>

        <PreferenceCard
          icon={Users}
          title="Household Size"
          description="Portions are scaled accordingly"
        >
          <Select
            value={household}
            onChange={(e) => setHousehold(e.target.value)}
            aria-label="Household size"
          >
            {HOUSEHOLD_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </PreferenceCard>

        <PreferenceCard
          icon={ThumbsDown}
          title="Disliked Ingredients"
          description="Tap a chip to remove, add new ones below"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {disliked.length === 0 ? (
              <span className="text-xs py-1.5" style={{ color: "#8B8178" }}>
                No disliked ingredients yet
              </span>
            ) : (
              disliked.map((item) => (
                <Chip
                  key={item}
                  active
                  onClick={() =>
                    setDisliked((prev) => prev.filter((v) => v !== item))
                  }
                >
                  {item}
                </Chip>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <TextInput
              value={dislikeInput}
              onChange={(e) => setDislikeInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddDislike();
                }
              }}
              placeholder="e.g. Mushrooms"
              aria-label="Add a disliked ingredient"
            />
            <Button variant="secondary" onClick={handleAddDislike}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
        </PreferenceCard>

        <PreferenceCard
          icon={Heart}
          title="Favorite Cuisines"
          description="Your AI will lean into these"
        >
          <ChipGroup
            options={FAVORITE_CUISINE_OPTIONS}
            selected={favoriteCuisines}
            onToggle={(option) =>
              setFavoriteCuisines((prev) => toggleIn(prev, option))
            }
          />
        </PreferenceCard>

        <PreferenceCard
          icon={Sparkles}
          title="AI Recommendation Style"
          description="How adventurous your AI chef gets"
        >
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map((option) => (
              <Chip
                key={option}
                active={style === option}
                onClick={() => setStyle(option)}
              >
                {option}
              </Chip>
            ))}
          </div>
        </PreferenceCard>
      </div>
    </PageShell>
  );
}
