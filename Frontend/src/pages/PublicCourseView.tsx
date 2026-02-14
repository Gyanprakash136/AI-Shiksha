import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Courses } from "../lib/api";
import { useCart } from "../contexts/CartContext";
import {
    BookOpen,
    Users,
    Star,
    Clock,
    Globe,
    CheckCircle,
    PlayCircle,
    FileText,
    Award,
    ShoppingCart,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface Course {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    thumbnail_url?: string;
    price: number;
    level?: string;
    language?: string;
    learning_outcomes?: any;
    instructor: {
        user: {
            name: string;
            avatar_url?: string;
        };
        headline?: string;
        rating: number;
        total_students: number;
    };
    category?: {
        name: string;
    };
    sections?: any[];
    _count?: {
        enrollments: number;
        reviews: number;
    };
}

export default function PublicCourseView() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { addToCart, items } = useCart();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        if (slug) {
            fetchCourse();
        }
    }, [slug]);

    const fetchCourse = async () => {
        try {
            setLoading(true);
            const data = await Courses.getBySlug(slug!);
            setCourse(data);
        } catch (error: any) {
            console.error("Error fetching course:", error);
            toast.error("Course not found or not published");
            navigate("/courses");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!course) return;

        const token = localStorage.getItem("lms_token");
        if (!token) {
            toast.error("Please login to enroll in courses");
            navigate("/login");
            return;
        }

        try {
            setAddingToCart(true);
            await addToCart(course.id);
        } catch (error) {
            // Error already handled in cart context
        } finally {
            setAddingToCart(false);
        }
    };

    const isInCart = course ? items.some((item) => item.course.id === course.id) : false;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading course...</p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
                    <button
                        onClick={() => navigate("/courses")}
                        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all"
                    >
                        Browse Courses
                    </button>
                </div>
            </div>
        );
    }

    const learningOutcomes = course.learning_outcomes
        ? typeof course.learning_outcomes === "string"
            ? JSON.parse(course.learning_outcomes)
            : course.learning_outcomes
        : [];

    const totalLectures = course.sections?.reduce(
        (acc, section) => acc + (section.items?.length || 0),
        0
    ) || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Content */}
                        <div className="lg:col-span-2">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-sm text-indigo-200 mb-6">
                                <button onClick={() => navigate("/courses")} className="hover:text-white transition-colors">
                                    Courses
                                </button>
                                <span>/</span>
                                {course.category && (
                                    <>
                                        <span>{course.category.name}</span>
                                        <span>/</span>
                                    </>
                                )}
                                <span className="text-white">{course.title}</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>

                            {/* Subtitle */}
                            {course.subtitle && (
                                <p className="text-xl text-indigo-100 mb-6">{course.subtitle}</p>
                            )}

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-6 mb-6">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">4.5</span>
                                    <span className="text-indigo-200">({course._count?.reviews || 0} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    <span>{course._count?.enrollments || 0} students enrolled</span>
                                </div>
                                {course.level && (
                                    <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
                                        {course.level}
                                    </div>
                                )}
                            </div>

                            {/* Instructor */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                    {course.instructor.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm text-indigo-200">Created by</p>
                                    <h3 className="text-lg font-bold">{course.instructor.user.name}</h3>
                                    {course.instructor.headline && (
                                        <p className="text-sm text-indigo-200">{course.instructor.headline}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar - Preview Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-6">
                                {/* Thumbnail */}
                                <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                                    {course.thumbnail_url ? (
                                        <img
                                            src={course.thumbnail_url}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <PlayCircle className="w-20 h-20 text-indigo-300" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    {/* Price */}
                                    <div className="mb-6">
                                        {course.price > 0 ? (
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-bold text-gray-900">
                                                    ₹{course.price.toLocaleString()}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-4xl font-bold text-green-600">Free</span>
                                        )}
                                    </div>

                                    {/* CTA Button */}
                                    {isInCart ? (
                                        <button
                                            onClick={() => navigate("/cart")}
                                            className="w-full py-4 rounded-xl bg-green-600 text-white font-bold text-lg transition-all hover:bg-green-700 mb-3"
                                        >
                                            Go to Cart
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={addingToCart}
                                            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-3 flex items-center justify-center gap-2"
                                        >
                                            {addingToCart ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Adding...
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-5 h-5" />
                                                    Add to Cart
                                                </>
                                            )}
                                        </button>
                                    )}

                                    {/* Course Includes */}
                                    <div className="space-y-3 pt-6 border-t">
                                        <h4 className="font-bold text-gray-900 mb-4">This course includes:</h4>
                                        <div className="flex items-center gap-3 text-sm text-gray-700">
                                            <FileText className="w-5 h-5 text-indigo-600" />
                                            <span>{totalLectures} lectures</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-700">
                                            <Globe className="w-5 h-5 text-indigo-600" />
                                            <span>{course.language || "English"}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-700">
                                            <Award className="w-5 h-5 text-indigo-600" />
                                            <span>Certificate of completion</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-700">
                                            <Clock className="w-5 h-5 text-indigo-600" />
                                            <span>Lifetime access</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this course</h2>
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                {course.description || "No description available."}
                            </p>
                        </section>

                        {/* Learning Outcomes */}
                        {learningOutcomes.length > 0 && (
                            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {learningOutcomes.map((outcome: string, index: number) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Course Content */}
                        {course.sections && course.sections.length > 0 && (
                            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course content</h2>
                                <div className="space-y-4">
                                    {course.sections.map((section: any, index: number) => (
                                        <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                            <div className="bg-gray-50 px-6 py-4">
                                                <h3 className="font-bold text-gray-900">
                                                    {index + 1}. {section.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {section.items?.length || 0} lectures
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Sidebar - Instructor */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 sticky top-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Instructor</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                                    {course.instructor.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">
                                        {course.instructor.user.name}
                                    </h4>
                                    {course.instructor.headline && (
                                        <p className="text-sm text-gray-600">{course.instructor.headline}</p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Star className="w-5 h-5 text-yellow-400" />
                                    <span>{course.instructor.rating.toFixed(1)} instructor rating</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Users className="w-5 h-5 text-indigo-600" />
                                    <span>{course.instructor.total_students.toLocaleString()} students</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
