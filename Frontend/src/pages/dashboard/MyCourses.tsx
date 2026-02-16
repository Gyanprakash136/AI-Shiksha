import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Play,
  Clock,
  BookOpen,
  CheckCircle2,
  Calendar,
  Loader2,
  ArrowRight
} from "lucide-react";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { enrollmentService, EnrolledCourse } from "@/lib/api/enrollmentService";

export default function MyCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      const data = await enrollmentService.getMyEnrollments();
      setCourses(data);
    } catch (error) {
      console.error('Error loading enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.course.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "in-progress") return matchesSearch && course.status === 'in_progress';
    if (activeTab === "completed") return matchesSearch && course.status === 'completed';
    return matchesSearch;
  });

  return (
    <UnifiedDashboard title="My Courses" subtitle="Manage your learning journey">
      <div className="p-6 max-w-7xl mx-auto space-y-8 font-sans">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h2 className="text-2xl font-light text-[#1F1F1F]">My Learning</h2>
            <p className="text-sm text-[#555555]">Track your progress and achievements</p>
          </div>
          <Link to="/courses">
            <Button className="bg-lms-blue hover:bg-lms-blue/90 text-white rounded-full px-6">
              Browse Catalog
            </Button>
          </Link>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="bg-transparent p-0 gap-2">
              <TabsTrigger value="all" className="rounded-full px-6 data-[state=active]:bg-[#1F1F1F] data-[state=active]:text-white text-gray-500 hover:text-gray-900 transition-all">All</TabsTrigger>
              <TabsTrigger value="in-progress" className="rounded-full px-6 data-[state=active]:bg-[#1F1F1F] data-[state=active]:text-white text-gray-500 hover:text-gray-900 transition-all">In Progress</TabsTrigger>
              <TabsTrigger value="completed" className="rounded-full px-6 data-[state=active]:bg-[#1F1F1F] data-[state=active]:text-white text-gray-500 hover:text-gray-900 transition-all">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-lms-blue/20 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Course List View */}
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#E1E1E1] rounded-2xl border-dashed">
            <BookOpen className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-[#1F1F1F]">No courses found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveTab("all") }} className="rounded-full">Clear Filters</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div key={course.id} className="group bg-white rounded-2xl p-4 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6 items-center">

                {/* Thumbnail */}
                <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={(course.course.thumbnail_url && !course.course.thumbnail_url.startsWith('blob:')) ? course.course.thumbnail_url : 'https://via.placeholder.com/1280x720?text=Course+Thumbnail'}
                    alt={course.course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  {course.progress === 100 && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="h-3 w-3" /> Done
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center min-w-0 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-[#1F1F1F] mb-1 group-hover:text-lms-blue transition-colors truncate">
                        {course.course.title}
                      </h3>
                      <p className="text-sm text-black font-medium mb-2 flex items-center gap-2">
                        {course.course.instructor.name}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-6 mt-2 text-xs text-black font-medium">
                    <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                      <Clock className="h-3.5 w-3.5 text-black" />
                      <span>{course.course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                      <BookOpen className="h-3.5 w-3.5 text-black" />
                      <span>{course.completedLessons}/{course.course.totalLessons} Lessons</span>
                    </div>
                    {course.lastAccessedAt && (
                      <div className="hidden sm:block text-gray-600">Last: {new Date(course.lastAccessedAt).toLocaleDateString()}</div>
                    )}
                  </div>
                </div>

                {/* Progress & Action */}
                <div className="w-full md:w-48 flex-shrink-0 flex flex-col gap-3">
                  {course.progress === 100 ? (
                    <div className="text-center">
                      <div className="text-sm font-medium text-green-600 mb-2">Completed {course.completionDate}</div>
                      <Button variant="outline" className="w-full rounded-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800">
                        View Certificate
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-[#555555]">{course.progress}% Complete</span>
                        </div>
                        <Progress value={course.progress} className="h-2 bg-gray-100" indicatorClassName="bg-lms-blue" />
                      </div>
                      <Button className="w-full rounded-full bg-[#0056D2] hover:bg-[#00419e] text-white shadow-md shadow-blue-100 group-hover:shadow-blue-200 transition-all">
                        {course.progress > 0 ? "Resume Learning" : "Start Course"} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </UnifiedDashboard>
  );
}
