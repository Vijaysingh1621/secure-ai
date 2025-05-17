import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, MessageSquare, Phone, Calendar, ChevronRight, AlertCircle, Shield } from "lucide-react";

const Dashboard = () => {
  const [progress, setProgress] = useState(75);
  const [phoneNumber, setPhoneNumber] = useState("");
  
  // Mock call function
  const handleCallNow = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    alert(`Initiating call to ${phoneNumber}...`);
  };
  
  // Example date formatting helper
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your insurance today.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-insurance-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>
          <Button className="bg-insurance-primary hover:bg-insurance-primary/90">
            <MessageSquare className="h-5 w-5 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      {/* AI Insights Card */}
      <Card className="border-insurance-primary/30">
        <CardHeader className="bg-gradient-to-r from-insurance-primary/10 to-insurance-accent/5 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="bg-insurance-primary w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <CardTitle>AI Assistant Insights</CardTitle>
          </div>
          <CardDescription>
            Personalized insights based on your profile and conversations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-insurance-primary/10 rounded-full p-2 mt-1">
                <AlertCircle className="h-5 w-5 text-insurance-primary" />
              </div>
              <div>
                <h3 className="font-medium">Your auto insurance renewal is approaching</h3>
                <p className="text-sm text-muted-foreground">
                  Your policy expires in 14 days. Review new options to potentially save $230 annually.
                </p>
                <Button variant="link" className="text-insurance-primary p-0 h-auto mt-1">
                  Explore renewal options
                </Button>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-insurance-primary/10 rounded-full p-2 mt-1">
                <AlertCircle className="h-5 w-5 text-insurance-primary" />
              </div>
              <div>
                <h3 className="font-medium">Based on your profile, you may need life insurance</h3>
                <p className="text-sm text-muted-foreground">
                  64% of people with your profile secure additional life coverage for family protection.
                </p>
                <Button variant="link" className="text-insurance-primary p-0 h-auto mt-1">
                  Learn more about life insurance
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insurance Summary and Last Conversation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Insurance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Insurance Summary</CardTitle>
            <CardDescription>Overview of your active policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Auto Insurance */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Auto Insurance</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-sm flex justify-between">
                  <span className="text-muted-foreground">Coverage:</span>
                  <span>Comprehensive</span>
                </div>
                <div className="text-sm flex justify-between">
                  <span className="text-muted-foreground">Renewal:</span>
                  <span>{formatDate(new Date(2025, 6, 15))}</span>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Policy progress</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Home Insurance */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Home Insurance</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-sm flex justify-between">
                  <span className="text-muted-foreground">Coverage:</span>
                  <span>Standard + Flood</span>
                </div>
                <div className="text-sm flex justify-between">
                  <span className="text-muted-foreground">Renewal:</span>
                  <span>{formatDate(new Date(2025, 9, 22))}</span>
                </div>
              </div>
              <Progress value={35} className="h-2" />
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Policy progress</span>
                <span>35%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Policies
            </Button>
          </CardFooter>
        </Card>

        {/* Last Conversation */}
        <Card>
          <CardHeader>
            <CardTitle>Last Conversation</CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Date & Time */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(new Date(2025, 4, 15))} - 3:42 PM</span>
              </div>

              {/* Conversation Snippet */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <p className="text-sm mb-2">
                  <span className="font-medium text-insurance-primary">AI Assistant:</span> Based on
                  your family situation, I recommend increasing your life insurance coverage to at
                  least $500,000. This would provide adequate protection for your spouse and children.
                </p>
                <p className="text-sm">
                  <span className="font-medium">You:</span> That makes sense. Can you show me some
                  options that would fit within my budget of $40/month?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-insurance-primary hover:bg-insurance-primary/90">
                  Resume Chat
                </Button>
                <Button variant="outline" className="flex-1">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
          <CardDescription>Your insurance policy history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Policy 1 */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-insurance-primary/10 flex items-center justify-center text-insurance-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Auto Insurance - Premium</h3>
                  <p className="text-sm text-muted-foreground">
                    Policy #AI-1234-5678 | {formatDate(new Date(2024, 6, 15))}
                  </p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-medium">$840.00</p>
                <p className="text-xs text-green-600">Active</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>

            {/* Policy 2 */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-insurance-primary/10 flex items-center justify-center text-insurance-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Home Insurance - Standard</h3>
                  <p className="text-sm text-muted-foreground">
                    Policy #HI-9876-5432 | {formatDate(new Date(2024, 9, 22))}
                  </p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-medium">$1,240.00</p>
                <p className="text-xs text-green-600">Active</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>

            {/* Policy 3 */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-insurance-primary/10 flex items-center justify-center text-insurance-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Travel Insurance - Basic</h3>
                  <p className="text-sm text-muted-foreground">
                    Policy #TI-5544-7788 | {formatDate(new Date(2024, 2, 10))}
                  </p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-medium">$120.00</p>
                <p className="text-xs text-red-600">Expired</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => window.location.href = "/dashboard/purchases"}>
            View All Purchases
          </Button>
        </CardFooter>
      </Card>

      {/* Call & Chat Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Connect with our experts</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="call">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="call">Call Agent</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
            <TabsContent value="call" className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">Enter your phone number and we'll call you right away</p>
                <Input
                  placeholder="(123) 456-7890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-insurance-primary hover:bg-insurance-primary/90"
                onClick={handleCallNow}
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
            </TabsContent>
            <TabsContent value="chat" className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">
                  Our AI assistant is ready to help with any insurance questions
                </p>
              </div>
              <Button className="w-full bg-insurance-primary hover:bg-insurance-primary/90">
                <MessageSquare className="h-5 w-5 mr-2" />
                Start Chat
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
