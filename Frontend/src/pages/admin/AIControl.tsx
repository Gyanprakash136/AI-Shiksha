import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Bot,
  Brain,
  Zap,
  DollarSign,
  TrendingUp,
  Activity,
  Settings,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const usageData = [
  { date: "Jan 1", tokens: 45000 },
  { date: "Jan 8", tokens: 52000 },
  { date: "Jan 15", tokens: 48000 },
  { date: "Jan 22", tokens: 61000 },
  { date: "Jan 29", tokens: 55000 },
  { date: "Feb 5", tokens: 67000 },
  { date: "Feb 12", tokens: 72000 },
];

const aiModels = [
  { name: "GPT-4", status: "active", usage: 78, cost: "$1,245" },
  { name: "GPT-3.5 Turbo", status: "active", usage: 92, cost: "$345" },
  { name: "Claude 3", status: "inactive", usage: 0, cost: "$0" },
  { name: "Gemini Pro", status: "active", usage: 45, cost: "$189" },
];

export default function AIControlPage() {
  return (
    <AdminDashboardLayout title="AI Control Center" subtitle="Monitor and manage AI integrations">
      <div className="space-y-4 md:space-y-6">
        {/* Stats */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Tokens Used</p>
                  <p className="text-lg md:text-2xl font-bold">2.4M</p>
                </div>
                <Bot className="h-6 w-6 md:h-8 md:w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Monthly Cost</p>
                  <p className="text-lg md:text-2xl font-bold">$1,779</p>
                </div>
                <DollarSign className="h-6 w-6 md:h-8 md:w-8 text-chart-3/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">AI Interactions</p>
                  <p className="text-lg md:text-2xl font-bold">45.2K</p>
                </div>
                <Brain className="h-6 w-6 md:h-8 md:w-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-lg md:text-2xl font-bold">1.2s</p>
                </div>
                <Zap className="h-6 w-6 md:h-8 md:w-8 text-chart-4/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Usage Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Token Usage Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData}>
                    <defs>
                      <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-xs" />
                    <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(v) => `${v / 1000}K`} />
                    <Tooltip formatter={(value: number) => [`${value.toLocaleString()} tokens`, "Usage"]} />
                    <Area
                      type="monotone"
                      dataKey="tokens"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#tokenGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Models */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                AI Models
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiModels.map((model) => (
                <div key={model.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${model.status === "active" ? "bg-accent" : "bg-muted-foreground"}`} />
                    <div>
                      <p className="font-medium">{model.name}</p>
                      <p className="text-sm text-muted-foreground">{model.cost} this month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {model.usage > 0 && (
                      <div className="w-24">
                        <Progress value={model.usage} className="h-2" />
                      </div>
                    )}
                    <Switch checked={model.status === "active"} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">AI Tutor Enabled</Label>
                  <p className="text-sm text-muted-foreground">Enable AI tutor for all courses</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">Auto-Moderation</Label>
                  <p className="text-sm text-muted-foreground">AI content moderation</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">AI Insights</Label>
                  <p className="text-sm text-muted-foreground">Generate learning insights</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">Plagiarism Detection</Label>
                  <p className="text-sm text-muted-foreground">Scan submissions for plagiarism</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">Safety Filters</Label>
                  <p className="text-sm text-muted-foreground">Block inappropriate content</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="font-medium">Usage Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alert on high usage</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
