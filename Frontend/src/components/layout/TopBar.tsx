import { Bell, Search, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses, students..."
            className="w-64 pl-9 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>

        {/* AI Quick Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 border-lms-purple/30 text-lms-purple hover:bg-lms-purple-light">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">AI Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-lms-purple" />
              AI-Powered Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Generate course outline</DropdownMenuItem>
            <DropdownMenuItem>Write course description</DropdownMenuItem>
            <DropdownMenuItem>Create quiz questions</DropdownMenuItem>
            <DropdownMenuItem>Summarize content</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Create Button */}
        <Button size="sm" className="gap-2 bg-lms-blue hover:bg-lms-blue/90">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create Course</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-lms-rose" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="text-xs">3 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="text-sm font-medium">New student enrolled</span>
              <span className="text-xs text-muted-foreground">Sarah Johnson enrolled in "React Masterclass"</span>
              <span className="text-xs text-muted-foreground">2 minutes ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="text-sm font-medium">New review received</span>
              <span className="text-xs text-muted-foreground">5-star review on "JavaScript Fundamentals"</span>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-lms-purple" />
                <span className="text-sm font-medium">AI Insight</span>
              </div>
              <span className="text-xs text-muted-foreground">Engagement dropped 15% in Chapter 3</span>
              <span className="text-xs text-muted-foreground">3 hours ago</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
