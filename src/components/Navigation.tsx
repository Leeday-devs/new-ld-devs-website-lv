import { useState, useEffect, memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Star, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";

// Move navigation items outside component to prevent recreating on every render
const primaryNavItems = [
  { label: "Home", href: "/", isInternal: true },
  { label: "What I Do", href: "/#services", isInternal: false },
  { label: "Pricing (From)", href: "/pricing", isInternal: true },
  { label: "Pre-Built", href: "/templates", isInternal: true },
  { label: "Knowledge Hub", href: "/knowledge-hub", isInternal: true }
];

const dropdownItems = [
  { label: "Portfolio", href: "#portfolio", isInternal: false },
  { label: "FAQ", href: "#faq", isInternal: false },
  { label: "Contact Lee", href: "#contact", isInternal: false }
];

const allNavItems = [...primaryNavItems, ...dropdownItems];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky header color change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleDropdownClose = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    window.open('https://wa.me/447586266007', '_blank');
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-navy/95 backdrop-blur-xl border-b border-gold/20 shadow-premium' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        {/* Google Trust Banner - Mobile Optimized */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 py-2 bg-gradient-primary text-white text-xs font-medium">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">5.0 Rating</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span className="text-xs">Google Certified</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-3 w-3" />
            <span className="text-xs">Quality Assured</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Premium Logo with new design - Mobile Optimized */}
          <Link to="/" className="flex items-center gap-2 sm:gap-4 hover-scale cursor-pointer group">
            <div className="relative hover-glow">
              <img 
                src="/lovable-uploads/95a8e543-b54c-4dc4-b36a-5561bf01ed41.png" 
                alt="LD Development - Premium Web Development Company" 
                className="h-12 sm:h-16 md:h-20 w-auto transition-transform duration-300 group-hover:scale-110"
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
                <div className="absolute top-full right-0 mt-3 min-w-[220px] p-2 bg-navy/95 backdrop-blur-xl border border-orange/20 shadow-luxury rounded-xl z-[9999] animate-fade-in">
                  {dropdownItems.map((item, index) => (
                    item.isInternal ? (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="flex items-center px-4 py-3 text-sm text-white/80 hover:text-orange hover:bg-orange/10 rounded-lg transition-smooth font-medium animate-slide-in-left"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={handleDropdownClose}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center px-4 py-3 text-sm text-white/80 hover:text-orange hover:bg-orange/10 rounded-lg transition-smooth font-medium animate-slide-in-left"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={handleDropdownClose}
                      >
                        {item.label}
                      </a>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Premium CTA Button - Mobile Responsive */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              className="btn-premium hover-glow px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm tracking-wide shadow-button"
              onClick={handleWhatsAppClick}
            >
                <span className="hidden lg:inline">Work With Lee</span>
                <span className="lg:hidden">Work With Lee</span>
            </Button>
          </div>

          {/* Mobile Menu Button - Responsive */}
          <div className="md:hidden flex items-center gap-2">
            <AuthButton />
            <button
              className="p-2 sm:p-3 hover-glow rounded-xl transition-smooth bg-primary/10 border border-primary/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Premium Mobile Navigation - Enhanced */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-xl animate-fade-in-up">
            <div className="py-4 space-y-1">
              
              {allNavItems.map((item, index) => (
                item.isInternal ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-smooth font-semibold tracking-wide animate-slide-in-left rounded-lg mx-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={handleMenuClose}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-smooth font-semibold tracking-wide animate-slide-in-left rounded-lg mx-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={handleMenuClose}
                  >
                    {item.label}
                  </a>
                )
              ))}
              
              <div className="px-4 pt-4 mt-4 border-t border-border/30 animate-fade-in-up stagger-delay-5">
                <Button 
                  className="btn-premium w-full py-3 rounded-full font-bold text-sm tracking-wide shadow-button"
                  onClick={() => {
                    handleWhatsAppClick();
                    handleMenuClose();
                  }}
                >
                  Work With Lee
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default memo(Navigation);