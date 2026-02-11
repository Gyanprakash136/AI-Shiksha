import { useAuth } from "@/contexts/AuthContext";
import { TeacherDashboardContent } from "@/components/dashboard/TeacherDashboardContent";
import { StudentDashboardContent } from "@/components/dashboard/StudentDashboardContent";
import { AdminDashboardContent } from "@/components/dashboard/AdminDashboardContent";
import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";
import StudentDashboard from "./student/StudentDashboard";

export default function UnifiedDashboardPage() {
  const { user } = useAuth();

  const getTitle = () => {
    switch (user?.role) {
      case "teacher":
        return "Instructor Dashboard";
      case "student":
        return "My Learning Dashboard";
      case "admin":
        return "Admin Dashboard";
      default:
        return "Dashboard";
    }
  };

  const getSubtitle = () => {
    return `Welcome back, ${user?.name || "User"}!`;
  };

  // Admin uses the new AdminDashboardLayout
  if (user?.role === "admin") {
    return (
      <AdminDashboardLayout title={getTitle()} subtitle={getSubtitle()}>
        <AdminDashboardContent />
      </AdminDashboardLayout>
    );
  }

  // Other roles use UnifiedDashboard
  const renderContent = () => {
    switch (user?.role) {
      case "teacher":
        return <TeacherDashboardContent />;
      case "student":
        return <StudentDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  const isStudent = user?.role === "student";

  return (
    <UnifiedDashboard
      title={isStudent ? undefined : getTitle()}
      subtitle={isStudent ? undefined : getSubtitle()}
    >
      {renderContent()}
    </UnifiedDashboard>
  );
}
