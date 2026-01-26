import type { BannerSlide } from "@/core/components/public/landingpage/BannerCarousel";
import HomePageClient from "./HomePageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Courses & Learning Platform",
  description:
    "Master tomorrow's skills with ELearner. Access thousands of online courses from expert instructors. Learn programming, design, business, and more. Earn certificates and advance your career.",
  openGraph: {
    title: "ELearner - Online Courses & Learning Platform",
    description:
      "Master tomorrow's skills with thousands of online courses. Learn from expert instructors, earn certificates, and advance your career.",
    url: "/",
    images: [
      {
        url: "/images/banners/slide1.png",
        width: 1200,
        height: 630,
        alt: "ELearner - Master Tomorrow's Skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELearner - Online Courses & Learning Platform",
    description:
      "Master tomorrow's skills with thousands of online courses. Learn from expert instructors and earn certificates.",
    images: ["/images/banners/slide1.png"],
  },
  alternates: {
    canonical: "/",
  },
};

const slides: BannerSlide[] = [
  {
    title: "Master Tomorrow's Skills",
    subtitle:
      "Advance your career with up-to-date courses and experienced instructors.",
    ctaPrimary: { label: "Get Started", href: "/explore" },
    ctaSecondary: { label: "Explore AI", href: "/explore?q=AI" },
    image: "/images/banners/slide1.png",
  },
  {
    title: "Learn with a Clear Path",
    subtitle:
      "Frontend, Backend, Data… choose your path and move forward step by step.",
    ctaPrimary: { label: "View Learning Paths", href: "/paths" },
    image: "/images/banners/slide2.png",
  },
  {
    title: "Grow Every Day",
    subtitle: "Short lessons, hands-on exercises, and completion certificates.",
    ctaPrimary: { label: "Find Courses", href: "/explore" },
    ctaSecondary: { label: "Today's Deals", href: "/deals" },
    image: "/images/banners/slide3.png",
  },
];

export default function Home() {
  return <HomePageClient slides={slides} />;
}
