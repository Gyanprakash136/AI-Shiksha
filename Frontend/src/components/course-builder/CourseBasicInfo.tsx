import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, Video, DollarSign } from "lucide-react";
import type { CourseData } from "@/pages/dashboard/CourseBuilder";

interface CourseBasicInfoProps {
  data: CourseData;
  onUpdate: (updates: Partial<CourseData>) => void;
}

const categories = [
  "Development",
  "Business",
  "Design",
  "Marketing",
  "IT & Software",
  "Personal Development",
  "Photography",
  "Music",
  "Health & Fitness",
];

const levels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "all", label: "All Levels" },
];

const languages = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "hindi", label: "Hindi" },
  { value: "chinese", label: "Chinese" },
];

export function CourseBasicInfo({ data, onUpdate }: CourseBasicInfoProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Info */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>Basic details about your course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Complete Web Development Bootcamp"
                value={data.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Course Subtitle</Label>
              <Input
                id="subtitle"
                placeholder="A brief tagline for your course"
                value={data.subtitle}
                onChange={(e) => onUpdate({ subtitle: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what students will learn, prerequisites, and course outcomes..."
                value={data.description}
                onChange={(e) => onUpdate({ description: e.target.value })}
                rows={6}
                className="rounded-xl resize-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={data.category} onValueChange={(value) => onUpdate({ category: value })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Level *</Label>
                <Select value={data.level} onValueChange={(value) => onUpdate({ level: value })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language *</Label>
                <Select value={data.language} onValueChange={(value) => onUpdate({ language: value })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing
            </CardTitle>
            <CardDescription>Set your course price</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Regular Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="99.00"
                  value={data.price || ""}
                  onChange={(e) => onUpdate({ price: parseFloat(e.target.value) || 0 })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price ($)</Label>
                <Input
                  id="salePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="49.00"
                  value={data.salePrice || ""}
                  onChange={(e) => onUpdate({ salePrice: parseFloat(e.target.value) || 0 })}
                  className="rounded-xl"
                />
                <p className="text-xs text-muted-foreground">Leave empty for no discount</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Media Sidebar */}
      <div className="space-y-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Course Thumbnail
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-2xl p-6 text-center hover:border-lms-blue/50 transition-colors cursor-pointer bg-muted/30">
              {data.thumbnail ? (
                <img
                  src={data.thumbnail}
                  alt="Thumbnail"
                  className="w-full aspect-video object-cover rounded-xl"
                />
              ) : (
                <div className="space-y-3">
                  <div className="mx-auto h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Upload thumbnail</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Recommended: 1280x720 (16:9)</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Promo Video
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-2xl p-6 text-center hover:border-lms-blue/50 transition-colors cursor-pointer bg-muted/30">
              <div className="space-y-3">
                <div className="mx-auto h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                  <Video className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Upload promo video</p>
                  <p className="text-xs text-muted-foreground">MP4 up to 500MB</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Optional but recommended</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
