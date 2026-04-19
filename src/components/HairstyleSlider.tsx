import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Star, Sparkles } from "lucide-react";

// Import Swiper styles directly
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface HairstyleSlide {
  id: number;
  image: string;
  name: string;
  category: string;
}

const hairstyleSlides: HairstyleSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=600&fit=crop",
    name: "Elegant Low Bun",
    category: "Classic",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
    name: "Romantic Side Swept",
    category: "Romantic",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
    name: "Braided Crown",
    category: "Bohemian",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&h=600&fit=crop",
    name: "Classic Chignon",
    category: "Timeless",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
    name: "Loose Waves",
    category: "Natural",
  },
];

const HairstyleSlider = () => {
  return (
    <div className="relative px-4">
      {/* Glow effects */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-pink/10 to-gold/20 rounded-3xl blur-2xl opacity-50" />
      
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="relative z-10 py-8 !pb-14"
        style={{ paddingBottom: "3.5rem" }}
      >
        {hairstyleSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2">
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-medium mb-2">
                  <Sparkles className="w-3 h-3" />
                  {slide.category}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {slide.name}
                </h3>
              </div>

              {/* Rating badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-gold to-gold-light text-primary-foreground text-xs font-medium shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                4.9
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HairstyleSlider;
