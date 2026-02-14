import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter, DragEndEvent, useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    GripVertical,
    Edit,
    Trash2,
    ChevronDown,
    ChevronUp,
    Plus,
    Video,
    HelpCircle,
    ClipboardList,
    MoreVertical
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { LessonItem } from './LessonItem';
import type { CourseSection, SectionItem, SectionItemType } from '@/types/courseBuilder';

interface SectionItemProps {
    section: CourseSection;
    onUpdate: (updates: any) => void;
    onDelete: () => void;
    onAddItem: (type: SectionItemType) => void;
    onEditItem: (item: SectionItem) => void;
    onDeleteItem: (itemId: string) => void;
    onReorderItems: (items: SectionItem[]) => void;
}

export function SectionItem({
    section,
    onUpdate,
    onDelete,
    onAddItem,
    onEditItem,
    onDeleteItem,
    onReorderItems
}: SectionItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(section.title);

    // Auto-save on blur or enter? currently manual save button for simplicity
    const saveEdit = () => {
        onUpdate({ title });
        setIsEditing(false);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = section.items.findIndex((item) => item.id === active.id);
            const newIndex = section.items.findIndex((item) => item.id === over.id);

            const newItems = arrayMove(section.items, oldIndex, newIndex);
            onReorderItems(newItems);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                'group/section bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden mb-6 transition-all duration-300',
                isDragging && 'shadow-2xl ring-2 ring-blue-500/20 rotate-1 scale-[1.01] z-10 cursor-grabbing'
            )}
        >
            {/* Header */}
            <div className={cn(
                "flex items-center gap-4 p-5 transition-colors border-b border-gray-50",
                section.is_collapsed ? "bg-white" : "bg-gray-50/30"
            )}>
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                    <GripVertical className="h-6 w-6" />
                </button>

                <div className="flex-1">
                    {isEditing ? (
                        <div className="flex items-center gap-3">
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="h-10 font-bold text-lg bg-white border-blue-200 focus:ring-blue-100 rounded-xl"
                                autoFocus
                                onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                            />
                            <Button size="sm" onClick={saveEdit} className="rounded-xl px-4 bg-blue-600 text-white hover:bg-blue-700">Save</Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-bold text-gray-900 text-lg leading-tight tracking-tight">
                                    {section.title}
                                </h3>
                                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                                    Section {section.order_index}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">
                                {section.items.length} {section.items.length === 1 ? 'item' : 'items'} inside
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onUpdate({ is_collapsed: !section.is_collapsed })}
                        className="h-10 w-10 text-gray-500 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                    >
                        {section.is_collapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-10 w-10 text-gray-500 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl shadow-xl border-gray-100 p-2 w-48">
                            <DropdownMenuItem onClick={() => setIsEditing(true)} className="rounded-xl py-2.5 px-3 cursor-pointer">
                                <Edit className="h-4 w-4 mr-3 text-gray-500" /> Rename Section
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={onDelete} className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl py-2.5 px-3 cursor-pointer focus:bg-red-50 focus:text-red-700">
                                <Trash2 className="h-4 w-4 mr-3" /> Delete Section
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Content */}
            {!section.is_collapsed && (
                <div className="p-5 bg-white">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={section.items.map(i => i.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="min-h-[20px] space-y-3 pb-4">
                                {section.items.length === 0 && (
                                    <div className="text-center py-10 px-4 text-gray-400 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center gap-2">
                                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                            <Plus className="h-5 w-5" />
                                        </div>
                                        <p className="text-sm font-medium">This section is empty</p>
                                        <p className="text-xs text-gray-400">Add lessons or quizzes to get started</p>
                                    </div>
                                )}
                                {section.items.map((item) => (
                                    <LessonItem
                                        key={item.id}
                                        item={item}
                                        onEdit={onEditItem}
                                        onDelete={() => onDeleteItem(item.id)}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>

                    {/* Add Buttons Grid */}
                    <div className="mt-4 pt-4 border-t border-dashed border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Add Content</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <Button
                                variant="ghost"
                                className="h-auto py-3 px-4 justify-start gap-3 border border-gray-100 bg-gray-50 hover:bg-blue-50/50 hover:border-blue-100 hover:text-blue-700 text-gray-600 rounded-2xl transition-all group"
                                onClick={() => onAddItem('LECTURE')}
                            >
                                <div className="h-8 w-8 rounded-full bg-white border border-gray-200 group-hover:border-blue-200 flex items-center justify-center text-blue-500 shadow-sm">
                                    <Video className="h-4 w-4" />
                                </div>
                                <div className="text-left">
                                    <span className="block font-semibold text-sm">Lecture</span>
                                    <span className="block text-[10px] opacity-70 font-normal">Video, File, or Text</span>
                                </div>
                            </Button>

                            <Button
                                variant="ghost"
                                className="h-auto py-3 px-4 justify-start gap-3 border border-gray-100 bg-gray-50 hover:bg-purple-50/50 hover:border-purple-100 hover:text-purple-700 text-gray-600 rounded-2xl transition-all group"
                                onClick={() => onAddItem('QUIZ')}
                            >
                                <div className="h-8 w-8 rounded-full bg-white border border-gray-200 group-hover:border-purple-200 flex items-center justify-center text-purple-500 shadow-sm">
                                    <HelpCircle className="h-4 w-4" />
                                </div>
                                <div className="text-left">
                                    <span className="block font-semibold text-sm">Quiz</span>
                                    <span className="block text-[10px] opacity-70 font-normal">Check understanding</span>
                                </div>
                            </Button>

                            <Button
                                variant="ghost"
                                className="h-auto py-3 px-4 justify-start gap-3 border border-gray-100 bg-gray-50 hover:bg-orange-50/50 hover:border-orange-100 hover:text-orange-700 text-gray-600 rounded-2xl transition-all group"
                                onClick={() => onAddItem('ASSIGNMENT')}
                            >
                                <div className="h-8 w-8 rounded-full bg-white border border-gray-200 group-hover:border-orange-200 flex items-center justify-center text-orange-500 shadow-sm">
                                    <ClipboardList className="h-4 w-4" />
                                </div>
                                <div className="text-left">
                                    <span className="block font-semibold text-sm">Assignment</span>
                                    <span className="block text-[10px] opacity-70 font-normal">Tasks & Projects</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
