import { useState, useEffect } from "react";
import { Award, Leaf, Palette, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedSection, StaggerItem } from "@/components/AnimatedSection";

const features = [
  {
    icon: Award,
    title: "Quality",
    description: "Premium quality materials and finishing for every project",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Eco-friendly options with recyclable materials",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Creative designs that make your brand stand out",
    gradient: "from-primary to-secondary",
  },
];

// 👇 Duplicate first slide at end (for mobile carousel)
const slides = [...features, features[0]];

// Feature Card Component
const FeatureCard = ({ feature }: { feature: typeof features[0] }) => {
  const Icon = feature.icon;
  return (
    <div className="p-6 rounded-xl bg-card border border-border/50 text-center h-full">
      <div
        className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${feature.gradient}`}
      >
        <Icon className="w-6 h-6 text-background" />
      </div>
      <h3 className="font-semibold mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground">{feature.description}</p>
    </div>
  );
};

export const FeaturesSection = () => {
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  const total = features.length;

  const next = () => {
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  // 👇 Reset when reaching cloned slide
  useEffect(() => {
    if (index === total) {
      const timeout = setTimeout(() => {
        setTransition(false);
        setIndex(0);
      }, 500); // match duration

      return () => clearTimeout(timeout);
    }
  }, [index, total]);

  // Re-enable transition after reset
  useEffect(() => {
    if (!transition) {
      const timeout = setTimeout(() => {
        setTransition(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [transition]);

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="section-container">
        {/* Desktop: Grid layout showing all cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={i} direction="up" delay={i * 0.1}>
              <FeatureCard feature={feature} />
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile: Carousel slider */}
        <div className="md:hidden">
          <div className="relative w-full overflow-hidden">
            <div
              className={`flex gap-6 ${
                transition
                  ? "transition-transform duration-500 ease-in-out"
                  : ""
              }`}
              style={{
                transform: `translateX(calc(-${index} * (75vw + 1.5rem)))`,
              }}
            >
              {slides.map((feature, i) => (
                <div key={i} className="w-[75vw] shrink-0">
                  <StaggerItem>
                    <FeatureCard feature={feature} />
                  </StaggerItem>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={prev}
                className="p-2 rounded-full border border-border hover:bg-secondary/10 transition"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={next}
                className="p-2 rounded-full border border-border hover:bg-secondary/10 transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
