import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  BookOpen,
  Star,
  Users,
  PlayCircle,
} from "lucide-react";

const pendingCourses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    instructor: "Dr. Emily Chen",
    category: "Web Development",
    lessons: 24,
    duration: "8 hours",
    submittedAt: "2024-01-20",
    aiScore: 92,
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    instructor: "Prof. Robert Smith",
    category: "Data Science",
    lessons: 32,
    duration: "12 hours",
    submittedAt: "2024-01-19",
    aiScore: 88,
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Sarah Williams",
    category: "Design",
    lessons: 18,
    duration: "6 hours",
    submittedAt: "2024-01-18",
    aiScore: 76,
  },
];

const flaggedContent = [
  { id: 1, course: "Python Basics", issue: "Outdated content", lesson: "Lesson 5", severity: "medium" },
  { id: 2, course: "Digital Marketing", issue: "Potential plagiarism", lesson: "Lesson 12", severity: "high" },
  { id: 3, course: "Leadership Skills", issue: "Missing resources", lesson: "Lesson 3", severity: "low" },
];

export default function CourseApprovalPage() {
  return (
    <AdminDashboardLayout title="Course Approval" subtitle="Review and approve pending courses">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Clock className="h-8 w-8 text-chart-3/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved Today</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <CheckCircle className="h-8 w-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <XCircle className="h-8 w-8 text-destructive/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Flagged Content</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-chart-4/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Courses</TabsTrigger>
            <TabsTrigger value="flagged">Flagged Content</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingCourses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Course Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="h-20 w-32 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <PlayCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                            <Badge variant="secondary">{course.category}</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                {course.instructor.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{course.instructor}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" /> {course.lessons} lessons
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" /> {course.duration}
                            </span>
                            <span>Submitted: {course.submittedAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Score */}
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${course.aiScore >= 85 ? "text-accent" : course.aiScore >= 70 ? "text-chart-3" : "text-destructive"}`}>
                          {course.aiScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">AI Quality Score</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" /> Preview
                        </Button>
                        <Button size="sm" className="gap-1 bg-accent hover:bg-accent/90">
                          <CheckCircle className="h-4 w-4" /> Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="gap-1">
                          <XCircle className="h-4 w-4" /> Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="flagged" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {flaggedContent.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <AlertTriangle className={`h-5 w-5 ${item.severity === "high" ? "text-destructive" : item.severity === "medium" ? "text-chart-3" : "text-muted-foreground"}`} />
                        <div>
                          <p className="font-medium">{item.course}</p>
                          <p className="text-sm text-muted-foreground">{item.lesson} - {item.issue}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.severity === "high" ? "destructive" : item.severity === "medium" ? "default" : "secondary"}>
                          {item.severity}
                        </Badge>
                        <Button variant="outline" size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
}
