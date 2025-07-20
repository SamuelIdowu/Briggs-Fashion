import { AdminLayout } from '@/components/admin-layout';
import { ProductManager } from '@/components/product-manager';
import { products } from '@/lib/data';

export default function AdminProductsPage() {
  return (
    <AdminLayout title="Products" subtitle="Manage your product catalog">
      <ProductManager products={products} />
    </AdminLayout>
  );
}