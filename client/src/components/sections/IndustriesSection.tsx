import {
  Pill,
  UtensilsCrossed,
  Factory,
  Hotel,
  Palette,
  Car,
  Landmark,
  Calendar,
  Code,
  Building2,
  Package,
  Wine,
  GraduationCap,
} from "lucide-react";

export const IndustriesSection = () => {
  const industries = [
    {
      name: "Pharmaceuticals",
      icon: Pill,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "from-blue-500/10 to-blue-500/5",
    },
    {
      name: "Foods Industries",
      icon: UtensilsCrossed,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "from-orange-500/10 to-orange-500/5",
    },
    {
      name: "Hotel & Restaurants",
      icon: Hotel,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "from-amber-500/10 to-amber-500/5",
    },
    {
      name: "Design Agencies",
      icon: Palette,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "from-pink-500/10 to-pink-500/5",
    },
    {
      name: "Automobiles",
      icon: Car,
      color: "text-red-600 dark:text-red-400",
      bgColor: "from-red-500/10 to-red-500/5",
    },
    {
      name: "Banking",
      icon: Landmark,
      color: "text-slate-600 dark:text-slate-400",
      bgColor: "from-slate-500/10 to-slate-500/5",
    },
    {
      name: "Event Organizers",
      icon: Calendar,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "from-purple-500/10 to-purple-500/5",
    },
    {
      name: "IT & Software",
      icon: Code,
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "from-cyan-500/10 to-cyan-500/5",
    },
    {
      name: "Real Estate",
      icon: Building2,
      color: "text-green-600 dark:text-green-400",
      bgColor: "from-green-500/10 to-green-500/5",
    },
    {
      name: "Industry & Manufacturers",
      icon: Factory,
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "from-gray-500/10 to-gray-500/5",
    },
    {
      name: "Clubs & Resorts",
      icon: Wine,
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "from-rose-500/10 to-rose-500/5",
    },
    {
      name: "Educational Institutes",
      icon: GraduationCap,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "from-indigo-500/10 to-indigo-500/5",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-secondary text-sm font-medium uppercase tracking-wider block mb-3">
            Our Reach
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Industries We Serve
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            We provide comprehensive packaging solutions tailored to meet the unique 
            requirements of diverse industries across the globe.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${industry.bgColor} backdrop-blur-sm border border-border/40 rounded-xl p-6 hover:border-secondary/50 transition-all duration-300 hover:shadow-md hover:bg-gradient-to-br hover:from-secondary/5 hover:to-primary/5 cursor-pointer`}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 rounded-lg bg-background/40 group-hover:bg-background/60 transition-colors duration-300">
                  <Icon className={`w-6 h-6 ${industry.color} transition-transform group-hover:scale-110 duration-300`} />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">
                  {industry.name}
                </h3>

                {/* Bottom accent */}
                <div className="mt-4 h-1 w-0 bg-secondary rounded-full group-hover:w-8 transition-all duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
              12+
            </div>
            <p className="text-sm text-foreground/60">Industries Served</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
              500+
            </div>
            <p className="text-sm text-foreground/60">Active Clients</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
              1000+
            </div>
            <p className="text-sm text-foreground/60">Custom Solutions</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
              99%
            </div>
            <p className="text-sm text-foreground/60">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};
