import "../styles/globals.css";
import { ThemeProvider } from "@/core/providers/theme-provider";
import type { Metadata } from "next";
import AssistantWidget from "@/core/components/public/AssistantWidget";
import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";
import { ToasterProvider } from "@/lib/providers/ToasterProvider";
import { GoogleOAuthProvider } from "@/lib/providers/GoogleOAuthProvider";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://elearner.com'),
    title: {
        default: "ELearner – Online Courses & Learning Platform",
        template: "%s | ELearner"
    },
    description:
        "Master new skills with ELearner. Access thousands of online courses, expert instructors, and earn certificates. Learn programming, design, business, and more at your own pace.",
    keywords: ["online courses", "e-learning", "online education", "skill development", "certifications", "programming courses", "professional development"],
    authors: [{ name: "ELearner" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "ELearner",
        title: "ELearner – Online Courses & Learning Platform",
        description: "Master new skills with thousands of online courses. Learn from expert instructors and earn certificates.",
        images: [
            {
                url: "/images/banners/slide1.png",
                width: 1200,
                height: 630,
                alt: "ELearner - Online Learning Platform",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "ELearner – Online Courses & Learning Platform",
        description: "Master new skills with thousands of online courses. Learn from expert instructors and earn certificates.",
        images: ["/images/banners/slide1.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <GoogleOAuthProvider>
                    <ReactQueryProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <ToasterProvider />
                            {children}
                            <AssistantWidget />
                        </ThemeProvider>
                    </ReactQueryProvider>
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
