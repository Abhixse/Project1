import { useState, useEffect } from "react";
import {
  Pill,
  UtensilsCrossed,
  Factory,
  Hotel,
  Palette,
  Car,
  Landmark,
  Calendar,
  Code,
  Building2,
  Wine,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const IndustriesSection = () => {
  const industries = [
    {
      name: "Pharmaceuticals",
      icon: Pill,
      iconBg: "bg-blue-500/10 dark:bg-blue-400/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Foods Industries",
      icon: UtensilsCrossed,
      iconBg: "bg-orange-500/10 dark:bg-orange-400/20",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      name: "Hotel & Restaurants",
      icon: Hotel,
      iconBg: "bg-amber-500/10 dark:bg-amber-400/20",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      name: "Design Agencies",
      icon: Palette,
      iconBg: "bg-pink-500/10 dark:bg-pink-400/20",
      iconColor: "text-pink-600 dark:text-pink-400",
    },
    {
      name: "Automobiles",
      icon: Car,
      iconBg: "bg-red-500/10 dark:bg-red-400/20",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      name: "Banking",
      icon: Landmark,
      iconBg: "bg-slate-500/10 dark:bg-slate-400/20",
      iconColor: "text-slate-600 dark:text-slate-300",
    },
    {
      name: "Event Organizers",
      icon: Calendar,
      iconBg: "bg-purple-500/10 dark:bg-purple-400/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "IT & Software",
      icon: Code,
      iconBg: "bg-cyan-500/10 dark:bg-cyan-400/20",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
    {
      name: "Real Estate",
      icon: Building2,
      iconBg: "bg-green-500/10 dark:bg-green-400/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      name: "Industry & Manufacturers",
      icon: Factory,
      iconBg: "bg-gray-500/10 dark:bg-gray-400/20",
      iconColor: "text-gray-600 dark:text-gray-300",
    },
    {
      name: "Clubs & Resorts",
      icon: Wine,
      iconBg: "bg-rose-500/10 dark:bg-rose-400/20",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
    {
      name: "Educational Institutes",
      icon: GraduationCap,
      iconBg: "bg-indigo-500/10 dark:bg-indigo-400/20",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
  ];

  const total = industries.length;
  const slides = [industries[total - 1], ...industries, industries[0]];

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const [isMobileSlider, setIsMobileSlider] = useState(false);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobileSlider(window.innerWidth <= 471);
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

  // Infinite loop fix
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
    <section className="py-16 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Industries We Serve
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide comprehensive packaging solutions tailored to diverse
            industries.
          </p>
        </div>

        {/* Desktop / Tablet Grid */}
        {!isMobileSlider && (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, idx) => {
              const Icon = industry.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-xl p-6 bg-card border border-border
                             transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div
                    className={`mb-4 inline-flex p-3 rounded-lg ${industry.iconBg}`}
                  >
                    <Icon
                      className={`w-6 h-6 ${industry.iconColor}
                                  transition-transform duration-300 group-hover:scale-110`}
                    />
                  </div>

                  <h3 className="font-semibold text-foreground">
                    {industry.name}
                  </h3>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile Slider */}
        {isMobileSlider && (
          <div className="relative overflow-hidden w-full">
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
              {slides.map((industry, i) => {
                const Icon = industry.icon;
                return (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div
                      className="group rounded-xl p-6 bg-card border border-border
                                 transition-all duration-300 hover:shadow-lg"
                    >
                      <div
                        className={`mb-4 inline-flex p-3 rounded-lg ${industry.iconBg}`}
                      >
                        <Icon
                          className={`w-6 h-6 ${industry.iconColor}
                                      transition-transform duration-300 group-hover:scale-110`}
                        />
                      </div>

                      <h3 className="text-base font-semibold text-foreground">
                        {industry.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
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
    </section>
  );
};
