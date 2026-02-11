import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Sparkles,
  Flag,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const pendingCourses = [
  { id: 1, title: "Advanced Machine Learning with Python", teacher: "Dr. Sarah Chen", category: "Data Science", submitted: "2 hours ago", lessons: 24, aiScore: 92 },
  { id: 2, title: "Complete UI/UX Design Bootcamp", teacher: "Alex Thompson", category: "Design", submitted: "5 hours ago", lessons: 18, aiScore: 88 },
  { id: 3, title: "Blockchain Fundamentals", teacher: "Michael Brown", category: "Technology", submitted: "1 day ago", lessons: 12, aiScore: 75 },
];

const flaggedContent = [
  { id: 1, type: "Course", title: "Quick Money Trading", reason: "Misleading claims", reports: 12, severity: "high" },
  { id: 2, type: "Lesson", title: "Chapter 5: Advanced Techniques", reason: "Copyright violation", reports: 3, severity: "medium" },
  { id: 3, type: "Review", title: "Spam review on React Course", reason: "Promotional content", reports: 8, severity: "low" },
];

const aiInsights = [
  { label: "Content Quality Score", value: "87%", trend: "+2%" },
  { label: "Avg. Course Completion", value: "68%", trend: "+5%" },
  { label: "Student Satisfaction", value: "4.6/5", trend: "+0.2" },
  { label: "Flagged Content Rate", value: "0.3%", trend: "-0.1%" },
];

export default function CourseModeration() {
  return (
    <AdminDashboardLayout title="Course Moderation" subtitle="Review and moderate platform content">
      <div className="space-y-4 md:space-y-6">
        {/* AI Insights */}
        <div className="grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-4">
          {aiInsights.map((insight) => (
            <Card key={insight.label} className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] md:text-sm text-muted-foreground">{insight.label}</p>
                  <span className="text-[10px] md:text-xs text-accent">{insight.trend}</span>
                </div>
                <p className="text-lg md:text-2xl font-bold mt-1">{insight.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <TabsList>
              <TabsTrigger value="pending" className="gap-1 text-xs md:text-sm">
                <Clock className="h-3 w-3 md:h-4 md:w-4" /> Pending
                <Badge variant="secondary" className="ml-1 text-[10px]">3</Badge>
              </TabsTrigger>
              <TabsTrigger value="flagged" className="gap-1 text-xs md:text-sm">
                <Flag className="h-3 w-3 md:h-4 md:w-4" /> Flagged
                <Badge variant="destructive" className="ml-1 text-[10px]">3</Badge>
              </TabsTrigger>
              <TabsTrigger value="approved" className="text-xs md:text-sm">
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" /> Approved
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search content..." className="pl-10 text-sm" />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="pending" className="space-y-3">
            {pendingCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-3 md:gap-4 flex-1">
                      <div className="h-12 w-16 md:h-16 md:w-24 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xl md:text-2xl">📚</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-xs md:text-sm">{course.title}</h3>
                        <p className="text-[10px] md:text-sm text-muted-foreground">
                          by {course.teacher} • {course.category} • {course.lessons} lessons
                        </p>
                        <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">Submitted {course.submitted}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="text-center px-3 py-1.5 rounded-lg bg-muted">
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-accent" />
                          <span className="font-bold text-xs md:text-sm">{course.aiScore}%</span>
                        </div>
                        <p className="text-[8px] md:text-xs text-muted-foreground">AI Score</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button variant="outline" size="sm" className="gap-1 text-xs h-7 md:h-8">
                          <Eye className="h-3 w-3" /> Preview
                        </Button>
                        <Button size="sm" className="gap-1 bg-accent hover:bg-accent/90 text-xs h-7 md:h-8">
                          <ThumbsUp className="h-3 w-3" /> Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="gap-1 text-xs h-7 md:h-8">
                          <ThumbsDown className="h-3 w-3" /> Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="flagged" className="space-y-3">
            {flaggedContent.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 md:p-3 rounded-lg ${
                        item.severity === "high" ? "bg-destructive/10" :
                        item.severity === "medium" ? "bg-chart-3/10" : "bg-muted"
                      }`}>
                        <AlertTriangle className={`h-4 w-4 md:h-5 md:w-5 ${
                          item.severity === "high" ? "text-destructive" :
                          item.severity === "medium" ? "text-chart-3" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">{item.type}</Badge>
                          <h3 className="font-semibold text-xs md:text-sm">{item.title}</h3>
                        </div>
                        <p className="text-[10px] md:text-sm text-muted-foreground mt-0.5">
                          Reason: {item.reason} • {item.reports} reports
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={item.severity === "high" ? "destructive" : item.severity === "medium" ? "secondary" : "outline"} className="text-[10px]">
                        {item.severity}
                      </Badge>
                      <Button variant="outline" size="sm" className="text-xs h-7">Review</Button>
                      <Button size="sm" variant="destructive" className="text-xs h-7">Remove</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="approved">
            <div className="text-center py-8 md:py-12 text-muted-foreground">
              <CheckCircle className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-4 text-accent" />
              <p className="text-sm">Recently approved courses will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
}
