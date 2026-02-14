import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Search, CheckCircle, Brain } from "lucide-react";
import api from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface QuizSelectionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (quizId: string) => void;
}

export function QuizSelectionModal({ open, onOpenChange, onSelect }: QuizSelectionModalProps) {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            fetchQuizzes();
            setSelectedQuizId(null);
        }
    }, [open]);

    const fetchQuizzes = async () => {
        setLoading(true);
        try {
            const response = await api.get("/quizzes");
            setQuizzes(response.data);
        } catch (error) {
            console.error("Failed to fetch quizzes:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleConfirm = () => {
        if (selectedQuizId) {
            onSelect(selectedQuizId);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Select a Quiz</DialogTitle>
                </DialogHeader>

                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        className="pl-10"
                        placeholder="Search quizzes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <ScrollArea className="h-72">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : filteredQuizzes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                            <p>No quizzes found.</p>
                            <p className="text-sm">Create a quiz in the Quiz Dashboard first.</p>
                        </div>
                    ) : (
                        <div className="space-y-2 p-1">
                            {filteredQuizzes.map((quiz) => (
                                <div
                                    key={quiz.id}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 hover:bg-muted/50 ${selectedQuizId === quiz.id
                                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                                            : "border-border"
                                        }`}
                                    onClick={() => setSelectedQuizId(quiz.id)}
                                >
                                    <div className={`mt-1 h-4 w-4 rounded-full border flex items-center justify-center ${selectedQuizId === quiz.id ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                                        }`}>
                                        {selectedQuizId === quiz.id && <div className="h-2 w-2 rounded-full bg-white" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-sm">{quiz.title}</h4>
                                            <Badge variant="secondary" className="text-xs">
                                                {quiz.total_sets} Set{quiz.total_sets > 1 ? 's' : ''}
                                            </Badge>
                                        </div>
                                        {quiz.description && (
                                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                                {quiz.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Brain className="h-3 w-3" />
                                                {quiz._count?.questions || 0} Questions
                                            </span>
                                            <span>•</span>
                                            <span>Pass: {quiz.passing_score}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} disabled={!selectedQuizId}>
                        Select Quiz
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
