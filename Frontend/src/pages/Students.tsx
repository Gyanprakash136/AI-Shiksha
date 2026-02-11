import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Mail, MessageSquare, Filter, Download, Sparkles, TrendingUp, TrendingDown } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: number;
  completedCourses: number;
  totalSpent: number;
  joinDate: string;
  lastActive: string;
  segment: "high-value" | "active" | "at-risk" | "new";
}

const students: Student[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    enrolledCourses: 5,
    completedCourses: 3,
    totalSpent: 245,
    joinDate: "Jan 15, 2024",
    lastActive: "2 hours ago",
    segment: "high-value",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    enrolledCourses: 3,
    completedCourses: 2,
    totalSpent: 147,
    joinDate: "Feb 8, 2024",
    lastActive: "1 day ago",
    segment: "active",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.d@email.com",
    enrolledCourses: 2,
    completedCourses: 0,
    totalSpent: 98,
    joinDate: "Mar 22, 2024",
    lastActive: "2 weeks ago",
    segment: "at-risk",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "jwilson@email.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    enrolledCourses: 4,
    completedCourses: 4,
    totalSpent: 316,
    joinDate: "Nov 5, 2023",
    lastActive: "5 hours ago",
    segment: "high-value",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "l.anderson@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    enrolledCourses: 1,
    completedCourses: 0,
    totalSpent: 49,
    joinDate: "Apr 1, 2024",
    lastActive: "3 hours ago",
    segment: "new",
  },
  {
    id: "6",
    name: "Robert Taylor",
    email: "robert.t@email.com",
    enrolledCourses: 2,
    completedCourses: 1,
    totalSpent: 128,
    joinDate: "Dec 12, 2023",
    lastActive: "1 month ago",
    segment: "at-risk",
  },
];

const segmentStyles = {
  "high-value": { label: "High Value", class: "bg-lms-emerald-light text-lms-emerald", icon: TrendingUp },
  active: { label: "Active", class: "bg-lms-blue-light text-lms-blue", icon: null },
  "at-risk": { label: "At Risk", class: "bg-lms-rose-light text-lms-rose", icon: TrendingDown },
  new: { label: "New", class: "bg-lms-purple-light text-lms-purple", icon: null },
};

export default function Students() {
  return (
    <DashboardLayout title="Students" subtitle="View and manage your students">
      <div className="page-container">
        {/* AI Segment Summary */}
        <div className="rounded-xl border border-lms-purple/20 bg-lms-purple-light/30 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lms-purple">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">AI Student Segments</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Based on engagement patterns: <strong>2 high-value</strong> students spending 3x average, <strong>2 at-risk</strong> students haven't engaged in 2+ weeks.
              </p>
              <Button variant="link" className="mt-1 h-auto p-0 text-sm text-lms-purple">
                View detailed insights →
              </Button>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="high-value">High Value</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Students Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="table-header py-3 px-4 text-left">Student</th>
                <th className="table-header py-3 px-4 text-left">Segment</th>
                <th className="table-header py-3 px-4 text-left">Courses</th>
                <th className="table-header py-3 px-4 text-left">Total Spent</th>
                <th className="table-header py-3 px-4 text-left">Joined</th>
                <th className="table-header py-3 px-4 text-left">Last Active</th>
                <th className="table-header py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.map((student) => {
                const segment = segmentStyles[student.segment];
                return (
                  <tr key={student.id} className="hover:bg-muted/30 transition-colors animate-fade-in">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={segment.class}>
                        {segment.icon && <segment.icon className="mr-1 h-3 w-3" />}
                        {segment.label}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <span className="font-medium">{student.completedCourses}</span>
                        <span className="text-muted-foreground"> / {student.enrolledCourses} completed</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium">${student.totalSpent}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{student.joinDate}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{student.lastActive}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Enrollments</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
