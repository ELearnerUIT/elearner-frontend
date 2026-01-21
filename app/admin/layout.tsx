export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Layout applies to all /admin routes
    // Auth protection is handled at the route group level
    return <>{children}</>;
}
