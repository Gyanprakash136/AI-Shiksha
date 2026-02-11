import { useState } from "react";
import StudentLayout from "@/components/student/StudentLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Bell,
  Shield,
  Sparkles,
  Globe,
  Moon,
  Camera,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StudentSettings() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "Student User",
    email: "student@example.com",
    bio: "Learning enthusiast passionate about technology and data science.",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    courseUpdates: true,
    promotions: false,
    aiPersonalization: true,
    darkMode: false,
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <StudentLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Settings
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Profile Information</h2>
              
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-20 w-20 rounded-full bg-lms-emerald flex items-center justify-center text-white text-2xl font-bold">
                  S
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 5MB</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </div>
              </div>

              <Button className="mt-6 bg-lms-blue hover:bg-lms-blue/90" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Email Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, emailNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">Summary of your learning progress</p>
                  </div>
                  <Switch
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, weeklyDigest: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Course Updates</p>
                    <p className="text-sm text-muted-foreground">New lessons and content</p>
                  </div>
                  <Switch
                    checked={preferences.courseUpdates}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, courseUpdates: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* AI Settings Tab */}
          <TabsContent value="ai" className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-lms-purple flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">AI Personalization</h2>
                  <p className="text-sm text-muted-foreground">Control how AI enhances your learning</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Personalized Learning</p>
                    <p className="text-sm text-muted-foreground">
                      AI adapts content based on your learning style
                    </p>
                  </div>
                  <Switch
                    checked={preferences.aiPersonalization}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, aiPersonalization: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-2">Your Learning Profile</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Learning Style</p>
                      <p className="font-medium text-foreground">Visual Learner</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Preferred Pace</p>
                      <p className="font-medium text-foreground">Moderate</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Strong Areas</p>
                      <p className="font-medium text-foreground">Programming, Logic</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Focus Areas</p>
                      <p className="font-medium text-foreground">Mathematics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Security Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" className="mt-1" />
                </div>
                <Button className="bg-lms-blue hover:bg-lms-blue/90">
                  Update Password
                </Button>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-medium text-foreground mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}
