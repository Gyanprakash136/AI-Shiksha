import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Palette,
  Upload,
  Globe,
  Mail,
  Save,
  Image,
} from "lucide-react";

export default function PlatformSettingsPage() {
  return (
    <AdminDashboardLayout title="Platform Settings" subtitle="Configure your platform appearance and settings">
      <div className="space-y-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="email">Email Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Platform Name</Label>
                    <Input defaultValue="LearnAI" />
                  </div>
                  <div className="space-y-2">
                    <Label>Support Email</Label>
                    <Input defaultValue="support@learnai.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Language</Label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                      <option>UTC</option>
                      <option>America/New_York</option>
                      <option>Europe/London</option>
                      <option>Asia/Tokyo</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Platform Description</Label>
                  <Textarea
                    defaultValue="AI-powered learning management system for modern education."
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Take the platform offline for maintenance</p>
                  </div>
                  <Switch />
                </div>
                <Button className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Branding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <Label>Logo</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Image className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Upload className="h-4 w-4" /> Upload Logo
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Favicon</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Image className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground mb-2">32x32 or 64x64 pixels</p>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Upload className="h-4 w-4" /> Upload Favicon
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" defaultValue="#0056D2" className="w-12 h-10 p-1" />
                      <Input defaultValue="#0056D2" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" defaultValue="#2A9D8F" className="w-12 h-10 p-1" />
                      <Input defaultValue="#2A9D8F" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex gap-2">
                      <Input type="color" defaultValue="#F77F00" className="w-12 h-10 p-1" />
                      <Input defaultValue="#F77F00" className="flex-1" />
                    </div>
                  </div>
                </div>
                <Button className="gap-2">
                  <Save className="h-4 w-4" /> Save Branding
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Welcome Email", "Password Reset", "Course Enrollment", "Payment Receipt", "Course Completion"].map((template) => (
                  <div key={template} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{template}</p>
                      <p className="text-sm text-muted-foreground">Customize the {template.toLowerCase()} template</p>
                    </div>
                    <Button variant="outline">Edit Template</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
}
