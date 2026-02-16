import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Loader2 } from "lucide-react";
import { dashboardService } from "@/lib/api/dashboardService";

export function ResumeCourse() {
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadResumeCourse();
    }, []);

    const loadResumeCourse = async () => {
        try {
            const data = await dashboardService.getResumeCourse();
            setCourse(data);
        } catch (error) {
            console.error('Error loading resume course:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="mb-12">
                <h2 className="text-lg font-semibold mb-4">Resume your courses</h2>
                <div className="bg-white border border-[#E1E1E1] shadow-sm p-12 rounded-md flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            </section>
        );
    }

    if (!course) {
        return null;
    }

    return (
        <section className="mb-12">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-lg font-semibold">Resume your courses</h2>
            </div>
            <div className="bg-white border border-[#E1E1E1] shadow-sm flex flex-col md:flex-row overflow-hidden rounded-md group hover:border-lms-blue transition-colors">
                <div
                    className="w-full md:w-72 h-40 md:h-auto bg-cover bg-center"
                    style={{ backgroundImage: `url(${course.thumbnail})` }}
                ></div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-lms-blue border border-lms-blue px-1.5 py-0.5 uppercase rounded-sm">
                                Course
                            </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-[#1F1F1F]">{course.courseName}</h3>
                        <p className="text-[#555555] text-sm line-clamp-2">
                            Continue where you left off: <span className="font-medium text-[#1F1F1F]">{course.lessonTitle}</span>
                        </p>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex-1 max-w-xs">
                            <div className="flex justify-between text-xs mb-1.5 font-medium">
                                <span className="text-[#555555]">Course Progress</span>
                                <span className="text-lms-blue">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-1 bg-gray-100" />
                        </div>
                        <Link to={course.lessonSlug === 'intro'
                            ? `/course/${course.courseSlug}/view`
                            : `/learn/${course.courseSlug}/lesson/${course.lessonSlug}`
                        }>
                            <Button className="bg-lms-blue hover:bg-lms-blue/90 text-white px-8 py-2 font-semibold text-sm transition-colors rounded-sm shadow-none">
                                <Play className="h-4 w-4 mr-2" />
                                {course.lessonSlug === 'intro' ? 'Start Course' : 'Go to Lesson'}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
