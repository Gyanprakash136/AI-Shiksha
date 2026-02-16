import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SystemSettings } from '@/lib/api';
import { AdminDashboardLayout } from '@/components/layout/AdminDashboardLayout';
import { Loader2 } from 'lucide-react';
import { RichTextEditor } from '@/components/editors/RichTextEditor';

export const ManageTerms = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadTerms();
    }, []);

    const loadTerms = async () => {
        try {
            const data = await SystemSettings.getTerms();
            setContent(data.content || '');
        } catch (error) {
            console.error('Failed to load terms:', error);
            toast.error('Failed to load terms and conditions');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await SystemSettings.updateTerms(content);
            toast.success('Terms and conditions updated successfully');
        } catch (error) {
            console.error('Failed to save terms:', error);
            toast.error('Failed to update terms and conditions');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminDashboardLayout title="Terms & Conditions" subtitle="Manage platform terms and conditions">
                <div className="flex items-center justify-center min-h-96">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </AdminDashboardLayout>
        );
    }

    return (
        <AdminDashboardLayout title="Terms & Conditions" subtitle="Manage platform terms and conditions">
            <div className="space-y-6">
                <div className="flex justify-end">
                    <Button onClick={handleSave} disabled={saving}>
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RichTextEditor
                            content={content}
                            onChange={setContent}
                        />
                    </CardContent>
                </Card>
            </div>
        </AdminDashboardLayout>
    );
};
