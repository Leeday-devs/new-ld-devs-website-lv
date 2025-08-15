import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import AuthButton from "./AuthButton";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: "Home", href: "/", isInternal: true },
    { label: "Services", href: "#services", isInternal: false },
    { label: "Pre-Built", href: "/templates", isInternal: true },
    { label: "About", href: "#about", isInternal: false }
  ];

  const dropdownItems = [
    { label: "Portfolio", href: "#portfolio", isInternal: false },
    { label: "Blog", href: "/blog", isInternal: true },
    { label: "FAQ", href: "#faq", isInternal: false },
    { label: "Contact", href: "#contact", isInternal: false }
  ];

  const allNavItems = [...primaryNavItems, ...dropdownItems];

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
              <span className="text-xs text-muted-foreground font-medium">Your Online Future Starts Here</span>
            </div>
          </div>

          {/* Premium Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-8">
              {primaryNavItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.isInternal ? (
                    <Link
                      to={item.href}
                      className="link-premium text-muted-foreground hover:text-foreground transition-smooth relative group font-medium px-3 py-2"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="link-premium text-muted-foreground hover:text-foreground transition-smooth relative group font-medium px-3 py-2"
                    >
                      {item.label}
                    </a>
                  )}
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="link-premium text-muted-foreground hover:text-foreground transition-smooth relative group font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent data-[state=open]:text-foreground">
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full left-0 mt-1 min-w-[200px] p-1 bg-background/95 backdrop-blur-md border border-border shadow-lg rounded-md z-[9999] data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52">
                  {dropdownItems.map((item) => (
                    <NavigationMenuLink key={item.label} asChild>
                      {item.isInternal ? (
                        <Link
                          to={item.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-smooth"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-smooth"
                        >
                          {item.label}
                        </a>
                      )}
                    </NavigationMenuLink>
                  ))}
                  <div className="border-t border-border my-1"></div>
                  <div className="px-3 py-2">
                    <AuthButton />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Button 
              className="btn-premium hover-glow"
              onClick={() => window.open('https://wa.me/447586266007', '_blank')}
            >
              Speak to Team
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <AuthButton />
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
              {allNavItems.map((item, index) => (
                item.isInternal ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="link-premium text-muted-foreground hover:text-foreground transition-smooth px-4 py-2 animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="link-premium text-muted-foreground hover:text-foreground transition-smooth px-4 py-2 animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
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