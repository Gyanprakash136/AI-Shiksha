import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Globe,
  Share2,
  Code,
  Save,
  FileText,
  Image,
} from "lucide-react";

export default function SEOSettingsPage() {
  return (
    <AdminDashboardLayout title="SEO Settings" subtitle="Optimize your platform for search engines">
      <div className="space-y-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General SEO</TabsTrigger>
            <TabsTrigger value="social">Social / Open Graph</TabsTrigger>
            <TabsTrigger value="technical">Technical SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  General SEO Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Site Title</Label>
                  <Input defaultValue="LearnAI - AI-Powered Learning Platform" />
                  <p className="text-sm text-muted-foreground">Recommended: 50-60 characters</p>
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    defaultValue="Transform your learning journey with LearnAI. Access thousands of AI-powered courses, personalized learning paths, and expert instructors. Start learning today!"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">Recommended: 150-160 characters</p>
                </div>
                <div className="space-y-2">
                  <Label>Keywords</Label>
                  <Input defaultValue="online learning, AI courses, e-learning platform, online education, skill development" />
                  <p className="text-sm text-muted-foreground">Separate keywords with commas</p>
                </div>
                <div className="space-y-2">
                  <Label>Canonical URL</Label>
                  <Input defaultValue="https://learnai.com" />
                </div>
                <Button className="gap-2">
                  <Save className="h-4 w-4" /> Save SEO Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Open Graph Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>OG Title</Label>
                  <Input defaultValue="LearnAI - AI-Powered Learning Platform" />
                </div>
                <div className="space-y-2">
                  <Label>OG Description</Label>
                  <Textarea
                    defaultValue="Transform your learning journey with AI-powered courses and personalized learning paths."
                    rows={2}
                  />
                </div>
                <div className="space-y-4">
                  <Label>OG Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Image className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">Recommended: 1200x630 pixels</p>
                    <Button variant="outline" size="sm">Upload Image</Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Twitter Card Type</Label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                      <option>summary_large_image</option>
                      <option>summary</option>
                      <option>app</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Twitter Handle</Label>
                    <Input defaultValue="@learnai" />
                  </div>
                </div>
                <Button className="gap-2">
                  <Save className="h-4 w-4" /> Save Social Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Technical SEO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="font-medium">Generate Sitemap</Label>
                    <p className="text-sm text-muted-foreground">Automatically generate and update sitemap.xml</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="font-medium">Robots.txt</Label>
                    <p className="text-sm text-muted-foreground">Allow search engines to index your site</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="font-medium">Schema Markup</Label>
                    <p className="text-sm text-muted-foreground">Add structured data for rich snippets</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="font-medium">Canonical Tags</Label>
                    <p className="text-sm text-muted-foreground">Prevent duplicate content issues</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Custom Head Scripts</Label>
                  <Textarea
                    placeholder="<!-- Add custom scripts like Google Analytics, etc. -->"
                    rows={4}
                    className="font-mono text-sm"
                  />
                </div>
                <Button className="gap-2">
                  <Save className="h-4 w-4" /> Save Technical Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
}
