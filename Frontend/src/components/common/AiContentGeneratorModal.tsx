import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2, Lightbulb, X } from 'lucide-react';
import { AI } from '@/lib/api';
import { toast } from 'sonner';

interface AiContentGeneratorModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onGenerate: (content: string) => void;
    context?: string;
}

export function AiContentGeneratorModal({ open, onOpenChange, onGenerate, context }: AiContentGeneratorModalProps) {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    // Options
    const [length, setLength] = useState('1000');
    const [language, setLanguage] = useState('English');
    const [tone, setTone] = useState('Professional');
    const [format, setFormat] = useState('Paragraph');

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        try {
            // Construct a detailed prompt based on options
            const detailedPrompt = `
                Write a ${tone.toLowerCase()} ${format.toLowerCase()} about: "${prompt}".
                Target length: approximately ${length} characters.
                Language: ${language}.
                Context: ${context || 'Course Description'}.
            `;

            // @ts-ignore
            const response = await AI.generateText(detailedPrompt.trim()) as { text: string };
            onGenerate(response.text);
            onOpenChange(false);
            toast.success("Content generated successfully");

            // Reset form partly
            setPrompt('');
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate content");
        } finally {
            setLoading(false);
        }
    };

    const handleInspireMe = () => {
        const suggestions = [
            "Explain the key concepts of [Topic] for beginners...",
            "Write a compelling course description for a masterclass on...",
            "List 5 main learning outcomes for a course about...",
            "Describe the prerequisites needed for...",
        ];
        const random = suggestions[Math.floor(Math.random() * suggestions.length)];
        setPrompt(random);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden rounded-3xl border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-purple-50/50 to-blue-50/50">
                    <div className="flex items-center gap-2 text-purple-700">
                        <Sparkles className="h-5 w-5" />
                        <h2 className="font-semibold text-lg">AI Studio</h2>
                    </div>
                    {/* Close button handled by Dialog primitive usually, but we can add custom if needed. 
                        Shadcn DialogContent usually includes a close X. 
                        We don't need to duplicate it, but let's styling check.
                    */}
                </div>

                <div className="p-6 space-y-6">
                    {/* Main Input */}
                    <div className="space-y-3">
                        <Label className="text-gray-700 font-medium">Craft Your Course Description</Label>
                        <div className="relative">
                            <Textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Provide a brief overview of your course topic, target audience, and key takeaways"
                                className="min-h-[140px] resize-none rounded-2xl border-gray-200 bg-gray-50/50 p-4 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all text-base shadow-inner"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleInspireMe}
                                className="absolute bottom-3 left-3 h-8 gap-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700 rounded-lg text-xs font-medium border border-indigo-100 transition-colors"
                            >
                                <Lightbulb className="h-3.5 w-3.5" />
                                Inspire Me
                            </Button>
                        </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Character Limit</Label>
                            <Input
                                type="number"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                className="h-10 rounded-xl border-gray-200 bg-gray-50/30 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Language</Label>
                            <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50/30 focus:bg-white transition-all">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                                    <SelectItem value="English">English</SelectItem>
                                    <SelectItem value="Spanish">Spanish</SelectItem>
                                    <SelectItem value="French">French</SelectItem>
                                    <SelectItem value="German">German</SelectItem>
                                    <SelectItem value="Hindi">Hindi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tone</Label>
                            <Select value={tone} onValueChange={setTone}>
                                <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50/30 focus:bg-white transition-all">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                                    <SelectItem value="Formal">Formal</SelectItem>
                                    <SelectItem value="Casual">Casual</SelectItem>
                                    <SelectItem value="Enthusiastic">Enthusiastic</SelectItem>
                                    <SelectItem value="Professional">Professional</SelectItem>
                                    <SelectItem value="Instructional">Instructional</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Format</Label>
                            <Select value={format} onValueChange={setFormat}>
                                <SelectTrigger className="h-10 rounded-xl border-gray-200 bg-gray-50/30 focus:bg-white transition-all">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                                    <SelectItem value="Paragraph">Paragraph</SelectItem>
                                    <SelectItem value="List">Bullet Points</SelectItem>
                                    <SelectItem value="Essay">Short Essay</SelectItem>
                                    <SelectItem value="HTML">HTML Structured</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                    <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl hover:bg-gray-200/50 text-gray-600">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleGenerate}
                        disabled={loading || !prompt.trim()}
                        className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-200 border-0 transition-all active:scale-95"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Generate Now
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
