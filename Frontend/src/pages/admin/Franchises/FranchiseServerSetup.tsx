
import { useState, useEffect } from "react";
import { SystemSettings } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Server, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FranchiseServerSetup() {
    const [ip, setIp] = useState("");
    const [cname, setCname] = useState("");
    const [instructions, setInstructions] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await SystemSettings.getFranchiseServerInfo();
            setIp(data.ip || "");
            setCname(data.cname || "");
            setInstructions(data.instructions || "");
        } catch (error) {
            console.error("Failed to load server settings", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await SystemSettings.updateFranchiseServerInfo({ ip, cname, instructions });
            toast({
                title: "Settings Saved",
                description: "Franchise server configuration updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save settings.",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="h-32 flex items-center justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>;

    return (
        <Card className="border-l-4 border-l-blue-600 shadow-sm mb-8">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Server className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">Franchise Server Setup</CardTitle>
                        <CardDescription>
                            Configure the global server details for custom domains. These instructions will be shown to franchise owners.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="server-ip">Server IP Address (A Record)</Label>
                        <Input
                            id="server-ip"
                            placeholder="e.g. 192.168.1.1"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="server-cname">Server CNAME (Optional)</Label>
                        <Input
                            id="server-cname"
                            placeholder="e.g. lb.example.com"
                            value={cname}
                            onChange={(e) => setCname(e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instructions">Setup Instructions</Label>
                    <Textarea
                        id="instructions"
                        placeholder="Add specific instructions for franchise owners on how to configure their DNS..."
                        className="h-24 resize-none"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                        This text will be displayed in the setup guide for new franchises.
                    </p>
                </div>
            </CardContent>
            <CardFooter className="bg-muted/30 flex justify-end py-3">
                <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Configuration
                </Button>
            </CardFooter>
        </Card>
    );
}
