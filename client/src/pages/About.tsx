import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Check, Target, Users, Zap } from "lucide-react";
import heroPackaging from "@/assets/hero-packaging.jpg";

const values = [
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We never compromise on quality. Every product that leaves our facility meets the highest standards.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. We work closely with you to bring your vision to life.",
  },
  {
    icon: Target,
    title: "Innovation Driven",
    description: "We stay ahead with cutting-edge technology and creative solutions for modern packaging needs.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "We understand time is money. Our efficient processes ensure timely delivery every time.",
  },
];

const stats = [
  { number: "15+", label: "Years Experience" },
  { number: "500+", label: "Happy Clients" },
  { number: "1000+", label: "Projects Completed" },
  { number: "50+", label: "Team Members" },
];

const milestones = [
  { year: "2008", title: "Company Founded", description: "Started as a small printing shop with big dreams." },
  { year: "2012", title: "Expanded Operations", description: "Moved to a larger facility and added packaging services." },
  { year: "2016", title: "ISO Certification", description: "Achieved ISO 9001:2015 certification for quality management." },
  { year: "2020", title: "Digital Transformation", description: "Invested in state-of-the-art digital printing technology." },
  { year: "2024", title: "Sustainability Focus", description: "Launched eco-friendly packaging line with recycled materials." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 hero-gradient">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Crafting Excellence in{" "}
              <span className="text-gradient-teal">Print & Packaging</span>
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">
              For over 15 years, MSP PrintPack has been at the forefront of the printing and packaging industry,
              delivering innovative solutions that help brands make lasting impressions.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={heroPackaging}
                alt="Our Story"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 glass rounded-xl p-6">
                <div className="text-4xl font-bold text-secondary">15+</div>
                <div className="text-sm text-foreground/75">Years of Excellence</div>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-secondary text-sm font-medium uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                From Humble Beginnings to Industry Leaders
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                MSP PrintPack was founded with a simple mission: to provide exceptional printing and packaging
                solutions that help businesses stand out. What started as a small operation has grown into a
                full-service printing and packaging company serving clients across the globe.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Our journey has been defined by our commitment to quality, innovation, and customer satisfaction.
                We've invested in the latest technology, assembled a team of skilled professionals, and developed
                sustainable practices that benefit both our clients and the environment.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {["ISO Certified", "Eco-Friendly", "24/7 Support"].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10">
                    <Check className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Drives Us Forward
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-6 rounded-xl bg-card hover:bg-muted/50 transition-colors card-hover">
                <div className="w-14 h-14 rounded-xl gradient-teal flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-card">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Key Milestones
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full gradient-teal flex items-center justify-center text-sm font-bold text-secondary-foreground">
                    {milestone.year.slice(2)}
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="flex-1 w-0.5 bg-border mt-4" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="text-sm text-secondary mb-1">{milestone.year}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
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
              Ready to Work With Us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how we can help bring your packaging vision to life.
            </p>
            <Button size="lg" variant="secondary" className="glow-teal group">
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
