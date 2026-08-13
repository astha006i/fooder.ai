"use client";

import PageShell from "../components/PageShell";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Download,
  HeartOff,
  Flame,
  Clock,
  Heart,
  Trash2,
} from "lucide-react";
import {
  PaperCard,
  Badge,
  Button,
  Chip,
  useToast,
  EmptyState,
  Skeleton,
  Divider,
} from "../components/ui";
import { FOREST } from "../lib/constants";

type Cuisine = "Italian" | "Indian" | "Mexican" | "Asian" | "Mediterranean";

interface FavoriteRecipe {
  id: number;
  title: string;
  cuisine: Cuisine;
  calories: number;
  prepTime: string;
  ingredients: string[];
  image: string;
  imageClass: string;
}

const INITIAL_FAVORITES: FavoriteRecipe[] = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    cuisine: "Italian",
    calories: 620,
    prepTime: "25 min",
    ingredients: ["Pasta", "Garlic", "Cream", "Parmesan", "Butter", "Parsley"],
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop",
    imageClass: "h-64",
  },
  {
    id: 2,
    title: "Butter Chicken & Naan",
    cuisine: "Indian",
    calories: 780,
    prepTime: "45 min",
    ingredients: ["Chicken", "Tomato", "Cream", "Spices", "Butter"],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=400&fit=crop",
    imageClass: "h-80",
  },
  {
    id: 3,
    title: "Chicken Tacos al Pastor",
    cuisine: "Mexican",
    calories: 540,
    prepTime: "30 min",
    ingredients: ["Chicken", "Pineapple", "Tortilla", "Salsa", "Cilantro"],
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=400&fit=crop",
    imageClass: "h-56",
  },
  {
    id: 4,
    title: "Thai Green Curry",
    cuisine: "Asian",
    calories: 480,
    prepTime: "35 min",
    ingredients: ["Coconut milk", "Tofu", "Basil", "Curry paste", "Bamboo shoots"],
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&h=400&fit=crop",
    imageClass: "h-72",
  },
  {
    id: 5,
    title: "Mediterranean Hummus Bowl",
    cuisine: "Mediterranean",
    calories: 390,
    prepTime: "15 min",
    ingredients: ["Hummus", "Chickpeas", "Pita", "Olives", "Cucumber"],
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop",
    imageClass: "h-60",
  },
  {
    id: 6,
    title: "Paneer Tikka Skewers",
    cuisine: "Indian",
    calories: 420,
    prepTime: "28 min",
    ingredients: ["Paneer", "Yogurt", "Spices", "Bell pepper", "Onion"],
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=400&fit=crop",
    imageClass: "h-52",
  },
  {
    id: 7,
    title: "Spaghetti Carbonara",
    cuisine: "Italian",
    calories: 690,
    prepTime: "20 min",
    ingredients: ["Spaghetti", "Egg", "Bacon", "Parmesan", "Pepper"],
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=400&fit=crop",
    imageClass: "h-68",
  },
  {
    id: 8,
    title: "Miso Ramen Bowl",
    cuisine: "Asian",
    calories: 510,
    prepTime: "40 min",
    ingredients: ["Noodles", "Miso", "Egg", "Scallion", "Mushroom"],
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=400&fit=crop",
    imageClass: "h-76",
  },
];

const CUISINES = ["All", "Italian", "Indian", "Mexican", "Asian", "Mediterranean"] as const;

const COMPACT_PRIMARY =
  "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50";

const ICON_SECONDARY =
  "inline-flex items-center justify-center w-9 h-9 rounded-full text-[#B96A28] bg-orange-50 hover:bg-orange-100 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B96A28]/50";

const ICON_DANGER =
  "inline-flex items-center justify-center w-9 h-9 rounded-full text-[#C0392B] bg-red-50 hover:bg-red-100 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300";

function FavoritesSkeleton() {
  const heights = ["h-56", "h-72", "h-48", "h-64", "h-80", "h-52"];
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {heights.map((h, i) => (
        <div key={i} className="break-inside-avoid">
          <PaperCard>
            <Skeleton className={`${h} w-full rounded-none`} />
            <div className="p-5 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-9 w-full" />
            </div>
          </PaperCard>
        </div>
      ))}
    </div>
  );
}

