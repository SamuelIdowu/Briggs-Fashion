'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart,
  Users,
  ShoppingCart,
  Eye,
  MessageCircle,
  Calendar,
  Download
} from 'lucide-react';

// Mock analytics data for development
const mockAnalytics = {
  overview: {
    totalRevenue: 2450000,
    totalOrders: 156,
    totalCustomers: 89,
    conversionRate: 3.2,
    avgOrderValue: 15705,
  },
  trends: {
    revenue: '+23%',
    orders: '+18%',
    customers: '+12%',
    conversion: '+5%',
  },
  topProducts: [
    { name: 'Traditional Agbada', views: 234, sales: 15, revenue: 225000 },
    { name: 'Casual Polo Shirt', views: 189, sales: 12, revenue: 144000 },
    { name: 'Custom Dashiki', views: 156, sales: 8, revenue: 120000 },
    { name: 'Formal Suit', views: 134, sales: 6, revenue: 180000 },
    { name: 'Traditional Kaftan', views: 98, sales: 4, revenue: 80000 },
  ],
  trafficSources: [
    { source: 'Direct', percentage: 45, visits: 1234 },
    { source: 'Google', percentage: 30, visits: 823 },
    { source: 'WhatsApp', percentage: 15, visits: 412 },
    { source: 'Social Media', percentage: 10, visits: 275 },
  ],
  recentActivity: [
    { type: 'order', message: 'New order #1234 from John Doe', time: '2 minutes ago' },
    { type: 'customer', message: 'New customer registration: Jane Smith', time: '15 minutes ago' },
    { type: 'inquiry', message: 'WhatsApp inquiry for Traditional Agbada', time: '1 hour ago' },
    { type: 'order', message: 'Order #1233 completed', time: '2 hours ago' },
  ],
};

export default function AdminAnalyticsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount / 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Business intelligence and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockAnalytics.overview.totalRevenue)}</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {mockAnalytics.trends.revenue} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.totalOrders}</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {mockAnalytics.trends.orders} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.totalCustomers}</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {mockAnalytics.trends.customers} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.conversionRate}%</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {mockAnalytics.trends.conversion} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>
              Products with highest views and sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.views} views • {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(product.revenue)}</p>
                    <p className="text-xs text-muted-foreground">
                      {((product.sales / product.views) * 100).toFixed(1)}% conversion
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>
              Where your visitors come from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{source.source}</p>
                      <p className="text-xs text-muted-foreground">
                        {source.visits} visits
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{source.percentage}%</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest events and activities in your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'order' ? 'bg-green-500' :
                  activity.type === 'customer' ? 'bg-blue-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}