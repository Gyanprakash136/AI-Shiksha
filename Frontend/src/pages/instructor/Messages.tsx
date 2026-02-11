import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Send,
  Sparkles,
  MessageSquare,
  Bell,
  Plus,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "S",
    lastMessage: "Thanks for the clarification on chapter 3!",
    time: "2 min ago",
    unread: true,
    course: "React Masterclass",
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "M",
    lastMessage: "When will the next lesson be available?",
    time: "1 hour ago",
    unread: true,
    course: "JavaScript Fundamentals",
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "E",
    lastMessage: "Great course! Very helpful.",
    time: "3 hours ago",
    unread: false,
    course: "React Masterclass",
  },
  {
    id: 4,
    name: "James Lee",
    avatar: "J",
    lastMessage: "I'm having trouble with the assignment...",
    time: "1 day ago",
    unread: false,
    course: "Advanced TypeScript",
  },
];

const messages = [
  { id: 1, sender: "student", content: "Hi! I have a question about the useEffect hook in lesson 5.", time: "10:30 AM" },
  { id: 2, sender: "instructor", content: "Of course! What specifically are you confused about?", time: "10:32 AM" },
  { id: 3, sender: "student", content: "I don't understand when the cleanup function runs. Can you explain?", time: "10:35 AM" },
  { id: 4, sender: "instructor", content: "The cleanup function runs before the component unmounts, and also before every re-run of the effect if the dependencies change. It's useful for cleaning up subscriptions, timers, or any side effects.", time: "10:38 AM" },
  { id: 5, sender: "student", content: "Thanks for the clarification on chapter 3!", time: "10:45 AM" },
];

const aiReplySuggestions = [
  "I'd be happy to explain further with a code example!",
  "This is covered in more detail in the next lesson.",
  "Great question! Let me share a resource that might help.",
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const handleAiSuggest = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setMessageInput(aiReplySuggestions[0]);
      setIsAiGenerating(false);
    }, 1000);
  };

  return (
    <DashboardLayout title="Messages" subtitle="Communicate with your students">
      <div className="page-container">
        <Tabs defaultValue="messages">
          <TabsList className="mb-6">
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
              <Badge variant="secondary">4</Badge>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="gap-2">
              <Bell className="h-4 w-4" />
              Announcements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <Card className="h-[calc(100vh-280px)]">
              <div className="flex h-full">
                {/* Conversations List */}
                <div className="w-80 border-r border-border flex flex-col">
                  <div className="p-4 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search messages..." className="pl-10" />
                    </div>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="divide-y divide-border">
                      {conversations.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => setSelectedConversation(conv)}
                          className={cn(
                            "w-full p-4 text-left hover:bg-muted/50 transition-colors",
                            selectedConversation.id === conv.id && "bg-muted"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-lms-blue flex items-center justify-center text-white font-medium shrink-0">
                              {conv.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-medium truncate">{conv.name}</span>
                                <span className="text-xs text-muted-foreground">{conv.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                              <p className="text-xs text-muted-foreground mt-1">{conv.course}</p>
                            </div>
                            {conv.unread && (
                              <div className="h-2.5 w-2.5 rounded-full bg-lms-blue shrink-0" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-lms-blue flex items-center justify-center text-white font-medium">
                        {selectedConversation.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{selectedConversation.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedConversation.course}</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex",
                            msg.sender === "instructor" ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[70%] rounded-2xl px-4 py-2.5",
                              msg.sender === "instructor"
                                ? "bg-lms-blue text-white rounded-br-sm"
                                : "bg-muted text-foreground rounded-bl-sm"
                            )}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className={cn(
                              "text-xs mt-1",
                              msg.sender === "instructor" ? "text-white/70" : "text-muted-foreground"
                            )}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* AI Suggestions */}
                  <div className="px-4 py-2 border-t border-border bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-lms-purple" />
                      <span className="text-xs text-muted-foreground">AI Suggestions:</span>
                      <div className="flex gap-2 overflow-x-auto">
                        {aiReplySuggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 shrink-0"
                            onClick={() => setMessageInput(suggestion)}
                          >
                            {suggestion.slice(0, 30)}...
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleAiSuggest}
                        disabled={isAiGenerating}
                        className="shrink-0"
                      >
                        {isAiGenerating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4 text-lms-purple" />
                        )}
                      </Button>
                      <Textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type your message..."
                        className="min-h-[44px] max-h-[100px] resize-none"
                      />
                      <Button size="icon" className="shrink-0 bg-lms-blue hover:bg-lms-blue/90">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="announcements">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Course Announcements</CardTitle>
                <Button className="gap-2 bg-lms-blue hover:bg-lms-blue/90">
                  <Plus className="h-4 w-4" />
                  New Announcement
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">New Chapter Released!</h3>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Chapter 8 on Advanced State Management is now available. Check it out!
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="secondary">React Masterclass</Badge>
                      <span className="text-xs text-muted-foreground">Sent to 2,840 students</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Live Q&A Session</h3>
                      <span className="text-sm text-muted-foreground">1 week ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Join me for a live Q&A session this Friday at 3 PM EST.
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="secondary">All Courses</Badge>
                      <span className="text-xs text-muted-foreground">Sent to 5,420 students</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
