import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Share2, RefreshCw, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import HairstyleCard from "@/components/HairstyleCard";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

const mockHairstyles = [
  {
    id: 1,
    name: "Elegant Low Bun",
    description: "A classic and sophisticated low bun that complements oval and heart-shaped faces beautifully. Perfect for formal ceremonies.",
    matchScore: 98,
    tags: ["Classic", "Elegant", "Formal"],
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Romantic Side Swept",
    description: "Soft, flowing waves swept to one side create a romantic and glamorous look. Ideal for beach and garden weddings.",
    matchScore: 95,
    tags: ["Romantic", "Flowing", "Beach"],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Braided Crown Updo",
    description: "An intricate braided crown that adds a whimsical, fairy-tale touch. Perfect for bohemian-style weddings.",
    matchScore: 92,
    tags: ["Bohemian", "Braided", "Whimsical"],
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Classic Chignon",
    description: "A timeless French chignon that exudes sophistication and grace. Works beautifully with veils and tiaras.",
    matchScore: 89,
    tags: ["Timeless", "French", "Sophisticated"],
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=500&fit=crop",
  },
  {
    id: 5,
    name: "Loose Romantic Waves",
    description: "Effortlessly beautiful loose waves that frame the face perfectly. Great for a natural, relaxed bridal look.",
    matchScore: 87,
    tags: ["Natural", "Relaxed", "Modern"],
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
  },
  {
    id: 6,
    name: "Vintage Hollywood Waves",
    description: "Glamorous Old Hollywood waves that bring vintage elegance to your wedding day. Perfect for evening ceremonies.",
    matchScore: 85,
    tags: ["Vintage", "Glamorous", "Hollywood"],
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=500&fit=crop",
  },
];

const Results = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const detectedFaceShape = "Oval";

  useEffect(() => {
    const stored = sessionStorage.getItem("uploadedImage");
    if (stored) {
      setUploadedImage(stored);
    }
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <MotionWrapper className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <motion.div whileHover={{ x: -4 }}>
              <Button variant="ghost" size="sm" asChild className="mb-2">
                <Link to="/upload">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Upload
                </Link>
              </Button>
            </motion.div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Your <span className="text-gradient">Recommendations</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Save
              </Button>
            </motion.div>
          </div>
        </MotionWrapper>

        {/* Analysis Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Uploaded Image */}
          <MotionWrapper delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card rounded-2xl p-4 shadow-card border border-border/50"
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Photo</h3>
              <div className="aspect-square rounded-xl overflow-hidden bg-secondary">
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image uploaded
                  </div>
                )}
              </div>
            </motion.div>
          </MotionWrapper>

          {/* Face Analysis */}
          <MotionWrapper delay={0.2} className="md:col-span-2">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border/50 h-full"
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Face Analysis Results</h3>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50"
                >
                  <span className="text-foreground font-medium">Detected Face Shape</span>
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-pink text-primary-foreground font-semibold flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    {detectedFaceShape}
                  </span>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-secondary/50 border border-border/50"
                  >
                    <div className="text-2xl font-display font-bold text-gradient mb-1">6</div>
                    <div className="text-sm text-muted-foreground">Styles Found</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-secondary/50 border border-border/50"
                  >
                    <div className="text-2xl font-display font-bold text-gradient-gold mb-1">98%</div>
                    <div className="text-sm text-muted-foreground">Best Match</div>
                  </motion.div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Based on your {detectedFaceShape.toLowerCase()} face shape, we've curated hairstyles that will 
                  complement your features beautifully. Oval faces are versatile and suit most hairstyle options!
                </p>
              </div>
            </motion.div>
          </MotionWrapper>
        </div>

        {/* Hairstyle Recommendations */}
        <div className="mb-8">
          <MotionWrapper className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Recommended <span className="text-gradient">Hairstyles</span>
            </h2>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </motion.div>
          </MotionWrapper>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockHairstyles.map((style, index) => (
              <HairstyleCard
                key={style.id}
                image={style.image}
                name={style.name}
                description={style.description}
                matchScore={style.matchScore}
                tags={style.tags}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Try Again CTA */}
        <MotionWrapper>
          <motion.div
            whileHover={{ y: -4 }}
            className="text-center py-8 rounded-2xl bg-card border border-border/50"
          >
            <p className="text-muted-foreground mb-4">
              Not satisfied with the results? Try with a different photo.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button variant="hero" asChild>
                <Link to="/upload">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Another Photo
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default Results;
