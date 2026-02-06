import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import cosmeticPackaging from "@/assets/cosmetic-packaging.jpg";
import stationery from "@/assets/stationery.jpg";
import ecoPackaging from "@/assets/eco-packaging.jpg";
import tshirtMockup from "@/assets/tshirt-mockup.jpg";

const products = [
  {
    title: "Cosmetic Packaging",
    image: cosmeticPackaging,
    category: "Premium",
  },
  {
    title: "Brand Identity",
    image: stationery,
    category: "Corporate",
  },
  {
    title: "Eco Packaging",
    image: ecoPackaging,
    category: "Sustainable",
  },
  {
    title: "Apparel Printing",
    image: tshirtMockup,
    category: "Custom",
  },
];

export const ProductsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-secondary text-sm font-medium uppercase tracking-wider">Products</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                We Provide Various{" "}
                <span className="text-gradient-teal">Kinds Of Packaging</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              One of the fastest growing design and printing companies with some of the best experts
              serving the pharmaceutical sector.
            </p>
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <StaggerItem key={product.title}>
              <div className="group relative overflow-hidden rounded-xl bg-card card-hover">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs text-secondary uppercase tracking-wider">{product.category}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">{product.title}</h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View More */}
        <AnimatedSection delay={0.4}>
          <div className="text-center mt-12">
            <Link to="/gallery" className="inline-flex items-center gap-2 text-secondary hover:gap-3 transition-all font-medium">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
