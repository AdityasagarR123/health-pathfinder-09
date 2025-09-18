import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserPlus, LogIn, Heart, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  age: string;
  gender: "male" | "female" | "other";
  role: "doctor" | "patient";
  cancerType?: string;
  stage?: string;
  preferences?: string;
}

interface AuthFormProps {
  onAuth: (user: UserProfile & { id: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    age: "",
    gender: "male",
    role: "patient",
    cancerType: "",
    stage: "",
    preferences: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate authentication
    const user = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
    };

    toast({
      title: isLogin ? "Login Successful!" : "Account Created!",
      description: `Welcome ${user.role === "doctor" ? "Dr." : ""} ${user.name}`,
    });

    onAuth(user);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-medical-success/5 p-4">
      <Card className="w-full max-w-md shadow-card border-border/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
            {isLogin ? (
              <LogIn className="h-6 w-6 text-primary-foreground" />
            ) : (
              <UserPlus className="h-6 w-6 text-primary-foreground" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Sign in to access your cancer prediction dashboard"
              : "Join our AI-powered cancer prediction platform"
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="border-border/50 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                required
                min="1"
                max="150"
                className="border-border/50 focus:border-primary"
              />
            </div>

            <div className="space-y-3">
              <Label>Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value as "doctor" | "patient")}
              >
                <SelectTrigger className="border-border/50 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Patient
                    </div>
                  </SelectItem>
                  <SelectItem value="doctor">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Doctor
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === "patient" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cancerType">Cancer Type (Optional)</Label>
                  <Select
                    value={formData.cancerType}
                    onValueChange={(value) => handleInputChange("cancerType", value)}
                  >
                    <SelectTrigger className="border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select cancer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breast">Breast Cancer</SelectItem>
                      <SelectItem value="lung">Lung Cancer</SelectItem>
                      <SelectItem value="prostate">Prostate Cancer</SelectItem>
                      <SelectItem value="colorectal">Colorectal Cancer</SelectItem>
                      <SelectItem value="skin">Skin Cancer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.cancerType && (
                  <div className="space-y-2">
                    <Label htmlFor="stage">Cancer Stage (Optional)</Label>
                    <Select
                      value={formData.stage}
                      onValueChange={(value) => handleInputChange("stage", value)}
                    >
                      <SelectTrigger className="border-border/50 focus:border-primary">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Stage 0 (In Situ)</SelectItem>
                        <SelectItem value="I">Stage I (Early)</SelectItem>
                        <SelectItem value="II">Stage II (Localized)</SelectItem>
                        <SelectItem value="III">Stage III (Regional)</SelectItem>
                        <SelectItem value="IV">Stage IV (Advanced)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="preferences">Treatment Preferences (Optional)</Label>
                  <Select
                    value={formData.preferences}
                    onValueChange={(value) => handleInputChange("preferences", value)}
                  >
                    <SelectTrigger className="border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimize-side-effects">Minimize Side Effects</SelectItem>
                      <SelectItem value="cost-effective">Cost-Effective Treatment</SelectItem>
                      <SelectItem value="aggressive">Aggressive Treatment</SelectItem>
                      <SelectItem value="quality-of-life">Quality of Life Focus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full btn-medical"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                className="text-sm text-muted-foreground hover:text-primary"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;