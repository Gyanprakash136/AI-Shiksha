import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Courses, Categories } from "../lib/api";
import {
    Search,
    Grid3x3,
    List,
    SlidersHorizontal,
    BookOpen,
    Users,
    Star,
    Clock,
    TrendingUp
} from "lucide-react";

interface Course {
    id: string;
    title: string;
    slug: string;
    subtitle?: string;
    description?: string;
    thumbnail_url?: string;
    price: number;
    level?: string;
    language?: string;
    instructor: {
        user: {
            name: string;
        };
    };
    category?: {
        name: string;
    };
    _count?: {
        enrollments: number;
        reviews: number;
    };
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function PublicCourseCatalog() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedLevel, setSelectedLevel] = useState<string>("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [coursesData, categoriesData] = await Promise.all([
                Courses.getAll(false), // Only published courses
                Categories.getAll(),
            ]);
            setCourses(coursesData);
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.user.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategory === "all" || course.category?.name === selectedCategory;

        const matchesLevel =
            selectedLevel === "all" || course.level === selectedLevel;

        return matchesSearch && matchesCategory && matchesLevel;
    });

    const CourseCard = ({ course }: { course: Course }) => {
        const handleClick = () => {
            navigate(`/course/${course.slug}`);
        };

        return (
            <div
                onClick={handleClick}
                className={`
          group bg-white rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-300 ease-out
          hover:shadow-2xl hover:-translate-y-2
          border border-gray-100
          ${viewMode === "list" ? "flex flex-row" : "flex flex-col"}
        `}
            >
                {/* Thumbnail */}
                <div className={`relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 ${viewMode === "list" ? "w-64 h-48" : "h-48 w-full"}`}>
                    {course.thumbnail_url ? (
                        <img
                            src={course.thumbnail_url}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-indigo-300" />
                        </div>
                    )}
                    {course.level && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-indigo-600">
                            {course.level}
                        </div>
                    )}
                    {course.category && (
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-indigo-600/90 backdrop-blur-sm text-white">
                            {course.category.name}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Instructor */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                            {course.instructor.user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-600 font-medium">
                            {course.instructor.user.name}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {course.title}
                    </h3>

                    {/* Subtitle */}
                    {course.subtitle && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {course.subtitle}
                        </p>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{course._count?.enrollments || 0} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>4.5</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                {course.price > 0 ? (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-indigo-600">
                                            ₹{course.price.toLocaleString()}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-2xl font-bold text-green-600">Free</span>
                                )}
                            </div>
                            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
                                View Course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                            Explore Our Courses
                        </h1>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Discover world-class courses to advance your skills and career
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search for courses, instructors, or topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all shadow-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        <span className="font-medium">Filters</span>
                    </button>

                    {/* View Mode */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-lg transition-all ${viewMode === "grid"
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            <Grid3x3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-lg transition-all ${viewMode === "list"
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Results Count */}
                    <div className="text-gray-600">
                        <span className="font-semibold">{filteredCourses.length}</span> courses found
                    </div>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Level Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Level
                                </label>
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                >
                                    <option value="all">All Levels</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            {/* Clear Filters */}
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        setSelectedCategory("all");
                                        setSelectedLevel("all");
                                        setSearchQuery("");
                                    }}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium transition-all"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
                    </div>
                ) : filteredCourses.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20">
                        <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                                setSelectedLevel("all");
                            }}
                            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all"
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    /* Course Grid/List */
                    <div
                        className={`
              grid gap-6
              ${viewMode === "grid"
                                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                : "grid-cols-1"
                            }
            `}
                    >
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
