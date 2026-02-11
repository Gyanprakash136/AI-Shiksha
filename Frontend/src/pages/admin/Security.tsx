import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Search,
  Filter,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  User,
  Clock,
} from "lucide-react";

const loginHistory = [
  { id: 1, user: "admin@learnai.com", ip: "192.168.1.1", location: "New York, US", device: "Chrome / Windows", status: "success", timestamp: "2024-01-20 14:32" },
  { id: 2, user: "teacher@learnai.com", ip: "10.0.0.45", location: "London, UK", device: "Safari / macOS", status: "success", timestamp: "2024-01-20 14:28" },
  { id: 3, user: "student@example.com", ip: "172.16.0.12", location: "Unknown", device: "Firefox / Linux", status: "failed", timestamp: "2024-01-20 14:15" },
  { id: 4, user: "admin@learnai.com", ip: "192.168.1.1", location: "New York, US", device: "Chrome / Windows", status: "success", timestamp: "2024-01-20 12:45" },
  { id: 5, user: "hacker@malicious.com", ip: "45.33.32.156", location: "Unknown", device: "Unknown", status: "blocked", timestamp: "2024-01-20 11:22" },
];

const suspiciousActivity = [
  { id: 1, type: "Multiple failed logins", user: "student@example.com", attempts: 5, timestamp: "2024-01-20 14:15" },
  { id: 2, type: "Unusual location", user: "teacher@learnai.com", details: "Login from new country", timestamp: "2024-01-20 10:30" },
  { id: 3, type: "Brute force attempt", ip: "45.33.32.156", attempts: 50, timestamp: "2024-01-20 11:22" },
];

export default function SecurityPage() {
  return (
    <AdminDashboardLayout title="Security" subtitle="Monitor security and access logs">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Successful Logins</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <CheckCircle className="h-8 w-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed Logins</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <XCircle className="h-8 w-8 text-destructive/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blocked IPs</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Shield className="h-8 w-8 text-chart-3/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Suspicious</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-chart-4/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suspicious Activity */}
        <Card className="border-chart-3/30 bg-chart-3/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-chart-3" />
              Suspicious Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suspiciousActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-chart-3" />
                    <div>
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.user || activity.ip} • {activity.attempts ? `${activity.attempts} attempts` : activity.details}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                    <Button size="sm" variant="destructive">Block</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Login History */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Login History
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9 w-64" />
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
                  <TableHead>User</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loginHistory.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{log.user}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{log.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>{log.device}</TableCell>
                    <TableCell>
                      <Badge
                        variant={log.status === "success" ? "default" : log.status === "failed" ? "secondary" : "destructive"}
                        className={log.status === "success" ? "bg-accent" : ""}
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
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
