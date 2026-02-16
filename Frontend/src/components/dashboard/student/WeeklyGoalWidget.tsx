import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, Pencil } from "lucide-react";
import { dashboardService } from "@/lib/api/dashboardService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function WeeklyGoalWidget() {
    const [weeklyGoal, setWeeklyGoal] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newTarget, setNewTarget] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadWeeklyGoal();
    }, []);

    const loadWeeklyGoal = async () => {
        try {
            const data = await dashboardService.getWeeklyGoal();
            setWeeklyGoal(data);
            setNewTarget(data.targetHours.toString());
        } catch (error) {
            console.error('Error loading weekly goal:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateGoal = async () => {
        const target = parseInt(newTarget);
        if (isNaN(target) || target < 1) return;

        setSubmitting(true);
        try {
            await dashboardService.updateWeeklyGoal(target);
            setOpen(false);
            loadWeeklyGoal(); // Refresh
        } catch (error) {
            console.error('Error updating weekly goal:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white border border-[#E1E1E1] shadow-sm p-5 rounded-md flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!weeklyGoal) return null;

    // Generate mock daily data for visualization (to be replaced with real data later)
    const days = [
        { day: "M", completed: 80 },
        { day: "T", completed: 100 },
        { day: "W", completed: 60 },
        { day: "T", completed: 90 },
        { day: "F", completed: weeklyGoal.progress },
        { day: "S", completed: 0 },
        { day: "S", completed: 0 },
    ];

    const isOnTrack = weeklyGoal.progress >= 50;

    return (
        <div className="bg-white border border-[#E1E1E1] shadow-sm p-5 rounded-md relative group">
            <div className="flex justify-between items-center mb-4 border-b border-[#E1E1E1] pb-2">
                <h3 className="text-sm font-bold text-[#1F1F1F]">
                    Weekly Goal
                </h3>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-lms-blue hover:bg-gray-100 rounded-full">
                            <Pencil className="h-3 w-3" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Set Weekly Goal</DialogTitle>
                            <DialogDescription>
                                How many hours do you want to learn this week?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="target" className="text-right">
                                    Hours
                                </Label>
                                <Input
                                    id="target"
                                    type="number"
                                    min="1"
                                    value={newTarget}
                                    onChange={(e) => setNewTarget(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={handleUpdateGoal} disabled={submitting}>
                                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Update Goal
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#555555]">Target: {weeklyGoal.targetHours} hrs</span>
                    <span className="text-xs font-bold text-lms-blue">{weeklyGoal.completedHours} / {weeklyGoal.targetHours} hrs</span>
                </div>

                <div className="flex gap-1 justify-between h-8">
                    {days.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end gap-1 group relative">
                            <div
                                className={`w-full rounded-sm transition-all ${d.completed > 0 ? "bg-lms-blue" : "bg-gray-100"}`}
                                style={{ height: d.completed > 0 ? `${d.completed}%` : "100%", opacity: d.completed > 0 ? d.completed / 100 + 0.2 : 1 }}
                            ></div>
                        </div>
                    ))}
                </div>

                <p className="text-[11px] text-[#555555] text-center flex items-center justify-center gap-1">
                    <CheckCircle2 className={`h-3 w-3 ${isOnTrack ? 'text-green-600' : 'text-orange-600'}`} />
                    {isOnTrack ? "You're on track to hit your goal! Keep learning." : "Keep pushing to reach your weekly goal!"}
                </p>
            </div>
        </div>
    );
}
