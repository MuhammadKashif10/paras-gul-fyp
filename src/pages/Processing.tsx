import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { getRecommendation } from "@/lib/api";
import {
  getRecommendationRequest,
  saveRecommendationResult,
} from "@/lib/recommendation-session";

const steps = [
  "Reading your uploaded bridal profile...",
  "Matching event preferences with hairstyle data...",
  "Scoring hairstyle compatibility...",
  "Preparing your best recommendation...",
];

const Processing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const request = getRecommendationRequest();

    if (!request) {
      navigate("/upload");
      return;
    }

    let isMounted = true;

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 900);

    getRecommendation(request)
      .then((response) => {
        if (!isMounted) {
          return;
        }

        saveRecommendationResult(response);
        navigate("/results");
      })
      .catch((requestError) => {
        if (!isMounted) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Recommendation request failed.",
        );
      });

    return () => {
      isMounted = false;
      clearInterval(stepInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 gradient-glow"
      />

      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [-20, -100, -20],
            x: [0, 12 - index * 3, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3 + index * 0.15,
            repeat: Infinity,
            delay: index * 0.4,
          }}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{
            left: `${20 + index * 12}%`,
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
            message="Building your bridal hairstyle recommendation..."
            submessage="The rule-based engine is comparing your profile against the hairstyle dataset"
          />

          <div className="mt-12 space-y-3">
            <AnimatePresence mode="wait">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: index <= currentStep ? 1 : 0.3,
                    x: 0,
                  }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
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
                  <span className={index <= currentStep ? "text-foreground" : "text-muted-foreground"}>
                    {step}
                  </span>
                  {index < currentStep ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-primary text-xs">
                      ✓
                    </motion.span>
                  ) : null}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

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

          {error ? (
            <div className="mt-8 rounded-2xl border border-destructive/30 bg-card/90 p-6 text-center shadow-card">
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => navigate("/upload")}>
                  Back to Form
                </Button>
                <Button variant="hero" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
};

export default Processing;
