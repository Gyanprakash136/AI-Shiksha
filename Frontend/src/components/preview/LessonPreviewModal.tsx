import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { X, Download, FileText, PlayCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface LessonPreviewModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    content: any; // LectureContent
    loading?: boolean;
}

export function LessonPreviewModal({
    open,
    onOpenChange,
    title,
    content,
    loading
}: LessonPreviewModalProps) {

    if (!open) return null;

    // Debugging
    console.log('Preview Content:', content);

    // Content Detection Logic:
    // We check for the presence of specific fields (video_url, text_content, file_url) regardless of the 'content_type' enum.
    // This ensures that mixed content (e.g. Type=TEXT but having a video added later) is displayed correctly.
    const hasVideo = !!content?.video_url;
    const hasText = !!content?.text_content;
    const hasFile = !!content?.file_url;
    const hasLink = !!content?.external_url;

    // Helper to get video ID from YouTube URL
    const getYouTubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden rounded-3xl border-none shadow-2xl bg-[#fafafa]">
                <DialogDescription className="sr-only">
                    preview of lesson content
                </DialogDescription>
                {/* Header */}
                <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100 z-10 relative">
                    <DialogTitle className="text-xl font-medium text-gray-900 line-clamp-1">
                        {title}
                    </DialogTitle>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[85vh] bg-white">
                    {loading ? (
                        <div className="h-96 flex flex-col items-center justify-center gap-4 text-gray-400">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                            <p className="text-sm font-medium">Loading lesson content...</p>
                        </div>
                    ) : content ? (
                        <div className="flex flex-col">
                            {/* Video Section - Hero Style */}
                            {hasVideo && content.video_url && (
                                <div className="w-full bg-black aspect-video relative group">
                                    {content.video_provider === 'YOUTUBE' || content.video_url.includes('youtu') ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYouTubeId(content.video_url)}`}
                                            title={title}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <video
                                            src={content.video_url}
                                            controls
                                            className="w-full h-full"
                                            controlsList="nodownload"
                                        />
                                    )}
                                </div>
                            )}

                            {/* Content Body */}
                            <div className="p-8 space-y-8 max-w-3xl mx-auto w-full">

                                {/* Text Content */}
                                {hasText && content.text_content && (
                                    <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed font-light">
                                        <div dangerouslySetInnerHTML={{ __html: typeof content.text_content === 'string' ? content.text_content : JSON.stringify(content.text_content) }} />
                                    </div>
                                )}

                                {/* External Link */}
                                {hasLink && content.external_url && (
                                    <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between group hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm">
                                                <ExternalLink size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">External Resource</h4>
                                                <p className="text-sm text-gray-500 line-clamp-1">{content.external_url}</p>
                                            </div>
                                        </div>
                                        <Button asChild variant="ghost" className="rounded-full hover:bg-blue-100 text-blue-700">
                                            <a href={content.external_url} target="_blank" rel="noopener noreferrer">
                                                Open
                                            </a>
                                        </Button>
                                    </div>
                                )}

                                {/* Attachments/Files */}
                                {hasFile && content.file_url && (
                                    <div className="space-y-4">
                                        <Separator className="bg-gray-100" />
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Downloads</h3>

                                        <div className="flex items-center p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all group">
                                            <div className="p-3 bg-white rounded-xl text-gray-500 border border-gray-100 shadow-sm mr-4 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                                                <FileText size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">
                                                    {content.file_name || content.file_url?.split('/').pop() || 'Lesson Attachment'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {content.file_type || 'File'} • {content.file_size ? `${(content.file_size / 1024 / 1024).toFixed(2)} MB` : 'Unknown size'}
                                                </p>
                                            </div>
                                            <Button asChild size="sm" variant="outline" className="rounded-full gap-2 border-gray-200 text-gray-700 hover:text-blue-700 hover:border-blue-200 hover:bg-blue-50">
                                                <a href={content.file_url} download target="_blank" rel="noopener noreferrer">
                                                    <Download size={14} />
                                                    <span>Download</span>
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                            <p>No content available for this lesson.</p>
                        </div>
                    )}
                </div>

                {/* Footer (Optional, mostly for navigation if we add Next/Prev later) */}
                {/* <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <Button onClick={() => onOpenChange(false)}>Close</Button>
                </div> */}
            </DialogContent>
        </Dialog>
    );
}
