import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm text-primary-foreground/70 font-body leading-relaxed">
            Where timeless elegance meets modern luxury. Experience hospitality at its finest.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-4 text-gold-light">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Home", path: "/" },
              { label: "Rooms", path: "/rooms" },
              { label: "Dining", path: "/menu" },
              { label: "Contact", path: "/#contact" },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors font-body">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-4 text-gold-light">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/60 font-body">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-secondary" /> +1 (555) 123-4567</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-secondary" /> info@robelhotel.com</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" /> 123 Luxury Avenue, Downtown</div>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg mb-4 text-gold-light">Hours</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/60 font-body">
            <p>Check-in: 3:00 PM</p>
            <p>Check-out: 11:00 AM</p>
            <p>Restaurant: 6:30 AM – 11:00 PM</p>
            <p>Spa: 8:00 AM – 9:00 PM</p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
        <p className="text-sm text-primary-foreground/40 font-body">
          © {new Date().getFullYear()} Robel Hotel. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
