import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Crown,
  Download,
  RefreshCw,
  Scissors,
  Share2,
} from "lucide-react";
import HairstyleCard from "@/components/HairstyleCard";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createBooking } from "@/lib/api";
import { getRecommendationResult } from "@/lib/recommendation-session";
import type { BookingRecord, RecommendationResponse } from "@/types/bridal";

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [bookingError, setBookingError] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const storedResult = getRecommendationResult();

    if (!storedResult) {
      navigate("/upload");
      return;
    }

    setResult(storedResult);
  }, [navigate]);

  const topScore = useMemo(
    () => result?.recommendedHairstyle.matchScore ?? 0,
    [result],
  );

  if (!result) {
    return null;
  }

  const handleBookNow = async () => {
    try {
      setIsBooking(true);
      setBookingError("");
      const createdBooking = await createBooking(result);
      setBooking(createdBooking);
    } catch (error) {
      setBookingError(
        error instanceof Error ? error.message : "Failed to create booking.",
      );
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <MotionWrapper className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <motion.div whileHover={{ x: -4 }}>
              <Button variant="ghost" size="sm" asChild className="mb-2">
                <Link to="/upload">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Form
                </Link>
              </Button>
            </motion.div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Your <span className="text-gradient">Recommendation</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </MotionWrapper>

        <div className="grid xl:grid-cols-[0.95fr_1.05fr] gap-6 mb-10">
          <MotionWrapper delay={0.1}>
            <Card className="rounded-3xl border-border/50 shadow-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl font-semibold text-foreground">
                    Booking Profile
                  </h2>
                  <Badge className="bg-gradient-to-r from-primary to-pink text-primary-foreground border-0">
                    {result.customer.eventType}
                  </Badge>
                </div>

                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
                  <img
                    src={result.customer.image}
                    alt={result.customer.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border/50 bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                      <CalendarDays className="w-4 h-4" />
                      Event
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      {result.customer.eventType}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                      <Scissors className="w-4 h-4" />
                      Hair Length
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      {result.customer.hairLength}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/50 bg-secondary/50 p-4">
                  <div className="text-sm text-muted-foreground mb-2">Bride Name</div>
                  <div className="text-lg font-semibold text-foreground">
                    {result.customer.name}
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <Card className="rounded-3xl border-border/50 shadow-card h-full">
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-gold text-primary-foreground border-0">
                    {topScore}% Match
                  </Badge>
                  <Badge variant="secondary">Rule-based Recommendation Engine</Badge>
                </div>

                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                    {result.recommendedHairstyle.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {result.recommendedHairstyle.description}
                  </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-secondary/40 p-5">
                  <div className="flex items-center gap-2 mb-3 text-foreground font-medium">
                    <Crown className="w-4 h-4 text-primary" />
                    Why this style won
                  </div>
                  <p className="text-sm text-muted-foreground">{result.explanation}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border/50 bg-secondary/40 p-4">
                    <div className="text-2xl font-display font-bold text-gradient mb-1">
                      {result.alternatives.length + 1}
                    </div>
                    <div className="text-sm text-muted-foreground">Matched Styles</div>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-secondary/40 p-4">
                    <div className="text-2xl font-display font-bold text-gradient-gold mb-1">
                      {topScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">Top Confidence</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {result.recommendedHairstyle.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-primary/20 text-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {booking ? (
                  <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
                    <div className="flex items-center gap-2 text-foreground font-medium mb-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Booking created successfully
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your recommendation has been saved to the booking system with status{" "}
                      <span className="text-foreground font-medium">{booking.status}</span>.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/admin">Open Admin Dashboard</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="hero" size="xl" onClick={handleBookNow} disabled={isBooking}>
                      {isBooking ? "Saving Booking..." : "Book Now"}
                    </Button>
                    <Button variant="outline" size="xl" asChild>
                      <Link to="/upload">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Another Profile
                      </Link>
                    </Button>
                  </div>
                )}

                {bookingError ? (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
                    {bookingError}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>

        <div className="mb-8">
          <MotionWrapper className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Alternative <span className="text-gradient">Matches</span>
            </h2>
          </MotionWrapper>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[result.recommendedHairstyle, ...result.alternatives].map((style, index) => (
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
      </div>
    </div>
  );
};

export default Results;
