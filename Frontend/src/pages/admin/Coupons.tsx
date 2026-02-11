import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tag,
  Plus,
  Percent,
  Calendar,
  Copy,
  Edit,
  Trash2,
  Search,
} from "lucide-react";

const coupons = [
  { id: 1, code: "NEWYEAR2024", discount: 30, type: "percent", uses: 245, maxUses: 500, expiresAt: "2024-02-28", status: "active" },
  { id: 2, code: "WELCOME50", discount: 50, type: "percent", uses: 1234, maxUses: null, expiresAt: null, status: "active" },
  { id: 3, code: "SAVE20", discount: 20, type: "fixed", uses: 89, maxUses: 100, expiresAt: "2024-01-31", status: "expired" },
  { id: 4, code: "FLASH10", discount: 10, type: "percent", uses: 567, maxUses: 1000, expiresAt: "2024-03-15", status: "active" },
];

export default function CouponsPage() {
  return (
    <AdminDashboardLayout title="Coupons & Discounts" subtitle="Manage promotional codes and discounts">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Coupons</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Tag className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Redemptions</p>
                  <p className="text-2xl font-bold">2,135</p>
                </div>
                <Percent className="h-8 w-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Discount Value</p>
                  <p className="text-2xl font-bold">$45,200</p>
                </div>
                <Tag className="h-8 w-8 text-chart-3/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expiring Soon</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Calendar className="h-8 w-8 text-chart-4/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Coupon */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Coupon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label>Coupon Code</Label>
                <Input placeholder="e.g., SUMMER2024" />
              </div>
              <div className="space-y-2">
                <Label>Discount Value</Label>
                <Input type="number" placeholder="e.g., 20" />
              </div>
              <div className="space-y-2">
                <Label>Discount Type</Label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option value="percent">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input type="date" />
              </div>
            </div>
            <Button className="mt-4">Create Coupon</Button>
          </CardContent>
        </Card>

        {/* Coupon List */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>All Coupons</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search coupons..." className="pl-9 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Tag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <code className="font-bold text-lg">{coupon.code}</code>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {coupon.discount}{coupon.type === "percent" ? "%" : "$"} off •
                        {coupon.uses}{coupon.maxUses ? `/${coupon.maxUses}` : ""} uses
                        {coupon.expiresAt && ` • Expires ${coupon.expiresAt}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={coupon.status === "active" ? "default" : "secondary"}>
                      {coupon.status}
                    </Badge>
                    <Switch checked={coupon.status === "active"} />
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost-destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
