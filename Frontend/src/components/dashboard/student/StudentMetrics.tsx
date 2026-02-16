import { useState, useEffect } from "react";
import { TrendingUp, BookOpen, Clock, Award, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { dashboardService } from "@/lib/api/dashboardService";

export function StudentMetrics() {
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMetrics();
    }, []);

    const loadMetrics = async () => {
        try {
            const data = await dashboardService.getMetrics();
            setMetrics(data);
        } catch (error) {
            console.error('Error loading metrics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-none shadow-sm">
                        <CardContent className="p-6 flex justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const metricsDisplay = [
        {
            label: "Courses Enrolled",
            value: metrics?.coursesEnrolled || 0,
            unit: "",
            subtext: `${metrics?.certificatesEarned || 0} completed`,
            icon: BookOpen,
            color: "text-blue-600",
        },
        {
            label: "Hours Learned",
            value: metrics?.hoursLearned || 0,
            unit: "hrs",
            subtext: "This month",
            icon: Clock,
            color: "text-green-600",
        },
        {
            label: "Certificates",
            value: metrics?.certificatesEarned || 0,
            unit: "",
            subtext: "Earned",
            icon: Award,
            color: "text-purple-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {metricsDisplay.map((metric, index) => (
                <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                    {metric.label}
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-light text-[#1F1F1F]">{metric.value}</span>
                                    {metric.unit && <span className="text-lg text-[#1F1F1F]">{metric.unit}</span>}
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold mt-1 ${metric.color}`}>
                                    <metric.icon className="h-3.5 w-3.5" /> {metric.subtext}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
