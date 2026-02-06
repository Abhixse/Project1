import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Products & Services", href: "/services" },
  { name: "Our Clients", href: "/clients" },
  { name: "Contact Us", href: "/contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-primary/80 border-b border-border/30 backdrop-blur-sm">
        <div className="section-container">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="hidden md:flex items-center gap-6 text-foreground/80">
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-foreground transition-colors duration-300">
                <Phone className="w-3 h-3 text-white" />
                <span className="text-white">+1 (234) 567-890</span>
              </a>
              <a href="mailto:info@mspprintpack.com" className="flex items-center gap-2 hover:text-foreground transition-colors duration-300">
                <Mail className="w-3 h-3 text-white" />
                <span className="text-white">info@mspprintpack.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-foreground/80">
              <MapPin className="w-3 h-3" />
              <span className="text-xs md:text-sm">123 Print Avenue, Design City</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-card/90 backdrop-blur-md border-b border-border/30 sticky top-16">
        <div className="section-container">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">

                <span className="text-xl font-bold text-secondary-foreground">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">MSP</span>
                <span className="text-[10px] text-muted-foreground -mt-1 tracking-wider">PRINT PACK</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors animated-underline py-1"
                  activeClassName="text-secondary"
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* CTA Button and Theme Toggle */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <Button variant="secondary" size="sm" className="glow-teal">
                Get Quote
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                    activeClassName="text-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
                <Button variant="secondary" size="sm" className="mt-2 w-full">
                  Get Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
