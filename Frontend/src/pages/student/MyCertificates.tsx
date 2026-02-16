import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Award,
    Download,
    Share2,
    ArrowLeft,
    Loader2,
    Calendar,
    BookOpen,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { certificatesService, Certificate } from "@/lib/api/certificatesService";

export default function MyCertificatesPage() {
    const { toast } = useToast();
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        try {
            setLoading(true);
            const data = await certificatesService.getMyCertificates();
            setCertificates(data);
        } catch (error: any) {
            toast({
                title: "Error",
                description: "Failed to load certificates",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (certificate: Certificate) => {
        try {
            await certificatesService.downloadCertificate(certificate.id);
            toast({
                title: "Download Started",
                description: "Your certificate is being downloaded",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to download certificate",
                variant: "destructive",
            });
        }
    };

    const handleShare = (certificate: Certificate) => {
        const shareUrl = `${window.location.origin}/certificates/${certificate.id}`;
        navigator.clipboard.writeText(shareUrl);
        toast({
            title: "Link Copied",
            description: "Certificate link copied to clipboard",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
                    <p className="text-muted-foreground">
                        View and download your earned certificates
                    </p>
                </div>

                {certificates.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <Award className="h-16 w-16 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
                            <p className="text-muted-foreground text-center mb-6">
                                Complete courses to earn certificates and showcase your achievements
                            </p>
                            <Link to="/courses">
                                <Button>
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    Browse Courses
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {certificates.map((certificate) => (
                            <Card
                                key={certificate.id}
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => setSelectedCertificate(certificate)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <Award className="h-8 w-8 text-primary" />
                                        <Badge variant="secondary" className="text-xs">
                                            Verified
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <h3 className="font-semibold text-lg line-clamp-2">
                                            {certificate.courseName}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Certificate of Completion
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                            Issued {new Date(certificate.completedDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDownload(certificate);
                                            }}
                                        >
                                            <Download className="h-3 w-3 mr-1" />
                                            Download
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleShare(certificate);
                                            }}
                                        >
                                            <Share2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
