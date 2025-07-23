'use client';
import { useEffect, useState } from 'react';
import { AdminAuthGuard } from '@/components/AdminAuthGuard';

const emptyProduct = {
  name: '',
  description: '',
  category: 'traditional',
  type: 'ready-made',
  images: [],
  price: 0,
};

const CATEGORY_OPTIONS = [
  { value: 'traditional', label: 'Traditional' },
  { value: 'casual', label: 'Casual' },
  { value: 'custom', label: 'Custom' },
];
const TYPE_OPTIONS = [
  { value: 'ready-made', label: 'Ready-made' },
  { value: 'made-to-order', label: 'Made-to-order' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }

  function handleAdd() {
    setEditingProduct({ ...emptyProduct });
    setModalOpen(true);
  }

  function handleEdit(product: any) {
    setEditingProduct({ ...emptyProduct, ...product });
    setModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
    });
    fetchProducts();
  }

  async function handleSave(e: any) {
    e.preventDefault();
    if (!editingProduct) return;
    const isEdit = !!editingProduct._id;
    const url = isEdit ? `/api/admin/products/${editingProduct._id}` : '/api/admin/products';
    const { name, description, category, type, images, price } = editingProduct;
    const body = JSON.stringify({ name, description, category, type, images, price });
    const method = isEdit ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
      body,
    });
    setModalOpen(false);
    fetchProducts();
  }

  return (
    <AdminAuthGuard>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <button className="mb-4 px-4 py-2 bg-primary text-white rounded" onClick={handleAdd}>Add Product</button>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id || product.id}>
                <td className="border px-4 py-2">
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} className="h-12 w-12 object-cover rounded" />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.type}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">
                  <button className="mr-2 text-blue-600" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDelete(product._id || product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Add/Edit */}
        {modalOpen && editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form className="bg-white p-6 rounded shadow w-full max-w-lg overflow-y-auto max-h-[90vh]" onSubmit={handleSave}>
              <h2 className="text-xl font-bold mb-4">{editingProduct._id ? 'Edit' : 'Add'} Product</h2>
              <input className="border p-2 w-full mb-2" placeholder="Name" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} required />
              <textarea className="border p-2 w-full mb-2" placeholder="Description" value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} required />
              <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
              <select id="category" className="border p-2 w-full mb-2" value={editingProduct.category} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })} required>
                {CATEGORY_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
              <select id="type" className="border p-2 w-full mb-2" value={editingProduct.type} onChange={e => setEditingProduct({ ...editingProduct, type: e.target.value })} required>
                {TYPE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <input className="border p-2 w-full mb-2" placeholder="Image URLs (comma separated)" value={editingProduct.images.join(',')} onChange={e => setEditingProduct({ ...editingProduct, images: e.target.value.split(',').map(v => v.trim()).filter(Boolean) })} />
              <input className="border p-2 w-full mb-2" placeholder="Price" type="number" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })} required />
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Save</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminAuthGuard>
  );
}