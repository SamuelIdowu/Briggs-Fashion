'use client';
import { useEffect, useState } from 'react';
import { AdminAuthGuard } from '../../../components/AdminAuthGuard';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Card, CardContent } from '../../../components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const emptyProduct = {
  name: '',
  description: '',
  category: '',
  type: 'ready-made',
  images: [],
  price: 0,
};

const TYPE_OPTIONS = [
  { value: 'ready-made', label: 'Ready-made' },
  { value: 'made-to-order', label: 'Made-to-order' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCollections();
  }, []);

  function fetchCollections() {
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCollections(data.data.collections || []);
        }
      });
  }

  function fetchProducts() {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.data.products || []);
        }
      });
  }

  function handleAdd() {
    setEditingProduct({ ...emptyProduct });
    setUploadedFiles([]);
    setImagePreviewUrls([]);
    setModalOpen(true);
  }

  function handleEdit(product: any) {
    setEditingProduct({ ...emptyProduct, ...product });
    setUploadedFiles([]);
    setImagePreviewUrls(product.images || []);
    setModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return;
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
    fetchProducts();
    }
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    const validFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== newFiles.length) {
      alert('Please select only image files');
      return;
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  async function handleSave(e: any) {
    e.preventDefault();
    if (!editingProduct) return;

    // For now, we'll keep the existing image URLs and add new file uploads
    // In a real implementation, you'd upload the files to a server and get URLs back
    const allImages = [...imagePreviewUrls, ...uploadedFiles.map(file => URL.createObjectURL(file))];
    
    const isEdit = !!editingProduct._id;
    const url = isEdit ? `/api/admin/products/${editingProduct._id}` : '/api/admin/products';
    const { name, description, category, type, price } = editingProduct;
    const body = JSON.stringify({ 
      name, 
      description, 
      category, 
      type, 
      images: allImages, 
      price 
    });
    const method = isEdit ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    
    if (response.ok) {
    setModalOpen(false);
      setUploadedFiles([]);
      setImagePreviewUrls([]);
    fetchProducts();
    }
  }

  return (
    <AdminAuthGuard>
      <div className="container mx-auto py-6 px-4 sm:px-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <Button className="mb-4" onClick={handleAdd}>Add Product</Button>
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
                    <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.type}</td>
                <td className="border px-4 py-2">{formatPrice(product.price)}</td>
                <td className="border px-4 py-2">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDelete(product._id || product.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Add/Edit */}
        {modalOpen && editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form className="bg-white p-6 rounded shadow w-full max-w-2xl overflow-y-auto max-h-[90vh]" onSubmit={handleSave}>
              <h2 className="text-xl font-bold mb-4">{editingProduct._id ? 'Edit' : 'Add'} Product</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Product name"
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Product description"
                    value={editingProduct.description}
                    onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full border rounded-md p-2"
                      value={editingProduct.category}
                      onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      required
                    >
                <option value="">Select a collection</option>
                {collections.map(collection => (
                  <option key={collection._id} value={collection.name}>
                    {collection.name}
                  </option>
                ))}
              </select>
                  </div>

                  <div>
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      className="w-full border rounded-md p-2"
                      value={editingProduct.type}
                      onChange={e => setEditingProduct({ ...editingProduct, type: e.target.value })}
                      required
                    >
                {TYPE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Price"
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    required
                  />
                </div>

                {/* Image Upload Section */}
                <div>
                  <Label>Product Images</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop images here, or click to select files
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      Select Images
                    </Button>
                  </div>
                </div>

                {/* Image Previews */}
                {(imagePreviewUrls.length > 0 || uploadedFiles.length > 0) && (
                  <div>
                    <Label>Image Previews</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={`preview-${index}`} className="relative">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      {uploadedFiles.map((file, index) => (
                        <div key={`file-${index}`} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                            onClick={() => removeImage(imagePreviewUrls.length + index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminAuthGuard>
  );
}