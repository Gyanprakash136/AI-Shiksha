import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Play,
  CheckCircle,
  Globe,
  Award,
  ShoppingCart,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import MarketingLayout from "@/components/marketing/MarketingLayout";
import { cn } from "@/lib/utils";

const courseData = {
  id: "1",
  title: "Complete React Development Masterclass",
  subtitle: "Master React from beginner to advanced with real-world projects",
  description:
    "This comprehensive course will take you from React beginner to confident developer. You'll learn everything from the basics of components and state to advanced topics like hooks, context, and performance optimization. By the end, you'll be able to build complex, production-ready applications.",
  thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
  instructor: {
    name: "John Teacher",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    title: "Senior Software Engineer",
    students: 45000,
    courses: 12,
    rating: 4.9,
  },
  price: 79,
  salePrice: 49,
  rating: 4.8,
  reviews: 2564,
  students: 34842,
  duration: "24 hours",
  lessons: 48,
  level: "All Levels",
  language: "English",
  lastUpdated: "January 2024",
  category: "Development",
  tags: ["React", "JavaScript", "Web Development", "Frontend"],
  features: [
    "48 lessons of high-quality video content",
    "Downloadable resources and source code",
    "Lifetime access to course materials",
    "Certificate of completion",
    "AI-powered learning assistant",
    "Real-world projects to build",
  ],
  whatYouWillLearn: [
    "Build powerful React applications from scratch",
    "Master React Hooks and state management",
    "Understand component lifecycle and optimization",
    "Create custom hooks for reusable logic",
    "Implement routing and navigation",
    "Connect to APIs and handle data fetching",
    "Write tests for React components",
    "Deploy applications to production",
  ],
};

const curriculum = [
  {
    title: "Getting Started with React",
    duration: "1h 30m",
    lessons: [
      { title: "Course Introduction", duration: "8:30", preview: true },
      { title: "Setting Up Your Environment", duration: "15:00", preview: true },
      { title: "Your First React Component", duration: "12:45", preview: false },
      { title: "Understanding JSX", duration: "18:20", preview: false },
    ],
  },
  {
    title: "React Fundamentals",
    duration: "2h 15m",
    lessons: [
      { title: "Props and State", duration: "22:10", preview: false },
      { title: "Event Handling", duration: "18:00", preview: false },
      { title: "Conditional Rendering", duration: "15:30", preview: false },
      { title: "Lists and Keys", duration: "20:00", preview: false },
      { title: "Practice Exercise", duration: "30:00", preview: false },
    ],
  },
  {
    title: "React Hooks Deep Dive",
    duration: "3h 00m",
    lessons: [
      { title: "useState Hook", duration: "24:30", preview: false },
      { title: "useEffect Hook", duration: "28:00", preview: false },
      { title: "useContext Hook", duration: "22:00", preview: false },
      { title: "Custom Hooks", duration: "25:00", preview: false },
      { title: "Hooks Best Practices", duration: "20:00", preview: false },
    ],
  },
];

const reviews = [
  {
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "This is hands down the best React course I've taken. The instructor explains concepts clearly and the projects are practical and relevant.",
  },
  {
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    rating: 5,
    date: "1 month ago",
    comment:
      "Excellent course! I went from knowing nothing about React to building my own projects. The AI tutor feature is incredibly helpful.",
  },
  {
    name: "Emily Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    rating: 4,
    date: "1 month ago",
    comment:
      "Great content and well-structured. I would have liked more advanced topics, but overall very satisfied with my purchase.",
  },
];

