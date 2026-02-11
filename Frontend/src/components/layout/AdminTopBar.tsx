import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminMobileSidebar } from "./AdminMobileSidebar";
import { Badge } from "@/components/ui/badge";

interface AdminTopBarProps {
  title?: string;
  subtitle?: string;
}

export function AdminTopBar({ title, subtitle }: AdminTopBarProps) {
  const { mobileOpen, setMobileOpen } = useSidebarContext();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4 md:px-6">
      {/* Mobile Menu & Title */}
      <div className="flex items-center gap-4">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            <AdminMobileSidebar />
          </SheetContent>
        </Sheet>
        
        <div className="hidden md:block">
          {title && <h1 className="text-lg font-semibold text-foreground">{title}</h1>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 pl-9 bg-muted/50 border-0"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-destructive">
            5
          </Badge>
        </Button>
      </div>
    </header>
  );
}
