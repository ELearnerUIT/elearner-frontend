"use client";

import { motion } from "framer-motion";
import TopicCard from "@/core/components/ui/TopicCard";
import {
  Code2, Database, PenTool, Smartphone, Brain, Megaphone, Boxes, Globe2,
} from "lucide-react";
import type { Category } from "@/lib/learner/category/categories";

// Fallback topics when backend data is not available
const fallbackTopics = [
  { title: "Web Development", Icon: Code2 },
  { title: "Data Science", Icon: Database },
  { title: "Design", Icon: PenTool },
  { title: "Mobile Development", Icon: Smartphone },
  { title: "Artificial Intelligence", Icon: Brain },
  { title: "Marketing", Icon: Megaphone },
  { title: "Management", Icon: Boxes },
  { title: "Languages", Icon: Globe2 },
];

// Map category names to icons
const iconMap: Record<string, any> = {
  "Web Development": Code2,
  "Data Science": Database,
  "Design": PenTool,
  "Mobile Development": Smartphone,
  "Artificial Intelligence": Brain,
  "AI": Brain,
  "Marketing": Megaphone,
  "Management": Boxes,
  "Languages": Globe2,
  "Programming": Code2,
  "Database": Database,
  "Mobile": Smartphone,
};

// Get icon for a category, with fallback
function getIconForCategory(categoryName: string) {
  return iconMap[categoryName] || Code2;
}

interface TopicsSectionProps {
  categories?: Category[];
  loading?: boolean;
  error?: Error | null;
}

export default function TopicsSection({ categories, loading, error }: TopicsSectionProps) {
  // Use backend categories if available, otherwise fallback to hardcoded
  const topics = categories && categories.length > 0
    ? categories.slice(0, 8).map(cat => ({
      title: cat.name,
      Icon: getIconForCategory(cat.name),
      href: `/explore?category=${cat.slug || cat.id}`,
      description: cat.description || "Explore courses in this category."
    }))
    : fallbackTopics.map(topic => ({
      ...topic,
      href: `/explore?q=${encodeURIComponent(topic.title)}`,
      description: "Hundreds of high-quality courses available."
    }));

  return (
    <section className="w-full mt-6 px-4 sm:px-6 md:px-10 xl:px-16">
      <div className="mb-4 md:mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          Explore by Topics
        </h2>

      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 rounded-lg border border-white/10 bg-white/[0.03] animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {topics.map(({ title, Icon, href, description }) => (
            <TopicCard
              key={title}
              title={title}
              Icon={Icon}
              href={href}
              description={description}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
