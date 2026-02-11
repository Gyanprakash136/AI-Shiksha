import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Settings,
  Download,
  PanelRightClose,
  PanelRightOpen,
  FileDown,
  MessageCircle,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";

export default function CourseLearn() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showAITutor, setShowAITutor] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  const course = {
    title: "Complete React Development Masterclass",
    currentChapter: "Chapter 3: React Hooks",
    currentLesson: "useState Hook Deep Dive",
    progress: 42,
  };

  const chapters = [
    {
      title: "Chapter 1: Getting Started",
      lessons: [
        { title: "Course Introduction", duration: "8:30", completed: true },
        { title: "Setting Up Your Environment", duration: "15:00", completed: true },
        { title: "Your First React Component", duration: "12:45", completed: true },
      ],
    },
    {
      title: "Chapter 2: React Fundamentals",
      lessons: [
        { title: "Understanding JSX", duration: "18:20", completed: true },
        { title: "Props and State", duration: "22:10", completed: true },
        { title: "Practice Exercise", duration: "30:00", completed: true },
      ],
    },
    {
      title: "Chapter 3: React Hooks",
      lessons: [
        { title: "useState Hook Deep Dive", duration: "16:40", completed: false, current: true },
        { title: "useEffect Hook", duration: "24:30", completed: false },
        { title: "Custom Hooks", duration: "20:15", completed: false },
        { title: "Hooks Best Practices", duration: "18:00", completed: false },
      ],
    },
    {
      title: "Chapter 4: Advanced Patterns",
      lessons: [
        { title: "Context API", duration: "22:00", completed: false },
        { title: "Render Props", duration: "18:30", completed: false },
        { title: "Higher-Order Components", duration: "25:00", completed: false },
      ],
    },
  ];

  const resources = [
    { name: "Lesson Notes.pdf", size: "2.4 MB" },
    { name: "Source Code.zip", size: "1.2 MB" },
    { name: "Cheat Sheet.pdf", size: "450 KB" },
  ];

  const [aiConversation, setAiConversation] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI Tutor for this course. I'm here to help you understand React Hooks better. What would you like to know about useState?",
    },
  ]);

  const quickActions = [
    { icon: HelpCircle, label: "Explain This", action: "explain" },
    { icon: FileText, label: "Summarize", action: "summarize" },
    { icon: Brain, label: "Quiz Me", action: "quiz" },
    { icon: BookOpen, label: "Examples", action: "examples" },
  ];

  const handleSendMessage = () => {
    if (!aiMessage.trim()) return;
    setAiConversation([...aiConversation, { role: "user", content: aiMessage }]);
    setAiMessage("");
    setIsTyping(true);
    setTimeout(() => {
      setAiConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Great question! The useState hook allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update it.",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const messages: Record<string, string> = {
      explain: "Can you explain this concept in simpler terms?",
      summarize: "Please summarize the key points from this lesson.",
      quiz: "Quiz me on what I've learned so far.",
      examples: "Can you give me some practical examples?",
    };
    setAiConversation([...aiConversation, { role: "user", content: messages[action] }]);
    setIsTyping(true);
    setTimeout(() => {
      const responses: Record<string, string> = {
        explain: "useState is like a memory box for your component. You put something in (initial value), and React remembers it between renders.",
        summarize: "**Key Points:**\n• useState adds state to functional components\n• Returns [value, setter] array\n• State updates trigger re-renders",
        quiz: "**Question:** What does useState return?\n\nA) A single value\nB) An array with value and setter function\nC) A function only",
        examples: "**Toggle:**\n```jsx\nconst [isOpen, setIsOpen] = useState(false);\nsetIsOpen(!isOpen);\n```",
      };
      setAiConversation((prev) => [...prev, { role: "assistant", content: responses[action] }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <UnifiedDashboard>
      <div className="flex h-[calc(100vh-4rem)] bg-background">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Video Player - Udemy Style */}
          <div className="relative bg-black flex-shrink-0" style={{ aspectRatio: "16/9", maxHeight: "60vh" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-10 w-10 text-white" />
                ) : (
                  <Play className="h-10 w-10 text-white ml-1" />
                )}
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                </button>
                <div className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer group">
                  <div className="w-1/3 h-full bg-lms-blue rounded-full relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-lms-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <span className="text-sm text-white font-mono">5:32 / 16:40</span>
                <button className="hover:opacity-75"><Volume2 className="h-5 w-5 text-white" /></button>
                <button className="hover:opacity-75"><Settings className="h-5 w-5 text-white" /></button>
                <button className="hover:opacity-75"><Maximize className="h-5 w-5 text-white" /></button>
              </div>
            </div>
          </div>

          {/* Lesson Info Bar */}
          <div className="border-b bg-card px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-muted-foreground">{course.currentChapter}</p>
                <p className="font-medium">{course.currentLesson}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <Button size="sm" className="gap-2 bg-lms-emerald hover:bg-lms-emerald/90">
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Mark Complete</span>
              </Button>
              <Button size="sm" className="gap-2 bg-lms-blue hover:bg-lms-blue/90">
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant={showAITutor ? "default" : "outline"}
                size="sm"
                className={cn("gap-2", showAITutor && "bg-lms-purple hover:bg-lms-purple/90")}
                onClick={() => setShowAITutor(!showAITutor)}
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">AI Tutor</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(!showSidebar)}
                className="hidden lg:flex"
              >
                {showSidebar ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Tabs - Overview, Resources, Notes, Q&A */}
          <div className="flex-1 overflow-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-4 h-12">
                <TabsTrigger value="content" className="data-[state=active]:border-b-2 data-[state=active]:border-lms-blue rounded-none">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:border-b-2 data-[state=active]:border-lms-blue rounded-none">
                  Resources
                </TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:border-b-2 data-[state=active]:border-lms-blue rounded-none">
                  Notes
                </TabsTrigger>
                <TabsTrigger value="qa" className="data-[state=active]:border-b-2 data-[state=active]:border-lms-blue rounded-none">
                  Q&A
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-3">About this lesson</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In this lesson, we'll take a deep dive into the useState hook - one of the most fundamental hooks in React. 
                    You'll learn how to manage state in functional components, understand the rules of hooks, 
                    and see practical examples of common patterns.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What you'll learn</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-lms-emerald" />
                      How useState works under the hood
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-lms-emerald" />
                      Managing different types of state (primitives, objects, arrays)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-lms-emerald" />
                      Best practices and common pitfalls
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="p-6">
                <h2 className="text-xl font-bold mb-4">Downloadable Resources</h2>
                <div className="space-y-3">
                  {resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileDown className="h-5 w-5 text-lms-blue" />
                        <div>
                          <p className="font-medium">{resource.name}</p>
                          <p className="text-sm text-muted-foreground">{resource.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="notes" className="p-6">
                <h2 className="text-xl font-bold mb-4">Your Notes</h2>
                <Textarea placeholder="Take notes while watching..." className="min-h-[200px]" />
                <Button className="mt-4">Save Notes</Button>
              </TabsContent>

              <TabsContent value="qa" className="p-6">
                <h2 className="text-xl font-bold mb-4">Questions & Answers</h2>
                <Button className="gap-2 mb-6">
                  <MessageCircle className="h-4 w-4" />
                  Ask a Question
                </Button>
                <div className="space-y-4">
                  <p className="text-muted-foreground">No questions yet. Be the first to ask!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Course Content Sidebar - Udemy Style */}
        {showSidebar && (
          <aside className="w-96 border-l bg-card flex-col hidden lg:flex">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Course content</h3>
                <button onClick={() => setShowSidebar(false)}>
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={course.progress} className="flex-1 h-2" />
                <span className="text-sm text-muted-foreground">{course.progress}%</span>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="divide-y">
                {chapters.map((chapter, chapterIndex) => (
                  <div key={chapterIndex}>
                    <div className="p-4 bg-muted/30">
                      <p className="font-medium text-sm">{chapter.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {chapter.lessons.filter(l => l.completed).length}/{chapter.lessons.length} completed
                      </p>
                    </div>
                    <div>
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <button
                          key={lessonIndex}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors border-l-2",
                            lesson.current
                              ? "bg-lms-blue/10 border-l-lms-blue"
                              : "border-l-transparent hover:bg-muted/50"
                          )}
                        >
                          <div className="shrink-0">
                            {lesson.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-lms-emerald" />
                            ) : lesson.current ? (
                              <Play className="h-4 w-4 text-lms-blue" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn("truncate", lesson.current && "font-medium text-lms-blue")}>
                              {lesson.title}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </aside>
        )}

        {/* AI Tutor Panel - Only shows when toggled */}
        {showAITutor && (
          <aside className="w-96 border-l bg-card flex flex-col hidden xl:flex">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-lms-purple flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Tutor</h3>
                  <p className="text-xs text-muted-foreground">Context: {course.currentLesson}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowAITutor(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-b">
              <div className="grid grid-cols-4 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
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
                  <div key={index} className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}>
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                      message.role === "assistant" ? "bg-lms-purple" : "bg-lms-blue"
                    )}>
                      {message.role === "assistant" ? (
                        <Sparkles className="h-4 w-4 text-white" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={cn(
                      "flex-1 rounded-xl p-3 text-sm",
                      message.role === "assistant" ? "bg-muted" : "bg-lms-blue text-white"
                    )}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-lms-purple flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-lms-purple" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask about this lesson..."
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="resize-none"
                  rows={2}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!aiMessage.trim() || isTyping}
                  className="bg-lms-purple hover:bg-lms-purple/90 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </UnifiedDashboard>
  );
}
