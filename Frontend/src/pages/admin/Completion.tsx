import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  CheckCircle,
  Award,
  TrendingUp,
  Users,
  Download,
} from "lucide-react";

const completions = [
  { id: 1, student: "John Smith", course: "Web Development Bootcamp", completedAt: "2024-01-20", score: 92, certificateIssued: true },
  { id: 2, student: "Sarah Johnson", course: "React Mastery", completedAt: "2024-01-18", score: 88, certificateIssued: true },
  { id: 3, student: "Mike Chen", course: "UI/UX Design", completedAt: "2024-01-15", score: 95, certificateIssued: true },
  { id: 4, student: "Emily White", course: "Python Basics", completedAt: "2024-01-12", score: 78, certificateIssued: false },
  { id: 5, student: "Alex Brown", course: "Machine Learning", completedAt: "2024-01-10", score: 85, certificateIssued: true },
];

export default function CompletionPage() {
  return (
    <AdminDashboardLayout title="Course Completions" subtitle="Track student course completions and certificates">
      <div className="space-y-4 md:space-y-6">
        {/* Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Completions</p>
                  <p className="text-xl md:text-2xl font-bold">4,832</p>
                </div>
                <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Certificates Issued</p>
                  <p className="text-xl md:text-2xl font-bold">4,521</p>
                </div>
                <Award className="h-6 w-6 md:h-8 md:w-8 text-chart-3/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Avg. Score</p>
                  <p className="text-xl md:text-2xl font-bold">86%</p>
                </div>
                <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">This Month</p>
                  <p className="text-xl md:text-2xl font-bold">342</p>
                </div>
                <Users className="h-6 w-6 md:h-8 md:w-8 text-chart-4/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completion Rate Overview */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base md:text-lg">Completion Rate by Course Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { category: "Web Development", rate: 78 },
              { category: "Data Science", rate: 65 },
              { category: "Design", rate: 82 },
              { category: "Business", rate: 71 },
            ].map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-xs md:text-sm">
                  <span>{item.category}</span>
                  <span className="font-medium">{item.rate}%</span>
                </div>
                <Progress value={item.rate} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Completions Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-base md:text-lg">Recent Completions</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9 w-full md:w-64" />
                </div>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2 hidden sm:flex">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 md:p-6 md:pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs md:text-sm">Student</TableHead>
                    <TableHead className="text-xs md:text-sm hidden md:table-cell">Course</TableHead>
                    <TableHead className="text-xs md:text-sm">Score</TableHead>
                    <TableHead className="text-xs md:text-sm">Certificate</TableHead>
                    <TableHead className="text-xs md:text-sm hidden lg:table-cell">Completed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completions.map((completion) => (
                    <TableRow key={completion.id}>
                      <TableCell className="p-2 md:p-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Avatar className="h-7 w-7 md:h-8 md:w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {completion.student.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-xs md:text-sm truncate">{completion.student}</p>
                            <p className="text-[10px] md:text-xs text-muted-foreground truncate md:hidden">
                              {completion.course}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs md:text-sm hidden md:table-cell">{completion.course}</TableCell>
                      <TableCell className="p-2 md:p-4">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] md:text-xs ${
                            completion.score >= 90
                              ? "bg-accent/10 text-accent"
                              : completion.score >= 80
                              ? "bg-primary/10 text-primary"
                              : "bg-chart-3/10 text-chart-3"
                          }`}
                        >
                          {completion.score}%
                        </Badge>
                      </TableCell>
                      <TableCell className="p-2 md:p-4">
                        {completion.certificateIssued ? (
                          <Badge className="bg-accent text-xs gap-1">
                            <Award className="h-3 w-3" />
                            <span className="hidden sm:inline">Issued</span>
                          </Badge>
                        ) : (
                          <Button size="sm" variant="outline" className="text-xs h-7">
                            Issue
                          </Button>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden lg:table-cell">
                        {completion.completedAt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}