import AdminSidebar, { MobileAdminHeader } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-brand-cream/30">
      <AdminSidebar />
      <div className="flex-1 min-w-0 lg:pl-64 flex flex-col min-h-screen">
        <MobileAdminHeader />
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-hidden w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
