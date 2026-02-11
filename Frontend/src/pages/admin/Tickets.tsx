import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  User,
} from "lucide-react";

const tickets = [
  { id: "TKT-001", user: "Alex Johnson", type: "Student", subject: "Payment issue", priority: "high", status: "open", createdAt: "2024-01-20" },
  { id: "TKT-002", user: "Dr. Emily Chen", type: "Teacher", subject: "Payout not received", priority: "high", status: "in_progress", createdAt: "2024-01-19" },
  { id: "TKT-003", user: "Maria Garcia", type: "Student", subject: "Cannot access course", priority: "medium", status: "open", createdAt: "2024-01-19" },
  { id: "TKT-004", user: "James Wilson", type: "Student", subject: "Refund request", priority: "medium", status: "resolved", createdAt: "2024-01-18" },
  { id: "TKT-005", user: "Prof. Robert Smith", type: "Teacher", subject: "Video upload failed", priority: "low", status: "open", createdAt: "2024-01-17" },
];

export default function TicketsPage() {
  return (
    <AdminDashboardLayout title="Support Tickets" subtitle="Handle user support requests">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Tickets</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <AlertCircle className="h-8 w-8 text-destructive/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Clock className="h-8 w-8 text-chart-3/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <CheckCircle className="h-8 w-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Response</p>
                  <p className="text-2xl font-bold">2.4h</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tickets Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                All Tickets
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search tickets..." className="pl-9 w-64" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                            {ticket.user.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{ticket.user}</p>
                          <p className="text-xs text-muted-foreground">{ticket.type}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge
                        variant={ticket.priority === "high" ? "destructive" : ticket.priority === "medium" ? "default" : "secondary"}
                      >
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={ticket.status === "resolved" ? "default" : ticket.status === "in_progress" ? "secondary" : "outline"}
                        className={ticket.status === "resolved" ? "bg-accent" : ""}
                      >
                        {ticket.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{ticket.createdAt}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
