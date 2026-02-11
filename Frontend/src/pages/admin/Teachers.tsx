import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  BookOpen,
  DollarSign,
  Star,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const teachers = [
  { id: 1, name: "Dr. Emily Chen", email: "emily@example.com", courses: 12, students: 4500, revenue: 45000, rating: 4.9, status: "verified" },
  { id: 2, name: "Prof. Robert Smith", email: "robert@example.com", courses: 8, students: 3200, revenue: 32000, rating: 4.7, status: "verified" },
  { id: 3, name: "Jane Doe", email: "jane@example.com", courses: 0, students: 0, revenue: 0, rating: 0, status: "pending" },
  { id: 4, name: "Dr. Michael Johnson", email: "michael@example.com", courses: 15, students: 6800, revenue: 68000, rating: 4.8, status: "verified" },
  { id: 5, name: "Sarah Williams", email: "sarah@example.com", courses: 3, students: 850, revenue: 8500, rating: 4.5, status: "verified" },
];

const pendingVerifications = [
  { id: 1, name: "John Newbie", email: "john@example.com", expertise: "Web Development", appliedAt: "2024-01-20" },
  { id: 2, name: "Lisa Expert", email: "lisa@example.com", expertise: "Data Science", appliedAt: "2024-01-19" },
  { id: 3, name: "Mark Teacher", email: "mark@example.com", expertise: "Marketing", appliedAt: "2024-01-18" },
];

export default function TeachersPage() {
  return (
    <AdminDashboardLayout title="Teachers" subtitle="Manage instructors and verification requests">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Teachers</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-2xl font-bold">3,456</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">$2.4M</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-chart-3" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Verification</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-chart-4/20 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-chart-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Verifications */}
        <Card className="border-chart-3/30 bg-chart-3/5">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-chart-3" />
                Pending Verifications
              </CardTitle>
              <Badge variant="secondary">{pendingVerifications.length} pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {pendingVerifications.map((teacher) => (
                <div key={teacher.id} className="bg-background p-4 rounded-lg border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-chart-3/20 text-chart-3">
                          {teacher.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-muted-foreground">{teacher.email}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium">Expertise:</span> {teacher.expertise}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1">
                      <CheckCircle className="h-4 w-4" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <XCircle className="h-4 w-4" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Teachers */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>All Teachers</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search teachers..." className="pl-9 w-64" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {teacher.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{teacher.name}</p>
                          <p className="text-sm text-muted-foreground">{teacher.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.courses}</TableCell>
                    <TableCell>{teacher.students.toLocaleString()}</TableCell>
                    <TableCell>${teacher.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      {teacher.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-chart-3 text-chart-3" />
                          <span>{teacher.rating}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={teacher.status === "verified" ? "default" : "secondary"}>
                        {teacher.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Courses</DropdownMenuItem>
                          <DropdownMenuItem>Revenue Details</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">Suspend</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