export default function FavoritesPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>(INITIAL_FAVORITES);
  const [activeCuisine, setActiveCuisine] = useState<string>("All");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredFavorites = useMemo(() => {
    if (activeCuisine === "All") return favorites;
    return favorites.filter((f) => f.cuisine === activeCuisine);
  }, [favorites, activeCuisine]);

  const handleCook = (recipe: FavoriteRecipe) => {
    toast(`Sent "${recipe.title}" to your cook via WhatsApp!`);
  };

  const handleDownload = () => {
    toast("Recipe download started.");
  };

  const handleRemove = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
    toast("Removed from favorites.");
  };

  const handleClearAll = () => {
    setFavorites([]);
    toast("All favorites cleared.");
  };

  const handleRestore = () => {
    setFavorites(INITIAL_FAVORITES);
    setActiveCuisine("All");
    toast("Favorite recipes restored!");
  };

  return (
    <PageShell
      panel="favorite-recipes"
      title="Favorite Recipes"
      subtitle="Your saved recipes, ready to cook whenever you want."
    >
      {loading ? (
        <FavoritesSkeleton />
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-sm font-medium" style={{ color: "#8B8178" }}>
                {favorites.length} favorite recipe{favorites.length === 1 ? "" : "s"}
              </p>
              <Button
                variant="secondary"
                onClick={handleClearAll}
                disabled={favorites.length === 0}
              >
                <Trash2 className="w-4 h-4" />
                Clear all
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {CUISINES.map((c) => (
                <Chip
                  key={c}
                  active={activeCuisine === c}
                  onClick={() => setActiveCuisine(c)}
                >
                  {c}
                </Chip>
              ))}
            </div>
          </div>

          {filteredFavorites.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              <AnimatePresence>
                {filteredFavorites.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    className="break-inside-avoid mb-4"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                  >
                    <PaperCard>
                      <div className={`relative ${recipe.imageClass} overflow-hidden`}>
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge tone="orange">{recipe.cuisine}</Badge>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3
                          className="text-lg font-bold leading-snug"
                          style={{ fontFamily: "var(--font-cormorant)", color: FOREST }}
                        >
                          {recipe.title}
                        </h3>

                        <div className="flex items-center gap-4 mt-2">
                          <span
                            className="inline-flex items-center gap-1 text-xs font-medium"
                            style={{ color: "#8B8178" }}
                          >
                            <Flame className="w-3.5 h-3.5 text-[#B96A28]" />
                            {recipe.calories} kcal
                          </span>
                          <span
                            className="inline-flex items-center gap-1 text-xs font-medium"
                            style={{ color: "#8B8178" }}
                          >
                            <Clock className="w-3.5 h-3.5 text-[#B96A28]" />
                            {recipe.prepTime}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 mt-4">
                          {recipe.ingredients.slice(0, 3).map((ingredient) => (
                            <span
                              key={ingredient}
                              className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#F3E2C4]/60"
                              style={{ color: "#8A6A2F" }}
                            >
                              {ingredient}
                            </span>
                          ))}
                          {recipe.ingredients.length > 3 && (
                            <span
                              className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#274D2F]/5"
                              style={{ color: "#8B8178" }}
                            >
                              +{recipe.ingredients.length - 3} more
                            </span>
                          )}
                        </div>

                        <Divider className="my-4" />

                        <div className="flex items-center gap-2 flex-wrap">
                          <Button
                            variant="primary"
                            className={COMPACT_PRIMARY}
                            onClick={() => handleCook(recipe)}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            Cook on WhatsApp
                          </Button>
                          <Button
                            variant="golden"
                            className={ICON_SECONDARY}
                            onClick={handleDownload}
                            aria-label="Download recipe"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="danger"
                            className={ICON_DANGER}
                            onClick={() => handleRemove(recipe.id)}
                            aria-label={`Remove ${recipe.title} from favorites`}
                          >
                            <HeartOff className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </PaperCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <PaperCard>
              <EmptyState
                icon={Heart}
                title="No favorite recipes"
                description="Recipes you save will appear here. Clear your filters or restore your saved recipes."
                action={
                  <Button variant="primary" onClick={handleRestore}>
                    Restore favorites
                  </Button>
                }
              />
            </PaperCard>
          )}
        </>
      )}
    </PageShell>
  );
}
