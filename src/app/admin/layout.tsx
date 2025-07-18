import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <div className="flex h-screen bg-background">
            <AdminSidebar />
            <div className="flex flex-1 flex-col">
              <AdminHeader />
              <SidebarInset>
                <main className="flex-1 p-4 md:p-8">{children}</main>
              </SidebarInset>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
