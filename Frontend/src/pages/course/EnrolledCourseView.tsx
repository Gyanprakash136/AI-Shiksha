import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { Courses, Enrollments, SystemSettings } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, PlayCircle, BookOpen, Clock, Award, FileText } from 'lucide-react';

export const EnrolledCourseView = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [course, setCourse] = useState<any>(null);
    const [enrollment, setEnrollment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showTerms, setShowTerms] = useState(false);
    const [termsContent, setTermsContent] = useState('');
    const [accepted, setAccepted] = useState(false);
    const [processingTerms, setProcessingTerms] = useState(false);

    useEffect(() => {
        loadData();
    }, [slug, user]);

    const loadData = async () => {
        if (!slug || !user) {
            console.log('Missing slug or user:', { slug, user: !!user });
            return;
        }
        try {
            const courseData = await Courses.getBySlug(slug);
            console.log('Course data loaded:', courseData);
            setCourse(courseData);

            // Fetch enrollment to check status and terms acceptance
            const myEnrollments = await Enrollments.getMyEnrollments();
            console.log('My enrollments:', myEnrollments);
            console.log('First enrollment structure:', myEnrollments[0]);
            console.log('Looking for courseId:', courseData.id);

            // Check what field the enrollment uses
            if (myEnrollments.length > 0) {
                console.log('Enrollment has courseId?', myEnrollments[0].courseId);
                console.log('Enrollment has course_id?', (myEnrollments[0] as any).course_id);
                console.log('Enrollment has course.id?', myEnrollments[0].course?.id);
            }

            const currentEnrollment = myEnrollments.find((e: any) => {
                // Try multiple possible field names
                return e.courseId === courseData.id ||
                    e.course_id === courseData.id ||
                    e.course?.id === courseData.id;
            });
            console.log('Found enrollment:', currentEnrollment);

            if (currentEnrollment) {
                setEnrollment(currentEnrollment);
            } else {
                // Not enrolled, redirect to preview or handle error
                console.warn('User not enrolled in course, redirecting to preview');
                toast.error('You are not enrolled in this course');
                navigate(`/courses/${slug}`);
            }

        } catch (error) {
            console.error('Failed to load course data:', error);
            toast.error('Failed to load course details');
        } finally {
            setLoading(false);
        }
    };

    const handleStartLearning = async () => {
        console.log('handleStartLearning called');
        console.log('Enrollment:', enrollment);
        console.log('Course:', course);
        console.log('Course modules:', course?.modules);
        console.log('Course sections:', (course as any)?.sections);

        if (enrollment?.terms_accepted) {
            // Proceed to first lesson
            console.log('Terms already accepted, checking for lessons...');

            // Try to find first lesson from either structure
            let firstLessonSlug = null;
            let courseSlug = course?.slug;

            // Check NEW curriculum structure (sections/items)
            if ((course as any)?.sections?.length > 0) {
                const firstSection = (course as any).sections[0];
                console.log('First section:', firstSection);

                if (firstSection?.items?.length > 0) {
                    const firstItem = firstSection.items[0];
                    console.log('First item:', firstItem);

                    // Items in new structure have slug field
                    if (firstItem?.slug) {
                        firstLessonSlug = firstItem.slug;
                        console.log('Found lesson slug in NEW structure (sections/items):', firstLessonSlug);
                    }
                }
            }

            // Check OLD curriculum structure (modules/lessons) as fallback
            if (!firstLessonSlug && course?.modules?.length > 0) {
                console.log('First module:', course.modules[0]);
                console.log('First module lessons:', course.modules[0]?.lessons);

                if (course.modules[0]?.lessons?.length > 0) {
                    // Old structure doesn't have slugs, generate one temporarily
                    const firstLesson = course.modules[0].lessons[0];
                    firstLessonSlug = firstLesson.title
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/[\s_-]+/g, '-')
                        .replace(/^-+|-+$/g, '');
                    console.log('Generated slug from OLD structure (modules/lessons):', firstLessonSlug);
                }
            }

            if (firstLessonSlug && courseSlug) {
                console.log('Navigating to:', `/learn/${courseSlug}/lesson/${firstLessonSlug}`);
                navigate(`/learn/${courseSlug}/lesson/${firstLessonSlug}`);
            } else {
                console.error('No lessons found. Course structure:', {
                    hasModules: !!course?.modules,
                    modulesLength: course?.modules?.length,
                    firstModule: course?.modules?.[0],
                    hasSections: !!(course as any)?.sections,
                    sectionsLength: (course as any)?.sections?.length,
                    firstSection: (course as any)?.sections?.[0],
                });
                toast.error("No lessons found in this course yet.");
            }
        } else {
            // Load Terms and show modal
            console.log('Terms not accepted yet, loading terms...');
            try {
                const terms = await SystemSettings.getTerms();
                setTermsContent(terms.content);
                setShowTerms(true);
            } catch (error) {
                toast.error("Failed to load Terms & Conditions");
            }
        }
    };

    const handleAcceptTerms = async () => {
        if (!course) return;
        setProcessingTerms(true);
        try {
            await Enrollments.acceptTerms(course.id); // Assuming we add this wrapper in API
            setEnrollment({ ...enrollment, terms_accepted: true });
            setShowTerms(false);
            toast.success("Terms accepted! Starting course...");

            // Navigate to first lesson
            if (course?.modules?.[0]?.lessons?.[0]) {
                navigate(`/learn/${course.id}/lesson/${course.modules[0].lessons[0].id}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to accept terms. Please try again.");
        } finally {
            setProcessingTerms(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!course) return null;

    return (
        <div className="container mx-auto px-4 py-8">{/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                        {course.thumbnail_url ? (
                            <img
                                src={course.thumbnail_url}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-purple-100">
                                <BookOpen className="h-20 w-20 text-gray-400" />
                            </div>
                        )}
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                        <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{course.duration || 'Self-paced'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                <span>{course.modules?.length || 0} modules</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                <span>Certificate of Completion</span>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            onClick={handleStartLearning}
                            className="w-full sm:w-auto"
                        >
                            <PlayCircle className="mr-2 h-5 w-5" />
                            {enrollment?.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                        </Button>
                    </div>
                </div>

                {/* Sidebar - Progress */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">Your Progress</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Overall Progress</span>
                                        <span className="font-medium">{enrollment?.progress || 0}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{ width: `${enrollment?.progress || 0}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    <p>{enrollment?.completedLessons || 0} of {course.modules?.reduce((sum: number, m: any) => sum + (m.lessons?.length || 0), 0) || 0} lessons completed</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Course Curriculum */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                <div className="space-y-4">
                    {course.modules?.map((module: any, idx: number) => (
                        <Card key={module.id}>
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-lg mb-4">
                                    Module {idx + 1}: {module.title}
                                </h3>
                                <div className="space-y-2">
                                    {module.lessons?.map((lesson: any) => (
                                        <div key={lesson.id} className="flex items-center gap-3 py-2 px-3 hover:bg-muted rounded-lg transition-colors">
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            <span className="flex-1">{lesson.title}</span>
                                            {lesson.duration && (
                                                <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Terms & Conditions Dialog */}
            <Dialog open={showTerms} onOpenChange={setShowTerms}>
                <DialogContent className="max-w-2xl max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>Terms & Conditions</DialogTitle>
                        <DialogDescription>
                            Please read and accept the terms and conditions before starting the course.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[400px] pr-4">
                        <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: termsContent }}
                        />
                    </ScrollArea>
                    <DialogFooter className="flex-col sm:flex-row gap-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="accept"
                                checked={accepted}
                                onCheckedChange={(checked) => setAccepted(checked as boolean)}
                            />
                            <label
                                htmlFor="accept"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I accept the terms and conditions
                            </label>
                        </div>
                        <Button
                            onClick={handleAcceptTerms}
                            disabled={!accepted || processingTerms}
                        >
                            {processingTerms && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Accept & Start
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
};
