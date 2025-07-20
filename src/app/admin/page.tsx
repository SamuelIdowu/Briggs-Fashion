import { AdminLayout } from '@/components/admin-layout';
import { AdminDashboard } from '@/components/admin-dashboard';

export default function AdminPage() {
  return (
    <AdminLayout title="Dashboard" subtitle="Overview of your store">
      <AdminDashboard />
    </AdminLayout>
  );
}
