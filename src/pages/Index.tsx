import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, PieChart, Shield, ArrowRight, ChevronRight, Menu, X, Send } from "lucide-react";

interface IndexProps {
  onLogin: () => void;
}

const Index = ({ onLogin }: IndexProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "InsureAI helped me find the perfect policy for my family in minutes, not days!",
      author: "Sarah Johnson",
      role: "Healthcare Professional",
    },
    {
      id: 2,
      quote: "The AI assistant explained complex insurance terms in a way I could actually understand.",
      author: "Michael Chen",
      role: "Small Business Owner",
    },
    {
      id: 3,
      quote: "I saved over $400 a year by switching to the policy InsureAI recommended for me.",
      author: "Rebecca Martinez",
      role: "Teacher",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Features data
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-insurance-primary" />,
      title: "AI Chat Assistant",
      description:
        "Ask questions and get personalized recommendations from our AI assistant.",
    },
    {
      icon: <Phone className="h-10 w-10 text-insurance-primary" />,
      title: "Live Call Guidance",
      description:
        "Speak directly with agents who have AI assistance to provide better guidance.",
    },
    {
      icon: <Shield className="h-10 w-10 text-insurance-primary" />,
      title: "Personalized Recommendations",
      description:
        "Get tailored insurance options based on your specific needs and budget.",
    },
    {
      icon: <PieChart className="h-10 w-10 text-insurance-primary" />,
      title: "Smart Dashboard",
      description:
        "Track your policies, claims, and conversations in one intuitive dashboard.",
    },
  ];

  // Process steps
  const steps = [
    {
      title: "Learn",
      description: "Understand your insurance needs with our AI assistant",
    },
    {
      title: "Talk",
      description: "Discuss options with AI or human experts",
    },
    {
      title: "Choose",
      description: "Select the best policy for your situation",
    },
    {
      title: "Buy",
      description: "Secure your policy with a seamless checkout",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="sticky top-0 bg-white/80 dark:bg-insurance-dark/80 backdrop-blur-md z-10 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-insurance-primary w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="text-xl font-semibold">InsureAI</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="font-medium hover:text-insurance-primary transition-colors">Features</a>
              <a href="#how-it-works" className="font-medium hover:text-insurance-primary transition-colors">How It Works</a>
              <a href="#testimonials" className="font-medium hover:text-insurance-primary transition-colors">Testimonials</a>
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button className="bg-insurance-primary hover:bg-insurance-primary/90" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t animate-slide-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a
                href="#features"
                className="py-2 px-4 hover:bg-muted rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="py-2 px-4 hover:bg-muted rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="py-2 px-4 hover:bg-muted rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button className="bg-insurance-primary hover:bg-insurance-primary/90" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* Hero Content */}
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Secure Your Future with <span className="text-insurance-primary">AI-Powered</span> Insurance Guidance
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Navigate the complex world of insurance with personalized AI assistance
              that helps you find, understand, and purchase the right coverage for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-insurance-primary hover:bg-insurance-primary/90 text-lg py-6 px-8"
                onClick={() => navigate("/signup")}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="text-lg py-6 px-8" onClick={() => navigate("/#features")}>
                Learn More
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-insurance-primary/10 rounded-full" />
            <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-insurance-primary p-4 text-white flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>
                <h3 className="font-semibold">AI Insurance Assistant</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="bg-muted rounded-2xl rounded-tl-none p-3">
                  <p>How can I help with your insurance needs today?</p>
                </div>
                <div className="bg-insurance-primary text-white rounded-2xl rounded-tr-none p-3 ml-auto max-w-[80%]">
                  <p>I need health insurance for my family of four</p>
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-none p-3">
                  <p>I can help with that! Let me ask a few questions to find the best options for your family...</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    placeholder="Type your question..."
                    className="flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-insurance-primary"
                  />
                  <Button className="rounded-full bg-insurance-primary hover:bg-insurance-primary/90 w-10 h-10 p-0 flex items-center justify-center">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-insurance-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-insurance-accent/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
      </section>

      {/* Process Steps Section */}
      <section id="how-it-works" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">How It Works</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our simple process guides you from understanding your needs to securing the perfect coverage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="insurance-card h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-insurance-primary flex items-center justify-center text-white font-bold text-xl mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                {/* Connector arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="h-6 w-6 text-insurance-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Features That Make Insurance Easy</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform simplifies insurance shopping with innovative tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="insurance-card hover:border-insurance-primary/20 hover:-translate-y-1 duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">What Our Customers Say</h2>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Testimonial Cards */}
            <div className="overflow-hidden">
              <div className="relative h-64">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`absolute top-0 left-0 w-full transform transition-all duration-500 ease-in-out ${
                      index === activeTestimonial
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-full"
                    }`}
                  >
                    <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-md text-center">
                      <p className="text-xl mb-6">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-bold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeTestimonial
                      ? "bg-insurance-primary"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-insurance-primary to-insurance-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Transform Your Insurance Experience?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who've found the perfect coverage with AI assistance.
          </p>
          <Button
            className="bg-white text-insurance-primary hover:bg-white/90 text-lg py-6 px-8"
            onClick={() => navigate("/signup")}
          >
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-insurance-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-insurance-primary font-bold">AI</span>
                </div>
                <span className="text-xl font-semibold">InsureAI</span>
              </div>
              <p className="text-sm opacity-80">
                AI-powered insurance guidance to help you make better decisions for your future.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:text-insurance-primary">About Us</a></li>
                <li><a href="#" className="hover:text-insurance-primary">Careers</a></li>
                <li><a href="#" className="hover:text-insurance-primary">Partners</a></li>
                <li><a href="#" className="hover:text-insurance-primary">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:text-insurance-primary">Blog</a></li>
                <li><a href="#" className="hover:text-insurance-primary">Insurance Guides</a></li>
                <li><a href="#" className="hover:text-insurance-primary">FAQs</a></li>
                <li><a href="#" className="hover:text-insurance-primary">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>support@insureai.com</li>
                <li>1-800-INSURE-AI</li>
                <li>123 Insurance Blvd<br/>San Francisco, CA 94105</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} InsureAI. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="opacity-80 hover:opacity-100">Terms</a>
              <a href="#" className="opacity-80 hover:opacity-100">Privacy</a>
              <a href="#" className="opacity-80 hover:opacity-100">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
