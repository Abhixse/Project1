import { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const testimonials = [
  {
    quote:
      "Working with this team transformed our product presentation. The packaging quality and design exceeded expectations.",
    author: "Jonathan Rice",
    role: "CEO, TechCorp",
    rating: 5,
  },
  {
    quote:
      "Professional, innovative, and detail-oriented. Their packaging solutions truly elevated our brand image.",
    author: "Sarah Mitchell",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote:
      "Outstanding creativity and execution. Our customers immediately noticed the difference.",
    author: "Daniel Carter",
    role: "Founder, Urban Retail",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const total = testimonials.length;
  const slides = [testimonials[total - 1], ...testimonials, testimonials[0]];

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const [isMobileSlider, setIsMobileSlider] = useState(false);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobileSlider(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    if (!transition) return;
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (!transition) return;
    setIndex((prev) => prev - 1);
  };

  // Infinite loop
  useEffect(() => {
    if (!isMobileSlider) return;

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(total);
      }, 500);
    }

    if (index === total + 1) {
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 500);
    }
  }, [index, isMobileSlider, total]);

  useEffect(() => {
    if (!transition) {
      const timer = setTimeout(() => setTransition(true), 50);
      return () => clearTimeout(timer);
    }
  }, [transition]);

  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Our Clients Say
            </h2>
          </AnimatedSection>

          {/* Desktop Grid */}
          {!isMobileSlider && (
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl bg-card border border-border
                             transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>

                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Slider */}
          {isMobileSlider && (
            <div className="relative overflow-hidden">
              <div
                className={`flex ${
                  transition
                    ? "transition-transform duration-500 ease-in-out"
                    : ""
                }`}
                style={{
                  transform: `translateX(-${index * 100}%)`,
                }}
              >
                {slides.map((testimonial, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="p-8 rounded-2xl bg-card border border-border">
                      <Quote className="w-10 h-10 text-primary/20 mb-4" />

                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <Star
                            key={j}
                            className="w-4 h-4 text-yellow-500 fill-yellow-500"
                          />
                        ))}
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </p>

                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={prev}
                  className="p-2 border border-border rounded-full bg-background hover:bg-muted transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="p-2 border border-border rounded-full bg-background hover:bg-muted transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
