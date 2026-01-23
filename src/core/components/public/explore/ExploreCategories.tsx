"use client";

import Image from "next/image";
import Link from "next/link";
import { useCategoryTree } from "@/hooks/public/useCategories";

export default function ExploreCategories() {
  const { categories, loading, error } = useCategoryTree();

  if (loading) {
    return (
      <section className="px-4 sm:px-6 md:px-10 xl:px-16 mt-10">
        <h2 className="text-[28px] md:text-[36px] font-extrabold mb-6">
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] aspect-[4/5] animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 sm:px-6 md:px-10 xl:px-16 mt-10">
        <h2 className="text-[28px] md:text-[36px] font-extrabold mb-6">
          Browse Categories
        </h2>
        <p className="text-red-400">Failed to load categories</p>
      </section>
    );
  }

  // Get only top-level categories (no parent) that are visible
  const topCategories = categories
    .filter(cat => !cat.parentId && cat.visible)
    .slice(0, 6);


  return (
    <section className="px-4 sm:px-6 md:px-10 xl:px-16 mt-10">
      <h2 className="text-[28px] md:text-[36px] font-extrabold mb-6">
        Browse Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {topCategories.map((c) => (
          <Link
            key={c.id}
            href={`/explore?category=${c.slug || c.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="
              group relative overflow-hidden
              rounded-2xl border border-white/10 bg-white/[0.03]
              shadow-[0_4px_20px_rgba(0,0,0,0.3)]
              hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
              transition-all
            "
          >
            <div className="relative w-full aspect-[4/5]">
              <Image
                src={c.thumbnailUrl || 'https://cdn-icons-png.flaticon.com/512/4447/4447303.png'}
                alt={c.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-300 opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-semibold text-white drop-shadow">
                  {c.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
