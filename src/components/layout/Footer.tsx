import { Link } from "react-router-dom";
import { Scale, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "/features" },
      { label: "Ask Nyaya", href: "/chat" },
      { label: "Pricing", href: "/pricing" },
      { label: "API Access", href: "/api" },
    ],
    resources: [
      { label: "Documentation", href: "/docs" },
      { label: "Legal Glossary", href: "/glossary" },
      { label: "Case Studies", href: "/cases" },
      { label: "Blog", href: "/blog" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Press Kit", href: "/press" },
    ],
    legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Ethics Policy", href: "/ethics" },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Ornamental top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center">
                <Scale className="w-5 h-5 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold tracking-wide">
                  Nyaya AI
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60 -mt-0.5">
                  Legal Intelligence
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">
              Justice, Explained. Law, Simplified. Intelligence, Indian. Making legal knowledge accessible to every citizen of India.
            </p>
            <div className="space-y-3 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span>contact@nyaya.ai</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-gold-light">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-gold-light">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-gold-light">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-gold-light">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50">
              © {currentYear} Nyaya AI. All rights reserved.
            </p>
            <p className="text-xs text-primary-foreground/40 text-center md:text-right max-w-md">
              Nyaya AI provides legal information, not legal advice. Always consult a qualified legal professional for specific matters.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
