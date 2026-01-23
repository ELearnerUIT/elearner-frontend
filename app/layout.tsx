import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/hooks";
import { ToastProvider } from "@/lib/ui/toast";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ELearner - Giải pháp học tập trực tuyến",
    description:
        "Cung cấp giải pháp học tập trực tuyến với lượng khóa học đồ sồ ở nhiều lĩnh vực và được cập nhật liên tục.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="light">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <QueryProvider>
                    <ToastProvider>{children}</ToastProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
