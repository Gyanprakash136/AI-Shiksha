import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Book, FileText, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const helpTopics = [
  { title: "Getting Started", description: "Learn the basics of admin panel", icon: Book },
  { title: "User Management", description: "Managing users, roles, and permissions", icon: FileText },
  { title: "Course Moderation", description: "Approving and managing courses", icon: FileText },
  { title: "Revenue & Payouts", description: "Understanding financial operations", icon: FileText },
  { title: "AI Configuration", description: "Setting up AI features", icon: FileText },
  { title: "Security Best Practices", description: "Keeping your platform secure", icon: FileText },
];

const faqs = [
  { question: "How do I approve a new teacher?", answer: "Navigate to Users > Teachers and click Approve on pending verification requests." },
  { question: "How do I process payouts?", answer: "Go to Revenue > Payouts to view and approve pending payout requests." },
  { question: "How do I configure AI features?", answer: "Visit AI & Automation > AI Control Center to manage AI settings and providers." },
  { question: "How do I block a suspicious user?", answer: "Go to Security and click Block on any suspicious activity, or navigate to Users to suspend a specific account." },
];

export default function HelpPage() {
  return (
    <AdminDashboardLayout title="Help & Documentation" subtitle="Learn how to use the admin panel">
      <div className="space-y-6">
        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-3">
          {helpTopics.map((topic) => (
            <Card key={topic.title} className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <topic.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-1">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Need More Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Contact our support team for assistance.
            </p>
            <div className="flex gap-3">
              <Button className="gap-2">
                <MessageSquare className="h-4 w-4" /> Contact Support
              </Button>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" /> View Full Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
