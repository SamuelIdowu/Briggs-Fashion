'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { formatPrice, getCategoryDisplayName, getTypeDisplayName } from '@/utils/helpers';
import type { Product } from '@/types';

interface ProductManagerProps {
  products?: Product[];
  onAddProduct?: (product: Partial<Product>) => void;
  onEditProduct?: (id: string, product: Partial<Product>) => void;
  onDeleteProduct?: (id: string) => void;
}

export function ProductManager({
  products = [],
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesType = selectedType === 'all' || product.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleAddProduct = (formData: FormData) => {
    const product = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as 'traditional' | 'casual' | 'custom',
      type: formData.get('type') as 'ready-made' | 'made-to-order',
      price: parseFloat(formData.get('price') as string),
      images: (formData.get('images') as string).split(',').map(img => img.trim()),
      variations: {
        sizes: (formData.get('sizes') as string).split(',').map(size => size.trim()),
        colors: (formData.get('colors') as string).split(',').map(color => color.trim()),
        materials: (formData.get('materials') as string).split(',').map(material => material.trim()),
      },
      seo: {
        metaTitle: formData.get('metaTitle') as string,
        metaDescription: formData.get('metaDescription') as string,
        keywords: (formData.get('keywords') as string).split(',').map(keyword => keyword.trim()),
      },
    };

    onAddProduct?.(product);
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct?.(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new product for your catalog
              </DialogDescription>
            </DialogHeader>
            <form action={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="price">Price (NGN)</Label>
                  <Input id="price" name="price" type="number" step="0.01" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traditional">Traditional Wear</SelectItem>
                      <SelectItem value="casual">Casual Wear</SelectItem>
                      <SelectItem value="custom">Custom Tailoring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ready-made">Ready-Made</SelectItem>
                      <SelectItem value="made-to-order">Made to Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} required />
              </div>

              <div>
                <Label htmlFor="images">Image URLs (comma-separated)</Label>
                <Input id="images" name="images" placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" required />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sizes">Sizes (comma-separated)</Label>
                  <Input id="sizes" name="sizes" placeholder="S, M, L, XL" />
                </div>
                <div>
                  <Label htmlFor="colors">Colors (comma-separated)</Label>
                  <Input id="colors" name="colors" placeholder="Black, Gold, White" />
                </div>
                <div>
                  <Label htmlFor="materials">Materials (comma-separated)</Label>
                  <Input id="materials" name="materials" placeholder="Cotton, Silk, Linen" />
                </div>
              </div>

              <div>
                <Label htmlFor="metaTitle">SEO Title</Label>
                <Input id="metaTitle" name="metaTitle" />
              </div>

              <div>
                <Label htmlFor="metaDescription">SEO Description</Label>
                <Textarea id="metaDescription" name="metaDescription" rows={2} />
              </div>

              <div>
                <Label htmlFor="keywords">SEO Keywords (comma-separated)</Label>
                <Input id="keywords" name="keywords" placeholder="nigerian fashion, menswear, traditional" />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Product</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="traditional">Traditional Wear</SelectItem>
                <SelectItem value="casual">Casual Wear</SelectItem>
                <SelectItem value="custom">Custom Tailoring</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ready-made">Ready-Made</SelectItem>
                <SelectItem value="made-to-order">Made to Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
          <CardDescription>
            Manage your product catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.description.substring(0, 50)}...
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getCategoryDisplayName(product.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getTypeDisplayName(product.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatPrice(product.price)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.isActive ? 'default' : 'secondary'}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}