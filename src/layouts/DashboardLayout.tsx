
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Home, MessageSquare, ShoppingBag, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ChatWidget from "@/components/ChatWidget";

interface DashboardLayoutProps {
  onLogout: () => void;
}

const DashboardLayout = ({ onLogout }: DashboardLayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: MessageSquare, label: "Chat History", path: "/dashboard/chat-history" },
    { icon: ShoppingBag, label: "Purchases", path: "/dashboard/purchases" },
    { icon: User, label: "Profile", path: "/dashboard/profile" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Menu Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar - Desktop (always visible) and Mobile (conditionally visible) */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow-lg`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <div className="bg-insurance-primary w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <span className="text-xl font-semibold">InsureAI</span>
              </Link>
              <ThemeSwitcher />
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
              onClick={onLogout}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 transition-all duration-200">
        <div className="container py-8">
          <Outlet />
        </div>
      </main>

      {/* AI Chat Widget */}
      <ChatWidget isOpen={isChatOpen} toggleChat={toggleChat} />
    </div>
  );
};

export default DashboardLayout;
