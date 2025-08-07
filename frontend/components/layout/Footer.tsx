import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  Shield,
  Users,
  Cpu,
  Zap,
  Sparkles,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "For Customers",
      links: [
        { name: "Find Services", href: "/services" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "Service Categories", href: "/categories" },
        { name: "Safety & Trust", href: "/safety" },
      ],
    },
    {
      title: "For Providers",
      links: [
        { name: "Join as Provider", href: "/auth/register" },
        { name: "Provider Resources", href: "/provider-resources" },
        { name: "Success Stories", href: "/success-stories" },
        { name: "Provider Support", href: "/provider-support" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Neza", href: "/about" },
        { name: "Community", href: "/community" },
        { name: "Careers", href: "/careers" },
        { name: "Press & Media", href: "/press" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Contact Us", href: "/contact" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
      
      <div className="container py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand and Mission with Futuristic Design */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-3 mb-8 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-strong group-hover:shadow-neon transition-all duration-300 group-hover:scale-105">
                  <Cpu className="text-white w-6 h-6" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300"></div>
              </div>
              <div>
                <span className="text-3xl font-black text-holographic">Neza</span>
                <div className="text-sm text-gray-400 font-medium -mt-1">Next-Gen Services</div>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed text-lg">
              Your trusted local services marketplace. 
              <span className="text-gradient-primary font-semibold"> Connecting neighbors with skilled professionals</span> for home repairs, tutoring, cleaning, and more.
            </p>
            
            {/* Trust Indicators with Glow Effects */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-300 group hover:text-white transition-colors">
                <div className="p-2 rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition-colors mr-3">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <span className="font-medium">Verified & Trusted Providers</span>
              </div>
              <div className="flex items-center text-gray-300 group hover:text-white transition-colors">
                <div className="p-2 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors mr-3">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <span className="font-medium">Community-Focused Platform</span>
              </div>
              <div className="flex items-center text-gray-300 group hover:text-white transition-colors">
                <div className="p-2 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors mr-3">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
                <span className="font-medium">AI-Powered Matching</span>
              </div>
            </div>

            {/* Contact Info with Futuristic Styling */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                <div className="p-2 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors mr-3">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <span className="font-medium">hello@neza.com</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-white transition-colors group">
                <div className="p-2 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors mr-3">
                  <Phone className="h-4 w-4 text-purple-400" />
                </div>
                <span className="font-medium">1-800-NEZA-HELP</span>
              </div>
            </div>
          </div>

          {/* Links with Hover Effects */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title} className={`animate-slide-up`} style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-400" />
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section with Futuristic Design */}
        <div className="border-t border-gray-700/50 mt-16 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-8">
              <p className="text-gray-400 font-medium">
                © {currentYear} Neza. All rights reserved.
              </p>
              <p className="text-gray-400 flex items-center font-medium">
                Made with <Heart className="h-4 w-4 inline text-red-400 mx-2 pulse-glow" /> for local communities
              </p>
            </div>
            
            {/* Social Links with Glow Effects */}
            <div className="flex space-x-6">
              {[
                { icon: Facebook, label: "Facebook", color: "hover:text-blue-400" },
                { icon: Twitter, label: "Twitter", color: "hover:text-cyan-400" },
                { icon: Instagram, label: "Instagram", color: "hover:text-pink-400" },
                { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-300" },
              ].map(({ icon: Icon, label, color }) => (
                <a
                  key={label}
                  href="#"
                  className={`text-gray-400 ${color} transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/10`}
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Futuristic Bottom Accent */}
          <div className="mt-8 pt-6 border-t border-gray-700/30">
            <div className="text-center">
              <p className="text-gray-500 text-sm font-medium">
                Powered by <span className="text-gradient-primary font-bold">Next-Generation Technology</span>
              </p>
              <div className="mt-2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;