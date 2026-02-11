import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";
import { CourseBuilderStepper } from "@/components/course-builder/CourseBuilderStepper";
import { CourseBasicInfo } from "@/components/course-builder/CourseBasicInfo";
import { CourseCurriculum } from "@/components/course-builder/CourseCurriculum";
import { CourseCertificate } from "@/components/course-builder/CourseCertificate";
import { CourseSettings } from "@/components/course-builder/CourseSettings";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save, Eye, Rocket } from "lucide-react";

export interface CourseData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  language: string;
  thumbnail: string;
  promoVideo: string;
  price: number;
  salePrice: number;
  sections: Section[];
  certificateEnabled: boolean;
  certificateTemplate: string;
  certificateTitle: string;
  certificateDescription: string;
  isPublic: boolean;
  enableDrip: boolean;
  enableComments: boolean;
  enableReviews: boolean;
  maxStudents: number;
  enrollmentDuration: number;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "text" | "quiz" | "assignment";
  duration: number;
  content: string;
  videoUrl?: string;
  isFree: boolean;
}

const steps = [
  { id: 1, title: "Basic Info", description: "Course details" },
  { id: 2, title: "Curriculum", description: "Lessons & content" },
  { id: 3, title: "Certificate", description: "Completion reward" },
  { id: 4, title: "Settings", description: "Publish options" },
];

const initialCourseData: CourseData = {
  title: "", subtitle: "", description: "", category: "", level: "beginner",
  language: "english", thumbnail: "", promoVideo: "", price: 0, salePrice: 0,
  sections: [], certificateEnabled: true, certificateTemplate: "modern",
  certificateTitle: "Certificate of Completion",
  certificateDescription: "has successfully completed the course",
  isPublic: true, enableDrip: false, enableComments: true, enableReviews: true,
  maxStudents: 0, enrollmentDuration: 0,
};

export default function CourseBuilder() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState<CourseData>(initialCourseData);
  const [isSaving, setIsSaving] = useState(false);

  const updateCourseData = (updates: Partial<CourseData>) => {
    setCourseData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => { if (currentStep < steps.length) setCurrentStep(currentStep + 1); };
  const handlePrev = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handlePublish = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    navigate("/dashboard/courses");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <CourseBasicInfo data={courseData} onUpdate={updateCourseData} />;
      case 2: return <CourseCurriculum data={courseData} onUpdate={updateCourseData} />;
      case 3: return <CourseCertificate data={courseData} onUpdate={updateCourseData} />;
      case 4: return <CourseSettings data={courseData} onUpdate={updateCourseData} />;
      default: return null;
    }
  };

  const content = (
    <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
      <CourseBuilderStepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
      <div className="min-h-[400px] md:min-h-[500px]">{renderStepContent()}</div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 pt-4 md:pt-6 border-t">
        <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1} className="w-full sm:w-auto">
          <ChevronLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving} className="flex-1 sm:flex-none">
            <Save className="h-4 w-4 mr-2" /> Save Draft
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Eye className="h-4 w-4 mr-2" /> Preview
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={handleNext} className="flex-1 sm:flex-none bg-primary hover:bg-primary/90">
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handlePublish} disabled={isSaving} className="flex-1 sm:flex-none bg-accent hover:bg-accent/90">
              <Rocket className="h-4 w-4 mr-2" /> Publish
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  // Admin uses AdminDashboardLayout, teachers use UnifiedDashboard
  if (user?.role === "admin") {
    return (
      <AdminDashboardLayout title="Course Builder" subtitle="Create a new course">
        {content}
      </AdminDashboardLayout>
    );
  }

  return (
    <UnifiedDashboard title="Course Builder" subtitle="Create a new course">
      {content}
    </UnifiedDashboard>
  );
}
