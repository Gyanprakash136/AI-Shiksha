import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    GripVertical,
    Video,
    FileText,
    HelpCircle,
    ClipboardList,
    Trash2,
    Edit,
    Eye,
    CheckCircle2,
    Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SectionItem } from '@/types/courseBuilder';

interface LessonItemProps {
    item: SectionItem;
    onEdit: (item: SectionItem) => void;
    onDelete: () => void;
}

const itemTypeConfig = {
    LECTURE: { icon: Video, label: 'Lecture', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    QUIZ: { icon: HelpCircle, label: 'Quiz', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    ASSIGNMENT: { icon: ClipboardList, label: 'Assignment', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    RESOURCE: { icon: FileText, label: 'Resource', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
};

export function LessonItem({ item, onEdit, onDelete }: LessonItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const config = itemTypeConfig[item.type] || itemTypeConfig.RESOURCE;
    const Icon = config.icon;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                'group relative flex items-center gap-4 p-4 mb-3 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300 ease-out',
                isDragging && 'opacity-60 shadow-2xl ring-2 ring-blue-500/20 rotate-1 scale-[1.02] z-20 cursor-grabbing'
            )}
        >
            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
                <GripVertical className="h-5 w-5" />
            </div>

            {/* Type Icon */}
            <div className={cn('flex items-center justify-center w-12 h-12 rounded-2xl border bg-opacity-50 transition-colors duration-300 group-hover:scale-105', config.color)}>
                <Icon className="h-5 w-5" />
            </div>

            {/* Content Info */}
            <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 truncate text-base group-hover:text-blue-700 transition-colors">{item.title}</span>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5 h-auto font-normal text-gray-400 border-gray-100 bg-gray-50/50 uppercase tracking-wide">
                        {config.label}
                    </Badge>
                </div>

                <div className="flex items-center gap-2">
                    {item.is_preview && (
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50">
                            <Eye className="h-3 w-3" />
                            Preview
                        </div>
                    )}
                    {item.is_mandatory && (
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100/50">
                            <CheckCircle2 className="h-3 w-3" />
                            Required
                        </div>
                    )}
                    {item.duration_minutes !== undefined && item.duration_minutes > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                            <Clock className="h-3 w-3" />
                            {item.duration_minutes}m
                        </span>
                    )}
                </div>
            </div>

            {/* Meta & Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onEdit(item)}
                    className="h-9 w-9 text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                    title="Edit Lesson"
                >
                    <Edit className="h-4 w-4" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={onDelete}
                    className="h-9 w-9 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                    title="Delete Lesson"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
