import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
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
  Sparkles,
  Lock,
  MoreVertical,
  LogOut,
  User as UserIcon,
  Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Courses, Completions } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarLogo } from "@/components/layout/SidebarLogo";
import QuizPlayer from "@/components/learn/QuizPlayer";
import AssignmentPlayer from "@/components/learn/AssignmentPlayer";

interface SectionItem {
  id: string;
  slug?: string;
  title: string;
  type: string;
  duration_minutes?: number;
  order_index: number;
  content?: any;
  lecture_content?: {
    id: string;
    video_url?: string;
    video_provider?: string;
    subtitles_url?: string;
    transcript?: string;
    text_content?: string;
    file_url?: string;
    external_link?: string;
  };
  sectionItemProgresses?: { completed: boolean }[];
  description?: string;
  quiz_id?: string;
  assignment?: { id: string };
}

interface Section {
  id: string;
  title: string;
  description?: string;
  order_index: number;
  items: SectionItem[];
}

interface Course {
  id: string;
  slug?: string;
  title: string;
  sections: Section[];
  enrollments?: { progress_percentage: number }[];
}

export default function LessonPlayer() {
  const { courseSlug, lessonSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [currentItem, setCurrentItem] = useState<SectionItem | null>(null);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionTime, setSessionTime] = useState(0); // In seconds
  const [showExitModal, setShowExitModal] = useState(false);

  // New Design State
  const [sidebarTab, setSidebarTab] = useState("content"); // content | ai
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  useEffect(() => {
    const loadLesson = async () => {
      if (!courseSlug || !lessonSlug) return;

      try {
        if (lessonSlug === 'intro') {
          navigate(`/course/${courseSlug}/view`);
          return;
        }

        setLoading(true);
        const { SectionItems } = await import('@/lib/api');
        const lessonData = await SectionItems.getBySlug(courseSlug, lessonSlug);

        setCurrentItem(lessonData);
        setCurrentSection(lessonData.section);
        setCourse(lessonData.section.course);

        // Ensure current module is expanded when loading a new lesson, 
        // but don't collapse others if they are already open
        setExpandedModules(prev => {
          const currentSectionId = lessonData.section.id;
          if (!prev.includes(currentSectionId)) {
            return [...prev, currentSectionId];
          }
          return prev;
        });

      } catch (error: any) {
        console.error('Failed to load lesson:', error);
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to load lesson",
          variant: "destructive",
        });
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [courseSlug, lessonSlug, toast, navigate]);

  // Track Access
  useEffect(() => {
    if (course && currentItem) {
      Completions.logAccess(course.id, currentItem.id).catch(console.error);
    }
  }, [course?.id, currentItem?.id]);

  // Track Time (Session Timer + Heartbeat)
  useEffect(() => {
    if (!course?.id) return;

    // Restore timer from localStorage based on COURSE ID, not lesson slug
    const storageKey = `course_timer_${course.id}`;
    const savedTime = localStorage.getItem(storageKey);

    if (savedTime) {
      setSessionTime(parseInt(savedTime, 10));
    } else {
      setSessionTime(0);
    }

    // Increment session timer every second and save to localStorage
    const timerInterval = setInterval(() => {
      setSessionTime((prev) => {
        const newTime = prev + 1;
        localStorage.setItem(storageKey, newTime.toString());
        return newTime;
      });
    }, 1000);

    // Sync to backend every 60s
    const syncInterval = setInterval(() => {
      Completions.updateTimeSpent(1).catch(console.error);
    }, 60000); // 1 minute

    return () => {
      clearInterval(timerInterval);
      clearInterval(syncInterval);
    };
  }, [course?.id]); // Only re-run when course ID changes, NOT lessonSlug

  const calculateProgress = () => {
    if (course?.enrollments && course.enrollments.length > 0) {
      return course.enrollments[0].progress_percentage || 0;
    }
    return 0;
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getVideoUrl = () => {
    return currentItem?.lecture_content?.video_url || currentItem?.content?.video_url;
  };

  const isYoutube = () => {
    const url = getVideoUrl();
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  // Helper to format content (handle double stringified JSON)
  const formatContent = (content: string | any) => {
    if (!content) return '';
    if (typeof content !== 'string') return JSON.stringify(content);

    // Check if it's a stringified JSON string (starts and ends with quotes)
    if (content.startsWith('"') && content.endsWith('"')) {
      try {
        return JSON.parse(content);
      } catch (e) {
        return content;
      }
    }
    return content;
  };

  const getNextLesson = () => {
    if (!course?.sections || !currentItem || !currentSection) return null;

    const currentSectionItems = currentSection.items?.sort((a, b) => a.order_index - b.order_index) || [];
    const currentIndex = currentSectionItems.findIndex(item => item.id === currentItem.id);

    if (currentIndex < currentSectionItems.length - 1) {
      return currentSectionItems[currentIndex + 1];
    }

    const sections = course.sections.sort((a, b) => a.order_index - b.order_index);
    const sectionIndex = sections.findIndex(s => s.id === currentSection.id);

    if (sectionIndex < sections.length - 1) {
      const nextSection = sections[sectionIndex + 1];
      const firstItem = nextSection.items?.sort((a, b) => a.order_index - b.order_index)[0];
      return firstItem || null;
    }

    return null;
  };

  const handleNext = () => {
    const nextLesson = getNextLesson();
    if (nextLesson && course?.slug) {
      navigate(`/learn/${course.slug}/lesson/${nextLesson.slug}`);
    }
  };

  const handleMarkComplete = async () => {
    if (!currentItem) return;
    try {
      await Completions.markLessonComplete(currentItem.id);

      // Update local state to reflect completion immediately
      if (currentItem && course) {
        // Optimistically update the current item's progress
        const updatedItem = {
          ...currentItem,
          sectionItemProgresses: [{ completed: true }]
        };
        setCurrentItem(updatedItem);

        // Update the item in the course structure as well
        const updatedSections = course.sections.map(section => ({
          ...section,
          items: section.items.map(item =>
            item.id === currentItem.id
              ? { ...item, sectionItemProgresses: [{ completed: true }] }
              : item
          )
        }));
        setCourse({ ...course, sections: updatedSections });
      }

      toast({
        title: "Lesson Completed",
        description: "Progress saved successfully",
      });
      handleNext();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark lesson as complete",
        variant: "destructive",
      });
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatSessionTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  };



  // ... (previous code)

  // Internal Component for Sidebar Content to reuse in Desktop and Mobile
  // Extracted to avoid re-renders on parent state change
  const sidebarProps = {
    sidebarTab,
    setSidebarTab,
    course,
    currentSection,
    lessonSlug,
    navigate,
    calculateProgress,
    formatDuration,
    expandedModules,
    setExpandedModules
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!course || !currentItem) return null;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-4 lg:px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setShowExitModal(true)}>
            <X className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3 border-l pl-4 h-8">
            <SidebarLogo collapsed={true} />
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold leading-none">{currentItem.title}</h1>
              <p className="text-xs text-muted-foreground mt-1 truncate max-w-[300px]">
                {currentSection?.title}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Sidebar Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-80 sm:w-[400px]">
              <SheetContent side="right" className="p-0 w-80 sm:w-[400px]">
                <SidebarContent {...sidebarProps} />
              </SheetContent>
            </SheetContent>
          </Sheet>

          {/* Session Timer */}
          <div className="hidden md:flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
            <Clock className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span className="text-xs font-mono font-medium text-primary">{formatSessionTime(sessionTime)}</span>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-full">
            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium">{formatDuration(currentItem.duration_minutes)}</span>
          </div>
          <Button
            className="hidden sm:flex bg-primary hover:bg-primary/90 text-white rounded-full px-6"
            onClick={handleMarkComplete}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark as Complete
          </Button>

          {/* Mobile Mark Complete (Icon Only) */}
          <Button
            className="flex sm:hidden bg-primary hover:bg-primary/90 text-white rounded-full p-2 h-8 w-8"
            onClick={handleMarkComplete}
          >
            <CheckCircle2 className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar_url} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr,400px] overflow-hidden">

        {/* Left Column - Video & Content */}
        <div className="h-full overflow-y-auto scrollbar-thin">
          <div className="p-4 md:p-6 lg:p-8 pb-24 max-w-5xl mx-auto space-y-6 md:space-y-8">

            {/* Video Player */}
            {getVideoUrl() && (
              <div className="relative aspect-video bg-black rounded-xl md:rounded-2xl overflow-hidden shadow-lg group">
                {isYoutube() ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYoutubeId(getVideoUrl())}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={getVideoUrl()}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay={false}
                      onEnded={() => {
                        // Optional: Auto-mark complete? 
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Lesson Title & Info - Hide for Quiz/Assignment */}
            {currentItem.type !== "QUIZ" && currentItem.type !== "ASSIGNMENT" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                    Lesson {currentItem.order_index + 1}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{currentItem.title}</h2>
                {/* Show Section Description if available */}
                {currentSection?.description && (
                  <div className="text-base md:text-lg text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: currentSection.description }} />
                )}
              </div>
            )}

            {/* Content Logic Check */}
            {currentItem.type === "QUIZ" && currentItem.quiz_id ? (
              <QuizPlayer
                quizId={currentItem.quiz_id}
                onComplete={handleMarkComplete}
              />
            ) : currentItem.type === "ASSIGNMENT" && currentItem.assignment?.id ? (
              <AssignmentPlayer
                assignmentId={currentItem.assignment.id}
                onComplete={handleMarkComplete}
              />
            ) : (
              /* Default Lecture Content with Tabs */
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none gap-8 overflow-x-auto no-scrollbar">
                  {["Overview", "Resources", "Q&A"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab.toLowerCase()}
                      className="rounded-none border-b-2 border-transparent px-0 py-3 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent text-muted-foreground font-medium whitespace-nowrap"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="overview" className="mt-8 space-y-6 animate-in slide-in-from-bottom-2 duration-500">
                  <div className="prose prose-gray max-w-none">
                    <h3 className="text-xl font-semibold mb-8">Course Content Overview</h3>
                    {currentItem.description ? (
                      <div dangerouslySetInnerHTML={{ __html: currentItem.description }} />
                    ) : currentItem.lecture_content?.text_content ? (
                      <div dangerouslySetInnerHTML={{
                        __html: formatContent(currentItem.lecture_content.text_content)
                      }} />
                    ) : currentItem.content?.text_content ? (
                      <div dangerouslySetInnerHTML={{
                        __html: formatContent(currentItem.content.text_content)
                      }} />
                    ) : (
                      <p className="text-muted-foreground">
                        No description available for this lesson.
                      </p>
                    )}
                  </div>
                </TabsContent>

                {/* Resources Tab Placeholder */}
                <TabsContent value="resources" className="mt-8">
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <p>No additional resources available for this lesson.</p>
                  </div>
                </TabsContent>

                {/* Q&A Tab Placeholder */}
                <TabsContent value="q&a" className="mt-8">
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <p>Q&A section is coming soon.</p>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {/* Exit Modal */}
            <Dialog open={showExitModal} onOpenChange={setShowExitModal}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Leaving so soon?</DialogTitle>
                  <DialogDescription>
                    Your progress is saved. Here is a summary of your session.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg border">
                      <Clock className="h-8 w-8 text-primary mb-2" />
                      <span className="text-2xl font-bold">{formatSessionTime(sessionTime)}</span>
                      <span className="text-xs text-muted-foreground">Time Spent</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg border">
                      <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                      <span className="text-2xl font-bold">{Math.round(calculateProgress())}%</span>
                      <span className="text-xs text-muted-foreground">Course Progress</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowExitModal(false)}>
                    Continue Learning
                  </Button>
                  <Button onClick={() => {
                    if (course?.id) localStorage.removeItem(`course_timer_${course.id}`);
                    navigate('/dashboard');
                  }}>
                    Final Exit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>


          </div>
        </div>

        {/* Right Sidebar - Desktop Only (Hidden on Mobile) */}
        <div className="hidden lg:flex border-l bg-white flex-col h-full">
          <div className="hidden lg:flex border-l bg-white flex-col h-full">
            <SidebarContent {...sidebarProps} />
          </div>
        </div>
      </div >
    </div >
  );
}

// Extracted Sidebar Component to prevent re-renders
interface SidebarContentProps {
  sidebarTab: string;
  setSidebarTab: (tab: string) => void;
  course: Course | null;
  currentSection: Section | null;
  lessonSlug?: string;
  navigate: (path: string) => void;
  calculateProgress: () => number;
  formatDuration: (minutes?: number) => string;
  expandedModules: string[];
  setExpandedModules: (value: string[]) => void;
}

const SidebarContent = ({
  sidebarTab,
  setSidebarTab,
  course,
  currentSection,
  lessonSlug,
  navigate,
  calculateProgress,
  formatDuration,
  expandedModules,
  setExpandedModules
}: SidebarContentProps) => (
  <div className="flex flex-col h-full bg-white overflow-hidden">
    {/* Sidebar Tabs */}
    <Tabs value={sidebarTab} onValueChange={setSidebarTab} className="w-full flex flex-col h-full overflow-hidden">
      <div className="px-6 pt-6 pb-2 shrink-0">
        <TabsList className="w-full grid grid-cols-2 bg-muted/50 p-1">
          <TabsTrigger value="content" className="gap-2">
            <BookOpen className="h-4 w-4" /> Content
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-2">
            <Sparkles className="h-4 w-4" /> AI Assistant
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Course Content Tab */}
      <TabsContent value="content" className="flex-1 flex flex-col min-h-0 mt-0 data-[state=inactive]:hidden overflow-hidden">
        {/* Progress Section */}
        <div className="px-6 py-4 border-b shrink-0">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Your Progress</span>
            <span className="text-sm font-bold text-primary">{calculateProgress()}% Completed</span>
          </div>
          <Progress value={calculateProgress()} className="h-2 bg-muted [&>div]:bg-primary" />
        </div>

        {/* Modules Accordion */}
        <div className="flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
          <Accordion
            type="multiple"
            value={expandedModules}
            onValueChange={setExpandedModules}
            className="w-full"
          >
            {course?.sections.sort((a, b) => a.order_index - b.order_index).map((section) => (
              <AccordionItem key={section.id} value={section.id} className="border-b-0">
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 data-[state=open]:bg-muted/30">
                  <div className="text-left">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Module {section.order_index + 1}
                    </p>
                    <p className="font-semibold text-sm">{section.title}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="flex flex-col">
                    {section.items?.sort((a, b) => a.order_index - b.order_index).map((item) => {
                      const isActive = item.slug === lessonSlug;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            navigate(`/learn/${course.slug}/lesson/${item.slug}`);
                          }}
                          className={cn(
                            "flex items-start gap-4 px-6 py-4 transition-all border-l-[3px]",
                            isActive
                              ? "bg-primary/5 border-l-primary"
                              : "border-l-transparent hover:bg-muted/30"
                          )}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isActive ? (
                              <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shadow-sm">
                                <Play className="h-2.5 w-2.5 text-white fill-white ml-0.5" />
                              </div>
                            ) : item.sectionItemProgresses?.[0]?.completed ? (
                              <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                              </div>
                            )}
                          </div>
                          <div className="text-left space-y-1">
                            <p className={cn(
                              "text-sm font-medium leading-snug",
                              isActive ? "text-primary" : "text-gray-700"
                            )}>
                              {item.order_index + 1}. {item.title}
                            </p>
                            <div className="flex items-center gap-2">
                              {isActive && (
                                <span className="text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
                                  Playing
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {formatDuration(item.duration_minutes)}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </TabsContent>

      {/* AI Assistant Tab - Coming Soon */}
      <TabsContent value="ai" className="flex-1 flex flex-col items-center justify-center p-8 text-center mt-0 data-[state=inactive]:hidden">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="bg-primary/10 p-6 rounded-full mb-6 animate-pulse">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">AI Assistant Coming Soon</h3>
          <p className="text-muted-foreground mb-8 max-w-[260px] mx-auto">
            We're building an intelligent tutor to help you learn faster and answer your questions 24/7.
          </p>
          <Button variant="outline" onClick={() => setSidebarTab("content")}>
            Back to Content
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);
