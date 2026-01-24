"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "@/services/courses/course.service";
import { categoryService } from "@/services/courses/category.service";
import { tagService } from "@/services/courses/tag.service";
import type { CourseResponse } from "@/services/courses/course.types";
import CourseCard, { type Course } from "@/core/components/course/CourseCard";
import CategoryTree from "@/core/components/course/CategoryTree";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";

// Extended type to include price (returned by backend but not in CourseResponse type)
type CourseWithPrice = CourseResponse & { price?: number; averageRating?: number; totalReviews?: number; totalStudents?: number };
import { toast } from "sonner";

// Import components form Incoming change
import HeroExplore from "@/core/components/public/explore/ExploreHero";
import ExploreCategoriesNew from "@/core/components/public/explore/ExploreCategories";
import TrendingTopics from "@/core/components/public/explore/ExploreTopics";
import FeaturedCollections from "@/core/components/public/explore/ExploreRecommended";
import PopularCoursesSection from "@/core/components/public/explore/ExplorePopular";

function ExplorePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    searchParams.get("category") ? parseInt(searchParams.get("category")!) : undefined
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>(
    searchParams.get("difficulty") || undefined
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  );
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch categories
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories-tree"],
    queryFn: () => categoryService.getCategoryTree(),
  });

  // Fetch popular tags
  const { data: popularTags } = useQuery({
    queryKey: ["popular-tags"],
    queryFn: () => tagService.getPopularTags(20),
  });

  // Fetch ALL courses once (client-side filtering for demo)
  // Cast to CourseWithPrice which includes price field from backend
  const { data: allCoursesData, isLoading: loadingCourses } = useQuery({
    queryKey: ["all-published-courses"],
    queryFn: async () => {
      // Load 1000 courses at once for client-side filtering
      // The backend returns extra fields (price, averageRating) not in CourseResponse type
      const response = await courseService.getPublishedCourses(0, 1000, undefined);
      return {
        ...response,
        items: response.items as unknown as CourseWithPrice[],
      };
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Client-side filtering and pagination
  const filteredCourses = useMemo(() => {
    if (!allCoursesData?.items) return [];

    let filtered = [...allCoursesData.items];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title?.toLowerCase().includes(query) ||
        course.shortDescription?.toLowerCase().includes(query) ||
        course.teacherName?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(course =>
        course.categoryId === selectedCategory
      );
    }

    // Difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(course =>
        course.difficulty === selectedDifficulty
      );
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(course =>
        selectedTags.every(tag =>
          course.tags?.includes(tag)
        )
      );
    }

    return filtered;
  }, [allCoursesData?.items, searchQuery, selectedCategory, selectedDifficulty, selectedTags]);

  // Pagination logic
  const coursesPerPage = 12;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = useMemo(() => {
    const start = page * coursesPerPage;
    const end = start + coursesPerPage;
    return filteredCourses.slice(start, end);
  }, [filteredCourses, page]);

  // Create coursesData structure for compatibility
  const coursesData = {
    items: paginatedCourses,
    totalItems: filteredCourses.length,
    totalPages: totalPages,
    page: page,
    size: coursesPerPage,
    hasNext: page < totalPages - 1,
    hasPrevious: page > 0,
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory.toString());
    if (selectedDifficulty) params.set("difficulty", selectedDifficulty);
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));

    const newUrl = params.toString() ? `/explore?${params.toString()}` : "/explore";
    // Using replaceState to update URL without refreshing page
    window.history.replaceState({}, "", newUrl);
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedTags]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? undefined : categoryId);
    setPage(0);
  };

  const handleToggleTag = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
    setPage(0);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(undefined);
    setSelectedDifficulty(undefined);
    setSelectedTags([]);
    setPage(0);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedDifficulty || selectedTags.length > 0;

  // Map courses to CourseCard format
  const courses: Course[] = coursesData?.items?.map((c: any) => ({
    id: c.id.toString(),
    title: c.title,
    teacher: c.teacherName || "Instructor",
    price: c.price ? `${Math.floor(c.price).toLocaleString('vi-VN')} ₫` : "Free",
    rating: c.averageRating || 0,
    image: c.thumbnailUrl || "/images/lesson_thum.png",
    ratingCount: c.totalReviews,
    href: `/courses/${c.slug}`,
    description: c.shortDescription,
  })) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Hero Section (from Incoming) */}
      <HeroExplore />

      {/* 2. Featured Collections (from Incoming) */}
      <div className="py-8 bg-muted/30">
        <FeaturedCollections />
      </div>

      {/* 3. Main Content: Search & Filters (from Current) */}
      <div className="px-4 sm:px-6 md:px-10 xl:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header for Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                All Courses
              </h2>
              <p className="text-muted-foreground">
                Browse our full catalog with advanced filters
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for courses, skills, or teachers..."
                  className="w-full pl-12 pr-4 py-3 bg-white/[0.05] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-lg border transition flex items-center gap-2 ${showFilters
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white/[0.05] border-white/20 hover:border-white/40"
                  }`}
              >
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="sticky top-24 space-y-6">
                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.08] border border-white/20 rounded-lg transition text-sm text-red-400 hover:text-red-300 hover:border-red-400/30"
                  >
                    <X className="h-4 w-4" />
                    Clear all filters
                  </button>
                )}

                {/* Categories */}
                <div className="rounded-xl border border-white/20 bg-white/[0.03] p-4">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <CategoryTree
                    categories={categories || []}
                    loading={loadingCategories}
                  // TODO: Pass props to handle selection if CategoryTree supports it
                  // selectedId={selectedCategory}
                  // onSelect={handleCategorySelect}
                  />
                </div>

                {/* Difficulty Level */}
                <div className="rounded-xl border border-white/20 bg-white/[0.03] p-4">
                  <h3 className="font-semibold mb-3">Difficulty</h3>
                  <div className="space-y-2">
                    {["BEGINNER", "INTERMEDIATE", "ADVANCED"].map((level) => (
                      <label
                        key={level}
                        className="flex items-center gap-2 cursor-pointer hover:bg-white/[0.05] p-2 rounded transition"
                      >
                        <input
                          type="radio"
                          name="difficulty"
                          checked={selectedDifficulty === level}
                          onChange={() => {
                            setSelectedDifficulty(selectedDifficulty === level ? undefined : level);
                            setPage(0);
                          }}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm capitalize">{level.toLowerCase()}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {popularTags && popularTags.length > 0 && (
                  <div className="rounded-xl border border-white/20 bg-white/[0.03] p-4">
                    <h3 className="font-semibold mb-3">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag: any) => (
                        <button
                          key={tag.id}
                          onClick={() => handleToggleTag(tag.name)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${selectedTags.includes(tag.name)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-white/[0.05] hover:bg-white/[0.1] border-white/20"
                            }`}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="lg:col-span-3">
              {/* Results Info */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{courses.length}</span> of {coursesData?.totalItems || 0} courses
                </p>
              </div>

              {/* Loading State */}
              {loadingCourses && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-80 rounded-2xl border border-white/10 bg-white/[0.03] animate-pulse"
                    />
                  ))}
                </div>
              )}

              {/* Courses Grid */}
              {!loadingCourses && courses.length > 0 && (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                      <CourseCard key={course.id} {...course} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {coursesData && coursesData.totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                      <button
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                      >
                        Previous
                      </button>
                      <div className="flex items-center gap-1 mx-2">
                        {Array.from({ length: Math.min(5, coursesData.totalPages) }).map((_, i) => {
                          // Simple pagination logic for demo
                          let p = i;
                          if (coursesData.totalPages > 5 && page > 2) {
                            p = page - 2 + i;
                            if (p >= coursesData.totalPages) p = coursesData.totalPages - (5 - i);
                          }

                          return (
                            <button
                              key={p}
                              onClick={() => setPage(p)}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition border ${page === p
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/20"
                                }`}
                            >
                              {p + 1}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setPage(p => Math.min(coursesData.totalPages - 1, p + 1))}
                        disabled={page >= coursesData.totalPages - 1}
                        className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Empty State */}
              {!loadingCourses && courses.length === 0 && (
                <div className="text-center py-16 border border-dashed border-white/20 rounded-2xl bg-white/[0.02]">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We couldn't find any courses matching your current filters. Try adjusting your search criteria or clearing filters.
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/20"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Trending Topics (from Incoming) */}
      <TrendingTopics />

      {/* 5. Popular Courses (from Incoming - Optional, maybe redundant with main grid) */}
      {/* <PopularCoursesSection /> */}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 animate-spin text-[var(--brand-600)]" />
      </div>
    }>
      <ExplorePageContent />
    </Suspense>
  );
}