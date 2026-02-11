import { useState } from "react";
import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  MapPin,
  Edit,
  Trash2,
  Filter,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const franchises = [
  { id: 1, name: "NYC Learning Hub", location: "New York, USA", admin: "James Wilson", users: 2450, revenue: "$45,200", status: "active", revenueShare: "70/30" },
  { id: 2, name: "London Academy", location: "London, UK", admin: "Emma Thompson", users: 1820, revenue: "$38,500", status: "active", revenueShare: "75/25" },
  { id: 3, name: "Sydney EdTech", location: "Sydney, Australia", admin: "Oliver Brown", users: 1245, revenue: "$28,900", status: "active", revenueShare: "70/30" },
  { id: 4, name: "Toronto Institute", location: "Toronto, Canada", admin: "Sarah Miller", users: 980, revenue: "$21,400", status: "pending", revenueShare: "65/35" },
  { id: 5, name: "Berlin Campus", location: "Berlin, Germany", admin: "Hans Mueller", users: 756, revenue: "$18,200", status: "active", revenueShare: "70/30" },
];

export default function FranchisesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newFranchise, setNewFranchise] = useState({
    name: "",
    location: "",
    adminEmail: "",
    revenueShare: "70",
    description: "",
  });
  const { toast } = useToast();

  const handleAddFranchise = () => {
    if (!newFranchise.name || !newFranchise.location || !newFranchise.adminEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Franchise Created",
      description: `${newFranchise.name} has been successfully created.`,
    });
    setNewFranchise({ name: "", location: "", adminEmail: "", revenueShare: "70", description: "" });
    setIsAddOpen(false);
  };

  const filteredFranchises = franchises.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminDashboardLayout title="Franchise Management" subtitle="Manage your franchise network">
      <div className="space-y-4 md:space-y-6">
        {/* Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Franchises</p>
                  <p className="text-xl md:text-2xl font-bold">24</p>
                </div>
                <Building2 className="h-6 w-6 md:h-8 md:w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Users</p>
                  <p className="text-xl md:text-2xl font-bold">8,542</p>
                </div>
                <Users className="h-6 w-6 md:h-8 md:w-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-xl md:text-2xl font-bold">$152K</p>
                </div>
                <DollarSign className="h-6 w-6 md:h-8 md:w-8 text-chart-3/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Growth</p>
                  <p className="text-xl md:text-2xl font-bold">+18%</p>
                </div>
                <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-chart-4/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Franchises Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-base md:text-lg">All Franchises</CardTitle>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-primary hover:bg-primary/90 flex-1 sm:flex-none">
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Add Franchise</span>
                        <span className="sm:hidden">Add</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Create New Franchise</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Franchise Name *</Label>
                          <Input
                            id="name"
                            placeholder="e.g., NYC Learning Hub"
                            value={newFranchise.name}
                            onChange={(e) => setNewFranchise({ ...newFranchise, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location *</Label>
                          <Input
                            id="location"
                            placeholder="e.g., New York, USA"
                            value={newFranchise.location}
                            onChange={(e) => setNewFranchise({ ...newFranchise, location: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="adminEmail">Admin Email *</Label>
                          <Input
                            id="adminEmail"
                            type="email"
                            placeholder="admin@franchise.com"
                            value={newFranchise.adminEmail}
                            onChange={(e) => setNewFranchise({ ...newFranchise, adminEmail: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="revenueShare">Revenue Share (Platform %)</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="revenueShare"
                              type="number"
                              min="0"
                              max="100"
                              value={newFranchise.revenueShare}
                              onChange={(e) => setNewFranchise({ ...newFranchise, revenueShare: e.target.value })}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">
                              / {100 - parseInt(newFranchise.revenueShare || "0")} (Franchise)
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Brief description of the franchise..."
                            value={newFranchise.description}
                            onChange={(e) => setNewFranchise({ ...newFranchise, description: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsAddOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="flex-1 bg-primary hover:bg-primary/90"
                            onClick={handleAddFranchise}
                          >
                            Create Franchise
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 md:p-6 md:pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs md:text-sm">Franchise</TableHead>
                    <TableHead className="text-xs md:text-sm hidden md:table-cell">Admin</TableHead>
                    <TableHead className="text-xs md:text-sm">Users</TableHead>
                    <TableHead className="text-xs md:text-sm hidden sm:table-cell">Revenue</TableHead>
                    <TableHead className="text-xs md:text-sm">Status</TableHead>
                    <TableHead className="text-xs md:text-sm text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFranchises.map((franchise) => (
                    <TableRow key={franchise.id} className="hover:bg-gray-100/80 dark:hover:bg-gray-800/50 transition-colors group">
                      <TableCell className="p-2 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Avatar className="h-8 w-8 md:h-10 md:w-10">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {franchise.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-xs md:text-sm truncate">{franchise.name}</p>
                            <p className="text-[10px] md:text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{franchise.location}</span>
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs md:text-sm hidden md:table-cell">{franchise.admin}</TableCell>
                      <TableCell className="text-xs md:text-sm p-2 md:p-4">{franchise.users.toLocaleString()}</TableCell>
                      <TableCell className="text-xs md:text-sm font-medium text-accent hidden sm:table-cell">
                        {franchise.revenue}
                      </TableCell>
                      <TableCell className="p-2 md:p-4">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] md:text-xs ${franchise.status === "active"
                            ? "bg-accent/10 text-accent"
                            : "bg-chart-3/10 text-chart-3"
                            }`}
                        >
                          {franchise.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-2 md:p-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            size="sm"
                            className="h-7 md:h-8 gap-1 hidden sm:flex text-xs bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 shadow-sm"
                            onClick={() => toast({ description: "Visiting franchise dashboard..." })}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Visit
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8">
                            <Edit className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                          <Button variant="ghost-destructive" size="icon" className="h-7 w-7 md:h-8 md:w-8">
                            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}