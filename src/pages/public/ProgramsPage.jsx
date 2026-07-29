import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Stethoscope,
  Utensils,
  Home,
  Users,
  GraduationCap,
  Shield,
  Heart,
  Sparkles,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { staggerContainer, fadeInUp } from "@/utils/animations";
import publicClient from "@/api/client";

// Map backend icon string → lucide-react component
const ICON_MAP = {
  BookOpen,
  Stethoscope,
  Utensils,
  Home,
  Users,
  GraduationCap,
  Shield,
  Heart,
  Sparkles,
};

// Map backend color string → Tailwind bg class used in the icon badge + gradient card
const BADGE_COLOR_MAP = {
  forest: "bg-forest text-white",
  terracotta: "bg-terracotta text-white",
  amber: "bg-amber text-white",
  sage: "bg-sage text-white",
};

const GRADIENT_MAP = {
  forest: "bg-gradient-forest",
  terracotta: "bg-gradient-cta",
  amber: "bg-gradient-amber",
  sage: "bg-gradient-forest",
};

function normalizeProgram(program) {
  return {
    ...program,
    IconComponent: ICON_MAP[program.icon] || Heart,
    badgeColor: BADGE_COLOR_MAP[program.color] || "bg-forest text-white",
    gradientClass: GRADIENT_MAP[program.color] || "bg-gradient-forest",
    photo_url:
      program.photo_url || program.image || program.cloudinary_url || null,
    metrics: program.metrics || [],
  };
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await publicClient.get("/api/programs");
        const fetched = response.data.data?.programs || [];
        setPrograms(fetched.map(normalizeProgram));
      } catch (err) {
        console.error("Failed to load programs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
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
              What We Do
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-display-md text-white mb-4"
            >
              Our Programs
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-body-lg text-white/70 max-w-2xl mx-auto"
            >
              Five interconnected programs that address every dimension of a
              child's wellbeing — from their belly to their future.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="section container-content">
        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-20">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="grid lg:grid-cols-2 gap-12 items-center animate-pulse"
              >
                <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-soft bg-ash/40 mb-6" />
                  <div className="h-8 bg-ash/40 rounded w-1/2 mb-4" />
                  <div className="space-y-2 mb-8">
                    <div className="h-4 bg-ash/30 rounded w-full" />
                    <div className="h-4 bg-ash/30 rounded w-5/6" />
                    <div className="h-4 bg-ash/30 rounded w-4/6" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-16 bg-ash/30 rounded-card" />
                    ))}
                  </div>
                </div>
                <div
                  className={`${i % 2 !== 0 ? "lg:order-1" : ""} aspect-video rounded-soft bg-ash/30`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && programs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-ash/30 flex items-center justify-center mb-4">
              <LayoutGrid className="w-10 h-10 text-stone" aria-hidden="true" />
            </div>
            <h3 className="font-display text-heading-md text-forest mb-2">
              Programs coming soon
            </h3>
            <p className="text-body-sm text-stone">
              We're updating this page — check back shortly.
            </p>
          </div>
        )}

        {/* Programs list — alternating layout */}
        {!isLoading && programs.length > 0 && (
          <div className="space-y-20">
            {programs.map((program, i) => {
              const Icon = program.IconComponent;
              return (
                <motion.div
                  key={program.id}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Text side */}
                  <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                    <div
                      className={`w-14 h-14 rounded-soft ${program.badgeColor} flex items-center justify-center mb-6`}
                    >
                      <Icon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <h2 className="font-display text-display-md text-forest mb-4">
                      {program.title}
                    </h2>
                    <p className="text-body-lg text-stone leading-relaxed mb-8">
                      {program.description}
                    </p>

                    {/* Metrics */}
                    {program.metrics.length > 0 && (
                      <div
                        className={`grid gap-4 mb-8 ${program.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
                      >
                        {program.metrics.slice(0, 3).map((m) => (
                          <div
                            key={m.label}
                            className="bg-ivory-dark rounded-card p-4 text-center"
                          >
                            <p className="font-mono font-bold text-heading-md text-terracotta">
                              {m.value}
                            </p>
                            <p className="text-tiny text-stone mt-1">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <Link
                      to="/donate"
                      className="inline-flex items-center gap-2 text-body-md font-semibold text-terracotta hover:underline group"
                    >
                      Support this program
                      <ArrowRight
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  {/* Visual side — photo if available, otherwise icon on gradient */}
                  <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                    {program.photo_url ? (
                      <img
                        src={program.photo_url}
                        alt={program.title}
                        className="w-full aspect-video object-cover rounded-soft shadow-md-warm"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className={`${program.gradientClass} rounded-soft aspect-video flex items-center justify-center`}
                      >
                        <Icon
                          className="w-32 h-32 text-white/20"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
