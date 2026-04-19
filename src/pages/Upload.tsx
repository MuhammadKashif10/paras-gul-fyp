import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Info, Sparkles, CalendarDays, Scissors } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clearRecommendationResult, saveRecommendationRequest } from "@/lib/recommendation-session";
import type { EventType, HairLength } from "@/types/bridal";

const tips = [
  "Use a clear, front-facing bridal photo",
  "Pick the wedding event you want styling for",
  "Choose the correct hair length for better matching",
  "Avoid heavily filtered or low-light images",
];

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read the selected image."));
    reader.readAsDataURL(file);
  });
}

const Upload = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState<EventType | "">("");
  const [hairLength, setHairLength] = useState<HairLength | "">("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formReady = useMemo(
    () => Boolean(name.trim() && eventType && hairLength && selectedImage),
    [name, eventType, hairLength, selectedImage],
  );

  const handleSubmit = async () => {
    if (!formReady || !selectedImage || !eventType || !hairLength) {
      setError("Complete your details and upload an image before continuing.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      clearRecommendationResult();

      const image = await readFileAsDataUrl(selectedImage);

      saveRecommendationRequest({
        name: name.trim(),
        eventType,
        hairLength,
        image,
      });

      navigate("/processing");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while preparing your image.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 gradient-hero relative overflow-hidden">
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 gradient-glow"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div>
            <MotionWrapper className="mb-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/30 mb-6"
              >
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                Bridal Style <span className="text-gradient">Recommendation Form</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Enter your bridal event details, select your hair length, and upload an image.
                The system will score your profile against a hairstyle dataset and recommend the
                best bridal look before you proceed to booking.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.15}>
              <Card className="rounded-3xl border-border/50 bg-card/90 shadow-card">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="bride-name">Bride Name</Label>
                      <Input
                        id="bride-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Event Type</Label>
                      <Select
                        value={eventType}
                        onValueChange={(value) => setEventType(value as EventType)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your event" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mehndi">Mehndi</SelectItem>
                          <SelectItem value="Baraat">Baraat</SelectItem>
                          <SelectItem value="Walima">Walima</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Hair Length</Label>
                    <Select
                      value={hairLength}
                      onValueChange={(value) => setHairLength(value as HairLength)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your hair length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Short">Short</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Long">Long</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Upload Bridal Image</Label>
                    <ImageUpload
                      onImageSelect={setSelectedImage}
                      selectedImage={selectedImage}
                      onClear={() => setSelectedImage(null)}
                    />
                  </div>

                  {error ? (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
                      {error}
                    </div>
                  ) : null}

                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                      Your recommendation will be generated from a rule-based bridal hairstyle dataset.
                    </p>
                    <motion.div whileHover={{ scale: formReady ? 1.04 : 1 }} whileTap={{ scale: formReady ? 0.98 : 1 }}>
                      <Button
                        variant="hero"
                        size="xl"
                        disabled={!formReady || isSubmitting}
                        onClick={handleSubmit}
                      >
                        {isSubmitting ? "Preparing..." : "Analyze and Recommend"}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </MotionWrapper>
          </div>

          <div className="space-y-6">
            <MotionWrapper delay={0.25}>
              <Card className="rounded-3xl border-border/50 bg-card/90 shadow-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-xl text-foreground">How Matching Works</h2>
                  </div>
                  <div className="grid gap-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-secondary/40 p-4">
                      <CalendarDays className="w-4 h-4 mt-0.5 text-primary" />
                      <span>Your selected event contributes the strongest weight to the recommendation score.</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-secondary/40 p-4">
                      <Scissors className="w-4 h-4 mt-0.5 text-primary" />
                      <span>Hair length is matched against the bridal hairstyle dataset to improve fit.</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-secondary/40 p-4">
                      <Sparkles className="w-4 h-4 mt-0.5 text-primary" />
                      <span>The image is carried into the recommendation and booking flow so the admin sees the full request.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionWrapper>

            <MotionWrapper delay={0.35}>
              <Card className="rounded-3xl border-border/50 bg-card/90 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-xl text-foreground">Tips for Best Results</h2>
                  </div>
                  <ul className="space-y-3">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {index + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
