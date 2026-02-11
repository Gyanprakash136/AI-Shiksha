import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Megaphone,
  Plus,
  Send,
  Users,
  GraduationCap,
  UserCheck,
  Clock,
  Edit,
  Trash2,
} from "lucide-react";

const announcements = [
  { id: 1, title: "Platform Maintenance Notice", content: "Scheduled maintenance on Sunday 2am-4am UTC", audience: "all", status: "active", createdAt: "2024-01-20" },
  { id: 2, title: "New AI Features Available", content: "Check out our new AI tutor capabilities", audience: "students", status: "active", createdAt: "2024-01-18" },
  { id: 3, title: "Payout Schedule Update", content: "Payouts will now be processed weekly", audience: "teachers", status: "active", createdAt: "2024-01-15" },
  { id: 4, title: "Holiday Sale Announcement", content: "30% off all courses until end of month", audience: "all", status: "expired", createdAt: "2024-01-01" },
];

export default function AnnouncementsPage() {
  return (
    <AdminDashboardLayout title="Announcements" subtitle="Send platform-wide messages">
      <div className="space-y-4 md:space-y-6">
        {/* Create Announcement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create Announcement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input placeholder="Announcement Title" />
            </div>
            <div className="space-y-2">
              <Textarea placeholder="Announcement content..." rows={3} />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Target Audience</label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option value="all">All Users</option>
                  <option value="students">Students Only</option>
                  <option value="teachers">Teachers Only</option>
                  <option value="admins">Admins Only</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Schedule</label>
                <Input type="datetime-local" />
              </div>
            </div>
            <Button className="gap-2">
              <Send className="h-4 w-4" /> Send Announcement
            </Button>
          </CardContent>
        </Card>

        {/* Announcement List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              Recent Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{announcement.title}</h3>
                      <p className="text-sm text-muted-foreground">{announcement.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost-destructive" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant={announcement.status === "active" ? "default" : "secondary"}>
                      {announcement.status}
                    </Badge>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      {announcement.audience === "all" && <Users className="h-4 w-4" />}
                      {announcement.audience === "students" && <GraduationCap className="h-4 w-4" />}
                      {announcement.audience === "teachers" && <UserCheck className="h-4 w-4" />}
                      {announcement.audience === "all" ? "All Users" : announcement.audience}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {announcement.createdAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
