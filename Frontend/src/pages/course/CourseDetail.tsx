import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Play,
  Clock,
  Users,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Award,
  BookOpen,
  FileText,
  Globe,
  Smartphone,
  LifeBuoy,
  ArrowLeft,
  GraduationCap,
  Share2,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const course = {
    id,
    title: "Machine Learning Specialization",
    subtitle: "Build ML models with Python and TensorFlow. Master supervised learning, neural networks, and more.",
    description: `Master the fundamentals of machine learning and build a portfolio of projects demonstrating your expertise.

This comprehensive specialization covers everything from basic concepts to advanced techniques, including supervised learning, neural networks, unsupervised learning, and reinforcement learning.

By the end of this program, you'll be able to build and train machine learning models using Python and popular frameworks like TensorFlow and scikit-learn.`,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
    provider: "Stanford University",
    instructor: {
      name: "Andrew Ng",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      title: "Founder, DeepLearning.AI",
      students: 4500000,
      courses: 8,
      rating: 4.9,
    },
    price: 49,
    rating: 4.9,
    reviews: 182453,
    students: 4891234,
    duration: "3 months",
    hoursPerWeek: "10 hours/week",
    lessons: 156,
    level: "Beginner",
    language: "English",
    lastUpdated: "January 2024",
    includes: [
      { icon: Play, text: "100+ hours on-demand video" },
      { icon: FileText, text: "50 articles & readings" },
      { icon: BookOpen, text: "200+ coding exercises" },
      { icon: Award, text: "Shareable Certificate" },
      { icon: Smartphone, text: "Access on mobile and desktop" },
      { icon: LifeBuoy, text: "Flexible deadlines" },
    ],
    skills: [
      "Machine Learning",
      "Python",
      "TensorFlow",
      "Neural Networks",
      "Deep Learning",
      "Data Science",
    ],
    learnings: [
      "Build machine learning models in Python using popular libraries",
      "Build & train supervised models for prediction & classification",
      "Build & train a neural network with TensorFlow for multi-class classification",
      "Apply best practices for machine learning development",
      "Build recommender systems with collaborative filtering approach",
    ],
  };

  const curriculum = [
    {
      title: "Course 1: Supervised Machine Learning",
      duration: "4 weeks",
      lessons: [
        { title: "Introduction to Machine Learning", duration: "23 min", type: "video" },
        { title: "Linear Regression with One Variable", duration: "42 min", type: "video" },
        { title: "Cost Function and Gradient Descent", duration: "35 min", type: "video" },
        { title: "Practice Quiz: Supervised Learning", duration: "20 min", type: "quiz" },
        { title: "Programming Assignment: Linear Regression", duration: "2 hours", type: "assignment" },
      ],
    },
    {
      title: "Course 2: Advanced Learning Algorithms",
      duration: "4 weeks",
      lessons: [
        { title: "Neural Network Basics", duration: "45 min", type: "video" },
        { title: "TensorFlow Implementation", duration: "38 min", type: "video" },
        { title: "Training Neural Networks", duration: "42 min", type: "video" },
        { title: "Practice: Build Your First Neural Network", duration: "3 hours", type: "assignment" },
      ],
    },
    {
      title: "Course 3: Unsupervised Learning",
      duration: "3 weeks",
      lessons: [
        { title: "Clustering Algorithms", duration: "35 min", type: "video" },
        { title: "K-Means Clustering", duration: "28 min", type: "video" },
        { title: "Anomaly Detection", duration: "32 min", type: "video" },
        { title: "Recommender Systems", duration: "45 min", type: "video" },
      ],
    },
  ];

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-nav">
        <div className="container-coursera h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/courses" className="text-muted-foreground hover:text-foreground">Courses</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">{course.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-coursera-navy text-white py-8 lg:py-12">
        <div className="container-coursera">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  {course.level}
                </Badge>
                <span className="text-white/70">•</span>
                <span className="text-white/70">{course.duration}</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{course.title}</h1>
              <p className="text-lg text-white/80 max-w-2xl">{course.subtitle}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-coursera-orange text-coursera-orange" />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-white/70">({(course.reviews / 1000).toFixed(0)}K reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-white/70">
                  <Users className="h-4 w-4" />
                  {(course.students / 1000000).toFixed(1)}M students
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white/20">
                  <AvatarImage src={course.instructor.avatar} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-sm text-white/70">{course.provider}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 pt-2">
                <span className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {course.language}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.hoursPerWeek}
                </span>
                <span>Updated {course.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-coursera py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Skills */}
            <div className="bg-card border p-6">
              <h2 className="text-lg font-semibold mb-4">Skills you'll gain</h2>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* What you'll learn */}
            <div className="bg-card border p-6">
              <h2 className="text-lg font-semibold mb-4">What you'll learn</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.learnings.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-coursera-green shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-card border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Specialization - 3 course series</h2>
              </div>
              <div className="space-y-2">
                {curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border overflow-hidden">
                    <button
                      onClick={() => toggleSection(sectionIndex)}
                      className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="h-8 w-8 rounded-full bg-coursera-blue flex items-center justify-center text-white font-semibold text-sm">
                          {sectionIndex + 1}
                        </div>
                        <div>
                          <span className="font-medium">{section.title}</span>
                          <p className="text-sm text-muted-foreground">{section.duration} • {section.lessons.length} items</p>
                        </div>
                      </div>
                      {expandedSections.includes(sectionIndex) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    {expandedSections.includes(sectionIndex) && (
                      <div className="divide-y">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.type === "video" && <Play className="h-4 w-4 text-muted-foreground" />}
                              {lesson.type === "quiz" && <FileText className="h-4 w-4 text-muted-foreground" />}
                              {lesson.type === "assignment" && <BookOpen className="h-4 w-4 text-muted-foreground" />}
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card border p-6">
              <h2 className="text-lg font-semibold mb-4">About this Specialization</h2>
              <p className="text-muted-foreground whitespace-pre-line">{course.description}</p>
            </div>

            {/* Instructor */}
            <div className="bg-card border p-6">
              <h2 className="text-lg font-semibold mb-4">Instructor</h2>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={course.instructor.avatar} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-coursera-blue">{course.instructor.name}</h3>
                  <p className="text-muted-foreground">{course.instructor.title}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-coursera-orange" />
                      {course.instructor.rating} Rating
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {(course.instructor.students / 1000000).toFixed(1)}M Students
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {course.instructor.courses} Courses
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Course Card */}
              <div className="bg-card border shadow-card overflow-hidden">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full aspect-video object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group">
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-coursera-blue ml-1" />
                    </div>
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Included with</span>
                    <Badge className="bg-coursera-purple text-white">LearnAI Plus</Badge>
                  </div>
                  <Button className="w-full bg-coursera-blue hover:bg-coursera-blue-hover font-semibold h-12 text-base">
                    Enroll for Free
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Starts Jan 27 · Financial aid available
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-3">This specialization includes:</p>
                    <div className="space-y-2">
                      {course.includes.slice(0, 4).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <item.icon className="h-4 w-4" />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Offered By */}
              <div className="bg-card border p-6">
                <p className="text-sm font-medium mb-3">Offered by</p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-coursera-blue" />
                  </div>
                  <div>
                    <p className="font-semibold">{course.provider}</p>
                    <p className="text-sm text-muted-foreground">Top University</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden z-50 shadow-nav">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Specialization</p>
            <p className="font-semibold">{course.title}</p>
          </div>
          <Button className="bg-coursera-blue hover:bg-coursera-blue-hover font-semibold px-6">
            Enroll
          </Button>
        </div>
      </div>
    </div>
  );
}