export default function CoursePreview() {
  const { id } = useParams();
  const [expandedChapters, setExpandedChapters] = useState<number[]>([0]);

  const toggleChapter = (index: number) => {
    setExpandedChapters((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-muted/30">
        {/* Hero Section */}
        <div className="bg-lms-navy text-white">
          <div className="container py-8">
            <Link
              to="/dashboard/catalog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Catalog
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Course Info */}
              <div className="lg:col-span-2">
                <Badge className="bg-lms-purple mb-4">{courseData.category}</Badge>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">{courseData.title}</h1>
                <p className="text-lg text-white/80 mb-6">{courseData.subtitle}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-lms-amber fill-lms-amber" />
                    <span className="font-medium">{courseData.rating}</span>
                    <span className="text-white/60">({courseData.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{courseData.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{courseData.lessons} lessons</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={courseData.instructor.avatar} />
                    <AvatarFallback>JT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{courseData.instructor.name}</p>
                    <p className="text-sm text-white/60">{courseData.instructor.title}</p>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img src={courseData.thumbnail} alt={courseData.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold">${courseData.salePrice}</span>
                      <span className="text-xl text-muted-foreground line-through">${courseData.price}</span>
                      <Badge className="bg-lms-rose">38% OFF</Badge>
                    </div>

                    <div className="space-y-3 mb-6">
                      <Link to={`/course/${id}/learn`}>
                        <Button className="w-full gap-2 bg-lms-blue hover:bg-lms-blue/90" size="lg">
                          <ShoppingCart className="h-5 w-5" />
                          Add to Cart
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full gap-2" size="lg">
                        <Heart className="h-5 w-5" />
                        Add to Wishlist
                      </Button>
                    </div>

                    <div className="space-y-3 text-sm">
                      {courseData.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-lms-emerald shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mt-6 pt-4 border-t">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Award className="h-4 w-4" />
                        Gift
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="container py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  {/* What You'll Learn */}
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {courseData.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-lms-emerald shrink-0 mt-0.5" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Feature Highlight */}
                  <Card className="border-lms-purple/20 bg-lms-purple-light/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-lms-purple flex items-center justify-center shrink-0">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">AI-Powered Learning</h3>
                          <p className="text-muted-foreground">
                            This course includes an AI Tutor that can answer your questions, explain concepts, and quiz
                            you on what you've learned. Get personalized help exactly when you need it.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Description</h2>
                    <p className="text-muted-foreground leading-relaxed">{courseData.description}</p>
                  </div>

                  {/* Course Details */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Language</p>
                        <p className="font-medium">{courseData.language}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Level</p>
                        <p className="font-medium">{courseData.level}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-muted-foreground">
                      {curriculum.length} sections • {courseData.lessons} lessons • {courseData.duration} total
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => setExpandedChapters(curriculum.map((_, i) => i))}>
                      Expand All
                    </Button>
                  </div>

                  {curriculum.map((chapter, index) => (
                    <Card key={index}>
                      <button
                        onClick={() => toggleChapter(index)}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {expandedChapters.includes(index) ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                          <span className="font-medium">{chapter.title}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{chapter.lessons.length} lessons</span>
                          <span>{chapter.duration}</span>
                        </div>
                      </button>
                      {expandedChapters.includes(index) && (
                        <div className="border-t">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center justify-between px-4 py-3 hover:bg-muted/30"
                            >
                              <div className="flex items-center gap-3">
                                <Play className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{lesson.title}</span>
                                {lesson.preview && (
                                  <Badge variant="outline" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="instructor">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-6">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={courseData.instructor.avatar} />
                          <AvatarFallback>JT</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-xl font-bold">{courseData.instructor.name}</h2>
                          <p className="text-muted-foreground mb-3">{courseData.instructor.title}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-lms-amber" />
                              <span>{courseData.instructor.rating} Rating</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{courseData.instructor.students.toLocaleString()} Students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{courseData.instructor.courses} Courses</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        John is a senior software engineer with over 10 years of experience in web development. He has
                        worked at top tech companies and is passionate about teaching and helping others learn to code.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  {/* Rating Summary */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-5xl font-bold">{courseData.rating}</p>
                          <div className="flex items-center gap-1 my-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-5 w-5",
                                  i < Math.floor(courseData.rating)
                                    ? "text-lms-amber fill-lms-amber"
                                    : "text-muted"
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">Course Rating</p>
                        </div>
                        <div className="flex-1 space-y-2">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center gap-3">
                              <span className="text-sm w-12">{stars} stars</span>
                              <Progress value={stars === 5 ? 75 : stars === 4 ? 20 : 5} className="flex-1 h-2" />
                              <span className="text-sm w-12 text-right">
                                {stars === 5 ? "75%" : stars === 4 ? "20%" : "5%"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Individual Reviews */}
                  {reviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium">{review.name}</p>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-4 w-4",
                                    i < review.rating ? "text-lms-amber fill-lms-amber" : "text-muted"
                                  )}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
