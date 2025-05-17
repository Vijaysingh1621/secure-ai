
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, Download, MessageSquare, Phone } from "lucide-react";

interface ChatSession {
  id: string;
  type: "chat" | "call";
  date: Date;
  summary: string;
  messages: {
    sender: "ai" | "user" | "agent";
    text: string;
    timestamp: Date;
  }[];
}

const ChatHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSession, setActiveSession] = useState<string | null>(null);
  
  // Example history data
  const chatSessions: ChatSession[] = [
    {
      id: "chat-1",
      type: "chat",
      date: new Date(2025, 4, 15),
      summary: "Discussion about auto insurance renewal options and potential discounts",
      messages: [
        {
          sender: "user",
          text: "I'm looking to renew my auto insurance policy but was wondering if there are any new discounts I qualify for.",
          timestamp: new Date(2025, 4, 15, 14, 35),
        },
        {
          sender: "ai",
          text: "I'd be happy to help you with your auto insurance renewal and check for available discounts. Based on your profile, you might qualify for a safe driver discount since you haven't had any accidents or violations in the past 3 years.",
          timestamp: new Date(2025, 4, 15, 14, 36),
        },
        {
          sender: "user",
          text: "That's great! I also recently installed a security system in my garage. Would that help?",
          timestamp: new Date(2025, 4, 15, 14, 37),
        },
        {
          sender: "ai",
          text: "Yes, having a security system can potentially qualify you for an additional discount! Anti-theft devices can reduce the risk of theft, which insurance companies reward. I'd recommend providing documentation about your security system during the renewal process.",
          timestamp: new Date(2025, 4, 15, 14, 38),
        },
      ],
    },
    {
      id: "call-1",
      type: "call",
      date: new Date(2025, 4, 10),
      summary: "Call with agent Sarah about adding flood coverage to home insurance policy",
      messages: [
        {
          sender: "agent",
          text: "Hello, this is Sarah from InsureAI. I understand you're interested in adding flood coverage to your home insurance policy.",
          timestamp: new Date(2025, 4, 10, 10, 15),
        },
        {
          sender: "user",
          text: "Yes, we've been seeing more heavy rains in our area and I'm concerned about potential flooding.",
          timestamp: new Date(2025, 4, 10, 10, 16),
        },
        {
          sender: "agent",
          text: "That's a smart decision. Standard home insurance policies typically don't cover flood damage. Based on your home's location, I'd recommend our Enhanced Flood Protection plan which covers both structural and personal property damage.",
          timestamp: new Date(2025, 4, 10, 10, 17),
        },
      ],
    },
    {
      id: "chat-2",
      type: "chat",
      date: new Date(2025, 4, 5),
      summary: "Questions about life insurance policy options for growing family",
      messages: [
        {
          sender: "user",
          text: "My wife and I just had our second child. I think we need to increase our life insurance coverage.",
          timestamp: new Date(2025, 4, 5, 19, 22),
        },
        {
          sender: "ai",
          text: "Congratulations on your new addition! You're making a wise decision to review your life insurance needs. With a growing family, it's typically recommended to have coverage that's 10-12 times your annual income to ensure your family's financial security.",
          timestamp: new Date(2025, 4, 5, 19, 23),
        },
        {
          sender: "user",
          text: "That makes sense. What's the difference between term and whole life insurance?",
          timestamp: new Date(2025, 4, 5, 19, 24),
        },
        {
          sender: "ai",
          text: "Term life insurance provides coverage for a specific period (e.g., 20 years) with lower premiums but no cash value. Whole life insurance covers you for life, has higher premiums, but builds cash value over time that you can borrow against. For young families, term often provides more coverage per dollar during the years you need it most.",
          timestamp: new Date(2025, 4, 5, 19, 25),
        },
      ],
    },
    {
      id: "call-2",
      type: "call",
      date: new Date(2025, 3, 28),
      summary: "Claim process discussion for minor car accident",
      messages: [
        {
          sender: "agent",
          text: "Hello, this is Michael from InsureAI claims department. I understand you were involved in a minor accident yesterday.",
          timestamp: new Date(2025, 3, 28, 9, 5),
        },
        {
          sender: "user",
          text: "Yes, someone backed into my car in a parking lot and damaged my front bumper.",
          timestamp: new Date(2025, 3, 28, 9, 6),
        },
        {
          sender: "agent",
          text: "I'm sorry to hear that. Did you get the other driver's information and take photos of the damage?",
          timestamp: new Date(2025, 3, 28, 9, 7),
        },
        {
          sender: "user",
          text: "Yes, I have their insurance information and several photos of the damage.",
          timestamp: new Date(2025, 3, 28, 9, 8),
        },
      ],
    },
  ];

  // Filter sessions based on search query
  const filteredSessions = chatSessions.filter((session) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      session.summary.toLowerCase().includes(lowerCaseQuery) ||
      session.messages.some((msg) => msg.text.toLowerCase().includes(lowerCaseQuery))
    );
  });

  // Format date helper
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Format time helper
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Conversation History</h1>
        <p className="text-muted-foreground">
          View and search through your past chats and calls
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* History and Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation List */}
        <div className="lg:col-span-1 space-y-4">
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="chats">Chats</TabsTrigger>
              <TabsTrigger value="calls">Calls</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-4">
              {filteredSessions.map((session) => (
                <Card
                  key={session.id}
                  className={`cursor-pointer transition-all hover:border-insurance-primary ${
                    activeSession === session.id ? "border-insurance-primary bg-insurance-primary/5" : ""
                  }`}
                  onClick={() => setActiveSession(session.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          session.type === "chat" ? "bg-insurance-primary/10" : "bg-insurance-accent/10"
                        }`}>
                          {session.type === "chat" ? (
                            <MessageSquare className="h-5 w-5 text-insurance-primary" />
                          ) : (
                            <Phone className="h-5 w-5 text-insurance-accent" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {session.type === "chat" ? "AI Chat" : "Agent Call"}
                            <span className="ml-2 text-xs text-muted-foreground">
                              {formatDate(session.date)}
                            </span>
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {session.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredSessions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No conversations found matching your search</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="chats" className="space-y-4 mt-4">
              {filteredSessions
                .filter((session) => session.type === "chat")
                .map((session) => (
                  <Card
                    key={session.id}
                    className={`cursor-pointer transition-all hover:border-insurance-primary ${
                      activeSession === session.id ? "border-insurance-primary bg-insurance-primary/5" : ""
                    }`}
                    onClick={() => setActiveSession(session.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-insurance-primary/10 flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-insurance-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              AI Chat
                              <span className="ml-2 text-xs text-muted-foreground">
                                {formatDate(session.date)}
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {session.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              {filteredSessions.filter((session) => session.type === "chat").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No chat conversations found</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="calls" className="space-y-4 mt-4">
              {filteredSessions
                .filter((session) => session.type === "call")
                .map((session) => (
                  <Card
                    key={session.id}
                    className={`cursor-pointer transition-all hover:border-insurance-primary ${
                      activeSession === session.id ? "border-insurance-primary bg-insurance-primary/5" : ""
                    }`}
                    onClick={() => setActiveSession(session.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-insurance-accent/10 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-insurance-accent" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Agent Call
                              <span className="ml-2 text-xs text-muted-foreground">
                                {formatDate(session.date)}
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {session.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              {filteredSessions.filter((session) => session.type === "call").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No call conversations found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Conversation Detail */}
        <div className="lg:col-span-2">
          {activeSession ? (
            <Card className="h-full">
              {(() => {
                const session = chatSessions.find((s) => s.id === activeSession);
                if (!session) return null;

                return (
                  <>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>
                            {session.type === "chat" ? "AI Chat" : "Agent Call"}
                          </CardTitle>
                          <CardDescription>
                            {formatDate(session.date)} • {session.summary}
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {session.messages.map((message, idx) => (
                          <div key={idx} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[80%] rounded-2xl p-3 ${
                                message.sender === "user"
                                  ? "bg-insurance-primary text-white rounded-tr-none"
                                  : message.sender === "ai"
                                  ? "bg-muted rounded-tl-none"
                                  : "bg-insurance-accent/20 rounded-tl-none"
                              }`}
                            >
                              {message.sender !== "user" && (
                                <p className="text-xs font-medium mb-1">
                                  {message.sender === "ai" ? "AI Assistant" : "Agent Sarah"}
                                </p>
                              )}
                              <p>{message.text}</p>
                              <p className="text-xs opacity-70 mt-1 text-right">
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Continue Conversation */}
                      <div className="mt-8 pt-4 border-t">
                        <Button className="w-full bg-insurance-primary hover:bg-insurance-primary/90">
                          {session.type === "chat" ? (
                            <>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Continue Chat
                            </>
                          ) : (
                            <>
                              <Phone className="h-4 w-4 mr-2" />
                              Schedule Follow-up Call
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </>
                );
              })()}
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground max-w-md">
                Choose a chat or call from the list to view the full conversation details
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
