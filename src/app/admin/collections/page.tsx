'use client';

import { AdminAuthGuard } from '@/components/AdminAuthGuard';

export default function AdminCollectionsPage() {
  return (
    <AdminAuthGuard>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Collections</h1>
        <p>This is the admin collections management page. (Feature coming soon!)</p>
      </div>
    </AdminAuthGuard>
  );
}
