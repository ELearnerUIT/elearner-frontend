import Footer from "@/core/components/public/Footer";
import Navbar from "@/core/components/public/Navbar";
import { CartProvider } from "@/core/providers/cart-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-[72vh]">{children}</main>
      <Footer />
    </>
  );
}
