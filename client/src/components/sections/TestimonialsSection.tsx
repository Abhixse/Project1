import { Quote, Star } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const testimonials = [
  {
    quote: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.",
    author: "Jonathan Rice",
    role: "CEO, TechCorp",
    rating: 5,
  },
  {
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    author: "Sarah Mitchell",
    role: "Marketing Director",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Colorful background panels */}
      <div className="absolute inset-0 flex">
        <div className="flex-1 bg-gold-dark" />
        <div className="flex-1 bg-secondary" />
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-accent" />
        <div className="flex-1 bg-teal-dark" />
      </div>

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="flex whitespace-nowrap text-[15vw] font-bold text-foreground/5 uppercase tracking-widest">
          <span className="mx-8">SHADOWS</span>
          <span className="mx-8">ORGANIZED</span>
          <span className="mx-8">LAYERS</span>
        </div>
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Our Client Said
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <div className="glass p-8 rounded-2xl relative h-full">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-secondary/20" />
                  
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
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
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
