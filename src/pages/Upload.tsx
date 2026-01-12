import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Info, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import MotionWrapper from "@/components/animations/MotionWrapper";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const tips = [
    "Use a clear, front-facing photo",
    "Ensure good lighting on your face",
    "Keep hair away from your face",
    "Avoid heavy filters or editing",
  ];

  const handleSubmit = () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        sessionStorage.setItem("uploadedImage", e.target?.result as string);
        navigate("/processing");
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 gradient-hero relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 gradient-glow"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <MotionWrapper className="text-center mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upload Your <span className="text-gradient">Photo</span>
            </h1>
            <p className="text-muted-foreground">
              Share a photo and our AI will analyze your facial features to recommend 
              the perfect bridal hairstyles for you.
            </p>
          </MotionWrapper>

          {/* Upload Area */}
          <MotionWrapper delay={0.2} className="mb-8">
            <ImageUpload
              onImageSelect={setSelectedImage}
              selectedImage={selectedImage}
              onClear={() => setSelectedImage(null)}
            />
          </MotionWrapper>

          {/* Tips Card */}
          <MotionWrapper delay={0.3}>
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border/50 mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Tips for Best Results</h3>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </MotionWrapper>

          {/* Submit Button */}
          <MotionWrapper delay={0.4} className="flex justify-center">
            <motion.div
              whileHover={{ scale: selectedImage ? 1.05 : 1 }}
              whileTap={{ scale: selectedImage ? 0.95 : 1 }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={handleSubmit}
                disabled={!selectedImage}
                className="min-w-[200px]"
              >
                Analyze My Face
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
};

export default Upload;
