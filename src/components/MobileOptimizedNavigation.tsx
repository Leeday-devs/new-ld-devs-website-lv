import { useState, useEffect, useCallback, memo } from "react";
import { Menu, X, ChevronDown, Star, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";

const MobileOptimizedNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Check if we're on the pricing page
  const isPricingPage = location.pathname === '/pricing';

  // Navigation items optimized for mobile
  const primaryNavItems = [
    { name: "Home", href: "/", isInternal: true },
    { name: "What I Do", href: "#services", isInternal: false },
    { name: "Pricing (From)", href: "/pricing", isInternal: true },
    { name: "Pre-Built", href: "/templates", isInternal: true },
    { name: "Blog", href: "/blog", isInternal: true }
  ];

  const dropdownItems = [
    { name: "Portfolio", href: "#portfolio", isInternal: false },
    { name: "FAQ", href: "#faq", isInternal: false },
    { name: "Contact Lee", href: "#contact", isInternal: false }
  ];

  // Mobile-first navigation items (all in one array for mobile)
  const allNavItems = [...primaryNavItems, ...dropdownItems];

  // Handle scroll with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu handlers
  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleDropdownClose = useCallback((e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('[data-dropdown]')) {
      setIsDropdownOpen(false);
    }
  }, []);

  // WhatsApp click handler
  const handleWhatsAppClick = useCallback(() => {
    const whatsappNumber = "447586266007";
    const message = "Hi! I'd like to discuss my web development project.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, []);

  // Handle dropdown clicks
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleDropdownClose);
      return () => document.removeEventListener('click', handleDropdownClose);
    }
  }, [isDropdownOpen, handleDropdownClose]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isPricingPage
          ? 'md:bg-navy/95 bg-[hsl(210_67%_12%)] backdrop-blur-md shadow-lg border-b border-orange/10'
          : isScrolled 
            ? 'md:bg-navy/95 bg-[hsl(210_67%_12%)] backdrop-blur-md shadow-lg border-b border-orange/10' 
            : 'md:bg-gradient-to-b md:from-navy/80 md:via-navy/60 md:to-transparent bg-[hsl(210_67%_12%)]'
      }`}
    >
      {/* Mobile-First Trust Banner */}
      <div className={`${isScrolled || isPricingPage ? 'hidden' : 'block'} bg-orange/95 backdrop-blur-sm text-white py-1.5 px-4 text-center`}>
        <div className="flex items-center justify-center space-x-2 text-xs xs:text-sm">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 xs:h-4 xs:w-4 fill-current" />
            <span className="font-semibold">5.0 Rating</span>
          </div>
          <span className="hidden xs:inline">•</span>
          <div className="flex items-center space-x-1">
            <Shield className="h-3 w-3 xs:h-4 xs:w-4" />
            <span className="font-semibold hidden xs:inline">UK Certified</span>
            <span className="font-semibold xs:hidden">Certified</span>
          </div>
          <span className="hidden xs:inline">•</span>
          <div className="flex items-center space-x-1">
            <Award className="h-3 w-3 xs:h-4 xs:w-4" />
            <span className="font-semibold">150+ Projects</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 xs:h-18 sm:h-20">
          {/* Logo - Mobile Optimized */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png"
                alt="LD Development Logo"
                className="h-8 w-auto xs:h-10 sm:h-12 transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {primaryNavItems.map((item) => (
              item.isInternal ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 ${
                    isScrolled 
                      ? 'text-white hover:text-orange hover:bg-orange/10' 
                      : 'text-white hover:text-orange'
                  }`}
                  onClick={handleMenuClose}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 ${
                    isScrolled 
                      ? 'text-white hover:text-orange hover:bg-orange/10' 
                      : 'text-white hover:text-orange'
                  }`}
                  onClick={handleMenuClose}
                >
                  {item.name}
                </a>
              )
            ))}
            
            
            {/* Desktop Dropdown */}
            <div className="relative" data-dropdown>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 ${
                  isScrolled 
                    ? 'text-white hover:text-orange hover:bg-orange/10' 
                    : 'text-white hover:text-orange'
                }`}
              >
                More
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {dropdownItems.map((item) => (
                    item.isInternal ? (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-2.5 text-navy hover:text-orange hover:bg-orange/5 font-medium transition-colors duration-200"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleMenuClose();
                        }}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-navy hover:text-orange hover:bg-orange/5 font-medium transition-colors duration-200"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleMenuClose();
                        }}
                      >
                        {item.name}
                      </a>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={handleWhatsAppClick}
              className="btn-primary px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Work With Lee
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 touch-target ${
              isScrolled 
                ? 'md:text-white text-[hsl(25_100%_50%)] md:hover:text-orange hover:text-orange/80 hover:bg-orange/10' 
                : 'md:text-white text-[hsl(25_100%_50%)] md:hover:text-orange hover:text-orange/80 hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Slide Up Animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-md rounded-2xl mx-2 mb-4 shadow-xl border border-orange/10">
            {/* Mobile Navigation Items */}
            {allNavItems.map((item, index) => (
              item.isInternal ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-3 text-navy hover:text-orange hover:bg-orange/5 font-medium transition-all duration-200 rounded-lg mx-2"
                  onClick={handleMenuClose}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-navy hover:text-orange hover:bg-orange/5 font-medium transition-all duration-200 rounded-lg mx-2"
                  onClick={handleMenuClose}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </a>
              )
            ))}
            
            {/* Mobile CTA Button */}
            <div className="px-4 pt-2">
              <Button
                onClick={() => {
                  handleWhatsAppClick();
                  handleMenuClose();
                }}
                className="btn-primary w-full py-3 text-base font-bold rounded-full shadow-lg"
              >
                Work With Lee
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(MobileOptimizedNavigation);