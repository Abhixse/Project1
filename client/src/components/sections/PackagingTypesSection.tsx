import { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const packagingTypes = [
  {
    number: "01",
    title: "Minimalist Packaging",
    description: "Create a clean and simple design that focuses on the essential elements of your product. Minimalist packaging often uses limited colors and sleek typography to convey a sense of elegance and sophistication.",
  },
  {
    number: "02",
    title: "Eco-Friendly Packaging",
    description: "Use environmentally friendly materials such as recycled paper or biodegradable materials for your packaging. Highlight the sustainable aspect of your product and encourage customers to recycle the packaging.",
  },
  {
    number: "03",
    title: "Interactive Packaging",
    description: "Engage customers with interactive packaging that incorporates elements like pull-out tabs, hidden compartments, or augmented reality experiences. This can create a memorable and immersive customer engagement.",
  },
  {
    number: "04",
    title: "Customizable Packaging",
    description: "Allow customers to personalize their packaging by offering options for color schemes, patterns, or adding their names or messages. This can create a sense of ownership and make the product feel more special.",
  },
];

export const PackagingTypesSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="section-container">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packagingTypes.map((type) => (
            <StaggerItem key={type.number}>
              <div className="space-y-4 p-6 rounded-xl hover:bg-muted/50 transition-colors">
                <span className="text-4xl font-bold text-primary/80">{type.number}</span>
                <h3 className="text-lg font-semibold text-secondary">{type.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
