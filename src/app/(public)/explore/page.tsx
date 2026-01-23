"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "@/services/courses/course.service";
import { categoryService } from "@/services/courses/category.service";
import { tagService } from "@/services/courses/tag.service";
import CourseCard, { type Course } from "@/core/components/course/CourseCard";
import CategoryTree from "@/core/components/course/CategoryTree";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";

export default function ExplorePage() {
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
  const { data: allCoursesData, isLoading: loadingCourses } = useQuery({
    queryKey: ["all-published-courses"],
    queryFn: async () => {
      // Load 1000 courses at once for client-side filtering
      return courseService.getPublishedCourses(0, 1000, undefined);
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
    <div className="min-h-screen px-4 sm:px-6 md:px-10 xl:px-16 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Explore Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover thousands of courses from top instructors
          </p>
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
                placeholder="Search for courses..."
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
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.08] border border-white/20 rounded-lg transition text-sm"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </button>
              )}

              {/* Categories */}
              <div className="rounded-xl border border-white/20 bg-white/[0.03] p-4">
                <h3 className="font-semibold mb-3">Categories</h3>
                <CategoryTree categories={categories || []} loading={loadingCategories} />
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
                        className="w-4 h-4"
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
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${selectedTags.includes(tag.name)
                          ? "bg-primary text-primary-foreground"
                          : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/20"
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
                {coursesData?.totalItems || 0} courses found
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
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 text-sm text-muted-foreground">
                      Page {page + 1} of {coursesData.totalPages}
                    </span>
                    <button
                      onClick={() => setPage(p => Math.min(coursesData.totalPages - 1, p + 1))}
                      disabled={page >= coursesData.totalPages - 1}
                      className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {!loadingCourses && courses.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  No courses found matching your criteria
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

