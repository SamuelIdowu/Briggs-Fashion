import { ProtectedAdminLayout } from '@/components/protected-admin-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProtectedAdminLayout>{children}</ProtectedAdminLayout>;
}
