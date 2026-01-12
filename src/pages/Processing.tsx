import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";

const Processing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { text: "Detecting facial landmarks...", complete: false },
    { text: "Analyzing face shape...", complete: false },
    { text: "Matching with hairstyle database...", complete: false },
    { text: "Generating recommendations...", complete: false },
  ];

  useEffect(() => {
    // Animate through steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    // Navigate after processing
    const timer = setTimeout(() => {
      navigate("/results");
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(stepInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 gradient-glow"
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, -100, -20],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{
            left: `${20 + i * 15}%`,
            bottom: "20%",
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto"
        >
          <Loader 
            message="Analyzing facial features using AI..."
            submessage="Please wait while we find your perfect match"
          />

          {/* Processing Steps */}
          <div className="mt-12 space-y-3">
            <AnimatePresence mode="wait">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: index <= currentStep ? 1 : 0.3,
                    x: 0,
                  }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <motion.div
                    animate={
                      index === currentStep
                        ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
                        : {}
                    }
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentStep
                        ? "bg-gradient-to-r from-primary to-pink"
                        : "bg-muted"
                    }`}
                  />
                  <span
                    className={
                      index <= currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {step.text}
                  </span>
                  {index < currentStep && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-primary text-xs"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-primary via-pink to-gold rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Processing;
