import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import StoryCard from "@/components/shared/StoryCard";
import { staggerContainer, fadeInUp } from "@/utils/animations";
import publicClient from "@/api/client";

// Fallback stories shown only while loading or if API returns nothing
const FALLBACK_STORIES = [
  {
    id: "f1",
    quote:
      "Before Shangazi, I had not been to school in two years. Today I am in Form 3 and I want to be an engineer. They believed in me when no one else did.",
    name: "Brian Omondi",
    role: "Sponsored student, now Form 3",
    avatarInitials: "BO",
    avatarColor: "bg-forest",
  },
  {
    id: "f2",
    quote:
      "My children were malnourished and I had no money for school fees. Shangazi stepped in. Now my daughter leads her class. I have hope again.",
    name: "Mary Wanjiku",
    role: "Mother of two beneficiaries",
    avatarInitials: "MW",
    avatarColor: "bg-terracotta",
  },
  {
    id: "f3",
    quote:
      "I volunteered as a mentor for one year. What I received back — in joy, in perspective, in purpose — was worth far more than anything I gave.",
    name: "Dr. James Kamau",
    role: "Mentor, Medical Professional",
    avatarInitials: "JK",
    avatarColor: "bg-sage",
  },
];

const AVATAR_COLORS = ["bg-forest", "bg-terracotta", "bg-sage", "bg-amber"];

function normalizeStory(story, index) {
  const photoUrl =
    story.photo_url || story.image || story.cloudinary_url || null;
  return {
    ...story,
    avatarInitials: story.name?.[0]?.toUpperCase() || "?",
    avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
    photo_url: photoUrl,
    image: photoUrl, // StoryCard destructures story.image for the avatar photo
  };
}

export default function StoriesSection() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await publicClient.get("/api/impact-stories");
        const fetched = response.data.data?.stories || [];
        // Show up to 3 stories on homepage; prefer featured ones first
        const sorted = fetched.sort(
          (a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0),
        );
        setStories(sorted.slice(0, 3).map(normalizeStory));
      } catch (err) {
        console.error("Failed to load impact stories:", err);
        // Silently fall back to static stories so homepage never looks empty
        setStories(FALLBACK_STORIES);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStories();
  }, []);

  const displayStories = isLoading
    ? []
    : stories.length > 0
      ? stories
      : FALLBACK_STORIES;

  return (
    <section className="section bg-ivory" aria-label="Success stories">
      <div className="container-content">
        <SectionHeader
          eyebrow="Real Stories"
          title="Voices of Impact"
          subtitle="These are not statistics. These are real children and families whose lives changed because generous people chose to give."
          className="mb-16"
        />

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-soft shadow-sm-warm p-6 animate-pulse"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 3 }).map((__, j) => (
                    <div key={j} className="w-4 h-4 rounded-full bg-ash/40" />
                  ))}
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-ash/40 rounded w-full" />
                  <div className="h-3 bg-ash/40 rounded w-5/6" />
                  <div className="h-3 bg-ash/40 rounded w-4/6" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ash/40" />
                  <div className="space-y-1">
                    <div className="h-3 bg-ash/40 rounded w-24" />
                    <div className="h-2 bg-ash/30 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stories grid */}
        {!isLoading && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {displayStories.map((story) => (
              <motion.div key={story.id} variants={fadeInUp}>
                <StoryCard story={story} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center">
          <Link
            to="/impact"
            className="inline-flex items-center gap-2 text-body-md font-semibold text-terracotta hover:underline group"
          >
            Read more impact stories
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
