import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  students: number;
  rating: number;
  revenue: number;
  progress: number;
}

const courses: Course[] = [
  {
    id: "1",
    title: "React Masterclass 2024",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
    students: 2456,
    rating: 4.9,
    revenue: 48920,
    progress: 92,
  },
  {
    id: "2",
    title: "JavaScript Fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
    students: 3821,
    rating: 4.8,
    revenue: 76420,
    progress: 88,
  },
  {
    id: "3",
    title: "TypeScript Essentials",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=200&fit=crop",
    students: 1234,
    rating: 4.7,
    revenue: 24680,
    progress: 76,
  },
];

export function TopCourses() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Top Performing Courses</CardTitle>
        <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
          View All →
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="flex items-center gap-4 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                {index + 1}
              </div>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-14 w-20 shrink-0 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="truncate text-sm font-semibold text-foreground">{course.title}</h4>
                <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {course.students.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-lms-amber text-lms-amber" />
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1 text-lms-emerald">
                    <TrendingUp className="h-3 w-3" />
                    ${course.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Progress value={course.progress} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground">{course.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
