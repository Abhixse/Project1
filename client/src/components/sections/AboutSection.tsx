import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Play } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import burgerBox from "@/assets/burger-box.jpg";

const highlights = [
  "Low Color Press With Custom",
  "UV",
  "IR",
  "H-UV",
];

export const AboutSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <AnimatedSection direction="left">
            <div className="space-y-8">
              <div>
                <span className="text-secondary text-sm font-medium uppercase tracking-wider">About Us</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  We Are Solutions For{" "}
                  <span className="text-gradient-teal">Your Brand Packaging</span>
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                MSP PrintPack is delighted to have the opportunity to provide you with business proposal
                which would help you to have an extraordinary printing and packaging solutions as we are equipped
                with cutting edge technology.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/85">{item}</span>
                  </div>
                ))}
              </div>

              <Button variant="secondary" className="glow-teal group">
                <span>About Us</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </AnimatedSection>

          {/* Image with video play */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={burgerBox}
                  alt="Packaging Solutions"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                
                {/* Play button */}
                <button className="absolute inset-0 flex items-center justify-center group">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg glow-teal group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-background fill-current ml-1" />
                  </div>
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
