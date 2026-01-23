import HeroExplore from "@/core/components/public/explore/ExploreHero";
import ExploreCategoriesNew from "@/core/components/public/explore/ExploreCategories";
import TrendingTopics from "@/core/components/public/explore/ExploreTopics";
import FeaturedCollections from "@/core/components/public/explore/ExploreRecommended";
import PopularCoursesSection from "@/core/components/public/explore/ExplorePopular";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Courses",
  description:
    "Discover thousands of online courses across programming, design, business, and more. Find the perfect course to advance your career and learn new skills.",
  openGraph: {
    title: "Explore Courses - ELearner",
    description:
      "Discover thousands of online courses across programming, design, business, and more. Find the perfect course to advance your career.",
    url: "/explore",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Courses - ELearner",
    description:
      "Discover thousands of online courses across programming, design, business, and more.",
  },
};

export default function ExplorePage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <HeroExplore />
      <TrendingTopics />
      <ExploreCategoriesNew />
      <FeaturedCollections />
      <PopularCoursesSection />
    </div>
  );
}
