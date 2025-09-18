import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import GlassCard from "@/components/ui/glass-card";
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Map, 
  Search, 
  Filter,
  User,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  BarChart3
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useToast } from "@/hooks/use-toast";

interface DoctorDashboardProps {
  user: {
    id: string;
    name: string;
    age: string;
    gender: string;
    role: string;
  };
  onLogout: () => void;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { toast } = useToast();

  // Mock patient cases data
  const patientCases = [
    {
      id: "P001",
      name: "Sarah Johnson",
      age: 45,
      cancerType: "Breast",
      stage: "II",
      riskLevel: 65,
      lastVisit: "2024-01-15",
      status: "active",
      survivability: 78,
    },
    {
      id: "P002", 
      name: "Michael Chen",
      age: 58,
      cancerType: "Lung",
      stage: "III",
      riskLevel: 82,
      lastVisit: "2024-01-14",
      status: "critical",
      survivability: 45,
    },
    {
      id: "P003",
      name: "Emma Davis", 
      age: 34,
      cancerType: "Skin",
      stage: "I",
      riskLevel: 25,
      lastVisit: "2024-01-13",
      status: "stable",
      survivability: 92,
    },
    {
      id: "P004",
      name: "Robert Wilson",
      age: 67,
      cancerType: "Prostate",
      stage: "II",
      riskLevel: 55,
      lastVisit: "2024-01-12",
      status: "active",
      survivability: 85,
    },
    {
      id: "P005",
      name: "Lisa Anderson",
      age: 52,
      cancerType: "Colorectal",
      stage: "III",
      riskLevel: 70,
      lastVisit: "2024-01-11",
      status: "monitoring",
      survivability: 68,
    },
  ];

  // Mock cancer distribution data
  const cancerDistribution = [
    { type: "Breast", count: 145, color: "#FF6B6B" },
    { type: "Lung", count: 128, color: "#4ECDC4" },
    { type: "Prostate", count: 98, color: "#45B7D1" },
    { type: "Colorectal", count: 87, color: "#96CEB4" },
    { type: "Skin", count: 76, color: "#FFEAA7" },
    { type: "Other", count: 112, color: "#DDA0DD" },
  ];

  // Mock treatment response data
  const treatmentResponse = [
    { drug: "Targeted Therapy", success: 87, partial: 8, failure: 5 },
    { drug: "Immunotherapy", success: 74, partial: 15, failure: 11 },
    { drug: "Chemotherapy", success: 65, partial: 20, failure: 15 },
    { drug: "Radiation", success: 78, partial: 12, failure: 10 },
  ];

  // Mock geographic heatmap data (simplified for display)
  const regionalData = [
    { region: "North Delhi", cases: 234, incidence: 12.5 },
    { region: "South Delhi", cases: 189, incidence: 9.8 },
    { region: "Mumbai Central", cases: 298, incidence: 15.2 },
    { region: "Bangalore IT", cases: 156, incidence: 7.9 },
    { region: "Chennai Metro", cases: 203, incidence: 11.3 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge className="bg-medical-danger text-medical-danger-foreground">Critical</Badge>;
      case "active":
        return <Badge className="bg-medical-warning text-medical-warning-foreground">Active</Badge>;
      case "stable":
        return <Badge className="status-success">Stable</Badge>;
      case "monitoring":
        return <Badge variant="secondary">Monitoring</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "text-medical-success";
    if (risk < 70) return "text-medical-warning";
    return "text-medical-danger";
  };

  const handleViewPatient = (patientId: string) => {
    toast({
      title: "Patient Details",
      description: `Opening detailed view for patient ${patientId}...`,
    });
  };

  const filteredPatients = patientCases.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || patient.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
                <h1 className="text-xl font-bold text-foreground">Dr. {user.name}</h1>
                <p className="text-sm text-muted-foreground">
                  Oncologist Dashboard • Cancer Prediction Platform
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
            variant="analytics" 
            title="Total Patients"
            description={`${patientCases.length} active cases under monitoring`}
          />
          <GlassCard 
            variant="prediction" 
            title="Risk Assessment"
            description="AI-powered analytics for all patients"
          />
          <GlassCard 
            variant="treatment" 
            title="Treatment Insights"
            description="Success rate analysis and recommendations"
          />
        </div>

        {/* Overview Statistics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Patients</p>
                  <p className="text-3xl font-bold text-foreground">{patientCases.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Critical Cases</p>
                  <p className="text-3xl font-bold text-medical-danger">
                    {patientCases.filter(p => p.status === "critical").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-medical-danger" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Stable Patients</p>
                  <p className="text-3xl font-bold text-medical-success">
                    {patientCases.filter(p => p.status === "stable").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-medical-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Avg Survivability</p>
                  <p className="text-3xl font-bold text-primary">
                    {Math.round(patientCases.reduce((acc, p) => acc + p.survivability, 0) / patientCases.length)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Cases List */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Patient Cases
            </CardTitle>
            
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                {["all", "critical", "active", "stable", "monitoring"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className="capitalize"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="border border-border rounded-lg p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground">{patient.name}</h4>
                        <Badge variant="outline">{patient.id}</Badge>
                        {getStatusBadge(patient.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Age:</span>
                          <div className="font-medium">{patient.age} years</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Cancer Type:</span>
                          <div className="font-medium">{patient.cancerType}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Stage:</span>
                          <div className="font-medium">Stage {patient.stage}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Visit:</span>
                          <div className="font-medium">{patient.lastVisit}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getRiskColor(patient.riskLevel)}`}>
                          {patient.riskLevel}%
                        </div>
                        <div className="text-xs text-muted-foreground">Risk Level</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {patient.survivability}%
                        </div>
                        <div className="text-xs text-muted-foreground">Survivability</div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewPatient(patient.id)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cancer Distribution Chart */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Cancer Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cancerDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ type, count }) => `${type}: ${count}`}
                    >
                      {cancerDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Response Analysis */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-medical-success" />
                Treatment Response Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={treatmentResponse}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="drug" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="success" stackId="a" fill="hsl(var(--medical-success))" name="Success" />
                    <Bar dataKey="partial" stackId="a" fill="hsl(var(--medical-warning))" name="Partial" />
                    <Bar dataKey="failure" stackId="a" fill="hsl(var(--medical-danger))" name="No Response" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Heatmap */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-medical-warning" />
              Regional Cancer Incidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {regionalData.map((region, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">{region.region}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Cases:</span>
                      <span className="font-medium">{region.cases}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Incidence Rate:</span>
                      <span className="font-medium">{region.incidence}/100k</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Insight:</strong> Mumbai Central shows the highest incidence rate at 15.2 per 100k population, 
                suggesting increased screening programs may be needed in urban areas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;