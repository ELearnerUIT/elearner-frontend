"use client";

import { usePopularTags } from "@/hooks/public/useTags";

export default function ExploreTopics() {
  const { tags, loading, error } = usePopularTags(10);

  if (loading) {
    return (
      <section className="px-4 sm:px-6 md:px-10 xl:px-16 mt-12">
        <h2 className="text-[22px] md:text-[28px] font-bold mb-4">Trending Topics</h2>
        <div className="flex gap-3 flex-wrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 animate-pulse h-8 w-24" />
          ))}
        </div>
      </section>
    );
  }

  if (error || tags.length === 0) {
    // Fallback to hardcoded topics if API fails
    const fallbackTopics = [
      "JavaScript", "Python", "UI/UX", "Data Science", "AI", "React", "Cloud", "Business Strategy"
    ];

    return (
      <section className="px-4 sm:px-6 md:px-10 xl:px-16 mt-12">
        <h2 className="text-[22px] md:text-[28px] font-bold mb-4">Trending Topics</h2>
        <div className="flex gap-3 flex-wrap">
          {fallbackTopics.map(t => (
            <a
              key={t}
              href={`/explore?q=${encodeURIComponent(t)}`}
              className="
                px-4 py-1.5 rounded-full text-sm font-medium
                bg-white/5 border border-white/10 text-muted-foreground
                hover:text-lime-300 hover:border-lime-300/30 hover:bg-lime-300/5
                transition-all
              "
            >
              {t}
            </a>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 md:px-10 xl:px-16 mt-12">
      <h2 className="text-[22px] md:text-[28px] font-bold mb-4">Trending Topics</h2>

      <div className="flex gap-3 flex-wrap">
        {tags.map(tag => (
          <a
            key={tag.id}
            href={`/explore?tags=${encodeURIComponent(tag.name)}`}
            className="
              px-4 py-1.5 rounded-full text-sm font-medium
              bg-white/5 border border-white/10 text-muted-foreground
              hover:text-lime-300 hover:border-lime-300/30 hover:bg-lime-300/5
              transition-all
            "
          >
            {tag.name}
            {tag.courseCount > 0 && (
              <span className="ml-1.5 text-xs opacity-60">({tag.courseCount})</span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
