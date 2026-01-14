import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (

        <div className="flex flex-col min-h-screen bg-base-100">

            <div className="w-full bg-base-200 text-center">
                <PublicNavbar />
            </div>

            <main className="grow">{children}</main>

            <PublicFooter />

        </div>
    );
}