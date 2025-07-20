import { Code2, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      "Web Design",
      "Web Development", 
      "Hosting Solutions",
      "SEO Optimization",
      "E-commerce",
      "Maintenance"
    ],
    company: [
      "About",
      "Portfolio",
      "Process",
      "Testimonials",
      "Blog",
      "Contact"
    ],
    contact: [
      { icon: Mail, text: "hello@webdesigner.com", href: "mailto:hello@webdesigner.com" },
      { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
      { icon: MapPin, text: "San Francisco, CA", href: "#" }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-primary rounded-lg p-2">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">WebCraft</span>
            </div>
            <p className="text-white/70">
              Creating beautiful, high-performance websites that drive results for businesses worldwide.
            </p>
            <div className="text-sm text-white/60">
              Trusted by 150+ clients across 20+ countries
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-smooth text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-smooth text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((contact) => (
                <li key={contact.text}>
                  <a
                    href={contact.href}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-smooth text-sm"
                  >
                    <contact.icon className="h-4 w-4" />
                    {contact.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm">
            © {currentYear} WebCraft. All rights reserved.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white transition-smooth text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-smooth text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-smooth text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;