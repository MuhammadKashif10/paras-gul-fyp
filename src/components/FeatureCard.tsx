import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 50px -15px hsl(0 0% 0% / 0.5), 0 0 40px -10px hsl(340 82% 72% / 0.3)",
      }}
      className="group relative p-6 rounded-2xl bg-card border border-border/50 shadow-card"
    >
      {/* Glow background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="relative mb-4 inline-flex p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors"
      >
        <Icon className="w-6 h-6 text-primary" />
      </motion.div>

      {/* Content */}
      <h3 className="relative font-display text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="relative text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>

      {/* Step number */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
        <span className="text-sm font-bold text-gradient">{index + 1}</span>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
