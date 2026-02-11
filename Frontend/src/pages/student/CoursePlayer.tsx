import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Maximize,
  CheckCircle2,
  Circle,
  Sparkles,
  Send,
  BookOpen,
  HelpCircle,
  FileText,
  Brain,
  MessageSquare,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoursePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAITutor, setShowAITutor] = useState(true);
  const [aiMessage, setAiMessage] = useState("");

  const course = {
    title: "Machine Learning Fundamentals",
    currentChapter: "Chapter 3: Neural Networks",
    currentLesson: "Introduction to Neural Networks",
    progress: 32,
  };

  const chapters = [
    {
      title: "Chapter 1: Introduction to ML",
      lessons: [
        { title: "What is Machine Learning?", duration: "12:30", completed: true },
        { title: "Types of Machine Learning", duration: "15:45", completed: true },
        { title: "Setting Up Your Environment", duration: "20:00", completed: true },
      ],
    },
    {
      title: "Chapter 2: Linear Regression",
      lessons: [
        { title: "Understanding Linear Regression", duration: "18:20", completed: true },
        { title: "Implementation in Python", duration: "25:10", completed: true },
        { title: "Practice Exercise", duration: "30:00", completed: true },
      ],
    },
    {
      title: "Chapter 3: Neural Networks",
      lessons: [
        { title: "Introduction to Neural Networks", duration: "22:15", completed: false, current: true },
        { title: "Activation Functions", duration: "16:40", completed: false },
        { title: "Backpropagation Explained", duration: "28:30", completed: false },
        { title: "Building Your First Neural Network", duration: "35:00", completed: false },
      ],
    },
    {
      title: "Chapter 4: Deep Learning",
      lessons: [
        { title: "Introduction to Deep Learning", duration: "20:00", completed: false },
        { title: "Convolutional Neural Networks", duration: "32:00", completed: false },
      ],
    },
  ];

  const aiConversation = [
    {
      role: "assistant",
      content: "Hi! I'm your AI Tutor for this course. I can help you understand concepts, answer questions, and even quiz you on the material. What would you like to know?",
    },
  ];

  const quickActions = [
    { icon: HelpCircle, label: "Explain This", action: "explain" },
    { icon: FileText, label: "Summarize", action: "summarize" },
    { icon: Brain, label: "Quiz Me", action: "quiz" },
    { icon: BookOpen, label: "Give Examples", action: "examples" },
  ];

  return (
    <div className="flex min-h-screen bg-lms-navy">
      {/* Sidebar - Chapter Navigation */}
      <aside className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/student" className="flex items-center gap-2 text-sidebar-foreground hover:text-white mb-4">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
          <h2 className="font-semibold text-sidebar-foreground">{course.title}</h2>
          <div className="flex items-center gap-2 mt-2">
            <Progress value={course.progress} className="flex-1 h-2" />
            <span className="text-xs text-sidebar-muted">{course.progress}%</span>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {chapters.map((chapter, chapterIndex) => (
              <div key={chapterIndex} className="mb-4">
                <h3 className="px-3 py-2 text-sm font-medium text-sidebar-foreground">
                  {chapter.title}
                </h3>
                <div className="space-y-1">
                  {chapter.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lessonIndex}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg text-sm transition-colors",
                        lesson.current
                          ? "bg-lms-blue text-white"
                          : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      {lesson.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-lms-emerald shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{lesson.title}</p>
                        <p className="text-xs opacity-60">{lesson.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content - Video Player */}
      <div className="flex-1 flex flex-col">
        {/* Video Area */}
        <div className="flex-1 bg-black relative flex items-center justify-center">
          <div className="text-center">
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-10 w-10 text-white" />
              ) : (
                <Play className="h-10 w-10 text-white ml-2" />
              )}
            </div>
            <p className="text-white/60">Video Player</p>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white" />
                )}
              </button>
              <div className="flex-1 h-1 bg-white/20 rounded-full">
                <div className="w-1/3 h-full bg-lms-blue rounded-full" />
              </div>
              <span className="text-sm text-white">7:23 / 22:15</span>
              <Volume2 className="h-5 w-5 text-white" />
              <Maximize className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-lms-navy-light p-4 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm">{course.currentChapter}</p>
            <p className="text-white font-medium">{course.currentLesson}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button size="sm" className="bg-lms-blue hover:bg-lms-blue/90">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "border-white/20 hover:bg-white/10",
                showAITutor ? "bg-lms-purple text-white" : "text-white"
              )}
              onClick={() => setShowAITutor(!showAITutor)}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              AI Tutor
            </Button>
          </div>
        </div>
      </div>

      {/* AI Tutor Panel */}
      {showAITutor && (
        <aside className="w-96 bg-card border-l border-border flex flex-col h-screen">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-lms-purple flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Tutor</h3>
                <p className="text-xs text-muted-foreground">Context: {course.currentLesson}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowAITutor(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-b border-border">
            <div className="grid grid-cols-4 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.action}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <action.icon className="h-4 w-4 text-lms-purple" />
                  <span className="text-xs text-muted-foreground">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conversation */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {aiConversation.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                      message.role === "assistant" ? "bg-lms-purple" : "bg-lms-blue"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Sparkles className="h-4 w-4 text-white" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "flex-1 rounded-xl p-3 text-sm",
                      message.role === "assistant"
                        ? "bg-muted text-foreground"
                        : "bg-lms-blue text-white"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask a question about this lesson..."
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                className="resize-none"
                rows={2}
              />
              <Button size="icon" className="bg-lms-purple hover:bg-lms-purple/90 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
