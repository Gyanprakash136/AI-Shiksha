import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import {
  Search,
  Plus,
  MoreVertical,
  Mail,
  Ban,
  Shield,
  Users,
  UserCheck,
  UserX,
  Upload,
  Download,
  FileText,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const users = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    role: "student",
    status: "active",
    joinedDate: "Jan 15, 2024",
    coursesEnrolled: 5,
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    role: "teacher",
    status: "active",
    joinedDate: "Dec 10, 2023",
    coursesEnrolled: 0,
    coursesCreated: 8,
    lastActive: "1 hour ago",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "student",
    status: "suspended",
    joinedDate: "Feb 5, 2024",
    coursesEnrolled: 3,
    lastActive: "1 week ago",
  },
  {
    id: "4",
    name: "Emily White",
    email: "emily@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    role: "teacher",
    status: "active",
    joinedDate: "Nov 20, 2023",
    coursesCreated: 12,
    lastActive: "30 minutes ago",
  },
  {
    id: "5",
    name: "Alex Brown",
    email: "alex@example.com",
    avatar: "",
    role: "admin",
    status: "active",
    joinedDate: "Sep 1, 2023",
    lastActive: "Just now",
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isCSVUploadOpen, setIsCSVUploadOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
  });
  const { toast } = useToast();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && user.role === activeTab;
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "User Added",
      description: `${newUser.name} has been added as a ${newUser.role}.`,
    });
    setNewUser({ name: "", email: "", role: "student", password: "" });
    setIsAddUserOpen(false);
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "CSV Uploaded",
        description: `Processing ${file.name}...`,
      });
      setIsCSVUploadOpen(false);
    }
  };

  const downloadCSVTemplate = () => {
    const csvContent = "name,email,role,password\nJohn Doe,john@example.com,student,password123\nJane Smith,jane@example.com,teacher,password456";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "text-primary" },
    { label: "Active", value: users.filter((u) => u.status === "active").length, icon: UserCheck, color: "text-emerald-600" },
    { label: "Teachers", value: users.filter((u) => u.role === "teacher").length, icon: Shield, color: "text-primary" },
    { label: "Suspended", value: users.filter((u) => u.status === "suspended").length, icon: UserX, color: "text-destructive" },
  ];

  return (
    <AdminDashboardLayout title="User Management" subtitle="Manage platform users and permissions">
      <div className="space-y-4 md:space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <div className="flex gap-2">
            {/* CSV Upload Dialog */}
            <Dialog open={isCSVUploadOpen} onOpenChange={setIsCSVUploadOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Import CSV</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Import Users from CSV</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Guidelines */}
                  <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 text-primary" />
                      CSV Format Guidelines
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1.5 ml-6 list-disc">
                      <li>First row must contain headers: <code className="bg-muted px-1 rounded text-xs">name,email,role,password</code></li>
                      <li>Role must be one of: <code className="bg-muted px-1 rounded text-xs">student</code>, <code className="bg-muted px-1 rounded text-xs">teacher</code>, or <code className="bg-muted px-1 rounded text-xs">admin</code></li>
                      <li>Email addresses must be unique and valid</li>
                      <li>Password must be at least 8 characters</li>
                      <li>Maximum 500 users per upload</li>
                    </ul>
                    <Button
                      variant="link"
                      size="sm"
                      className="gap-1 p-0 h-auto text-primary"
                      onClick={downloadCSVTemplate}
                    >
                      <Download className="h-3 w-3" />
                      Download Template CSV
                    </Button>
                  </div>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                      className="hidden"
                      id="csv-upload"
                    />
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">CSV files only (max 5MB)</p>
                    </label>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Add User Dialog */}
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add User</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsAddUserOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={handleAddUser}
                    >
                      Add User
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs and Table */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All ({users.length})</TabsTrigger>
            <TabsTrigger value="student">Students ({users.filter((u) => u.role === "student").length})</TabsTrigger>
            <TabsTrigger value="teacher">Teachers ({users.filter((u) => u.role === "teacher").length})</TabsTrigger>
            <TabsTrigger value="admin">Admins ({users.filter((u) => u.role === "admin").length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <Card className="border-border/50">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-semibold">User</TableHead>
                      <TableHead className="font-semibold">Role</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold hidden md:table-cell">Joined</TableHead>
                      <TableHead className="font-semibold hidden lg:table-cell">Last Active</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              user.role === "admin"
                                ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                : user.role === "teacher"
                                ? "bg-primary/10 text-primary hover:bg-primary/10"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              user.status === "active"
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                : "bg-destructive/10 text-destructive hover:bg-destructive/10"
                            }
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm hidden md:table-cell">
                          {user.joinedDate}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm hidden lg:table-cell">
                          {user.lastActive}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2">
                                <Mail className="h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Shield className="h-4 w-4" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-destructive">
                                <Ban className="h-4 w-4" />
                                Suspend User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
}
