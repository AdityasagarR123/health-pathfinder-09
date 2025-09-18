import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import GlassCard from "@/components/ui/glass-card";
import { 
  Activity, 
  Heart, 
  TrendingUp, 
  MessageSquare, 
  Calendar, 
  AlertCircle, 
  CheckCircle,
  Clock,
  User,
  LogOut
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";

interface PatientDashboardProps {
  user: {
    id: string;
    name: string;
    age: string;
    gender: string;
    role: string;
    cancerType?: string;
    stage?: string;
    preferences?: string;
  };
  onLogout: () => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user, onLogout }) => {
  const [riskPrediction, setRiskPrediction] = useState(0);
  const [survivability, setSurvivability] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Mock survivability data
  const survivabilityData = [
    { month: 0, probability: 100 },
    { month: 6, probability: 95 },
    { month: 12, probability: 89 },
    { month: 18, probability: 85 },
    { month: 24, probability: 82 },
    { month: 36, probability: 78 },
    { month: 48, probability: 75 },
    { month: 60, probability: 72 },
  ];

  // Mock treatment suggestions
  const treatments = [
    {
      name: "Targeted Therapy",
      effectiveness: 87,
      sideEffects: "Low",
      cost: "High",
      duration: "6-12 months",
      status: "recommended"
    },
    {
      name: "Immunotherapy",
      effectiveness: 74,
      sideEffects: "Moderate",
      cost: "Very High",
      duration: "3-6 months",
      status: "alternative"
    },
    {
      name: "Chemotherapy",
      effectiveness: 65,
      sideEffects: "High",
      cost: "Moderate",
      duration: "4-8 months",
      status: "fallback"
    }
  ];

  useEffect(() => {
    // Simulate AI prediction generation
    const generatePrediction = () => {
      setIsGenerating(true);
      
      setTimeout(() => {
        // Mock AI calculation based on user data
        const baseRisk = user.cancerType ? 
          (user.stage === "IV" ? 85 : user.stage === "III" ? 65 : user.stage === "II" ? 45 : 25) : 15;
        
        const ageAdjustment = parseInt(user.age) > 65 ? 10 : parseInt(user.age) > 50 ? 5 : 0;
        const genderAdjustment = user.gender === "female" && user.cancerType === "breast" ? -5 : 0;
        
        const finalRisk = Math.max(5, Math.min(95, baseRisk + ageAdjustment + genderAdjustment));
        const survivalRate = Math.max(15, 100 - finalRisk + 10);
        
        setRiskPrediction(finalRisk);
        setSurvivability(survivalRate);
        setIsGenerating(false);
        
        toast({
          title: "Prediction Generated! 🚀",
          description: "AI analysis completed using advanced machine learning models.",
        });
      }, 2000);
    };

    generatePrediction();
  }, [user, toast]);

  const handleChatWithAI = () => {
    toast({
      title: "AI Assistant",
      description: "Connecting you with our AI medical assistant...",
    });
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "text-medical-success";
    if (risk < 70) return "text-medical-warning";
    return "text-medical-danger";
  };

  const getRiskBadge = (risk: number) => {
    if (risk < 30) return "Low Risk";
    if (risk < 70) return "Moderate Risk";
    return "High Risk";
  };

  const getTreatmentBadge = (status: string) => {
    switch (status) {
      case "recommended":
        return <Badge className="status-success">Recommended</Badge>;
      case "alternative":
        return <Badge className="bg-medical-warning text-medical-warning-foreground">Alternative</Badge>;
      default:
        return <Badge variant="secondary">Fallback</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/2 to-medical-success/2">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Welcome, {user.name}</h1>
                <p className="text-sm text-muted-foreground">
                  Patient Dashboard • Age {user.age} • {user.gender}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={onLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8">
        {/* Glass Cards Section */}
        <div className="flex flex-wrap gap-6 justify-center">
          <GlassCard 
            variant="prediction" 
            title="Risk Analysis"
            description={isGenerating ? "Generating AI prediction..." : `${riskPrediction}% risk level detected`}
          />
          <GlassCard 
            variant="treatment" 
            title="Treatment Plan"
            description="3 personalized options available"
          />
          <GlassCard 
            variant="analytics" 
            title="Survivability"
            description={`${survivability}% 5-year survival rate`}
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Risk Prediction Card */}
          <Card className="medical-card col-span-full lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Cancer Risk Prediction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isGenerating ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">AI analysis in progress...</p>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getRiskColor(riskPrediction)} mb-2`}>
                      {riskPrediction}%
                    </div>
                    <Badge variant={riskPrediction < 30 ? "default" : "destructive"}>
                      {getRiskBadge(riskPrediction)}
                    </Badge>
                  </div>
                  
                  <Progress value={riskPrediction} className="h-3" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age Factor:</span>
                      <span>{parseInt(user.age) > 65 ? "High Impact" : "Low Impact"}</span>
                    </div>
                    {user.cancerType && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cancer Type:</span>
                        <span className="capitalize">{user.cancerType}</span>
                      </div>
                    )}
                    {user.stage && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stage:</span>
                        <span>Stage {user.stage}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Treatment Suggestions */}
          <Card className="medical-card col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-medical-success" />
                Treatment Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treatments.map((treatment, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{treatment.name}</h4>
                        {getTreatmentBadge(treatment.status)}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{treatment.effectiveness}%</div>
                        <div className="text-xs text-muted-foreground">Effectiveness</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Side Effects:</span>
                        <div className="font-medium">{treatment.sideEffects}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost:</span>
                        <div className="font-medium">{treatment.cost}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium">{treatment.duration}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Survivability Graph */}
          <Card className="medical-card col-span-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-medical-warning" />
                Survivability Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={survivabilityData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="month" 
                      label={{ value: 'Months', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      label={{ value: 'Survival Probability (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Survival Probability']}
                      labelFormatter={(label) => `Month ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="probability" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-foreground">
                  5-Year Survival Probability: <span className="text-primary">{survivability}%</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on current medical data and AI analysis
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="medical-card col-span-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button 
                  onClick={handleChatWithAI}
                  className="btn-medical flex items-center gap-2 justify-center py-6"
                >
                  <MessageSquare className="h-5 w-5" />
                  Chat with AI Assistant
                </Button>
                
                <Button 
                  variant="outline"
                  className="flex items-center gap-2 justify-center py-6 border-primary/20 hover:bg-primary/5"
                >
                  <Calendar className="h-5 w-5" />
                  Schedule Consultation
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-medical-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Important Note</p>
                    <p className="text-sm text-muted-foreground">
                      These predictions are for informational purposes only. Please consult with your healthcare provider for proper medical advice and treatment decisions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;