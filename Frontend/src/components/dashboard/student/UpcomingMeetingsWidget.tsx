import { useState, useEffect } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dashboardService } from "@/lib/api/dashboardService";

export function UpcomingMeetingsWidget() {
    const [meetings, setMeetings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMeetings();
    }, []);

    const loadMeetings = async () => {
        try {
            const data = await dashboardService.getMeetings();
            setMeetings(data);
        } catch (error) {
            console.error('Error loading meetings:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white border border-[#E1E1E1] shadow-sm p-5 rounded-md flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
        );
    }

    const formatMeetingDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return `Today • ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow • ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
        }
    };

    return (
        <div className="bg-white border border-[#E1E1E1] shadow-sm p-5 rounded-md">
            <h3 className="text-sm font-bold text-[#1F1F1F] mb-4 flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                Upcoming Meetings
                <Calendar className="text-gray-400 h-[18px] w-[18px]" />
            </h3>
            {meetings.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No upcoming meetings</p>
            ) : (
                <div className="space-y-5">
                    {meetings.map((meeting, index) => (
                        <div key={meeting.id || index} className="group cursor-pointer">
                            <p className="text-[10px] font-bold uppercase mb-0.5 text-lms-blue">
                                {formatMeetingDate(meeting.date)}
                            </p>
                            <p className="text-sm font-semibold text-[#1F1F1F] group-hover:text-lms-blue transition-colors">
                                {meeting.title}
                            </p>
                            <p className="text-[11px] text-[#555555]">{meeting.instructor}</p>
                        </div>
                    ))}
                </div>
            )}
            <Button variant="outline" className="w-full mt-6 text-xs font-bold text-[#555555] hover:text-lms-blue hover:border-lms-blue">
                View Full Calendar
            </Button>
        </div>
    );
}
