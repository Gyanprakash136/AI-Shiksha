import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";
import {
  Search,
  Send,
  Sparkles,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
} from "lucide-react";

const conversations = [
  {
    id: "1",
    name: "John Smith",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Thanks for the clarification on React hooks!",
    time: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    lastMessage: "When is the next assignment due?",
    time: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    lastMessage: "The course content is amazing!",
    time: "3h ago",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Emily White",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Can you explain the deployment process?",
    time: "1d ago",
    unread: 0,
    online: false,
  },
];

const messages = [
  {
    id: "1",
    senderId: "1",
    content: "Hi! I had a question about the useState hook in React.",
    time: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    senderId: "me",
    content: "Sure! What would you like to know?",
    time: "10:32 AM",
    isOwn: true,
  },
  {
    id: "3",
    senderId: "1",
    content: "When should I use useState vs useReducer? The course covered both but I'm not sure when to pick one over the other.",
    time: "10:35 AM",
    isOwn: false,
  },
  {
    id: "4",
    senderId: "me",
    content: "Great question! useState is perfect for simple, independent state values. useReducer is better when you have complex state logic or when the next state depends on the previous one. Think of useReducer as useState's more powerful cousin.",
    time: "10:38 AM",
    isOwn: true,
  },
  {
    id: "5",
    senderId: "1",
    content: "Thanks for the clarification on React hooks!",
    time: "10:40 AM",
    isOwn: false,
  },
];

const aiSuggestions = [
  "Would you like me to share some code examples?",
  "I can recommend additional resources on this topic.",
  "Here's a quiz to test your understanding.",
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <UnifiedDashboard title="Messages" subtitle="Chat with your contacts">
      <div className="h-[calc(100vh-8rem)] flex">
      {/* Conversations List */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  selectedConversation.id === conv.id
                    ? "bg-lms-blue/10"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conv.avatar} />
                    <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-lms-emerald border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{conv.name}</p>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="bg-lms-blue text-white">{conv.unread}</Badge>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar>
                <AvatarImage src={selectedConversation.avatar} />
                <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {selectedConversation.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-lms-emerald border-2 border-background" />
              )}
            </div>
            <div>
              <p className="font-medium">{selectedConversation.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedConversation.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.isOwn
                      ? "bg-lms-blue text-white rounded-br-md"
                      : "bg-muted rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.isOwn ? "text-white/70" : "text-muted-foreground"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* AI Suggestions */}
        <div className="px-4 py-2 border-t bg-lms-blue/5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-lms-blue" />
            <span className="text-xs font-medium text-lms-blue">AI Suggestions</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {aiSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="whitespace-nowrap text-xs"
                onClick={() => setNewMessage(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button variant="ghost" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="bg-lms-blue hover:bg-lms-blue/90"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      </div>
    </UnifiedDashboard>
  );
}
