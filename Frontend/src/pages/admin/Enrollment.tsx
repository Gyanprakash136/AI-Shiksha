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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Search,
  UserPlus,
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  Filter,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const enrollments = [
  { id: 1, student: "John Smith", email: "john@example.com", course: "Web Development Bootcamp", enrolledAt: "2024-01-20", progress: 45, status: "active" },
  { id: 2, student: "Sarah Johnson", email: "sarah@example.com", course: "React Mastery", enrolledAt: "2024-01-18", progress: 78, status: "active" },
  { id: 3, student: "Mike Chen", email: "mike@example.com", course: "UI/UX Design", enrolledAt: "2024-01-15", progress: 100, status: "completed" },
  { id: 4, student: "Emily White", email: "emily@example.com", course: "Python Basics", enrolledAt: "2024-01-12", progress: 0, status: "pending" },
  { id: 5, student: "Alex Brown", email: "alex@example.com", course: "Machine Learning", enrolledAt: "2024-01-10", progress: 62, status: "active" },
];

const courses = [
  "Web Development Bootcamp",
  "React Mastery",
  "UI/UX Design",
  "Python Basics",
  "Machine Learning",
  "Data Science",
];

export default function EnrollmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [newEnrollment, setNewEnrollment] = useState({ email: "", course: "" });
  const { toast } = useToast();

  const handleEnroll = () => {
    if (!newEnrollment.email || !newEnrollment.course) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Student Enrolled",
      description: `Successfully enrolled student in ${newEnrollment.course}.`,
    });
    setNewEnrollment({ email: "", course: "" });
    setIsEnrollOpen(false);
  };

  const filteredEnrollments = enrollments.filter(
    (e) =>
      e.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminDashboardLayout title="Enrollment Management" subtitle="Manage student course enrollments">
      <div className="space-y-4 md:space-y-6">
        {/* Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Enrollments</p>
                  <p className="text-xl md:text-2xl font-bold">12,847</p>
                </div>
                <Users className="h-6 w-6 md:h-8 md:w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Active</p>
                  <p className="text-xl md:text-2xl font-bold">8,542</p>
                </div>
                <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">This Month</p>
                  <p className="text-xl md:text-2xl font-bold">1,245</p>
                </div>
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-chart-3/50" />
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

        {/* Enrollment Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-base md:text-lg">All Enrollments</CardTitle>
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
                  <Dialog open={isEnrollOpen} onOpenChange={setIsEnrollOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-primary hover:bg-primary/90 flex-1 sm:flex-none">
                        <UserPlus className="h-4 w-4" />
                        <span className="hidden sm:inline">Enroll Student</span>
                        <span className="sm:hidden">Enroll</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Enroll Student in Course</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Student Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="student@example.com"
                            value={newEnrollment.email}
                            onChange={(e) => setNewEnrollment({ ...newEnrollment, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="course">Select Course *</Label>
                          <Select
                            value={newEnrollment.course}
                            onValueChange={(value) => setNewEnrollment({ ...newEnrollment, course: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses.map((course) => (
                                <SelectItem key={course} value={course}>
                                  {course}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsEnrollOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="flex-1 bg-primary hover:bg-primary/90"
                            onClick={handleEnroll}
                          >
                            Enroll Student
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
                    <TableHead className="text-xs md:text-sm">Student</TableHead>
                    <TableHead className="text-xs md:text-sm hidden md:table-cell">Course</TableHead>
                    <TableHead className="text-xs md:text-sm">Progress</TableHead>
                    <TableHead className="text-xs md:text-sm">Status</TableHead>
                    <TableHead className="text-xs md:text-sm hidden lg:table-cell">Enrolled</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="p-2 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Avatar className="h-7 w-7 md:h-8 md:w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {enrollment.student.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-xs md:text-sm truncate">{enrollment.student}</p>
                            <p className="text-[10px] md:text-xs text-muted-foreground truncate md:hidden">
                              {enrollment.course}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs md:text-sm hidden md:table-cell">{enrollment.course}</TableCell>
                      <TableCell className="p-2 md:p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 md:w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${enrollment.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] md:text-xs">{enrollment.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="p-2 md:p-4">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] md:text-xs ${
                            enrollment.status === "completed"
                              ? "bg-accent/10 text-accent"
                              : enrollment.status === "active"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {enrollment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden lg:table-cell">
                        {enrollment.enrolledAt}
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