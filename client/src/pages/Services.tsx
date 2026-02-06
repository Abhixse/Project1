import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Package, Palette, Printer, Tag, Layers, Shirt } from "lucide-react";
import cosmeticPackaging from "@/assets/cosmetic-packaging.jpg";
import stationery from "@/assets/stationery.jpg";
import ecoPackaging from "@/assets/eco-packaging.jpg";
import tshirtMockup from "@/assets/tshirt-mockup.jpg";
import burgerBox from "@/assets/burger-box.jpg";
import heroPackaging from "@/assets/hero-packaging.jpg";

const services = [
  {
    icon: Package,
    title: "Custom Packaging",
    description: "Tailored packaging solutions designed specifically for your products. From rigid boxes to flexible pouches, we create packaging that protects and promotes.",
    features: ["Custom sizes & shapes", "Premium materials", "Brand customization", "Eco-friendly options"],
    image: heroPackaging,
  },
  {
    icon: Palette,
    title: "Brand Identity Design",
    description: "Complete brand identity packages including logos, business cards, letterheads, and marketing materials that create a cohesive brand experience.",
    features: ["Logo design", "Stationery design", "Brand guidelines", "Marketing collateral"],
    image: stationery,
  },
  {
    icon: Printer,
    title: "Offset Printing",
    description: "High-volume, high-quality printing for catalogs, brochures, magazines, and more. Our offset presses deliver consistent, vibrant results.",
    features: ["CMYK & Pantone colors", "Large format options", "High volume capacity", "Consistent quality"],
    image: cosmeticPackaging,
  },
  {
    icon: Tag,
    title: "Label & Sticker Printing",
    description: "Custom labels and stickers for products, packaging, and promotions. Available in various materials, finishes, and sizes.",
    features: ["Die-cut shapes", "Multiple finishes", "Durable materials", "Variable data printing"],
    image: ecoPackaging,
  },
  {
    icon: Layers,
    title: "Food Packaging",
    description: "Safe, attractive packaging solutions for the food industry. From boxes to bags, we ensure your products stay fresh and look great.",
    features: ["Food-safe materials", "Custom printing", "Moisture resistant", "Easy assembly"],
    image: burgerBox,
  },
  {
    icon: Shirt,
    title: "Promotional Products",
    description: "Custom printed merchandise including t-shirts, bags, mugs, and more. Perfect for events, giveaways, and brand promotion.",
    features: ["Custom apparel", "Corporate gifts", "Event merchandise", "Bulk ordering"],
    image: tshirtMockup,
  },
];

const process = [
  {
    step: "01",
    title: "Consultation",
    description: "We start by understanding your brand, goals, and requirements through detailed discussions.",
  },
  {
    step: "02",
    title: "Design",
    description: "Our creative team develops custom designs that align with your brand identity and vision.",
  },
  {
    step: "03",
    title: "Prototype",
    description: "We create physical samples for your approval before moving to full production.",
  },
  {
    step: "04",
    title: "Production",
    description: "Using state-of-the-art equipment, we produce your order with precision and care.",
  },
  {
    step: "05",
    title: "Delivery",
    description: "Your finished products are carefully packaged and delivered on schedule.",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 hero-gradient">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">Our Services</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Complete{" "}
              <span className="text-gradient-teal">Print & Packaging</span>
              {" "}Solutions
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">
              From concept to completion, we offer end-to-end services that cover all your printing
              and packaging needs with exceptional quality and attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`order-2 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                  </div>
                </div>

                <div className={`order-1 space-y-6 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="w-16 h-16 rounded-xl gradient-teal flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">{service.title}</h2>
                  <p className="text-foreground/80 leading-relaxed">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-foreground/75">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground group">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-card">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              How We Work
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full gradient-teal flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-secondary-foreground">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground/75">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Contact us today for a free consultation and quote.
            </p>
            <Button size="lg" variant="secondary" className="glow-teal group">
              Request a Quote
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
