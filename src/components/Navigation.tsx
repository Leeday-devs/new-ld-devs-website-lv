import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Star, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky header color change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryNavItems = [
    { label: "Home", href: "/", isInternal: true },
    { label: "Services", href: "#services", isInternal: false },
    { label: "Pre-Built", href: "/templates", isInternal: true },
    { label: "Blog", href: "/blog", isInternal: true },
    { label: "About", href: "#about", isInternal: false }
  ];

  const dropdownItems = [
    { label: "Portfolio", href: "#portfolio", isInternal: false },
    { label: "FAQ", href: "#faq", isInternal: false },
    { label: "Contact", href: "#contact", isInternal: false }
  ];

  const allNavItems = [...primaryNavItems, ...dropdownItems];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-navy/95 backdrop-blur-xl border-b border-gold/20 shadow-premium' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        {/* Google Trust Banner */}
        <div className="flex items-center justify-center gap-6 py-2 bg-gradient-primary text-white text-xs font-medium">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>5.0 Google Rating</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>Google Certified Partner</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-3 w-3" />
            <span>Quality Guaranteed</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between h-20">
          {/* Premium Logo with new design */}
          <Link to="/" className="flex items-center gap-4 hover-scale cursor-pointer group">
            <div className="relative hover-glow">
              <img 
                src="/lovable-uploads/ad9d84ce-4f33-408f-a0e5-a6439e818048.png" 
                alt="LD Development - Premium Web Development Company" 
                className="h-20 w-auto transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </Link>

          {/* Premium Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {primaryNavItems.map((item) => (
              item.isInternal ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="relative px-4 py-2 text-muted-foreground hover:text-primary transition-smooth font-semibold tracking-wide group"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative px-4 py-2 text-muted-foreground hover:text-primary transition-smooth font-semibold tracking-wide group"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </a>
              )
            ))}
            
            {/* Premium More Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-smooth font-semibold tracking-wide group relative"
              >
                More
                <ChevronDown className={`h-4 w-4 transition-all duration-300 ${isDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 min-w-[220px] p-2 bg-white/95 backdrop-blur-xl border border-border/30 shadow-premium rounded-xl z-[9999] animate-fade-in">
                  {dropdownItems.map((item, index) => (
                    item.isInternal ? (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="flex items-center px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth font-medium animate-slide-in-left"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth font-medium animate-slide-in-left"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item.label}
                      </a>
                    )
                  ))}
                  <div className="border-t border-border/30 my-2"></div>
                  <div className="px-2">
                    <AuthButton />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Premium CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col items-end text-xs text-muted-foreground">
              <span className="font-semibold">Ready to elevate?</span>
              <span>Free consultation</span>
            </div>
            <Button 
              className="btn-premium hover-glow px-6 py-3 rounded-full font-bold text-sm tracking-wide shadow-button"
              onClick={() => window.open('https://wa.me/447586266007', '_blank')}
            >
              Start Your Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <AuthButton />
            <button
              className="p-3 hover-glow rounded-xl transition-smooth bg-primary/10 border border-primary/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-primary" />
              ) : (
                <Menu className="h-5 w-5 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Premium Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-xl animate-fade-in-up">
            <div className="py-6 space-y-2">
              {/* Mobile Google Trust Elements */}
              <div className="px-4 pb-4 mb-4 border-b border-border/30">
                <div className="flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>5.0 Rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Google Certified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    <span>Quality Assured</span>
                  </div>
                </div>
              </div>
              
              {allNavItems.map((item, index) => (
                item.isInternal ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block px-6 py-3 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-smooth font-semibold tracking-wide animate-slide-in-left rounded-lg mx-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-6 py-3 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-smooth font-semibold tracking-wide animate-slide-in-left rounded-lg mx-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              
              <div className="px-4 pt-4 mt-4 border-t border-border/30 animate-fade-in-up stagger-delay-5">
                <Button 
                  className="btn-premium w-full py-4 rounded-full font-bold text-sm tracking-wide shadow-button"
                  onClick={() => window.open('https://wa.me/447586266007', '_blank')}
                >
                  Start Your Project
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