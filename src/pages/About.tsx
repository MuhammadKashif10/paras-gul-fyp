import { motion } from "framer-motion";
import { 
  Target, 
  Cpu, 
  Code2, 
  Rocket, 
  Users, 
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

const About = () => {
  const objectives = [
    "Develop an AI-powered system for bridal hairstyle recommendations",
    "Implement accurate facial feature detection and analysis",
    "Create a user-friendly interface for seamless interaction",
    "Provide personalized recommendations based on face shape",
    "Build a scalable and maintainable web application",
  ];

  const technologies = [
    { name: "React.js", description: "Frontend framework for building user interfaces" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework for styling" },
    { name: "TypeScript", description: "Type-safe JavaScript for robust code" },
    { name: "Framer Motion", description: "Animation library for smooth transitions" },
    { name: "Python/TensorFlow", description: "Backend AI model for face analysis" },
    { name: "REST API", description: "Backend communication interface" },
  ];

  const futureEnhancements = [
    "Virtual try-on feature using AR technology",
    "Integration with salon booking systems",
    "Hairstyle customization and editing tools",
    "Community features for sharing and reviews",
    "Mobile app development for iOS and Android",
    "Multi-language support for global users",
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      {/* Hero Section */}
      <section className="gradient-hero py-16 relative overflow-hidden">
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 gradient-glow"
        />

        <div className="container mx-auto px-4 relative z-10">
          <MotionWrapper className="max-w-3xl mx-auto text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              About This <span className="text-gradient">Project</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              AI Bridal Hairstyle Recommendation System - A Final Year Project 
              combining artificial intelligence with bridal fashion to help brides 
              find their perfect wedding day hairstyle.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <MotionWrapper variant="slideInLeft">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
                  <Lightbulb className="w-4 h-4" />
                  Project Introduction
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Revolutionizing <span className="text-gradient">Bridal Style</span> Selection
                </h2>
                <p className="text-muted-foreground mb-4">
                  This web application leverages artificial intelligence to help brides 
                  choose suitable bridal hairstyles based on their unique facial features. 
                  By analyzing face shape, proportions, and key facial landmarks, the system 
                  provides personalized recommendations.
                </p>
                <p className="text-muted-foreground">
                  The project addresses the challenge many brides face when selecting 
                  hairstyles, providing data-driven suggestions that complement their 
                  natural features for their special day.
                </p>
              </MotionWrapper>

              <MotionWrapper variant="slideInRight" delay={0.2}>
                <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-pink/20 p-8 flex items-center justify-center border border-border/50">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                    {[Target, Cpu, Code2, Users].map((Icon, index) => (
                      <motion.div
                        key={index}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                        whileHover={{ scale: 1.1 }}
                        className="aspect-square rounded-xl bg-card shadow-card border border-border/50 flex items-center justify-center"
                      >
                        <Icon className="w-8 h-8 text-primary" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <MotionWrapper className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                Project Objectives
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                What We Aim to <span className="text-gradient">Achieve</span>
              </h2>
            </MotionWrapper>

            <div className="space-y-4">
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 8, boxShadow: "0 0 30px -10px hsl(340 82% 72% / 0.3)" }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-card border border-border/50"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </motion.div>
                  <p className="text-foreground pt-1">{objective}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <MotionWrapper className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
                <Code2 className="w-4 h-4" />
                Technology Stack
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Tools & <span className="text-gradient">Technologies</span> Used
              </h2>
            </MotionWrapper>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 50px -15px hsl(0 0% 0% / 0.5)" }}
                  className="p-5 rounded-xl bg-card shadow-card border border-border/50"
                >
                  <h3 className="font-semibold text-foreground mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Enhancements */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <MotionWrapper className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold text-sm font-medium mb-4">
                <Rocket className="w-4 h-4" />
                Future Scope
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Future <span className="text-gradient-gold">Enhancements</span>
              </h2>
            </MotionWrapper>

            <div className="grid sm:grid-cols-2 gap-4">
              {futureEnhancements.map((enhancement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-card border border-border/50"
                >
                  <ArrowRight className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-foreground">{enhancement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero relative overflow-hidden">
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 gradient-glow"
        />

        <div className="container mx-auto px-4 relative z-10">
          <MotionWrapper className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Ready to <span className="text-gradient">Try It Out?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Experience the AI-powered bridal hairstyle recommendation system yourself.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/upload">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </MotionWrapper>
        </div>
      </section>
    </div>
  );
};

export default About;
