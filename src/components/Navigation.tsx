import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-premium">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Premium Logo with glow effect */}
          <div className="flex items-center gap-3 hover-scale cursor-pointer">
            <div className="relative hover-glow">
              <img 
                src="/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png" 
                alt="LD Logo" 
                className="h-12 w-auto transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-lg opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Development
              </span>
              <span className="text-xs text-muted-foreground font-medium">Digital Innovation</span>
            </div>
          </div>

          {/* Premium Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="link-premium text-muted-foreground hover:text-foreground transition-smooth relative group font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Theme Toggle and CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button 
              className="btn-premium hover-glow"
              onClick={() => window.open('https://wa.me/447586266007', '_blank')}
            >
              Speak to Team
            </Button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 hover-glow rounded-lg transition-smooth"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Premium Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="link-premium text-muted-foreground hover:text-foreground transition-smooth px-4 py-2 animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-2 animate-fade-in-up stagger-delay-5">
                <Button 
                  className="btn-premium w-full"
                  onClick={() => window.open('https://wa.me/447586266007', '_blank')}
                >
                  Speak to Team
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;