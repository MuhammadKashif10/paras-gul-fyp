import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, X, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
}

const ImageUpload = ({ onImageSelect, selectedImage, onClear }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleClear = () => {
    setPreview(null);
    onClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        id="image-upload"
      />

      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.label
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            htmlFor="image-upload"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              "relative flex flex-col items-center justify-center w-full aspect-[4/3] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300",
              isDragging
                ? "border-primary bg-primary/10 scale-[1.02]"
                : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            <motion.div
              animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
              className="flex flex-col items-center gap-4 p-8 text-center"
            >
              <motion.div
                animate={{
                  y: isDragging ? -5 : 0,
                  scale: isDragging ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "p-4 rounded-full transition-colors border",
                  isDragging
                    ? "bg-primary/20 border-primary/30"
                    : "bg-secondary border-border/50"
                )}
              >
                <Upload className={cn(
                  "w-8 h-8 transition-colors",
                  isDragging ? "text-primary" : "text-muted-foreground"
                )} />
              </motion.div>
              <div>
                <p className="font-medium text-foreground mb-1">
                  {isDragging ? "Drop your image here" : "Drag & drop your photo"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse from your device
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ImageIcon className="w-4 h-4" />
                <span>Supports JPG, PNG, WEBP • Max 10MB</span>
              </div>
            </motion.div>

            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/30 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />

            {/* Glow effect */}
            <motion.div
              animate={isDragging ? { opacity: 1 } : { opacity: 0 }}
              className="absolute inset-0 rounded-2xl shadow-glow pointer-events-none"
            />
          </motion.label>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-card border border-border/50"
          >
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with actions */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Change
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={handleClear}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </motion.div>
            </motion.div>

            {/* Clear button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClear}
              className="absolute top-4 right-4 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-card transition-colors shadow-soft"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
