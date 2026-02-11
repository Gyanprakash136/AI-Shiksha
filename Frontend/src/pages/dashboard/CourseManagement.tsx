import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";
import { useAuth } from "@/contexts/AuthContext";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Users,
  Star,
  DollarSign,
  BookOpen,
  Play,
} from "lucide-react";

const courses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=225&fit=crop",
    status: "published",
    students: 1245,
    rating: 4.8,
    reviews: 342,
    revenue: 24500,
    lessons: 45,
    completionRate: 68,
    lastUpdated: "2 days ago",
    instructor: "John Doe",
  },
  {
    id: "2",
    title: "Advanced React & TypeScript",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    status: "published",
    students: 892,
    rating: 4.9,
    reviews: 215,
    revenue: 18900,
    lessons: 32,
    completionRate: 72,
    lastUpdated: "1 week ago",
    instructor: "Jane Smith",
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
    status: "draft",
    students: 0,
    rating: 0,
    reviews: 0,
    revenue: 0,
    lessons: 18,
    completionRate: 0,
    lastUpdated: "3 hours ago",
    instructor: "Emily White",
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
    status: "review",
    students: 0,
    rating: 0,
    reviews: 0,
    revenue: 0,
    lessons: 28,
    completionRate: 0,
    lastUpdated: "1 day ago",
    instructor: "Mike Chen",
  },
];

export default function CourseManagement() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && course.status === activeTab;
  });

  const stats = [
    { label: "Total Courses", value: courses.length, icon: BookOpen, color: "text-primary" },
    { label: "Total Students", value: courses.reduce((sum, c) => sum + c.students, 0).toLocaleString(), icon: Users, color: "text-emerald-600" },
    { label: "Avg. Rating", value: "4.85", icon: Star, color: "text-amber-500" },
    { label: "Total Revenue", value: `$${courses.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}`, icon: DollarSign, color: "text-primary" },
  ];

  const content = (
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
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
        <Link to="/dashboard/courses/new">
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="all">All ({courses.length})</TabsTrigger>
          <TabsTrigger value="published">Published ({courses.filter((c) => c.status === "published").length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({courses.filter((c) => c.status === "draft").length})</TabsTrigger>
          <TabsTrigger value="review">In Review ({courses.filter((c) => c.status === "review").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    <div className="relative w-full md:w-56 h-40 md:h-auto flex-shrink-0">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="secondary" className="gap-1">
                          <Play className="h-3 w-3" />
                          Preview
                        </Button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className={
                                course.status === "published"
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                  : course.status === "review"
                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                    : "bg-muted text-muted-foreground"
                              }
                            >
                              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Updated {course.lastUpdated}
                            </span>
                          </div>
                          <h3 className="font-semibold text-foreground">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/dashboard/courses/${course.id}`} className="flex items-center gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Course
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive focus:bg-destructive focus:text-destructive-foreground">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2 border-t border-border/50">
                        <div>
                          <p className="text-xs text-muted-foreground">Students</p>
                          <p className="font-medium text-sm flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            {course.students.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Rating</p>
                          <p className="font-medium text-sm flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-500" />
                            {course.rating || "N/A"}
                            <span className="text-muted-foreground">({course.reviews})</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Revenue</p>
                          <p className="font-medium text-sm text-emerald-600">
                            ${course.revenue.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Lessons</p>
                          <p className="font-medium text-sm">{course.lessons}</p>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <p className="text-xs text-muted-foreground mb-1">Completion</p>
                          <div className="flex items-center gap-2">
                            <Progress value={course.completionRate} className="h-1.5 flex-1" />
                            <span className="text-xs font-medium">{course.completionRate}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredCourses.length === 0 && (
              <Card className="border-border/50">
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No courses found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchQuery ? "Try adjusting your search query" : "Get started by creating your first course"}
                  </p>
                  <Link to="/dashboard/courses/new">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Course
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  if (user?.role === "admin") {
    return (
      <AdminDashboardLayout title="Course Management" subtitle="Create and manage your courses">
        {content}
      </AdminDashboardLayout>
    );
  }

  return (
    <UnifiedDashboard title="My Courses" subtitle="Manage your courses and content">
      {content}
    </UnifiedDashboard>
  );
}
