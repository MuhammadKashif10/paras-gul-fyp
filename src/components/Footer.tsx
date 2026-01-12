import { Link } from "react-router-dom";
import { Sparkles, Heart, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display text-xl font-semibold">
                Bridal<span className="text-gradient">AI</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              AI-powered bridal hairstyle recommendations tailored to your unique 
              facial features. Find your perfect wedding day look with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/upload", label: "Upload Image" },
                { to: "/about", label: "About Project" },
              ].map((link) => (
                <li key={link.to}>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-2">
              <li>
                <motion.a
                  whileHover={{ x: 4 }}
                  href="#"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>support@bridalai.com</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 4 }}
                  href="#"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 BridalAI. Final Year Project.
          </p>
          <p className="flex items-center gap-1 text-muted-foreground text-sm">
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </motion.span>{" "}
            for brides everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
