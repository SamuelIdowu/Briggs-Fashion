import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Order management interface coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
