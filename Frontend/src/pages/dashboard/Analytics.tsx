import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  Clock,
  Target,
  Brain,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";

const revenueData = [
  { month: "Jan", revenue: 4500, students: 120 },
  { month: "Feb", revenue: 5200, students: 145 },
  { month: "Mar", revenue: 4800, students: 132 },
  { month: "Apr", revenue: 6100, students: 178 },
  { month: "May", revenue: 7200, students: 210 },
  { month: "Jun", revenue: 8400, students: 245 },
];

const coursePerformance = [
  { name: "Web Development", students: 1245, rating: 4.8, revenue: 24500 },
  { name: "React Mastery", students: 892, rating: 4.9, revenue: 18900 },
  { name: "UI/UX Design", students: 756, rating: 4.7, revenue: 15200 },
  { name: "Python Basics", students: 654, rating: 4.6, revenue: 12800 },
];

const engagementData = [
  { name: "Completed", value: 45, color: "hsl(var(--lms-emerald))" },
  { name: "In Progress", value: 35, color: "hsl(var(--lms-blue))" },
  { name: "Not Started", value: 20, color: "hsl(var(--muted))" },
];

const studentLearningData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.1 },
  { day: "Fri", hours: 1.5 },
  { day: "Sat", hours: 4.2 },
  { day: "Sun", hours: 3.8 },
];

export default function Analytics() {
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher";

  const content = (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-end">
        <Badge className="bg-lms-blue/10 text-lms-blue">
          <Sparkles className="h-3 w-3 mr-1" />
          Insights Active
        </Badge>
      </div>

      {isTeacher ? (
        // Teacher Analytics
        <>
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-emerald/10">
                    <DollarSign className="h-5 w-5 text-lms-emerald" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">$84,254</p>
                    <p className="text-xs text-lms-emerald">+12.5% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-blue/10">
                    <Users className="h-5 w-5 text-lms-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">3,842</p>
                    <p className="text-xs text-lms-blue">+245 this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-purple/10">
                    <BookOpen className="h-5 w-5 text-lms-purple" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Courses</p>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-lms-purple">2 drafts pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-amber/10">
                    <TrendingUp className="h-5 w-5 text-lms-amber" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-xs text-lms-amber">Top 5% instructors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Enrollment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--lms-blue))"
                      fill="hsl(var(--lms-blue) / 0.2)"
                      name="Revenue ($)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Course Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coursePerformance.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <h4 className="font-medium">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">{course.students} students enrolled</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-medium">{course.rating} ★</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="font-medium text-lms-emerald">${course.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        // Student Analytics
        <>
          {/* Learning Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-blue/10">
                    <Clock className="h-5 w-5 text-lms-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Learning Time</p>
                    <p className="text-2xl font-bold">42.5h</p>
                    <p className="text-xs text-lms-blue">This month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-emerald/10">
                    <Target className="h-5 w-5 text-lms-emerald" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Courses Done</p>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-lms-emerald">+2 this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-purple/10">
                    <Brain className="h-5 w-5 text-lms-purple" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Skills Gained</p>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs text-lms-purple">Across 4 domains</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lms-amber/10">
                    <TrendingUp className="h-5 w-5 text-lms-amber" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold">12 days</p>
                    <p className="text-xs text-lms-amber">Personal best!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Weekly Learning Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Learning Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentLearningData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar dataKey="hours" fill="hsl(var(--lms-blue))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Course Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Course Completion Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={engagementData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {engagementData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {engagementData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Learning Insights */}
          <Card className="border-lms-blue/20 bg-lms-blue/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-lms-blue" />
                AI Learning Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-lg bg-background">
                  <h4 className="font-medium mb-2">Strongest Topic</h4>
                  <p className="text-2xl font-bold text-lms-emerald">React Hooks</p>
                  <p className="text-sm text-muted-foreground">92% mastery level</p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                  <h4 className="font-medium mb-2">Needs Improvement</h4>
                  <p className="text-2xl font-bold text-lms-amber">TypeScript Generics</p>
                  <p className="text-sm text-muted-foreground">Consider reviewing Module 5</p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                  <h4 className="font-medium mb-2">Recommended Next</h4>
                  <p className="text-2xl font-bold text-lms-blue">State Management</p>
                  <p className="text-sm text-muted-foreground">Based on your progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );

  if (user?.role === "admin") {
    return (
      <AdminDashboardLayout title="Analytics" subtitle="Track your course performance and revenue">
        {content}
      </AdminDashboardLayout>
    );
  }

  return (
    <UnifiedDashboard title="Analytics" subtitle={isTeacher ? "Track your course performance and revenue" : "Monitor your learning progress"}>
      {content}
    </UnifiedDashboard>
  );
}
