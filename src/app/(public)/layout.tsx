import Footer from "@/core/components/public/Footer";
import Navbar from "@/core/components/public/Navbar";
import { CartProvider } from "@/core/providers/cart-provider";

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
