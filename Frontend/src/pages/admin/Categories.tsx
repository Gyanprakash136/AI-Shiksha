import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Folder,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  BookOpen,
  GripVertical,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Technology",
    courses: 342,
    subcategories: [
      { name: "Web Development", courses: 120 },
      { name: "Mobile Development", courses: 85 },
      { name: "Data Science", courses: 78 },
      { name: "AI & Machine Learning", courses: 59 },
    ],
  },
  {
    id: 2,
    name: "Business",
    courses: 256,
    subcategories: [
      { name: "Marketing", courses: 89 },
      { name: "Finance", courses: 67 },
      { name: "Entrepreneurship", courses: 54 },
      { name: "Management", courses: 46 },
    ],
  },
  {
    id: 3,
    name: "Design",
    courses: 189,
    subcategories: [
      { name: "UI/UX Design", courses: 78 },
      { name: "Graphic Design", courses: 56 },
      { name: "3D & Animation", courses: 34 },
      { name: "Photography", courses: 21 },
    ],
  },
  {
    id: 4,
    name: "Personal Development",
    courses: 145,
    subcategories: [
      { name: "Leadership", courses: 45 },
      { name: "Communication", courses: 38 },
      { name: "Productivity", courses: 32 },
      { name: "Career Development", courses: 30 },
    ],
  },
];

const skillTags = [
  "JavaScript", "Python", "React", "Node.js", "SQL", "Machine Learning",
  "Digital Marketing", "SEO", "Leadership", "Project Management", "Figma",
  "Adobe XD", "Data Analysis", "Excel", "Communication", "Time Management",
];

export default function CategoriesPage() {
  return (
    <AdminDashboardLayout title="Categories & Tags" subtitle="Manage course organization variables">
      <div className="space-y-6">
        <Tabs defaultValue="categories" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="tags">Skill Tags</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="categories" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Input placeholder="Search categories..." className="w-full md:w-64" />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>Create a new category to organize courses.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cat-title">Title</Label>
                      <Input id="cat-title" placeholder="e.g. Web Development" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cat-slug">Slug</Label>
                      <Input id="cat-slug" placeholder="e.g. web-development" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cat-desc">Description</Label>
                      <Input id="cat-desc" placeholder="Category description..." />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Category</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Subcategories</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Folder className="h-4 w-4 text-lms-blue" />
                            {category.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {category.name.toLowerCase().replace(/\s+/g, '-')}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{category.courses}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {category.subcategories.slice(0, 3).map((sub, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {sub.name}
                              </Badge>
                            ))}
                            {category.subcategories.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{category.subcategories.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-lms-blue">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost-destructive" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tags" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Input placeholder="Search tags..." className="w-full md:w-64" />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Tag
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Tag</DialogTitle>
                    <DialogDescription>Create a new skill tag for courses.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="tag-name">Tag Name</Label>
                      <Input id="tag-name" placeholder="e.g. React.js" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Tag</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tag Name</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Associated Courses</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skillTags.map((tag, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <Badge variant="secondary" className="px-2 py-1">
                            {tag}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {tag.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground text-sm">
                            {Math.floor(Math.random() * 50) + 5} courses
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
}
