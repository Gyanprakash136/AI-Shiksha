import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Server,
  Database,
  HardDrive,
  Cpu,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

const services = [
  { name: "API Server", status: "operational", uptime: "99.99%", responseTime: "45ms" },
  { name: "Database", status: "operational", uptime: "99.95%", responseTime: "12ms" },
  { name: "File Storage", status: "operational", uptime: "99.99%", responseTime: "89ms" },
  { name: "Video Streaming", status: "degraded", uptime: "98.5%", responseTime: "234ms" },
  { name: "AI Services", status: "operational", uptime: "99.8%", responseTime: "1.2s" },
  { name: "Email Service", status: "operational", uptime: "99.9%", responseTime: "156ms" },
];

const resourceUsage = [
  { name: "CPU Usage", value: 42, icon: Cpu, color: "bg-primary" },
  { name: "Memory", value: 68, icon: Activity, color: "bg-accent" },
  { name: "Storage", value: 75, icon: HardDrive, color: "bg-chart-3" },
  { name: "Database", value: 34, icon: Database, color: "bg-chart-4" },
];

const recentIncidents = [
  { id: 1, title: "Video streaming latency spike", status: "investigating", time: "2 hours ago" },
  { id: 2, title: "Database maintenance completed", status: "resolved", time: "1 day ago" },
  { id: 3, title: "API rate limiting adjustment", status: "resolved", time: "3 days ago" },
];

export default function SystemStatusPage() {
  return (
    <AdminDashboardLayout title="System Status" subtitle="Monitor platform health and performance">
      <div className="space-y-6">
        {/* Overall Status */}
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">All Systems Operational</h2>
                <p className="text-muted-foreground">Last checked: Just now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resource Usage */}
        <div className="grid gap-4 md:grid-cols-4">
          {resourceUsage.map((resource) => (
            <Card key={resource.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <resource.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{resource.name}</span>
                  </div>
                  <span className="text-lg font-bold">{resource.value}%</span>
                </div>
                <Progress value={resource.value} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Service Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {service.status === "operational" ? (
                      <CheckCircle className="h-5 w-5 text-accent" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-chart-3" />
                    )}
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Uptime</p>
                      <p className="font-medium">{service.uptime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Response</p>
                      <p className="font-medium">{service.responseTime}</p>
                    </div>
                    <Badge
                      variant={service.status === "operational" ? "default" : "secondary"}
                      className={service.status === "operational" ? "bg-accent" : "bg-chart-3 text-white"}
                    >
                      {service.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {incident.status === "investigating" ? (
                      <AlertTriangle className="h-5 w-5 text-chart-3" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-accent" />
                    )}
                    <div>
                      <p className="font-medium">{incident.title}</p>
                      <p className="text-sm text-muted-foreground">{incident.time}</p>
                    </div>
                  </div>
                  <Badge variant={incident.status === "resolved" ? "default" : "secondary"} className={incident.status === "resolved" ? "bg-accent" : ""}>
                    {incident.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
