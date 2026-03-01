import { Leaf, Recycle, Shield, Droplets, Globe } from "lucide-react";

export const PackingMaterialsSection = () => {
  const materials = [
    {
      name: "BioDegradable",
      icon: Leaf,
      description: "Breaks down naturally without harming the environment",
      color: "from-green-500/20 to-emerald-500/20",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      name: "Recyclable",
      icon: Recycle,
      description: "Can be processed and reused multiple times",
      color: "from-blue-500/20 to-cyan-500/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Non-Toxic",
      icon: Shield,
      description: "Safe for products and the people using them",
      color: "from-purple-500/20 to-violet-500/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "Food Grade",
      icon: Droplets,
      description: "Certified safe for direct food contact",
      color: "from-orange-500/20 to-amber-500/20",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    {
      name: "100% Eco-friendly",
      icon: Globe,
      description: "Completely sustainable from production to disposal",
      color: "from-teal-500/20 to-cyan-500/20",
      textColor: "text-teal-600 dark:text-teal-400",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-secondary text-sm font-medium uppercase tracking-wider block mb-3">
            Our Specialization
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Packing Materials We Specialize In
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            We are committed to providing sustainable, safe, and high-quality packaging solutions 
            that meet the highest environmental and safety standards.
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {materials.map((material, index) => {
            const Icon = material.icon;
            return (
              <div
                key={index}
                className="group relative bg-muted/40 border border-border/40 rounded-lg p-6 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:bg-muted/60"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${material.color} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${material.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${material.textColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {material.name}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {material.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-4 pt-4 border-t border-border/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-xs font-medium text-secondary uppercase tracking-wider">
                    Learn More →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-foreground/70 mb-6">
            All our materials are sourced responsibly and manufactured to the highest quality standards.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors duration-300"
          >
            Get Started With Our Materials
          </a>
        </div>
      </div>
    </section>
  );
};
