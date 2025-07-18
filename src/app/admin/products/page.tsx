import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Products</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Product management interface coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
