
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ChevronRight, Download, CalendarClock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Insurance {
  id: string;
  type: string;
  name: string;
  policyNumber: string;
  startDate: Date;
  endDate: Date;
  price: number;
  status: "active" | "expired" | "pending";
  coverage: string[];
  documents: string[];
  renewalPrice?: number;
}

const Purchases = () => {
  // Sample insurance data
  const insurancePolicies: Insurance[] = [
    {
      id: "policy-1",
      type: "auto",
      name: "Auto Insurance - Premium",
      policyNumber: "AI-1234-5678",
      startDate: new Date(2024, 6, 15),
      endDate: new Date(2025, 6, 15),
      price: 840,
      status: "active",
      coverage: [
        "Comprehensive coverage",
        "Collision coverage",
        "Bodily injury liability",
        "Property damage liability",
        "Uninsured motorist coverage",
      ],
      documents: ["Policy document", "Insurance card", "Coverage details"],
      renewalPrice: 799,
    },
    {
      id: "policy-2",
      type: "home",
      name: "Home Insurance - Standard",
      policyNumber: "HI-9876-5432",
      startDate: new Date(2024, 9, 22),
      endDate: new Date(2025, 9, 22),
      price: 1240,
      status: "active",
      coverage: [
        "Dwelling coverage",
        "Personal property coverage",
        "Liability protection",
        "Additional living expenses",
        "Flood coverage",
      ],
      documents: ["Policy document", "Coverage details", "Home inventory"],
    },
    {
      id: "policy-3",
      type: "travel",
      name: "Travel Insurance - Basic",
      policyNumber: "TI-5544-7788",
      startDate: new Date(2024, 2, 10),
      endDate: new Date(2024, 3, 10),
      price: 120,
      status: "expired",
      coverage: [
        "Trip cancellation",
        "Travel delay",
        "Medical expenses",
        "Baggage loss",
      ],
      documents: ["Policy document", "Claims procedures"],
    },
    {
      id: "policy-4",
      type: "life",
      name: "Life Insurance - Term 20",
      policyNumber: "LI-8765-4321",
      startDate: new Date(2024, 0, 5),
      endDate: new Date(2044, 0, 5),
      price: 450,
      status: "active",
      coverage: [
        "Death benefit: $500,000",
        "Term: 20 years",
        "Level premium guarantee",
        "Convertible to permanent policy",
      ],
      documents: ["Policy document", "Beneficiary information", "Medical requirements"],
    },
    {
      id: "policy-5",
      type: "health",
      name: "Health Insurance - Family Plus",
      policyNumber: "HE-2233-4455",
      startDate: new Date(2025, 0, 1),
      endDate: new Date(2026, 0, 1),
      price: 2800,
      status: "pending",
      coverage: [
        "Primary care visits",
        "Specialist care",
        "Prescription drug coverage",
        "Emergency services",
        "Hospitalization",
        "Preventive care",
      ],
      documents: ["Policy document", "Network providers", "Coverage details"],
    },
  ];

  // Format date helper
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "expired":
        return <Badge className="bg-gray-500">Expired</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return null;
    }
  };

  // Filter policies by status
  const activePolicies = insurancePolicies.filter(policy => policy.status === "active");
  const expiredPolicies = insurancePolicies.filter(policy => policy.status === "expired");
  const pendingPolicies = insurancePolicies.filter(policy => policy.status === "pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Insurance Purchases</h1>
        <p className="text-muted-foreground">
          View and manage all your insurance policies
        </p>
      </div>

      {/* Policy Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold">{activePolicies.length}</h3>
              <p className="text-muted-foreground">Active Policies</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <CalendarClock className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold">{pendingPolicies.length}</h3>
              <p className="text-muted-foreground">Pending Policies</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold">{expiredPolicies.length}</h3>
              <p className="text-muted-foreground">Expired Policies</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-insurance-primary/10 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-insurance-primary" />
              </div>
              <Button variant="outline" size="sm">
                Download All
              </Button>
              <p className="text-muted-foreground mt-2">Policy Documents</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Policy List */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
            
            {/* All Policies Tab */}
            <TabsContent value="all" className="mt-4 space-y-4">
              {insurancePolicies.map((policy) => (
                <PolicyCard key={policy.id} policy={policy} />
              ))}
            </TabsContent>
            
            {/* Active Policies Tab */}
            <TabsContent value="active" className="mt-4 space-y-4">
              {activePolicies.length > 0 ? (
                activePolicies.map((policy) => (
                  <PolicyCard key={policy.id} policy={policy} />
                ))
              ) : (
                <EmptyState message="No active policies found" />
              )}
            </TabsContent>
            
            {/* Pending Policies Tab */}
            <TabsContent value="pending" className="mt-4 space-y-4">
              {pendingPolicies.length > 0 ? (
                pendingPolicies.map((policy) => (
                  <PolicyCard key={policy.id} policy={policy} />
                ))
              ) : (
                <EmptyState message="No pending policies found" />
              )}
            </TabsContent>
            
            {/* Expired Policies Tab */}
            <TabsContent value="expired" className="mt-4 space-y-4">
              {expiredPolicies.length > 0 ? (
                expiredPolicies.map((policy) => (
                  <PolicyCard key={policy.id} policy={policy} />
                ))
              ) : (
                <EmptyState message="No expired policies found" />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Policy Card Component
const PolicyCard = ({ policy }: { policy: Insurance }) => {
  // Format date helper
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Get days remaining until renewal
  const getDaysRemaining = (endDate: Date) => {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "expired":
        return <Badge variant="outline" className="text-gray-500 border-gray-500">Expired</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return null;
    }
  };

  const daysRemaining = policy.status === "active" ? getDaysRemaining(policy.endDate) : 0;
  
  return (
    <Card className="overflow-hidden hover:border-insurance-primary/50 transition-all duration-300">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Policy Info */}
        <div className="p-6 flex-1">
          <div className="flex items-start lg:items-center flex-col lg:flex-row mb-4">
            <div className="mb-2 lg:mb-0">
              <div className="inline-flex items-center space-x-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${policy.type === 'auto' && 'bg-blue-100 text-blue-600'}
                  ${policy.type === 'home' && 'bg-green-100 text-green-600'}
                  ${policy.type === 'life' && 'bg-purple-100 text-purple-600'}
                  ${policy.type === 'health' && 'bg-red-100 text-red-600'}
                  ${policy.type === 'travel' && 'bg-yellow-100 text-yellow-600'}
                `}>
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{policy.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Policy #{policy.policyNumber}</p>
            </div>
            <div className="lg:ml-auto">{getStatusBadge(policy.status)}</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Coverage Period</p>
              <p className="font-medium">
                {formatDate(policy.startDate)} - {formatDate(policy.endDate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Premium</p>
              <p className="font-medium">{formatCurrency(policy.price)}/year</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">Coverage Summary</p>
            <div className="flex flex-wrap gap-2">
              {policy.coverage.slice(0, 3).map((item, index) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {item}
                </Badge>
              ))}
              {policy.coverage.length > 3 && (
                <Badge variant="outline" className="font-normal">
                  +{policy.coverage.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          {policy.status === "active" && (
            <div className="mt-4">
              {daysRemaining <= 30 ? (
                <div className="text-sm text-amber-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Renews in {daysRemaining} days
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Renews in {daysRemaining} days
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Right: Actions */}
        <div className="bg-muted/30 p-6 flex flex-col justify-between space-y-4 lg:w-64">
          <div>
            <p className="text-sm font-medium mb-2">Documents</p>
            <ul className="space-y-1">
              {policy.documents.map((doc, index) => (
                <li key={index}>
                  <Button variant="link" className="p-0 h-auto text-insurance-primary">
                    {doc}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-2">
            <Button className="w-full bg-insurance-primary hover:bg-insurance-primary/90">
              View Details
            </Button>
            
            {policy.status === "active" && (
              <Button variant="outline" className="w-full">
                {policy.renewalPrice ? `Renew (${formatCurrency(policy.renewalPrice)})` : "Manage Policy"}
              </Button>
            )}
            
            {policy.status === "expired" && (
              <Button variant="outline" className="w-full">
                Purchase Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

// Empty State Component
const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="text-center py-12">
      <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-1">{message}</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Browse our offerings to find coverage that meets your needs
      </p>
      <Button className="bg-insurance-primary hover:bg-insurance-primary/90">
        Explore Insurance Options
      </Button>
    </div>
  );
};

export default Purchases;
