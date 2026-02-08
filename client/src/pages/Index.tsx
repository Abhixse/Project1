import { Layout } from "@/components/layout";
import {
  HeroSection,
  FeaturesSection,
  AboutSection,
  InnovationSection,
  ProductsSection,
  PackagingTypesSection,
  TestimonialsSection,
  VezoBusinessSection,
} from "@/components/sections";
import businessImage from "@/assets/hero-packaging.jpg";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <section className="py-16 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div className="space-y-4">
              <span className="text-secondary text-sm font-medium uppercase tracking-wider">
                Business
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Elevate Your Brand Presence
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Discover how we help businesses create standout packaging that drives recognition
                and customer trust.
              </p>
              <a
                href="https://example.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm font-medium text-secondary hover:text-foreground transition-colors"
              >
                Visit example.com
              </a>
            </div>
            <div className="rounded-2xl border border-border/40 bg-muted/40 p-3 shadow-sm">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={businessImage}
                  alt="Business showcase"
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
                <span>sbjb</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeaturesSection />
      <AboutSection />
      <VezoBusinessSection />
      <InnovationSection />
      <ProductsSection />
      <PackagingTypesSection />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
