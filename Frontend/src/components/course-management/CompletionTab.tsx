import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    CheckCircle,
    Loader2,
    Search,
    Calendar,
    MoreHorizontal,
    Award,
    Clock,
    Users,
    X,
} from "lucide-react";
import { Enrollments } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface CourseStudent {
    id: string;
    enrollment_id: string;
    name: string;
    email: string;
    avatar_url?: string;
    enrolled_at: string;
    status: 'active' | 'completed' | 'dropped';
    progress_percentage: number;
    completed_at?: string;
    last_activity_at?: string;
    lessons_completed: number;
    total_lessons: number;
    certificate_issued: boolean;
}

export function CompletionTab() {
    const { id: courseId } = useParams();
    const { toast } = useToast();

    const [students, setStudents] = useState<CourseStudent[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);

    // Edit completion date dialog
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<CourseStudent | null>(null);
    const [newCompletionDate, setNewCompletionDate] = useState("");

    useEffect(() => {
        if (courseId) {
            loadStudents();
        }
    }, [courseId]);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const response = await Enrollments.getCourseStudents(courseId!);
            setStudents(response.students || []);
        } catch (error: any) {
            console.error("Failed to load students:", error);
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to load students",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedStudents(filteredStudents.map(s => s.enrollment_id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectStudent = (enrollmentId: string, checked: boolean) => {
        if (checked) {
            setSelectedStudents(prev => [...prev, enrollmentId]);
        } else {
            setSelectedStudents(prev => prev.filter(id => id !== enrollmentId));
        }
    };

    const handleBulkComplete = async () => {
        if (selectedStudents.length === 0) return;

        try {
            setProcessing(true);
            await Enrollments.bulkComplete(selectedStudents);
            toast({
                title: "Success",
                description: `Successfully marked ${selectedStudents.length} student(s) as complete`,
            });
            setSelectedStudents([]);
            loadStudents();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to mark students as complete",
                variant: "destructive",
            });
        } finally {
            setProcessing(false);
        }
    };

    const handleManualComplete = async (enrollmentId: string) => {
        try {
            await Enrollments.manualComplete(enrollmentId);
            toast({
                title: "Success",
                description: "Student marked as complete",
            });
            loadStudents();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to mark student as complete",
                variant: "destructive",
            });
        }
    };

    const handleEditCompletionDate = (student: CourseStudent) => {
        setEditingStudent(student);
        setNewCompletionDate(student.completed_at ? format(new Date(student.completed_at), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"));
        setEditDialogOpen(true);
    };

    const handleSaveCompletionDate = async () => {
        if (!editingStudent || !newCompletionDate) return;

        try {
            setProcessing(true);
            await Enrollments.updateCompletionDate(editingStudent.enrollment_id, new Date(newCompletionDate).toISOString());
            toast({
                title: "Success",
                description: "Completion date updated successfully",
            });
            setEditDialogOpen(false);
            setEditingStudent(null);
            loadStudents();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to update completion date",
                variant: "destructive",
            });
        } finally {
            setProcessing(false);
        }
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase())
    );

    const completedCount = students.filter(s => s.status === 'completed').length;
    const averageProgress = students.length > 0
        ? Math.round(students.reduce((sum, s) => sum + s.progress_percentage, 0) / students.length)
        : 0;

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Students</p>
                                <p className="text-2xl font-bold">{students.length}</p>
                            </div>
                            <Users className="h-8 w-8 text-muted-foreground opacity-50" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Completed</p>
                                <p className="text-2xl font-bold">{completedCount}</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-500 opacity-50" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Avg. Progress</p>
                                <p className="text-2xl font-bold">{averageProgress}%</p>
                            </div>
                            <Clock className="h-8 w-8 text-blue-500 opacity-50" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Actions */}
            <Card>
                <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle>Student Progress & Completion</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search students..."
                                    className="pl-8"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Button onClick={loadStudents} variant="outline" size="sm">
                                Refresh
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Bulk Actions Toolbar */}
                    {selectedStudents.length > 0 && (
                        <div className="flex items-center justify-between p-3 mb-4 bg-muted rounded-lg">
                            <span className="text-sm font-medium">
                                {selectedStudents.length} student(s) selected
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={handleBulkComplete}
                                    disabled={processing}
                                    className="gap-2"
                                >
                                    {processing ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <CheckCircle className="h-4 w-4" />
                                    )}
                                    Mark Complete
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setSelectedStudents([])}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Students Table */}
                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Enrolled</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Completed</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                                        </TableCell>
                                    </TableRow>
                                ) : filteredStudents.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                            No students found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredStudents.map((student) => (
                                        <TableRow key={student.enrollment_id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedStudents.includes(student.enrollment_id)}
                                                    onCheckedChange={(checked) => handleSelectStudent(student.enrollment_id, checked as boolean)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>
                                                            {student.name.split(" ").map(n => n[0]).join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-sm">{student.name}</p>
                                                        <p className="text-xs text-muted-foreground">{student.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {format(new Date(student.enrolled_at), "MMM d, yyyy")}
                                            </TableCell>
                                            <TableCell>
                                                {student.status === 'completed' ? (
                                                    <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/20">
                                                        ✓ Completed
                                                    </Badge>
                                                ) : student.status === 'active' ? (
                                                    <Badge variant="outline">Active</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Dropped</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={student.progress_percentage} className="w-24 h-2" />
                                                    <span className="text-sm font-medium">{student.progress_percentage}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {student.completed_at ? (
                                                    <button
                                                        onClick={() => handleEditCompletionDate(student)}
                                                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                                                    >
                                                        {format(new Date(student.completed_at), "MMM d, yyyy")}
                                                    </button>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {student.status !== 'completed' && (
                                                            <DropdownMenuItem onClick={() => handleManualComplete(student.enrollment_id)}>
                                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                                Mark as Complete
                                                            </DropdownMenuItem>
                                                        )}
                                                        {student.status === 'completed' && (
                                                            <>
                                                                <DropdownMenuItem onClick={() => handleEditCompletionDate(student)}>
                                                                    <Calendar className="h-4 w-4 mr-2" />
                                                                    Edit Completion Date
                                                                </DropdownMenuItem>
                                                                {student.certificate_issued && (
                                                                    <DropdownMenuItem>
                                                                        <Award className="h-4 w-4 mr-2" />
                                                                        View Certificate
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Completion Date Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Completion Date</DialogTitle>
                        <DialogDescription>
                            Change the completion date for {editingStudent?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="completion-date" className="text-sm font-medium">
                                Completion Date
                            </label>
                            <Input
                                id="completion-date"
                                type="date"
                                value={newCompletionDate}
                                onChange={(e) => setNewCompletionDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setEditDialogOpen(false)}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSaveCompletionDate} disabled={processing}>
                            {processing ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
