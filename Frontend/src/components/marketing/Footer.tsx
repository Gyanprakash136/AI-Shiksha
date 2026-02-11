import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    LearnAI: [
      { name: "About", href: "/about" },
      { name: "What We Offer", href: "/courses" },
      { name: "Leadership", href: "/about" },
      { name: "Careers", href: "/about" },
      { name: "Catalog", href: "/courses" },
    ],
    Community: [
      { name: "Learners", href: "/courses" },
      { name: "Partners", href: "/about" },
      { name: "Developers", href: "/about" },
      { name: "Beta Testers", href: "/about" },
      { name: "Blog", href: "/about" },
    ],
    More: [
      { name: "Press", href: "/about" },
      { name: "Investors", href: "/about" },
      { name: "Terms", href: "/terms" },
      { name: "Privacy", href: "/privacy" },
      { name: "Help", href: "/contact" },
      { name: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-coursera-navy text-white">
      <div className="container-coursera py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-coursera-blue">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">LearnAI</span>
            </Link>
            <p className="text-sm text-white/60 mb-4">
              AI-Powered learning platform offering world-class courses from top universities and companies.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} LearnAI Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-sm text-white/60 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
