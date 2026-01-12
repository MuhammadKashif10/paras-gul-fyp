import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, ScanFace, Sparkles, ArrowRight, Star, Heart, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import HairstyleSlider from "@/components/HairstyleSlider";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

const Index = () => {
  const features = [
    {
      icon: Upload,
      title: "Upload Your Photo",
      description: "Simply upload a clear front-facing photo. Our system works best with well-lit images showing your full face.",
    },
    {
      icon: ScanFace,
      title: "Face Shape Analysis",
      description: "Our AI analyzes your facial features including face shape, forehead, jawline, and proportions for accurate matching.",
    },
    {
      icon: Sparkles,
      title: "AI Recommendations",
      description: "Receive personalized bridal hairstyle suggestions that complement your unique facial structure beautifully.",
    },
  ];

  const stats = [
    { value: "500+", label: "Hairstyle Options" },
    { value: "95%", label: "Match Accuracy" },
    { value: "10K+", label: "Happy Brides" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-pink/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-glow rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 pt-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <MotionWrapper variant="fadeInDown" delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm shadow-soft mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Crown className="w-4 h-4 text-gold" />
                </motion.div>
                <span className="text-sm font-medium text-muted-foreground">
                  AI-Powered Bridal Style Discovery
                </span>
              </div>
            </MotionWrapper>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            >
              Find Your Perfect{" "}
              <span className="text-gradient">Bridal Hairstyle</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Upload your photo and let our AI recommend stunning bridal hairstyles 
              tailored to your unique facial features. Your dream wedding look awaits.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/upload">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="font-display text-2xl md:text-3xl font-bold text-gradient-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Hairstyle Slider Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 gradient-glow opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <MotionWrapper className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trending Bridal <span className="text-gradient">Hairstyles</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of stunning bridal hairstyles loved by thousands of brides.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <HairstyleSlider />
          </MotionWrapper>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <MotionWrapper className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our intelligent system makes finding your perfect bridal hairstyle simple and enjoyable.
            </p>
          </MotionWrapper>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        {/* Background effects */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 gradient-glow"
        />

        <div className="container mx-auto px-4 relative z-10">
          <MotionWrapper className="max-w-3xl mx-auto text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <Heart className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Find Your <span className="text-gradient">Look?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of brides who discovered their perfect wedding hairstyle with our AI technology.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/upload">
                  Start Your Journey
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

export default Index;
