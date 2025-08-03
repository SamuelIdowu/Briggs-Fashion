"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  FolderOpen, 
  TrendingUp, 
  Eye,
  Plus,
  Edit,
  Calendar,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface DashboardStats {
  totalProducts: number;
  totalCollections: number;
  activeProducts: number;
  featuredProducts: number;
  recentProducts: any[];
  recentCollections: any[];
}

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCollections: 0,
    activeProducts: 0,
    featuredProducts: 0,
    recentProducts: [],
    recentCollections: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard data from admin API
      const dashboardRes = await fetch('/api/admin/dashboard');
      const dashboardData = await dashboardRes.json();
      
      if (dashboardData.success) {
        const { stats, recentProducts, recentCollections } = dashboardData.data;
        setStats({
          totalProducts: stats.totalProducts,
          totalCollections: stats.totalCollections,
          activeProducts: stats.activeProducts,
          featuredProducts: stats.featuredProducts,
          recentProducts: recentProducts || [],
          recentCollections: recentCollections || []
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to Brigg's Fashion and Store admin panel. Manage your products and collections.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProducts} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collections</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCollections}</div>
            <p className="text-xs text-muted-foreground">
              Product groups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Products</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredProducts}</div>
            <p className="text-xs text-muted-foreground">
              Highlighted items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProducts}</div>
            <p className="text-xs text-muted-foreground">
              Available for sale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your store
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/products">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </Link>
            <Link href="/admin/collections">
              <Button className="w-full justify-start" variant="outline">
                <FolderOpen className="mr-2 h-4 w-4" />
                Create Collection
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Products */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Products</CardTitle>
            <CardDescription>
              Latest products added to your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentProducts.length > 0 ? (
                stats.recentProducts.map((product) => (
                  <div key={product._id || product.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{product.category}</span>
                          <span>•</span>
                          <span>{product.type}</span>
                          {product.isFeatured && (
                            <>
                              <span>•</span>
                              <Badge variant="secondary" className="text-xs">Featured</Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {formatPrice(product.price)}
                      </span>
                      <Link href={`/admin/products`}>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No products yet</p>
                  <Link href="/admin/products">
                    <Button className="mt-2" size="sm">
                      Add your first product
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Collections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Collections</CardTitle>
          <CardDescription>
            Latest collections created
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentCollections.length > 0 ? (
              stats.recentCollections.map((collection) => (
                <div key={collection._id || collection.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                      <FolderOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{collection.name}</h4>
                      <p className="text-xs text-gray-500">
                        {collection.productCount || 0} products
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {formatDate(collection.createdAt || collection.created_at)}
                    </span>
                    <Link href={`/admin/collections`}>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FolderOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No collections yet</p>
                <Link href="/admin/collections">
                  <Button className="mt-2" size="sm">
                    Create your first collection
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
