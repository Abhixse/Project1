import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Filter } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

// MSP Print Pack images
import realBoxMockup from "@/assets/Real-Box-Mockup-Free-Mockup.jpg";
import brochureFlyer from "@/assets/Broucher-7-Flyer-scaled.jpg";
import stationeryScaled from "@/assets/Stationary-scaled.jpg";
import tshirtMockupScaled from "@/assets/Tshirt-Mockup-scaled.jpg";
import creativeLiterature from "@/assets/Other-Creative-Litrature.jpeg";
import juiceBoxMockup from "@/assets/Free-Paper-Juice-Box-Mockup-e1719080027893.jpg";
import foodBoxMockup from "@/assets/paper_food_box_mockup_02.png";
import packagingEquipment from "@/assets/packaging-industry-equipment.jpg";

const categories = ["All", "Packaging", "Print", "Corporate", "Promotional", "Literature"];

const products = [
  {
    id: 1,
    title: "Mono Carton Box",
    image: realBoxMockup,
    category: "Packaging",
    description: "Premium mono carton box packaging for pharmaceuticals and FMCG products with precise die-cutting.",
  },
  {
    id: 2,
    title: "Brochures & Flyers",
    image: brochureFlyer,
    category: "Print",
    description: "Professional multi-fold brochures and flyers with premium paper stock and vibrant printing.",
  },
  {
    id: 3,
    title: "Corporate Stationery",
    image: stationeryScaled,
    category: "Corporate",
    description: "Complete corporate identity packages including business cards, letterheads, and envelopes.",
  },
  {
    id: 4,
    title: "Promotional T-Shirts",
    image: tshirtMockupScaled,
    category: "Promotional",
    description: "Custom printed promotional apparel and merchandise for marketing campaigns.",
  },
  {
    id: 5,
    title: "Creative Literature",
    image: creativeLiterature,
    category: "Literature",
    description: "Annual reports, coffee table books, and corporate publications with special finishes.",
  },
  {
    id: 6,
    title: "Juice Box Packaging",
    image: juiceBoxMockup,
    category: "Packaging",
    description: "Food-grade beverage packaging with attractive designs for maximum shelf appeal.",
  },
  {
    id: 7,
    title: "Food Box Packaging",
    image: foodBoxMockup,
    category: "Packaging",
    description: "Custom food-safe packaging solutions for restaurants and food businesses.",
  },
  {
    id: 8,
    title: "Our Facility",
    image: packagingEquipment,
    category: "Corporate",
    description: "State-of-the-art printing and packaging facility with modern equipment.",
  },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof products[0] | null>(null);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 hero-gradient">
        <div className="section-container">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-secondary text-sm font-medium uppercase tracking-wider">
                Our Portfolio
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
                Product <span className="text-gradient-teal">Gallery</span>
              </h1>
              <p className="text-lg text-foreground/80">
                Explore our collection of premium packaging solutions. Each project represents our 
                commitment to quality, innovation, and exceptional craftsmanship.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-card sticky top-[88px] md:top-[104px] z-40 border-b border-border">
        <div className="section-container">
          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <Filter className="w-4 h-4 text-foreground/60 shrink-0" />
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 ${
                      selectedCategory === category ? "glow-teal" : ""
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="section-container">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <StaggerItem key={product.id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-xl bg-card cursor-pointer card-hover"
                    onClick={() => setSelectedImage(product)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-xs text-secondary uppercase tracking-wider mb-1">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground">
                        {product.title}
                      </h3>
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 backdrop-blur-sm flex items-center justify-center">
                          <ZoomIn className="w-5 h-5 text-secondary" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </AnimatePresence>
          </StaggerContainer>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-sm text-secondary uppercase tracking-wider">
                    {selectedImage.category}
                  </span>
                  <h2 className="text-2xl font-bold text-foreground mt-2 mb-4">
                    {selectedImage.title}
                  </h2>
                  <p className="text-foreground/80 mb-6">
                    {selectedImage.description}
                  </p>
                  <Button variant="secondary" className="w-fit glow-teal">
                    Request Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
