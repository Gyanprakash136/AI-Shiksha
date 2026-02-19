
import { useState } from "react";
import api, { SystemSettings } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AddFranchiseModalProps {
    onSuccess: () => void;
}

export default function AddFranchiseModal({ onSuccess }: AddFranchiseModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<"form" | "success">("form");
    const [serverInfo, setServerInfo] = useState<{ ip: string; cname: string } | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        lms_name: "",
        domain: "",
        admin_name: "",
        admin_email: "",
    });
    const [createdFranchise, setCreatedFranchise] = useState<any>(null); // To store created data
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // First submit the franchise data
            const response = await api.post("/franchises", formData);
            setCreatedFranchise(response.data);

            // Fetch server info for instructions
            const info = await SystemSettings.getFranchiseServerInfo();
            setServerInfo(info);

            setStep("success");
            onSuccess();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to create franchise",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setStep("form");
        setFormData({
            name: "",
            lms_name: "",
            domain: "",
            admin_name: "",
            admin_email: "",
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Franchise
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                {step === "form" ? (
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Add New Franchise</DialogTitle>
                            <DialogDescription>
                                Enter the details of the new franchise and their custom domain.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">System Name</Label>
                                    <Input id="name" placeholder="Acme Corp" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lms_name">LMS Display Name</Label>
                                    <Input id="lms_name" placeholder="Acme Academy" value={formData.lms_name} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="domain">Custom Domain</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">https://</span>
                                    <Input id="domain" placeholder="academy.acme.com" value={formData.domain} onChange={handleChange} required />
                                </div>
                                <p className="text-xs text-muted-foreground">Allow access via this custom domain.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="admin_name">Admin Name</Label>
                                    <Input id="admin_name" placeholder="John Doe" value={formData.admin_name} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="admin_email">Admin Email</Label>
                                    <Input id="admin_email" type="email" placeholder="admin@acme.com" value={formData.admin_email} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Create Franchise
                            </Button>
                        </DialogFooter>
                    </form>
                ) : (
                    <div className="py-2">
                        <DialogHeader>
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <CheckCircle2 className="h-6 w-6" />
                                <DialogTitle>Franchise Created Successfully</DialogTitle>
                            </div>
                            <DialogDescription>
                                Share the following details with the Franchise Administrator.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 mt-6">
                            <Alert>
                                <AlertTitle>Temporary Admin Password</AlertTitle>
                                <AlertDescription className="font-mono bg-muted p-2 rounded mt-1 select-all">
                                    {createdFranchise?.admin?.temp_password}
                                </AlertDescription>
                            </Alert>

                            <div className="space-y-2 border p-4 rounded-lg bg-slate-50">
                                <h4 className="font-semibold text-sm">DNS Configuration Required</h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Ask the IT team of <strong>{createdFranchise?.franchise?.name}</strong> to update their domain provider:
                                </p>
                                <div className="grid gap-2 text-sm">
                                    <div className="flex justify-between border-b pb-1">
                                        <span className="text-muted-foreground">Domain</span>
                                        <span className="font-medium">{formData.domain}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <span className="text-muted-foreground">Record Type</span>
                                        <span className="font-medium">A Record</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Value (IP)</span>
                                        <span className="font-mono font-medium bg-white px-2 border rounded">
                                            {serverInfo?.ip || "Pending Server Setup"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="mt-6">
                            <Button onClick={handleClose}>Done</Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
