import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";
import {
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle,
  Sparkles,
  Clock,
  BookOpen,
  Flag,
} from "lucide-react";

const pendingCourses = [
  {
    id: "1",
    title: "Advanced Machine Learning with Python",
    instructor: "Dr. Emily White",
    instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
    submittedDate: "2 hours ago",
    category: "Data Science",
    lessons: 28,
    aiQualityScore: 92,
    status: "pending",
  },
  {
    id: "2",
    title: "Digital Marketing Masterclass",
    instructor: "Mark Davis",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=225&fit=crop",
    submittedDate: "5 hours ago",
    category: "Marketing",
    lessons: 18,
    aiQualityScore: 78,
    status: "pending",
  },
  {
    id: "3",
    title: "Blockchain & Cryptocurrency Fundamentals",
    instructor: "Alex Johnson",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
    submittedDate: "1 day ago",
    category: "Finance",
    lessons: 22,
    aiQualityScore: 65,
    status: "flagged",
    flagReason: "Potential copyright issues detected",
  },
];

const flaggedContent = [
  {
    id: "1",
    type: "Review",
    content: "This course is terrible and the instructor is a fraud...",
    reporter: "Anonymous",
    reportedDate: "3 hours ago",
    reason: "Inappropriate language",
  },
  {
    id: "2",
    type: "Comment",
    content: "Check out my website for free courses...",
    reporter: "System",
    reportedDate: "1 day ago",
    reason: "Spam detected",
  },
];

export default function Moderation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("courses");

  const getQualityColor = (score: number) => {
    if (score >= 80) return "text-lms-emerald";
    if (score >= 60) return "text-lms-amber";
    return "text-destructive";
  };

  return (
    <UnifiedDashboard title="Content Moderation" subtitle="Review and approve courses and content">
      <div className="p-6 space-y-6">

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-amber/10">
              <Clock className="h-5 w-5 text-lms-amber" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="text-2xl font-bold">{pendingCourses.filter((c) => c.status === "pending").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <Flag className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Flagged Items</p>
              <p className="text-2xl font-bold">{flaggedContent.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-emerald/10">
              <CheckCircle2 className="h-5 w-5 text-lms-emerald" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Approved Today</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-blue/10">
              <Sparkles className="h-5 w-5 text-lms-blue" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">AI Scans Today</p>
              <p className="text-2xl font-bold">45</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="courses">Course Submissions</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Content</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-6 space-y-4">
          {pendingCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="relative lg:w-64 h-40 lg:h-auto">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {course.status === "flagged" && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-destructive text-destructive-foreground gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Flagged
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={course.instructorAvatar} />
                            <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{course.instructor}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{course.submittedDate}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{course.lessons} lessons</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Quality Score */}
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-lms-blue" />
                          <span className="text-sm font-medium">AI Quality Score</span>
                        </div>
                        <span className={`font-bold ${getQualityColor(course.aiQualityScore)}`}>
                          {course.aiQualityScore}/100
                        </span>
                      </div>
                      <Progress value={course.aiQualityScore} className="h-2" />
                      {course.flagReason && (
                        <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {course.flagReason}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                      <Button className="gap-2 bg-lms-emerald hover:bg-lms-emerald/90">
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button variant="destructive" className="gap-2">
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="flagged" className="mt-6 space-y-4">
          {flaggedContent.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.type}</Badge>
                      <Badge className="bg-destructive/10 text-destructive">{item.reason}</Badge>
                    </div>
                    <p className="text-foreground">"{item.content}"</p>
                    <p className="text-sm text-muted-foreground">
                      Reported by {item.reporter} • {item.reportedDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Dismiss</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
      </div>
    </UnifiedDashboard>
  );
}
