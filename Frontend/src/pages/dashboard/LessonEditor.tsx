import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Video,
  FileText,
  Upload,
  Sparkles,
  Plus,
  Trash2,
  Eye,
  Loader2,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AI } from "@/lib/api";

export default function LessonEditor() {
  const { courseId, lessonId } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [lessonType, setLessonType] = useState("video");
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizTopic, setQuizTopic] = useState("");
  const [quizLevel, setQuizLevel] = useState("beginner");
  const [quizCount, setQuizCount] = useState("4");

  const handleGenerateQuiz = async () => {
    if (!lessonId) return;
    setIsGeneratingQuiz(true);
    setIsQuizModalOpen(false);
    try {
      const response = await AI.generateQuiz(lessonId, quizTopic, quizLevel, parseInt(quizCount));
      if (response?.data?.questions) {
        setQuestions(response.data.questions);
        setLessonType("quiz");
      }
    } catch (error) {
      console.error("Failed to generate quiz", error);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const aiSuggestions = [
    "Add a real-world example here",
    "Consider adding a quiz after this section",
    "This concept might need more explanation",
  ];

  return (
    <UnifiedDashboard title="Edit Lesson">
      <div className="page-container max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to={`/dashboard/courses/${courseId}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2 bg-lms-blue hover:bg-lms-blue/90"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Lesson Title</Label>
                  <Input defaultValue="Introduction to Neural Networks" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Description</Label>
                    <Button variant="ghost" size="sm" className="gap-1 text-lms-purple">
                      <Sparkles className="h-4 w-4" />
                      Generate with AI
                    </Button>
                  </div>
                  <Textarea
                    defaultValue="In this lesson, you'll learn the fundamentals of neural networks, including how they work and why they're important in machine learning."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Lesson Type</Label>
                    <Select value={lessonType} onValueChange={setLessonType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Lesson</SelectItem>
                        <SelectItem value="text">Text/Article</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (minutes)</Label>
                    <Input type="number" defaultValue="22" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Based on Type */}
            {lessonType === "video" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-lms-blue" />
                    Video Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Upload Video</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      MP4, WebM, or MOV up to 2GB
                    </p>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Choose File
                    </Button>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Or paste a video URL (YouTube, Vimeo)
                  </div>
                  <Input placeholder="https://youtube.com/watch?v=..." />
                </CardContent>
              </Card>
            )}

            {lessonType === "text" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-lms-purple" />
                    Text Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Write your lesson content here..."
                    className="min-h-[400px]"
                  />
                </CardContent>
              </Card>
            )}

            {lessonType === "quiz" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-lms-amber" />
                      Quiz Questions
                    </CardTitle>
                    <Button variant="outline" className="gap-2" onClick={() => setIsQuizModalOpen(true)} disabled={isGeneratingQuiz}>
                      {isGeneratingQuiz ? <Loader2 className="h-4 w-4 animate-spin text-lms-purple" /> : <Sparkles className="h-4 w-4 text-lms-purple" />}
                      {isGeneratingQuiz ? "Generating..." : "Generate Questions"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {questions.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground border-2 border-dashed rounded-lg">
                      No questions yet. Click "Generate Questions" to create them with AI.
                    </div>
                  ) : (
                    questions.map((q, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex items-start justify-between mb-3">
                          <span className="font-medium">Question {index + 1} <Badge variant="outline" className="ml-2">{q.type}</Badge></span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                        <Input defaultValue={q.question} className="mb-3" />
                        <div className="space-y-2">
                          {q.options ? q.options.map((opt: string, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                              {opt === q.correctAnswer ? (
                                <CheckCircle className="h-4 w-4 text-lms-emerald" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                              )}
                              <Input defaultValue={opt} className="flex-1" />
                            </div>
                          )) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-lms-emerald" />
                              <Input defaultValue={q.correctAnswer} className="flex-1" />
                            </div>
                          )}
                          {q.explanation && (
                            <p className="text-xs text-muted-foreground mt-2">Explanation: {q.explanation}</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  <Button variant="outline" className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Add Question
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Resources & Downloads</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">neural-networks-cheatsheet.pdf</p>
                      <p className="text-xs text-muted-foreground">245 KB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Resource
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Last saved: Just now</span>
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card className="border-lms-purple/20 bg-lms-purple-light/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="h-5 w-5 text-lms-purple" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-background border text-sm cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    {suggestion}
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Sparkles className="h-4 w-4" />
                  Get More Suggestions
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Sparkles className="h-4 w-4 text-lms-purple" />
                  Generate Transcript
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Sparkles className="h-4 w-4 text-lms-purple" />
                  Create Summary
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => setIsQuizModalOpen(true)}
                  disabled={isGeneratingQuiz}
                >
                  {isGeneratingQuiz ? <Loader2 className="h-4 w-4 animate-spin text-lms-purple" /> : <Sparkles className="h-4 w-4 text-lms-purple" />}
                  {isGeneratingQuiz ? "Generating Quiz..." : "Auto-Generate Quiz"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isQuizModalOpen} onOpenChange={setIsQuizModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-lms-purple" />
              Generate Quiz with AI
            </DialogTitle>
            <DialogDescription>
              Specify the topic and difficulty to automatically generate quiz questions based on this lesson.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="topic">Specific Focus Topic (Optional)</Label>
              <Input
                id="topic"
                placeholder="e.g. Backpropagation, Syntax, etc."
                value={quizTopic}
                onChange={(e) => setQuizTopic(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="level">Difficulty Level</Label>
              <Select value={quizLevel} onValueChange={setQuizLevel}>
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="count">Number of Questions</Label>
              <Select value={quizCount} onValueChange={setQuizCount}>
                <SelectTrigger id="count">
                  <SelectValue placeholder="Select number of questions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Questions</SelectItem>
                  <SelectItem value="4">4 Questions</SelectItem>
                  <SelectItem value="6">6 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQuizModalOpen(false)}>Cancel</Button>
            <Button onClick={handleGenerateQuiz} className="bg-lms-purple hover:bg-lms-purple/90">
              Generate Questions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </UnifiedDashboard>
  );
}
