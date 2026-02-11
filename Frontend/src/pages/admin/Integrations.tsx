import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Link2,
  CreditCard,
  Mail,
  Brain,
  MessageSquare,
  Video,
  Cloud,
  CheckCircle,
  Settings,
} from "lucide-react";

const integrations = [
  { id: 1, name: "Stripe", description: "Payment processing", icon: CreditCard, status: "connected", category: "payment" },
  { id: 2, name: "PayPal", description: "Alternative payments", icon: CreditCard, status: "not_connected", category: "payment" },
  { id: 3, name: "SendGrid", description: "Email delivery", icon: Mail, status: "connected", category: "email" },
  { id: 4, name: "Mailchimp", description: "Email marketing", icon: Mail, status: "not_connected", category: "email" },
  { id: 5, name: "OpenAI", description: "GPT-4 & GPT-3.5", icon: Brain, status: "connected", category: "ai" },
  { id: 6, name: "Anthropic", description: "Claude AI models", icon: Brain, status: "not_connected", category: "ai" },
  { id: 7, name: "Google AI", description: "Gemini Pro", icon: Brain, status: "connected", category: "ai" },
  { id: 8, name: "Twilio", description: "SMS notifications", icon: MessageSquare, status: "not_connected", category: "communication" },
  { id: 9, name: "Zoom", description: "Live classes", icon: Video, status: "connected", category: "video" },
  { id: 10, name: "AWS S3", description: "File storage", icon: Cloud, status: "connected", category: "storage" },
];

export default function IntegrationsPage() {
  const categories = [
    { key: "payment", label: "Payment Gateways" },
    { key: "email", label: "Email Services" },
    { key: "ai", label: "AI Providers" },
    { key: "communication", label: "Communication" },
    { key: "video", label: "Video Conferencing" },
    { key: "storage", label: "Storage" },
  ];

  return (
    <AdminDashboardLayout title="Integrations" subtitle="Connect third-party services">
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryIntegrations = integrations.filter((i) => i.category === category.key);
          if (categoryIntegrations.length === 0) return null;

          return (
            <Card key={category.key}>
              <CardHeader>
                <CardTitle>{category.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryIntegrations.map((integration) => (
                    <div
                      key={integration.id}
                      className={`p-4 border rounded-lg ${integration.status === "connected" ? "border-accent/30 bg-accent/5" : ""}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${integration.status === "connected" ? "bg-accent/20" : "bg-muted"}`}>
                            <integration.icon className={`h-5 w-5 ${integration.status === "connected" ? "text-accent" : "text-muted-foreground"}`} />
                          </div>
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            <p className="text-sm text-muted-foreground">{integration.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        {integration.status === "connected" ? (
                          <>
                            <Badge className="bg-accent gap-1">
                              <CheckCircle className="h-3 w-3" /> Connected
                            </Badge>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Settings className="h-4 w-4" /> Configure
                            </Button>
                          </>
                        ) : (
                          <>
                            <Badge variant="secondary">Not Connected</Badge>
                            <Button size="sm" className="gap-1">
                              <Link2 className="h-4 w-4" /> Connect
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AdminDashboardLayout>
  );
}
