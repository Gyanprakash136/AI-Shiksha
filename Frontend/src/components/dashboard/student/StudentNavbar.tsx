import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Search, Megaphone } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Mock announcements data
const announcements = [
    {
        id: 1,
        title: "New Course: AI for Everyone",
        date: "2 hours ago",
        content: "We've just launched a new beginner-friendly AI course. Enroll now to start learning!",
        type: "new_course",
    },
    {
        id: 2,
        title: "Platform Maintenance",
        date: "Yesterday",
        content: "Scheduled maintenance will occur this Saturday from 2 AM to 4 AM UTC. Please plan accordingly.",
        type: "maintenance",
    },
    {
        id: 3,
        title: "Web Development Bootcamp Update",
        date: "2 days ago",
        content: "New modules have been added to the Web Development Bootcamp. Check out the updated curriculum!",
        type: "update",
    },
];

export function StudentNavbar() {
    return (
        <div className="flex items-center justify-between w-full">
            {/* Search Bar (Left) */}
            <div className="relative w-full max-w-[200px] md:max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search..."
                    className="pl-10 h-10 bg-white border-0 shadow-sm ring-1 ring-inset ring-gray-200 focus-visible:ring-2 focus-visible:ring-lms-blue/20 w-full"
                />
            </div>

            {/* Announcements (Right) */}
            <div className="flex items-center gap-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className="relative bg-white border-gray-200 hover:bg-gray-50 h-10 w-10 rounded-full shadow-sm">
                            <Bell className="h-5 w-5 text-gray-600" />
                            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white transform translate-x-0.5 -translate-y-0.5"></span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="font-semibold text-sm flex items-center gap-2">
                                <Megaphone className="h-4 w-4 text-lms-blue" />
                                Announcements
                            </h3>
                            <span className="text-xs text-muted-foreground">Mark all read</span>
                        </div>
                        <ScrollArea className="h-[300px]">
                            <div className="flex flex-col">
                                {announcements.map((item, index) => (
                                    <div key={item.id}>
                                        <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="text-sm font-medium text-[#1F1F1F] leading-snug">{item.title}</h4>
                                                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{item.date}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2">{item.content}</p>
                                        </div>
                                        {index < announcements.length - 1 && <Separator />}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="p-2 border-t border-gray-100 bg-gray-50/50">
                            <Button variant="ghost" className="w-full text-xs h-8 text-lms-blue hover:text-lms-blue/80 hover:bg-blue-50">
                                View All Announcements
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
