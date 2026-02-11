import StudentLayout from "@/components/student/StudentLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  Sparkles,
  Brain,
} from "lucide-react";

export default function Assignments() {
  const pendingAssignments = [
    {
      id: 1,
      title: "Neural Networks Implementation",
      course: "Machine Learning Fundamentals",
      dueDate: "Jan 28, 2025",
      daysLeft: 3,
      type: "Coding",
      points: 100,
    },
    {
      id: 2,
      title: "React Hooks Deep Dive Quiz",
      course: "Web Development Bootcamp",
      dueDate: "Jan 30, 2025",
      daysLeft: 5,
      type: "Quiz",
      points: 50,
    },
    {
      id: 3,
      title: "Data Visualization Project",
      course: "Data Science with Python",
      dueDate: "Feb 5, 2025",
      daysLeft: 11,
      type: "Project",
      points: 200,
    },
  ];

  const completedAssignments = [
    {
      id: 4,
      title: "Linear Regression Exercise",
      course: "Machine Learning Fundamentals",
      submittedDate: "Jan 20, 2025",
      score: 92,
      maxScore: 100,
      feedback: true,
    },
    {
      id: 5,
      title: "JavaScript Basics Quiz",
      course: "Web Development Bootcamp",
      submittedDate: "Jan 18, 2025",
      score: 45,
      maxScore: 50,
      feedback: true,
    },
    {
      id: 6,
      title: "Python Fundamentals",
      course: "Data Science with Python",
      submittedDate: "Jan 15, 2025",
      score: 88,
      maxScore: 100,
      feedback: true,
    },
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
            <p className="text-muted-foreground">Track and submit your coursework</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-lg font-semibold text-foreground">85%</p>
            </div>
            <Progress value={85} className="w-32 h-2" />
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pendingAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedAssignments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
              >
                <div className="h-12 w-12 rounded-xl bg-lms-amber-light flex items-center justify-center">
                  <FileText className="h-6 w-6 text-lms-amber" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                    <Badge variant="secondary">{assignment.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className={assignment.daysLeft <= 3 ? "text-lms-rose font-medium" : "text-muted-foreground"}>
                      Due in {assignment.daysLeft} days
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{assignment.points} points</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Sparkles className="h-4 w-4 mr-1" />
                    AI Help
                  </Button>
                  <Button size="sm" className="bg-lms-blue hover:bg-lms-blue/90">
                    <Upload className="h-4 w-4 mr-1" />
                    Submit
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
              >
                <div className="h-12 w-12 rounded-xl bg-lms-emerald-light flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-lms-emerald" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1">{assignment.title}</h3>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-foreground">
                    {assignment.score}/{assignment.maxScore}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Submitted {assignment.submittedDate}
                  </p>
                </div>
                <div className="flex gap-2">
                  {assignment.feedback && (
                    <Button variant="outline" size="sm">
                      <Brain className="h-4 w-4 mr-1" />
                      AI Feedback
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* AI Insights */}
        <div className="bg-lms-purple-light border border-lms-purple/20 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-lms-purple flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">AI Performance Insights</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Based on your recent submissions, here's what AI has noticed:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-lms-emerald" />
                  Strong performance in Python programming (avg. 90%)
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <AlertCircle className="h-4 w-4 text-lms-amber" />
                  Consider reviewing calculus concepts for ML assignments
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-lms-emerald" />
                  Great improvement in quiz completion time
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
