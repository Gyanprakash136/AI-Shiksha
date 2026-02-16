import { useState, useEffect } from "react";
import { Verified, Loader2, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
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
import { dashboardService } from "@/lib/api/dashboardService";

export function MilestoneWidget() {
    const [milestone, setMilestone] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadMilestones();
    }, []);

    const loadMilestones = async () => {
        try {
            const data = await dashboardService.getMilestones();
            setMilestone(data);
        } catch (error) {
            console.error('Error loading milestones:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMilestone = async () => {
        if (!newTitle.trim()) return;
        setSubmitting(true);
        try {
            await dashboardService.addMilestone({ title: newTitle });
            setNewTitle("");
            setOpen(false);
            loadMilestones(); // Refresh
        } catch (error) {
            console.error('Error adding milestone:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-md flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
            </div>
        );
    }

    if (!milestone) return null;

    const progressPercent = (milestone.progress / milestone.total) * 100;

    return (
        <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-md relative group">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-[#002D9C] uppercase tracking-wider">Next Milestone</h3>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded-full">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Milestone</DialogTitle>
                            <DialogDescription>
                                Set a personal goal to track your progress.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="e.g. Complete React Course"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddMilestone} disabled={submitting}>
                                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Add Milestone
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-start gap-3">
                <Verified className="text-lms-blue h-6 w-6 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-sm font-bold text-[#1F1F1F] leading-tight">
                        {milestone.nextMilestone}
                    </p>
                    <p className="text-xs text-[#555555] mt-1">
                        {milestone.progress} of {milestone.total} completed. Reward: {milestone.reward}
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <Progress value={progressPercent} className="h-1.5 bg-blue-200" />
            </div>

            {/* List of Milestones */}
            {milestone.milestones && milestone.milestones.length > 0 && (
                <div className="mt-6 pt-4 border-t border-blue-100">
                    <h4 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Your Milestones</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {milestone.milestones.filter((m: any) => !m.completed).length === 0 ? (
                            <p className="text-xs text-gray-400 italic">No pending milestones.</p>
                        ) : (
                            milestone.milestones
                                .filter((m: any) => !m.completed)
                                .map((m: any) => (
                                    <div key={m.id} className="flex items-center group">
                                        <button
                                            onClick={async () => {
                                                try {
                                                    await dashboardService.completeMilestone(m.id);
                                                    loadMilestones();
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                            }}
                                            className="h-4 w-4 rounded border border-gray-300 text-lms-blue hover:border-lms-blue flex items-center justify-center mr-2 transition-colors"
                                        >
                                            <div className="h-2 w-2 rounded-sm bg-lms-blue opacity-0 hover:opacity-100 transition-opacity" />
                                        </button>
                                        <span className="text-sm text-gray-700">{m.title}</span>
                                        {m.target_date && (
                                            <span className="ml-auto text-[10px] text-gray-400">
                                                {new Date(m.target_date).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
