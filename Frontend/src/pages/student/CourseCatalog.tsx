import { useState } from "react";
import StudentLayout from "@/components/student/StudentLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Sparkles,
  BookOpen,
  Grid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CourseCatalog() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Courses",
    "Programming",
    "Data Science",
    "Business",
    "Design",
    "Marketing",
  ];
  const [activeCategory, setActiveCategory] = useState("All Courses");

  const courses = [
    {
      id: 1,
      title: "Complete Machine Learning Bootcamp",
      instructor: "Dr. Sarah Chen",
      rating: 4.9,
      students: 12500,
      duration: "42 hours",
      price: 89.99,
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=ml1",
      category: "Data Science",
      level: "Intermediate",
      aiMatch: 95,
    },
    {
      id: 2,
      title: "React & TypeScript Masterclass",
      instructor: "John Smith",
      rating: 4.8,
      students: 8900,
      duration: "38 hours",
      price: 79.99,
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=react",
      category: "Programming",
      level: "Advanced",
      aiMatch: 92,
    },
    {
      id: 3,
      title: "Data Visualization with Python",
      instructor: "Emily Roberts",
      rating: 4.7,
      students: 6200,
      duration: "28 hours",
      price: 69.99,
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=dataviz",
      category: "Data Science",
      level: "Beginner",
      aiMatch: 88,
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      instructor: "Alex Rivera",
      rating: 4.9,
      students: 15000,
      duration: "35 hours",
      price: 99.99,
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=uiux",
      category: "Design",
      level: "Beginner",
      aiMatch: 85,
    },
    {
      id: 5,
      title: "Digital Marketing Strategy",
      instructor: "Maya Patel",
      rating: 4.6,
      students: 7800,
      duration: "25 hours",
      price: 59.99,
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=marketing",
      category: "Marketing",
      level: "Intermediate",
      aiMatch: 78,
    },
    {
      id: 6,
      title: "Business Analytics Essentials",
      instructor: "Jordan Kim",
      rating: 4.8,
      students: 5400,
      duration: "32 hours",
      price: 84.99,
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=business",
      category: "Business",
      level: "Beginner",
      aiMatch: 82,
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      (activeCategory === "All Courses" || course.category === activeCategory) &&
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Course Catalog</h1>
          <p className="text-muted-foreground">Discover courses tailored to your learning goals</p>
        </div>

        {/* AI Recommendation Banner */}
        <div className="bg-lms-purple-light border border-lms-purple/20 rounded-xl p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-purple">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">AI-Powered Recommendations</p>
            <p className="text-sm text-muted-foreground">
              Courses are ranked by how well they match your learning profile and goals
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <div className="flex border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-r-none", viewMode === "grid" && "bg-muted")}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-l-none", viewMode === "list" && "bg-muted")}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className={cn(
                activeCategory === category && "bg-lms-blue hover:bg-lms-blue/90"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Course Grid */}
        <div
          className={cn(
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          )}
        >
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={cn(
                "bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow",
                viewMode === "list" && "flex"
              )}
            >
              <div
                className={cn(
                  "bg-muted flex items-center justify-center",
                  viewMode === "grid" ? "h-40" : "w-48 shrink-0"
                )}
              >
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {course.level}
                  </Badge>
                  {course.aiMatch >= 90 && (
                    <Badge className="bg-lms-purple-light text-lms-purple text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {course.aiMatch}% Match
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-lms-amber text-lms-amber" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">${course.price}</span>
                  <Button size="sm" className="bg-lms-blue hover:bg-lms-blue/90">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
