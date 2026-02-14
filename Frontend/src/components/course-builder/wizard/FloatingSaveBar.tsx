import { Button } from '@/components/ui/button';
import { Loader2, ChevronLeft, ChevronRight, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface FloatingSaveBarProps {
    onSave: () => void;
    onSaveAndContinue?: () => void;
    onCancel?: () => void;
    onBack?: () => void;
    loading?: boolean;
    isDirty?: boolean;
    canProceed?: boolean; // New prop to control next button state
    saveLabel?: string; // Used for tooltip now
    saveAndContinueLabel?: string; // Used for tooltip now
    cancelLabel?: string; // Re-added for tooltip
    backLabel?: string; // Used for tooltip now
}

export function FloatingSaveBar({
    onSave,
    onSaveAndContinue,
    onCancel,
    onBack,
    loading = false,
    isDirty = true,
    canProceed = true,
    saveLabel = "Save",
    saveAndContinueLabel = "Next",
    cancelLabel = "Exit",
    backLabel = "Back"
}: FloatingSaveBarProps) {
    return (
        <div className="sticky bottom-6 mx-auto max-w-fit z-40 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-full shadow-2xl shadow-black/5 border border-white/50 -z-10" />
            <div className="flex items-center gap-2 p-2 rounded-full border border-gray-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

                <TooltipProvider delayDuration={300}>
                    {/* Back Button */}
                    {onBack && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    onClick={onBack}
                                    disabled={loading}
                                    className="rounded-full h-10 w-10 hover:bg-gray-100/80 text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{backLabel}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}

                    {/* Cancel Button (Fallback if no Back) */}
                    {!onBack && onCancel && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    onClick={onCancel}
                                    disabled={loading}
                                    className="rounded-full h-10 w-10 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{cancelLabel}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}

                    {/* Save Button */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                type="button"
                                onClick={onSave}
                                disabled={loading}
                                className={cn(
                                    "rounded-full h-10 w-10 transition-colors",
                                    isDirty ? "text-blue-600 hover:bg-blue-50" : "text-gray-400 hover:bg-gray-50"
                                )}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="h-5 w-5" />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{saveLabel}</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* Next Button */}
                    {onSaveAndContinue && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={canProceed ? "default" : "ghost"}
                                    size="icon"
                                    type="button"
                                    onClick={onSaveAndContinue}
                                    disabled={loading || !canProceed}
                                    className={cn(
                                        "rounded-full h-10 w-10 transition-all duration-300",
                                        canProceed
                                            ? "bg-black hover:bg-gray-800 text-white shadow-lg transform hover:scale-105"
                                            : "bg-gray-100 text-gray-300 hover:bg-gray-100 cursor-not-allowed"
                                    )}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{canProceed ? saveAndContinueLabel : "Complete all fields to proceed"}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </TooltipProvider>

            </div>
        </div>
    );
}
