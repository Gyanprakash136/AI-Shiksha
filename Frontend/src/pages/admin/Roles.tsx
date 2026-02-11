import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Shield,
  Lock,
  Users,
  Plus,
  Settings,
  Edit,
  Trash2,
} from "lucide-react";

const roles = [
  { id: 1, name: "Administrator", description: "Full system access", users: 5, color: "bg-destructive" },
  { id: 2, name: "Teacher", description: "Course management and student interaction", users: 1234, color: "bg-primary" },
  { id: 3, name: "Student", description: "Learning and course enrollment", users: 12847, color: "bg-accent" },
  { id: 4, name: "Moderator", description: "Content moderation and support", users: 12, color: "bg-chart-3" },
  { id: 5, name: "Support", description: "Customer support access", users: 8, color: "bg-chart-4" },
];

const permissions = [
  { id: 1, category: "Users", permissions: ["View Users", "Create Users", "Edit Users", "Delete Users", "Manage Roles"] },
  { id: 2, category: "Courses", permissions: ["View Courses", "Create Courses", "Edit Courses", "Delete Courses", "Approve Courses"] },
  { id: 3, category: "Revenue", permissions: ["View Revenue", "Manage Payouts", "Create Coupons", "Manage Subscriptions"] },
  { id: 4, category: "Settings", permissions: ["View Settings", "Edit Settings", "Manage Integrations", "SEO Settings"] },
];

export default function RolesPage() {
  return (
    <AdminDashboardLayout title="Roles & Permissions" subtitle="Manage user roles and access controls">
      <div className="space-y-4 md:space-y-6">
        {/* Role Cards */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {roles.map((role) => (
            <Card key={role.id} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 ${role.color}`} />
              <CardContent className="p-3 md:p-4 pt-4 md:pt-5">
                <div className="flex items-start justify-between mb-1 md:mb-2">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Shield className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-xs md:text-sm">{role.name}</h3>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 md:h-8 md:w-8">
                    <Edit className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
                <p className="text-[10px] md:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2">{role.description}</p>
                <div className="flex items-center gap-1 text-[10px] md:text-sm">
                  <Users className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{role.users.toLocaleString()} users</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create New Role */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Role
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="roleName">Role Name</Label>
                <Input id="roleName" placeholder="e.g., Content Manager" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleDesc">Description</Label>
                <Input id="roleDesc" placeholder="Describe the role's purpose" />
              </div>
            </div>
            <Button className="mt-4">Create Role</Button>
          </CardContent>
        </Card>

        {/* Permissions Matrix */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Permission Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48">Permission</TableHead>
                    {roles.map((role) => (
                      <TableHead key={role.id} className="text-center min-w-24">
                        {role.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.map((category) => (
                    <>
                      <TableRow key={category.id} className="bg-muted/50">
                        <TableCell colSpan={roles.length + 1} className="font-semibold">
                          {category.category}
                        </TableCell>
                      </TableRow>
                      {category.permissions.map((permission, index) => (
                        <TableRow key={`${category.id}-${index}`}>
                          <TableCell className="text-sm">{permission}</TableCell>
                          {roles.map((role) => (
                            <TableCell key={role.id} className="text-center">
                              <Switch
                                defaultChecked={role.name === "Administrator" || (role.name === "Teacher" && category.category === "Courses")}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end mt-4">
              <Button>Save Permissions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
