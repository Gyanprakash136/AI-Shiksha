import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";
import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Award,
  Download,
  Share2,
  ExternalLink,
  Calendar,
  CheckCircle2,
} from "lucide-react";

const certificates = [
  {
    id: "1",
    courseName: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    completedDate: "Jan 15, 2024",
    credentialId: "CERT-WD-2024-001",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=225&fit=crop",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
  },
  {
    id: "2",
    courseName: "UI/UX Design Fundamentals",
    instructor: "Sarah Johnson",
    completedDate: "Dec 20, 2023",
    credentialId: "CERT-UX-2023-045",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
  },
  {
    id: "3",
    courseName: "Python for Data Science",
    instructor: "Mike Chen",
    completedDate: "Nov 10, 2023",
    credentialId: "CERT-DS-2023-089",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
    skills: ["Python", "Pandas", "NumPy", "Data Visualization"],
  },
];

export default function Certificates() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const content = (
    <div className="p-6 space-y-6">

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-lms-amber/10">
              <Award className="h-6 w-6 text-lms-amber" />
            </div>
            <div>
              <p className="text-2xl font-bold">{certificates.length}</p>
              <p className="text-sm text-muted-foreground">Total Certificates</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-lms-blue/10">
              <CheckCircle2 className="h-6 w-6 text-lms-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Skills Verified</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-lms-emerald/10">
              <Share2 className="h-6 w-6 text-lms-emerald" />
            </div>
            <div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">Times Shared</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-40">
              <img
                src={cert.thumbnail}
                alt={cert.courseName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-lms-amber" />
                  <span className="text-white font-medium text-sm">Certificate of Completion</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground line-clamp-2">{cert.courseName}</h3>
                <p className="text-sm text-muted-foreground">by {cert.instructor}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Completed {cert.completedDate}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {cert.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {cert.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{cert.skills.length - 3}
                  </Badge>
                )}
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-3">
                  Credential ID: {cert.credentialId}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" className="px-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  if (isAdmin) {
    return (
      <AdminDashboardLayout title="Certificates" subtitle="Manage and view certificates">
        {content}
      </AdminDashboardLayout>
    );
  }

  return (
    <UnifiedDashboard title="My Certificates" subtitle="View and share your achievements">
      {content}
    </UnifiedDashboard>
  );
}
