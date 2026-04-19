import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface LoaderProps {
  message?: string;
  submessage?: string;
}

const Loader = ({ 
  message = "Analyzing facial features using AI...",
  submessage = "This may take a few moments"
}: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Animated Loader */}
      <div className="relative">
        {/* Outer glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
        />

        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-4 border-muted border-t-primary border-r-pink"
        />
        
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 rounded-full border-4 border-muted border-b-gold border-l-primary"
        />
        
        {/* Center Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="p-3 rounded-full bg-primary/10 border border-primary/30">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-2"
      >
        <motion.p
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-lg font-medium text-foreground"
        >
          {message}
        </motion.p>
        <p className="text-sm text-muted-foreground">
          {submessage}
        </p>
      </motion.div>

      {/* Progress Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-pink"
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
