import { Layout } from "@/components/layout";
import { Quote, Star } from "lucide-react";
import brochureFlyer from "@/assets/Broucher-7-Flyer-scaled.jpg";
import stationeryScaled from "@/assets/Stationary-scaled.jpg";
import creativeLiterature from "@/assets/Other-Creative-Litrature.jpeg";
import tshirtMockupScaled from "@/assets/Tshirt-Mockup-scaled.jpg";

// Client logos
import client1 from "@/assets/clients/1.png";
import client7 from "@/assets/clients/7.png";
import client8 from "@/assets/clients/8.png";
import client9 from "@/assets/clients/9.png";
import client10 from "@/assets/clients/10.png";
import client12 from "@/assets/clients/12.png";
import client13 from "@/assets/clients/13.png";
import client14 from "@/assets/clients/14.png";

const clients = [
  { logo: client1 },
  { name: "PHARMA développement", industry: "Pharmaceuticals", logo: client7 },
  { name: "Client 3", industry: "Healthcare", logo: client8 },
  { name: "Client 4", industry: "Cosmetics", logo: client9 },
  { name: "Client 5", industry: "Food & Beverage", logo: client10 },
  { name: "Client 6", industry: "Consumer Goods", logo: client12 },
  { name: "Client 7", industry: "Retail", logo: client13 },
  { name: "Client 8", industry: "Manufacturing", logo: client14 },
];

const testimonials = [
  {
    quote: "MSP PrintPack transformed our product packaging completely. The attention to detail and quality is exceptional. Our sales increased by 30% after the rebrand.",
    author: "Michael Chen",
    role: "CEO, TechCorp",
    rating: 5,
  },
  {
    quote: "Working with MSP has been a pleasure. They understand our brand and consistently deliver packaging that exceeds our expectations. Highly recommended!",
    author: "Sarah Johnson",
    role: "Marketing Director, BeautyPlus",
    rating: 5,
  },
  {
    quote: "Their eco-friendly packaging solutions helped us reduce our environmental footprint without compromising on quality. A true partner for sustainable business.",
    author: "David Green",
    role: "Founder, EcoLife",
    rating: 5,
  },
  {
    quote: "Fast turnaround, competitive pricing, and outstanding quality. MSP PrintPack is our go-to partner for all printing and packaging needs.",
    author: "Emily Watson",
    role: "Operations Manager, FashionHub",
    rating: 5,
  },
];

const caseStudies = [
  {
    title: "Corporate Brochures",
    category: "Print Services",
    description: "Professional brochure and flyer printing services for pharmaceutical companies with premium finishes.",
    image: brochureFlyer,
  },
  {
    title: "Corporate Stationery",
    category: "Brand Identity",
    description: "Complete corporate stationery suite including business cards, letterheads, and presentation folders.",
    image: stationeryScaled,
  },
  {
    title: "Creative Literature",
    category: "Publications",
    description: "Annual reports, coffee table books, and corporate publications with exceptional finishing.",
    image: creativeLiterature,
  },
  {
    title: "Promotional Materials",
    category: "Marketing",
    description: "Custom printed promotional materials for brand visibility and marketing campaigns.",
    image: tshirtMockupScaled,
  },
];

const Clients = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 hero-gradient">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">Our Clients</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Trusted by{" "}
              <span className="text-gradient-teal">Leading Brands</span>
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">
              We're proud to work with businesses of all sizes, from startups to enterprise companies,
              helping them create impactful packaging solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Our Partners</h2>
            <p className="text-foreground/75 mt-2">Companies that trust us with their packaging needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clients.map((client) => (
              <div
                key={client.name}
                className="p-6 rounded-xl bg-card hover:bg-muted transition-colors text-center card-hover"
              >
                <div className="w-24 h-24 mx-auto rounded-2xl bg-background border border-border flex items-center justify-center mb-4 overflow-hidden">
                  <img src={client.logo} alt={client.name} className="w-full h-full object-contain p-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-card">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">Case Studies</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Featured Projects
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <div key={study.title} className="group rounded-2xl overflow-hidden bg-background card-hover">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-secondary">{study.category}</span>
                  <h3 className="text-xl font-semibold text-foreground mt-2 mb-3">{study.title}</h3>
                  <p className="text-foreground/80">{study.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 rounded-2xl bg-card relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-secondary/20" />
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-current" />
                  ))}
                </div>

                <p className="text-foreground/80 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-teal flex items-center justify-center">
                    <span className="text-lg font-bold text-secondary-foreground">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-foreground/75">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">98%</div>
              <div className="text-foreground/75">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">500+</div>
              <div className="text-foreground/75">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">1000+</div>
              <div className="text-foreground/75">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">50+</div>
              <div className="text-foreground/75">Industries Served</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Clients;
