import { useState } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function AIFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    {
      role: "ai",
      content: "Hi! I'm your AI assistant. How can I help you with your courses today?",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { role: "user", content: message }]);
    setMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "I can help you with that! Based on your course content, I suggest focusing on practical examples and interactive exercises. Would you like me to generate some quiz questions for your latest chapter?",
        },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "ai-floating-btn",
          isOpen && "scale-0 opacity-0"
        )}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl bg-card shadow-xl border border-border transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lms-purple">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Powered by LearnAI</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                  msg.role === "user"
                    ? "bg-lms-blue text-white rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground rounded-bl-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-thin">
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 text-xs h-7 rounded-full"
            onClick={() => setMessage("Generate quiz questions")}
          >
            Generate Quiz
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 text-xs h-7 rounded-full"
            onClick={() => setMessage("Explain this topic simply")}
          >
            Explain Topic
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 text-xs h-7 rounded-full"
            onClick={() => setMessage("Improve engagement")}
          >
            Improve Engagement
          </Button>
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="min-h-[44px] max-h-[100px] resize-none text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!message.trim() || isLoading}
              className="h-11 w-11 shrink-0 rounded-xl bg-lms-blue hover:bg-lms-blue/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
