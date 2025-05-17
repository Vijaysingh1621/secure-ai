
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatWidgetProps {
  isOpen: boolean;
  toggleChat: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatWidget = ({ isOpen, toggleChat }: ChatWidgetProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your AI insurance assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "I'd be happy to help you find the right insurance policy for your needs.",
        "Based on your profile, I'd recommend looking at our premium health coverage options.",
        "Would you like me to check for discounts on your current policy?",
        "Let me explain how our auto insurance coverage works in more detail.",
        "I can help you understand the differences between term and whole life insurance.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMsg: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Quick suggestion buttons
  const suggestions = [
    "How much coverage do I need?",
    "What's the best policy for me?",
    "Can you explain deductibles?",
  ];

  return (
    <>
      {/* Chat button (always visible) */}
      <Button
        className={`fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg flex items-center justify-center ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-insurance-primary hover:bg-insurance-primary/90"
        } z-50`}
        onClick={toggleChat}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>

      {/* Chat widget container */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-[90%] sm:w-96 h-[500px] bg-card rounded-2xl shadow-xl flex flex-col z-40 transform transition-transform duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Chat header */}
        <div className="bg-insurance-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare size={18} />
            </div>
            <h3 className="font-semibold">AI Insurance Assistant</h3>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl p-3",
                  msg.sender === "user"
                    ? "bg-insurance-primary text-white rounded-tr-none"
                    : "bg-muted rounded-tl-none"
                )}
              >
                <p>{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-tl-none p-3 flex space-x-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</span>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {messages.length < 3 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="bg-muted hover:bg-muted/80 rounded-full text-sm py-1.5 px-3 text-foreground transition-colors"
                  onClick={() => {
                    setMessage(suggestion);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Mic size={18} />
            </Button>
            <Button onClick={handleSendMessage} className="bg-insurance-primary hover:bg-insurance-primary/90">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
