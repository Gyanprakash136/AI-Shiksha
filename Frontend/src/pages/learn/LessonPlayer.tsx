import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
  Send,
  BookOpen,
  HelpCircle,
  FileText,
  Brain,
  X,
  Settings,
  Download,
  Menu,
  FileDown,
  MessageCircle,
  Loader2,
  Clock,
  ArrowLeft,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showAITutor, setShowAITutor] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const course = {
    id: courseId,
    title: "Machine Learning Specialization",
    provider: "Stanford University",
    progress: 42,
  };

  const currentLesson = {
    id: lessonId,
    title: "Linear Regression with One Variable",
    chapter: "Week 1: Introduction to Machine Learning",
    duration: "23:45",
  };

  const chapters = [
    {
      title: "Week 1: Introduction to Machine Learning",
      lessons: [
        { id: "1", title: "Welcome to Machine Learning", duration: "8:30", completed: true },
        { id: "2", title: "What is Machine Learning?", duration: "15:00", completed: true },
        { id: "3", title: "Supervised Learning", duration: "12:45", completed: true },
        { id: "4", title: "Linear Regression with One Variable", duration: "23:45", completed: false, current: true },
        { id: "5", title: "Cost Function", duration: "18:20", completed: false },
      ],
    },
    {
      title: "Week 2: Regression with Multiple Variables",
      lessons: [
        { id: "6", title: "Multiple Features", duration: "18:20", completed: false },
        { id: "7", title: "Gradient Descent for Multiple Variables", duration: "22:10", completed: false },
        { id: "8", title: "Feature Normalization", duration: "25:00", completed: false },
        { id: "9", title: "Practice Quiz", duration: "20 min", completed: false, type: "quiz" },
      ],
    },
    {
      title: "Week 3: Classification",
      lessons: [
        { id: "10", title: "Classification and Representation", duration: "22:00", completed: false },
        { id: "11", title: "Logistic Regression", duration: "18:30", completed: false },
        { id: "12", title: "Programming Assignment", duration: "2 hours", completed: false, type: "assignment" },
      ],
    },
  ];

  const resources = [
    { name: "Week 1 Slides.pdf", size: "2.4 MB" },
    { name: "Practice Dataset.csv", size: "1.2 MB" },
    { name: "Lecture Notes.pdf", size: "450 KB" },
  ];

  const [aiConversation, setAiConversation] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI tutor. I can help explain concepts, answer questions, or quiz you on this material. What would you like to know?",
    },
  ]);

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
          content: "Linear regression is a method for predicting a continuous output variable based on input features. The key idea is to find the best-fit line that minimizes the difference between predicted and actual values.",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const CurriculumContent = () => (
    <div className="divide-y divide-border">
      {chapters.map((chapter, chapterIndex) => (
        <div key={chapterIndex}>
          <div className="p-4 bg-muted/50">
            <p className="font-semibold text-sm">{chapter.title}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {chapter.lessons.filter((l) => l.completed).length}/{chapter.lessons.length} completed
            </p>
          </div>
          <div>
            {chapter.lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => navigate(`/learn/${courseId}/lesson/${lesson.id}`)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors border-l-2",
                  lesson.current
                    ? "bg-coursera-blue-light border-l-coursera-blue"
                    : "border-l-transparent hover:bg-muted/50"
                )}
              >
                <div className="shrink-0">
                  {lesson.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-coursera-green" />
                  ) : lesson.current ? (
                    <Play className="h-4 w-4 text-coursera-blue" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("truncate", lesson.current && "font-medium text-coursera-blue")}>
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
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b bg-white flex items-center justify-between px-4 shrink-0 shadow-nav">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard/my-courses")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Exit</span>
          </Button>
          <div className="hidden sm:block border-l pl-4">
            <p className="text-sm font-semibold truncate max-w-[300px]">{course.title}</p>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-coursera-green transition-all" 
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{course.progress}% complete</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showAITutor ? "default" : "outline"}
            size="sm"
            className={cn("gap-2", showAITutor && "bg-coursera-purple hover:bg-coursera-purple/90")}
            onClick={() => setShowAITutor(!showAITutor)}
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI Tutor</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Course Content</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-4rem)]">
                <CurriculumContent />
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
            className="hidden lg:flex"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video & Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Video Player */}
          <div className="relative bg-black" style={{ aspectRatio: "16/9", maxHeight: "65vh" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-10 w-10 text-white" />
                ) : (
                  <Play className="h-10 w-10 text-white ml-1" />
                )}
              </button>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                </button>
                <div className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer group">
                  <div className="w-1/3 h-full bg-coursera-blue rounded-full relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <span className="text-sm text-white font-mono">8:12 / {currentLesson.duration}</span>
                <button className="hover:opacity-75 hidden sm:block"><Volume2 className="h-5 w-5 text-white" /></button>
                <button className="hover:opacity-75 hidden sm:block"><Settings className="h-5 w-5 text-white" /></button>
                <button className="hover:opacity-75"><Maximize className="h-5 w-5 text-white" /></button>
              </div>
            </div>
          </div>

          {/* Lesson Navigation */}
          <div className="border-b bg-white px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
            <div>
              <p className="text-xs text-muted-foreground">{currentLesson.chapter}</p>
              <p className="font-semibold">{currentLesson.title}</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none gap-2">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <Button size="sm" className="flex-1 sm:flex-none gap-2 bg-coursera-green hover:bg-coursera-green/90">
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Mark Complete</span>
              </Button>
              <Button size="sm" className="flex-1 sm:flex-none gap-2 bg-coursera-blue hover:bg-coursera-blue-hover">
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex-1 overflow-auto bg-muted/30">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="w-full justify-start bg-white border-b px-4 h-12 rounded-none">
                <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-coursera-blue rounded-none data-[state=active]:shadow-none">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:border-b-2 data-[state=active]:border-coursera-blue rounded-none data-[state=active]:shadow-none">
                  Resources
                </TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:border-b-2 data-[state=active]:border-coursera-blue rounded-none data-[state=active]:shadow-none">
                  Notes
                </TabsTrigger>
                <TabsTrigger value="discussion" className="data-[state=active]:border-b-2 data-[state=active]:border-coursera-blue rounded-none data-[state=active]:shadow-none">
                  Discussion
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-6 space-y-6">
                <div className="bg-white border p-6 max-w-3xl">
                  <h2 className="text-lg font-bold mb-3">About this lesson</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In this lesson, you'll learn about linear regression with one variable (univariate linear regression).
                    We'll cover the model representation, cost function, and how to use gradient descent to minimize the cost.
                  </p>
                </div>
                <div className="bg-white border p-6 max-w-3xl">
                  <h3 className="font-semibold mb-3">Learning objectives</h3>
                  <div className="grid gap-2">
                    {[
                      "Understand the model representation for linear regression",
                      "Define and compute the cost function",
                      "Implement gradient descent for optimization",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted/30">
                        <CheckCircle2 className="h-5 w-5 text-coursera-green shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="p-6">
                <div className="bg-white border p-6 max-w-xl">
                  <h2 className="text-lg font-bold mb-4">Downloadable Resources</h2>
                  <div className="space-y-3">
                    {resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileDown className="h-5 w-5 text-coursera-blue" />
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
                </div>
              </TabsContent>

              <TabsContent value="notes" className="p-6">
                <div className="bg-white border p-6 max-w-xl">
                  <h2 className="text-lg font-bold mb-4">Your Notes</h2>
                  <Textarea placeholder="Take notes while watching..." className="min-h-[200px] resize-none" />
                  <Button className="mt-4 bg-coursera-blue hover:bg-coursera-blue-hover">Save Notes</Button>
                </div>
              </TabsContent>

              <TabsContent value="discussion" className="p-6">
                <div className="bg-white border p-6 max-w-xl">
                  <h2 className="text-lg font-bold mb-4">Discussion Forum</h2>
                  <Button className="gap-2 bg-coursera-blue hover:bg-coursera-blue-hover mb-4">
                    <MessageCircle className="h-4 w-4" />
                    Ask a Question
                  </Button>
                  <p className="text-muted-foreground">Join the discussion with other learners and teaching assistants.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Curriculum Sidebar - Desktop */}
        {showSidebar && (
          <aside className="w-80 xl:w-96 border-l bg-white flex-col hidden lg:flex shrink-0">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Course content</h3>
              <button onClick={() => setShowSidebar(false)}>
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <ScrollArea className="flex-1">
              <CurriculumContent />
            </ScrollArea>
          </aside>
        )}

        {/* AI Tutor Panel */}
        {showAITutor && (
          <aside className="w-80 xl:w-96 border-l bg-white flex flex-col hidden md:flex shrink-0">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-coursera-purple flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">AI Tutor</p>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <button onClick={() => setShowAITutor(false)}>
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {aiConversation.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-3 text-sm",
                      msg.role === "assistant"
                        ? "bg-muted rounded-lg"
                        : "bg-coursera-blue text-white rounded-lg ml-4"
                    )}
                  >
                    {msg.content}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2 mb-3">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <HelpCircle className="h-3 w-3 mr-1" />
                  Explain
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <Brain className="h-3 w-3 mr-1" />
                  Quiz Me
                </Button>
              </div>
              <div className="flex gap-2">
                <Textarea
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  placeholder="Ask anything about this lesson..."
                  className="min-h-[60px] resize-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!aiMessage.trim() || isTyping}
                  className="bg-coursera-purple hover:bg-coursera-purple/90 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
