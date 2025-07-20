import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      "Web Hosting",
      "Web Development", 
      "AI Tools",
      "Blog"
    ],
    contact: [
      { icon: Phone, text: "07586 266007", href: "tel:07586266007" },
      { icon: Mail, text: "LeeDayDevs@gmail.com", href: "mailto:LeeDayDevs@gmail.com" },
      { icon: MapPin, text: "3RD Floor 86-90, Paul Street, London EC2A 4NE", href: "#" }
    ]
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-3 text-2xl font-bold text-white">
                LD
              </div>
              <span className="text-xl font-bold">LD Development</span>
            </div>
            <p className="text-white/70">
              Professional web development and software engineering services, delivering exceptional digital solutions for businesses worldwide.
            </p>
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

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((contact) => (
                <li key={contact.text}>
                  <a
                    href={contact.href}
                    className="flex items-start gap-2 text-white/70 hover:text-white transition-smooth text-sm"
                  >
                    <contact.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{contact.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-white/70 text-sm mb-4">
              Available for freelance opportunities and collaborations
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-smooth"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-smooth"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:LeeDayDevs@gmail.com"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-smooth"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm text-center md:text-left">
            <div>© {currentYear} LD Development - a part of Hosting Easy Ltd</div>
            <div className="mt-1">UK Registered Company | CN 15169743</div>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white transition-smooth text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-smooth text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;