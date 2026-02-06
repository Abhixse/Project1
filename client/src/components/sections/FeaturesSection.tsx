import { Award, Leaf, Palette } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const features = [
  {
    icon: Award,
    title: "Quality",
    description: "Premium quality materials and finishing for every project",
    color: "secondary",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Eco-friendly options with recyclable materials",
    color: "mint",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Creative designs that make your brand stand out",
    color: "accent",
  },
];

const trustedBrands = [
  { name: "TechCorp", logo: "TC" },
  { name: "ModernBrand", logo: "MB" },
  { name: "GlobalPack", logo: "GP" },
  { name: "EcoDesign", logo: "ED" },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features grid */}
          <StaggerContainer className="grid grid-cols-3 gap-4">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div
                  className="group p-6 rounded-xl bg-card border border-border/50 hover:border-secondary/50 transition-all duration-300 text-center card-hover"
                >
                  <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                    feature.color === 'secondary' ? 'bg-gradient-to-br from-primary to-secondary' : 
                    feature.color === 'accent' ? 'bg-gradient-to-br from-accent to-gold' : 
                    'bg-gradient-to-br from-mint to-mint-light'
                  }`}>
                    <feature.icon className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground/90">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Trusted by */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="space-y-6">
              <div>
                <span className="text-sm text-muted-foreground">Trusted By Brands Like</span>
              </div>
              <div className="flex items-center gap-6 flex-wrap">
                {trustedBrands.map((brand) => (
                  <div
                    key={brand.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/30 hover:border-secondary/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-secondary">{brand.logo}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground/80">{brand.name}</span>
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
