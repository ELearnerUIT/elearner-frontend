import PublicFooter from "@/components/shared/PublicFooter";
import StudentNavbar from "@/components/student/StudentNavbar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard allowedRoles={["STUDENT"]}>
            <div className="flex flex-col min-h-screen bg-base-100">
                <div className="w-full bg-base-200 text-center">
                    <StudentNavbar />
                </div>

                <main className="grow">{children}</main>

                <PublicFooter />
            </div>
        </AuthGuard>
    );
}
