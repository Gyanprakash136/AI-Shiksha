import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Play,
  Users,
  Star,
  Clock,
  BookOpen,
  DollarSign,
  Sparkles,
  Edit,
  MoreHorizontal,
  GripVertical,
  Video,
  FileText,
  Trash2,
  Plus,
  Settings,
  BarChart3,
  MessageSquare,
  Tag,
} from "lucide-react";

const courseData = {
  id: "1",
  title: "Complete React Development Masterclass",
  description: "Master React from beginner to advanced. Learn hooks, state management, testing, and build real-world projects.",
  thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
  status: "published",
  students: 3842,
  rating: 4.8,
  reviews: 256,
  price: 79,
  salePrice: 49,
  duration: "24 hours",
  lessons: 48,
  lastUpdated: "Jan 15, 2024",
  revenue: 42500,
};

const chapters = [
  {
    id: 1,
    title: "Getting Started with React",
    lessons: [
      { id: 1, title: "Course Introduction", type: "video", duration: "8:30", status: "published" },
      { id: 2, title: "Setting Up Your Environment", type: "video", duration: "15:00", status: "published" },
      { id: 3, title: "Your First React Component", type: "video", duration: "12:45", status: "published" },
    ],
  },
  {
    id: 2,
    title: "React Fundamentals",
    lessons: [
      { id: 4, title: "Understanding JSX", type: "video", duration: "18:20", status: "published" },
      { id: 5, title: "Props and State", type: "video", duration: "22:10", status: "published" },
      { id: 6, title: "Practice Exercise", type: "quiz", duration: "30:00", status: "published" },
    ],
  },
  {
    id: 3,
    title: "React Hooks Deep Dive",
    lessons: [
      { id: 7, title: "useState Hook", type: "video", duration: "16:40", status: "published" },
      { id: 8, title: "useEffect Hook", type: "video", duration: "24:30", status: "published" },
      { id: 9, title: "Custom Hooks", type: "video", duration: "20:15", status: "draft" },
    ],
  },
];

const recentStudents = [
  { name: "Alice Johnson", enrolled: "2 hours ago", progress: 15, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
  { name: "Bob Smith", enrolled: "5 hours ago", progress: 8, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" },
  { name: "Carol White", enrolled: "1 day ago", progress: 32, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol" },
];

const recentReviews = [
  { name: "David Chen", rating: 5, comment: "Excellent course! Very comprehensive.", date: "2 days ago" },
  { name: "Emma Wilson", rating: 4, comment: "Great content, could use more examples.", date: "1 week ago" },
];

export default function CourseDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("curriculum");

  return (
    <UnifiedDashboard title="Course Details">
      <div className="page-container">
        {/* Back Link */}
        <Link to="/dashboard/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>

        {/* Course Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Thumbnail */}
              <div className="w-full lg:w-80 h-48 rounded-lg bg-muted overflow-hidden shrink-0">
                <img src={courseData.thumbnail} alt={courseData.title} className="w-full h-full object-cover" />
              </div>
              
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <Badge className="bg-lms-emerald mb-2">{courseData.status}</Badge>
                    <h1 className="text-2xl font-bold">{courseData.title}</h1>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/dashboard/courses/${id}/edit`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{courseData.description}</p>
                
                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-lms-blue" />
                    <span className="font-medium">{courseData.students.toLocaleString()}</span>
                    <span className="text-muted-foreground">students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-lms-amber" />
                    <span className="font-medium">{courseData.rating}</span>
                    <span className="text-muted-foreground">({courseData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{courseData.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-lms-emerald" />
                    <span className="font-medium">${courseData.salePrice}</span>
                    <span className="text-muted-foreground line-through">${courseData.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="curriculum" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Curriculum
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="promotions" className="gap-2">
              <Tag className="h-4 w-4" />
              Promotions
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{chapters.length} chapters, {courseData.lessons} lessons</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4 text-lms-purple" />
                  AI Suggestions
                </Button>
                <Button className="gap-2 bg-lms-blue hover:bg-lms-blue/90">
                  <Plus className="h-4 w-4" />
                  Add Chapter
                </Button>
              </div>
            </div>

            {chapters.map((chapter) => (
              <Card key={chapter.id}>
                <div className="flex items-center gap-3 p-4 bg-muted/50 border-b">
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                  <span className="font-semibold flex-1">Chapter {chapter.id}: {chapter.title}</span>
                  <Badge variant="secondary">{chapter.lessons.length} lessons</Badge>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4 space-y-2">
                  {chapter.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      to={`/dashboard/courses/${id}/lessons/${lesson.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      {lesson.type === "video" ? (
                        <Video className="h-4 w-4 text-lms-blue" />
                      ) : (
                        <FileText className="h-4 w-4 text-lms-purple" />
                      )}
                      <span className="flex-1 text-sm">{lesson.title}</span>
                      <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      <Badge variant={lesson.status === "published" ? "default" : "secondary"}>
                        {lesson.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </Link>
                  ))}
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <Plus className="h-4 w-4" />
                    Add Lesson
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <div className="flex items-center justify-between">
              <Input placeholder="Search students..." className="w-64" />
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Message All
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentStudents.map((student, index) => (
                    <div key={index} className="flex items-center gap-4 p-4">
                      <img src={student.avatar} alt={student.name} className="h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">Enrolled {student.enrolled}</p>
                      </div>
                      <div className="flex items-center gap-3 w-48">
                        <Progress value={student.progress} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{student.progress}%</span>
                      </div>
                      <Button variant="ghost" size="sm">View Profile</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Course Reviews</span>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-lms-amber fill-lms-amber" />
                    <span className="text-2xl font-bold">{courseData.rating}</span>
                    <span className="text-muted-foreground">({courseData.reviews} reviews)</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReviews.map((review, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.name}</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "text-lms-amber fill-lms-amber" : "text-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="h-5 w-5 text-lms-emerald" />
                    <span className="text-xs text-lms-emerald">+15%</span>
                  </div>
                  <p className="text-2xl font-bold">${courseData.revenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="h-5 w-5 text-lms-blue" />
                    <span className="text-xs text-lms-emerald">+8%</span>
                  </div>
                  <p className="text-2xl font-bold">{courseData.students.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="h-5 w-5 text-lms-purple" />
                    <span className="text-xs text-lms-emerald">+3%</span>
                  </div>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Promotions Tab */}
          <TabsContent value="promotions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Promotions</CardTitle>
                  <Button className="gap-2 bg-lms-blue hover:bg-lms-blue/90">
                    <Plus className="h-4 w-4" />
                    Create Coupon
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-8 text-center text-muted-foreground">
                  <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No active promotions</p>
                  <p className="text-sm">Create a coupon to attract more students</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Course Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Course Visibility</p>
                    <p className="text-sm text-muted-foreground">Control who can see this course</p>
                  </div>
                  <Badge className="bg-lms-emerald">Public</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Enrollment Status</p>
                    <p className="text-sm text-muted-foreground">Allow new students to enroll</p>
                  </div>
                  <Badge className="bg-lms-emerald">Open</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-lms-rose/10 border border-lms-rose/20">
                  <div>
                    <p className="font-medium text-lms-rose">Danger Zone</p>
                    <p className="text-sm text-muted-foreground">Permanently delete this course</p>
                  </div>
                  <Button variant="destructive" size="sm">Delete Course</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UnifiedDashboard>
  );
}
