import { Sparkles, TrendingDown, TrendingUp, Lightbulb, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  type: "warning" | "success" | "suggestion";
  title: string;
  description: string;
  action?: string;
}

const insights: Insight[] = [
  {
    id: "1",
    type: "warning",
    title: "Engagement Drop Detected",
    description: "Chapter 3 of 'React Masterclass' shows 23% lower completion rate than average.",
    action: "View Analysis",
  },
  {
    id: "2",
    type: "success",
    title: "Course Performing Well",
    description: "'JavaScript Fundamentals' has maintained 4.8★ rating with 156 new students this month.",
  },
  {
    id: "3",
    type: "suggestion",
    title: "Content Opportunity",
    description: "Students frequently ask about 'React Hooks'. Consider creating a dedicated module.",
    action: "Generate Outline",
  },
];

const insightStyles = {
  warning: {
    icon: TrendingDown,
    bg: "bg-lms-amber-light",
    text: "text-lms-amber",
    border: "border-lms-amber/20",
  },
  success: {
    icon: TrendingUp,
    bg: "bg-lms-emerald-light",
    text: "text-lms-emerald",
    border: "border-lms-emerald/20",
  },
  suggestion: {
    icon: Lightbulb,
    bg: "bg-lms-purple-light",
    text: "text-lms-purple",
    border: "border-lms-purple/20",
  },
};

export function AIInsightsPanel() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lms-purple-light">
          <Sparkles className="h-4 w-4 text-lms-purple" />
        </div>
        <CardTitle className="text-base font-semibold">AI Insights</CardTitle>
        <span className="ai-badge ml-auto">
          <Sparkles className="h-3 w-3" />
          AI-Powered
        </span>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight) => {
          const style = insightStyles[insight.type];
          const Icon = style.icon;

          return (
            <div
              key={insight.id}
              className={cn(
                "rounded-lg border p-4 transition-colors hover:bg-muted/50",
                style.border
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", style.bg)}>
                  <Icon className={cn("h-4 w-4", style.text)} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
                  {insight.action && (
                    <Button variant="link" className="mt-2 h-auto p-0 text-sm text-lms-blue">
                      {insight.action} →
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex items-center justify-center pt-2">
          <Button variant="ghost" size="sm" className="text-sm text-muted-foreground gap-2">
            <Target className="h-4 w-4" />
            View All Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
