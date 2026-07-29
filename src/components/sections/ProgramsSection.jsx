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
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import ProgramCard from "@/components/shared/ProgramCard";
import { staggerContainer, fadeInUp } from "@/utils/animations";
import publicClient from "@/api/client";

// Map backend icon strings → lucide-react components
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

// Map backend color strings → Tailwind gradient classes used by ProgramCard
const COLOR_MAP = {
  forest: "bg-gradient-forest",
  terracotta: "bg-gradient-cta",
  amber: "bg-gradient-amber",
  sage: "bg-gradient-forest",
};

// Fallback — shown only while loading or if API returns nothing
const FALLBACK_PROGRAMS = [
  {
    id: "f1",
    icon: BookOpen,
    title: "Education",
    description:
      "Sponsoring school fees, uniforms, books, and tutoring for children who would otherwise be out of school.",
    metric: "320+",
    metricLabel: "children in school",
    color: "bg-gradient-forest",
  },
  {
    id: "f2",
    icon: Stethoscope,
    title: "Healthcare",
    description:
      "Regular medical check-ups, vaccinations, dental care, and emergency treatment for all children in our program.",
    metric: "100%",
    metricLabel: "vaccination coverage",
    color: "bg-gradient-cta",
  },
  {
    id: "f3",
    icon: Utensils,
    title: "Feeding Program",
    description:
      "Two nutritious meals a day, seven days a week — because a hungry child cannot learn or grow.",
    metric: "2,500+",
    metricLabel: "meals served monthly",
    color: "bg-gradient-amber",
  },
  {
    id: "f4",
    icon: Home,
    title: "Shelter",
    description:
      "Safe, clean housing for children without families, supported by house parents who provide stability and love.",
    metric: "80+",
    metricLabel: "children housed",
    color: "bg-gradient-forest",
  },
];

function normalizeProgram(program) {
  // Pick first metric for the card's single metric pill
  const firstMetric = program.metrics?.[0];
  return {
    ...program,
    icon: ICON_MAP[program.icon] || Heart,
    color: COLOR_MAP[program.color] || "bg-gradient-forest",
    metric: firstMetric?.value || null,
    metricLabel: firstMetric?.label || null,
  };
}

export default function ProgramsSection() {
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
        // Fall back to static so homepage never looks broken
        setPrograms(FALLBACK_PROGRAMS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const displayPrograms = isLoading
    ? []
    : programs.length > 0
      ? programs
      : FALLBACK_PROGRAMS;

  return (
    <section className="section bg-white" aria-label="Our programs">
      <div className="container-content">
        <SectionHeader
          eyebrow="What We Do"
          title="Programs That Change Lives"
          subtitle="Five interconnected programs that address every dimension of a child's wellbeing — from their belly to their future."
          className="mb-16"
        />

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-soft shadow-sm-warm overflow-hidden animate-pulse"
              >
                <div className="h-52 bg-ash/30" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-ash/40 rounded w-1/2" />
                  <div className="h-3 bg-ash/30 rounded w-full" />
                  <div className="h-3 bg-ash/30 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Programs grid */}
        {!isLoading && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {displayPrograms.map((program) => (
              <motion.div key={program.id} variants={fadeInUp}>
                <ProgramCard program={program} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-body-md font-semibold text-terracotta hover:underline group"
          >
            See all our programs
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
