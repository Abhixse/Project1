import { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const packagingTypes = [
  {
    number: "01",
    title: "Minimalist Packaging",
    description:
      "Clean, simple designs that highlight only what matters. Uses limited colors and refined typography to create a premium, elegant look.",
  },
  {
    number: "02",
    title: "Eco-Friendly Packaging",
    description:
      "Sustainable materials like recycled paper and biodegradable components that reduce environmental impact and promote responsible consumption.",
  },
  {
    number: "03",
    title: "Interactive Packaging",
    description:
      "Engaging elements such as pull tabs, hidden features, or AR experiences that create memorable and immersive customer interactions.",
  },
  {
    number: "04",
    title: "Customizable Packaging",
    description:
      "Personalized colors, patterns, or branding elements that give customers a unique and exclusive product experience.",
  },
];

export const PackagingTypesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packagingTypes.map((type) => (
            <StaggerItem key={type.number}>
              <div
                className="group h-full p-8 rounded-2xl bg-card border border-border
                           transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Top Row (Number + Title aligned nicely) */}
                <div className="flex items-start gap-4">
                  {/* Number */}
                  <div
                    className="text-4xl font-bold text-primary/30 
                                  group-hover:text-primary transition-colors"
                  >
                    {type.number}
                  </div>

                  {/* Title + Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {type.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
