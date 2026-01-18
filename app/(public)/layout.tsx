import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-base-100">
            {/* 1. Header/Navbar sẽ nằm ở đây */}
            {/* <Navbar /> */}
            <div className="w-full bg-base-200 text-center">
                <PublicNavbar />
            </div>

            {/* 2. Nội dung chính của từng trang (Home, Login, Course Detail...) */}
            <main className="grow">{children}</main>

            {/* 3. Footer chung cho toàn bộ trang Public */}
            <PublicFooter />
        </div>
    );
}
