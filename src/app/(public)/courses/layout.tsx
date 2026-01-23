import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Course Details",
    template: "%s | ELearner",
  },
  description:
    "Learn new skills with expert-led online courses. Explore course curriculum, instructor details, reviews, and enrollment options.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
