import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import burgerBox from "@/assets/burger-box.jpg";

const benefits = [
  "Best Quality Of Packaging",
  "Creative Packaging",
  "Environmentally Friendly",
];

export const InnovationSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-mint" />
        <div className="bg-card" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch">
          {/* Image side */}
          <AnimatedSection direction="left">
            <div className="relative -mx-4 sm:-mx-6 lg:mx-0">
              <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
                <img
                  src={burgerBox}
                  alt="Best Packaging"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay card */}
                <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:max-w-xs bg-primary p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    We Production Best Packaging!
                  </h3>
                  <Link to="/gallery" className="text-sm text-secondary flex items-center gap-2 hover:gap-3 transition-all">
                    View Projects <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Content side */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="p-8 lg:p-16 flex flex-col justify-center h-full">
              <span className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Why Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Accelerating Innovations{" "}
                <span className="text-secondary">In Packaging</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                MSP PrintPack is delighted to have the opportunity to provide you with business proposal
                which would help you to have an extraordinary printing and packaging solutions as we are equipped
                with cutting edge technology.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-secondary/10 transition-colors cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-full gradient-teal flex items-center justify-center">
                      <Check className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <span className="font-medium text-secondary group-hover:text-foreground transition-colors">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
