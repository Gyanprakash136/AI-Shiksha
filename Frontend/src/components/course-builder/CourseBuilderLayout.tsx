import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CourseBuilderLayoutProps {
    children: ReactNode;
    title: string;
    onBack?: () => void;
    onPreview?: () => void;
    onSave?: () => void;
    saving?: boolean;
    disabled?: boolean;
    buttonText?: string;
    className?: string; // Content wrapper class
}

export function CourseBuilderLayout({
    children,
    title,
    onBack,
    onPreview,
    onSave,
    saving = false,
    disabled = false,
    buttonText,
    className,
}: CourseBuilderLayoutProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) onBack();
        else navigate(-1);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Sticky Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBack}
                        className="rounded-full hover:bg-gray-100 text-gray-600"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
                </div>

                <div className="flex items-center gap-3">
                    {onPreview && (
                        <Button
                            variant="outline"
                            onClick={onPreview}
                            className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            <Eye className="h-4 w-4" />
                            Preview
                        </Button>
                    )}
                    {onSave && (
                        <Button
                            onClick={onSave}
                            disabled={saving || disabled}
                            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    {buttonText ? buttonText.replace('Publish', 'Publishing').replace('Update', 'Updating') : 'Saving...'}
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    {buttonText || 'Save Changes'}
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <main className={cn("flex-1 w-full", className)}>
                {children}
            </main>
        </div>
    );
}
