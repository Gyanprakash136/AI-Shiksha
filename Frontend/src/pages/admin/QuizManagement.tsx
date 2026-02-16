import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    FileText,
    Clock,
    CheckCircle2,
    XCircle,
    HelpCircle,
    BarChart,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { QuizResultsView } from "./components/QuizResultsView";

export default function QuizManagement() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"QUIZZES" | "RESULTS">("QUIZZES");

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await api.get("/quizzes");
            setQuizzes(response.data);
        } catch (error) {
            console.error("Failed to fetch quizzes:", error);
            toast({
                title: "Error",
                description: "Failed to load quizzes",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this quiz?")) return;
        try {
            await api.delete(`/quizzes/${id}`);
            setQuizzes(quizzes.filter((q) => q.id !== id));
            toast({
                title: "Success",
                description: "Quiz deleted successfully",
            });
        } catch (error) {
            console.error("Failed to delete quiz:", error);
            toast({
                title: "Error",
                description: "Failed to delete quiz",
                variant: "destructive",
            });
        }
    };

    const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminDashboardLayout title="Quiz Management" subtitle="Create and manage quizzes">
            <div className="space-y-6">
                {/* Toggle Switch */}
                <div className="flex items-center justify-center">
                    <div className="bg-muted p-1 rounded-lg inline-flex items-center">
                        <button
                            onClick={() => setActiveTab("QUIZZES")}
                            className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${activeTab === "QUIZZES"
                                ? "bg-white text-primary shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Quizzes
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab("RESULTS")}
                            className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${activeTab === "RESULTS"
                                ? "bg-white text-primary shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <BarChart className="h-4 w-4" />
                                Results
                            </div>
                        </button>
                    </div>
                </div>

                {activeTab === "QUIZZES" ? (
                    <>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-10"
                                    placeholder="Search quizzes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Link to="/dashboard/quizzes/new">
                                <Button className="gap-2 bg-primary">
                                    <Plus className="h-4 w-4" />
                                    Create Quiz
                                </Button>
                            </Link>
                        </div>

                        <Card className="border-none shadow-sm">
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Questions</TableHead>
                                            <TableHead>Sets</TableHead>
                                            <TableHead>Passing Score</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-8">
                                                    Loading...
                                                </TableCell>
                                            </TableRow>
                                        ) : filteredQuizzes.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                    No quizzes found. Create one to get started.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredQuizzes.map((quiz) => (
                                                <TableRow key={quiz.id}>
                                                    <TableCell className="font-medium">
                                                        <div className="flex flex-col">
                                                            <span>{quiz.title}</span>
                                                            <span className="text-xs text-muted-foreground line-clamp-1">
                                                                {quiz.description || "No description"}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{quiz._count?.questions || 0}</TableCell>
                                                    <TableCell>{quiz.total_sets || 1}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{quiz.passing_score}%</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <Link to={`/dashboard/quizzes/${quiz.id}/edit`}>
                                                                    <DropdownMenuItem>
                                                                        <Edit className="h-4 w-4 mr-2" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                </Link>
                                                                <DropdownMenuItem
                                                                    className="text-destructive"
                                                                    onClick={() => handleDelete(quiz.id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <QuizResultsView quizzes={quizzes} />
                )}
            </div>
        </AdminDashboardLayout>
    );
}
