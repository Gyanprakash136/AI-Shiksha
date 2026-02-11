import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Globe,
  Share2,
  FileText,
  Image,
  Save,
  RefreshCw,
} from "lucide-react";

export default function SEOSettings() {
  return (
    <UnifiedDashboard title="SEO Settings" subtitle="Manage search engine optimization for your platform">
      <div className="space-y-6">
        {/* General SEO */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Search className="h-4 w-4" />
              General SEO
            </CardTitle>
            <CardDescription>Configure basic SEO settings for your platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-title">Site Title</Label>
              <Input id="site-title" defaultValue="LearnAI - AI-Powered Learning Platform" />
              <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description</Label>
              <Textarea 
                id="meta-description" 
                defaultValue="Learn with AI-powered tutoring. Access 7,000+ courses from top universities and companies. Start your learning journey today."
                rows={3}
              />
              <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Meta Keywords</Label>
              <Input id="keywords" defaultValue="online learning, AI tutor, courses, certificates, education" />
            </div>
          </CardContent>
        </Card>

        {/* Social Media / Open Graph */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Share2 className="h-4 w-4" />
              Social Media (Open Graph)
            </CardTitle>
            <CardDescription>Configure how your site appears when shared on social media</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="og-title">OG Title</Label>
              <Input id="og-title" defaultValue="LearnAI - Learn Without Limits" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og-description">OG Description</Label>
              <Textarea 
                id="og-description" 
                defaultValue="Start, switch, or advance your career with 7,000+ courses from world-class universities."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og-image">OG Image URL</Label>
              <div className="flex gap-2">
                <Input id="og-image" defaultValue="https://example.com/og-image.jpg" className="flex-1" />
                <Button variant="outline" size="icon">
                  <Image className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Recommended: 1200x630 pixels</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter-handle">Twitter Handle</Label>
                <Input id="twitter-handle" defaultValue="@learnai" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fb-app-id">Facebook App ID</Label>
                <Input id="fb-app-id" placeholder="Optional" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical SEO */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4" />
              Technical SEO
            </CardTitle>
            <CardDescription>Advanced technical settings for search engines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Generate Sitemap</p>
                <p className="text-xs text-muted-foreground">Automatically generate XML sitemap</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Robots.txt</p>
                <p className="text-xs text-muted-foreground">Allow search engine indexing</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Canonical URLs</p>
                <p className="text-xs text-muted-foreground">Auto-generate canonical tags</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Schema Markup</p>
                <p className="text-xs text-muted-foreground">Add structured data for courses</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Indexing */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-4 w-4" />
              Search Engine Indexing
            </CardTitle>
            <CardDescription>Control which pages are indexed by search engines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Index Course Pages</p>
                <p className="text-xs text-muted-foreground">Allow courses to appear in search results</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Index Instructor Profiles</p>
                <p className="text-xs text-muted-foreground">Allow instructor pages in search</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Index Blog Posts</p>
                <p className="text-xs text-muted-foreground">Allow blog content in search</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </UnifiedDashboard>
  );
}
