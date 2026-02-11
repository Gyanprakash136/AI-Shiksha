import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: LucideIcon;
  iconColor: "blue" | "emerald" | "amber" | "purple" | "rose";
}

const iconColors = {
  blue: "bg-lms-blue-light text-lms-blue",
  emerald: "bg-lms-emerald-light text-lms-emerald",
  amber: "bg-lms-amber-light text-lms-amber",
  purple: "bg-lms-purple-light text-lms-purple",
  rose: "bg-lms-rose-light text-lms-rose",
};

export function StatCard({ title, value, change, icon: Icon, iconColor }: StatCardProps) {
  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <div className="mt-2 flex items-center gap-1">
              {change.positive ? (
                <TrendingUp className="h-4 w-4 text-lms-emerald" />
              ) : (
                <TrendingDown className="h-4 w-4 text-lms-rose" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  change.positive ? "text-lms-emerald" : "text-lms-rose"
                )}
              >
                {change.value}
              </span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", iconColors[iconColor])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
