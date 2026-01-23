import "../styles/globals.css";
import { ThemeProvider } from "@/core/providers/theme-provider";
import type { Metadata } from "next";
import AssistantWidget from "@/core/components/public/AssistantWidget";
import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";
import { ToasterProvider } from "@/lib/providers/ToasterProvider";
import { GoogleOAuthProvider } from "@/lib/providers/GoogleOAuthProvider";

export const metadata: Metadata = {
    title: "ELearner – Online Courses Learning",
    description:
        "Learn anything with ELearner. Online courses and learning paths.",
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
