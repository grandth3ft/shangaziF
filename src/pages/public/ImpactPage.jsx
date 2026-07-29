import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import StatCounter from "@/components/shared/StatCounter";
import StoryCard from "@/components/shared/StoryCard";
import { staggerContainer, fadeInUp } from "@/utils/animations";
import { IMPACT_STATS } from "@/utils/constants";
import publicClient from "@/api/client";

const OUTCOMES = [
  {
    label: "Children who completed secondary school",
    value: "280",
    suffix: "+",
  },
  { label: "University graduates from our program", value: "28", suffix: "" },
  { label: "Children placed in employment", value: "45", suffix: "+" },
  { label: "Families lifted above poverty line", value: "60", suffix: "+" },
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

export default function ImpactPage() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await publicClient.get("/api/impact-stories");
        const fetched = response.data.data?.stories || [];
        setStories(fetched.map(normalizeStory));
      } catch (err) {
        console.error("Failed to load impact stories:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <div className="bg-gradient-hero pt-24 pb-20 relative overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-ivory"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
          aria-hidden="true"
        />
        <div className="container-content relative text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeInUp}
              className="text-tiny font-semibold tracking-widest uppercase text-amber mb-3"
            >
              Measurable Impact
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-display-md text-white mb-4"
            >
              Our Impact
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-body-lg text-white/70 max-w-2xl mx-auto"
            >
              Numbers backed by stories. Outcomes driven by dedication. Here is
              what your support has made possible.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="section container-content space-y-20">
        {/* Stats */}
        <div>
          <SectionHeader
            eyebrow="By the Numbers"
            title="A Decade of Measurable Change"
            className="mb-12"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {IMPACT_STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-soft shadow-sm-warm"
              >
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  description={stat.description}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div>
          <SectionHeader
            eyebrow="Long-Term Outcomes"
            title="What Happens After Our Programs"
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OUTCOMES.map((o) => (
              <motion.div
                key={o.label}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gradient-hero rounded-soft p-6 text-center"
              >
                <p className="font-mono font-bold text-display-md text-white">
                  {o.value}
                  {o.suffix}
                </p>
                <p className="text-body-sm text-white/70 mt-2">{o.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stories */}
        <div>
          <SectionHeader
            eyebrow="Real Stories"
            title="Lives Changed, In Their Own Words"
            className="mb-12"
          />

          {/* Loading skeleton */}
          {isLoading && (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-soft shadow-sm-warm p-6 animate-pulse"
                >
                  <div className="space-y-2 mb-6">
                    <div className="h-3 bg-ash/40 rounded w-full" />
                    <div className="h-3 bg-ash/40 rounded w-5/6" />
                    <div className="h-3 bg-ash/30 rounded w-4/6" />
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

          {/* No stories yet */}
          {!isLoading && stories.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-body-sm text-stone">
                Impact stories coming soon.
              </p>
            </div>
          )}

          {/* Real stories grid */}
          {!isLoading && stories.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {stories.map((story, i) => (
                <motion.div
                  key={story.id}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <StoryCard story={story} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
