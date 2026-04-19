import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HairstyleCardProps {
  image: string;
  name: string;
  description: string;
  matchScore?: number;
  tags?: string[];
  index?: number;
}

const HairstyleCard = ({
  image,
  name,
  description,
  matchScore = 95,
  tags = [],
  index = 0,
}: HairstyleCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 shadow-card"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-card transition-colors"
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-colors",
              isLiked ? "text-primary fill-primary" : "text-muted-foreground"
            )}
          />
        </motion.button>

        {/* Match Score */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
          className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-pink text-primary-foreground text-sm font-medium flex items-center gap-1 shadow-glow"
        >
          <Star className="w-3 h-3 fill-current" />
          {matchScore}% Match
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-gradient transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                className="px-2 py-1 text-xs rounded-full bg-secondary border border-border/50 text-secondary-foreground"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 1,
          boxShadow: "inset 0 0 60px -20px hsl(340 82% 72% / 0.2)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default HairstyleCard;
