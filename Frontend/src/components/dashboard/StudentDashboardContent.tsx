import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Trophy,
  Play,
  ArrowRight,
  Calendar,
} from "lucide-react";

export function StudentDashboardContent() {
  const stats = [
    { label: "Courses Enrolled", value: "8", icon: BookOpen, gradient: "from-primary/15 to-primary/5", iconColor: "text-primary" },
    { label: "Hours Learned", value: "47", icon: Clock, gradient: "from-accent/15 to-accent/5", iconColor: "text-accent" },
    { label: "Certificates", value: "3", icon: Trophy, gradient: "from-chart-3/15 to-chart-3/5", iconColor: "text-chart-3" },
  ];

  const inProgressCourses = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      instructor: "Stanford University",
      progress: 65,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=120&h=80&fit=crop",
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      instructor: "Meta",
      progress: 42,
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=120&h=80&fit=crop",
    },
    {
      id: 3,
      title: "Data Science with Python",
      instructor: "University of Michigan",
      progress: 28,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=80&fit=crop",
    },
  ];

  const upcomingDeadlines = [
    { title: "ML Assignment 3", course: "Machine Learning", dueIn: "2 days" },
    { title: "Quiz: React Basics", course: "Web Development", dueIn: "5 days" },
    { title: "Final Project", course: "Data Science", dueIn: "1 week" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-accent p-4 md:p-6 rounded-lg text-white">
        <h2 className="text-lg md:text-xl font-semibold mb-1">Welcome back!</h2>
        <p className="text-white/80 text-xs md:text-sm">
          You have 3 courses in progress. Keep up the great work!
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className={`border bg-gradient-to-br ${stat.gradient}`}>
            <CardContent className="p-3 md:p-4 text-center">
              <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.iconColor} mx-auto mb-1 md:mb-2`} />
              <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Learning */}
      <div>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h3 className="font-semibold text-sm md:text-base text-foreground">Continue Learning</h3>
          <Link to="/dashboard/my-courses" className="text-xs md:text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-2 md:space-y-3">
          {inProgressCourses.map((course) => (
            <Card key={course.id} className="border hover:border-primary/50 transition-all duration-200 hover:shadow-sm">
              <CardContent className="p-3 md:p-4">
                <div className="flex gap-3 md:gap-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-16 h-12 md:w-20 md:h-14 object-cover flex-shrink-0 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide">{course.instructor}</p>
                    <h4 className="font-medium text-foreground text-xs md:text-sm truncate">{course.title}</h4>
                    <div className="flex items-center gap-2 md:gap-3 mt-1.5 md:mt-2">
                      <Progress value={course.progress} className="flex-1 h-1" />
                      <span className="text-[10px] md:text-xs text-muted-foreground">{course.progress}%</span>
                    </div>
                  </div>
                  <Link to={`/learn/${course.id}/lesson/1`}>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 h-7 w-7 md:h-8 md:w-8 p-0">
                      <Play className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <Card className="border bg-gradient-to-br from-destructive/5 to-background">
        <CardContent className="p-3 md:p-4">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Calendar className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-foreground text-xs md:text-sm">Upcoming Deadlines</h3>
          </div>
          <div className="space-y-2 md:space-y-3">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between py-1.5 md:py-2 border-b last:border-0">
                <div>
                  <p className="text-xs md:text-sm font-medium text-foreground">{deadline.title}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">{deadline.course}</p>
                </div>
                <span className="text-[10px] md:text-xs font-medium text-destructive bg-destructive/10 px-2 py-0.5 md:py-1 rounded">
                  {deadline.dueIn}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
