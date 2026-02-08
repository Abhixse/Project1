import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

export const VezoBusinessSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div>
              <span className="text-secondary text-sm font-medium uppercase tracking-wider block mb-2">
                Our Other Business
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Explore Vezo
              </h2>
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed">
              Beyond our packaging solutions, we also operate Vezo, a dedicated platform 
              offering innovative products and services to complement your business needs.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                <p className="text-foreground/70">Enterprise-grade solutions</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                <p className="text-foreground/70">Seamless integration capabilities</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                <p className="text-foreground/70">24/7 dedicated support</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                className="group bg-secondary hover:bg-secondary/90"
                size="lg"
              >
                Visit Vezo
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 blur-3xl rounded-2xl" />
              <div className="relative bg-gradient-to-br from-secondary/10 to-primary/10 backdrop-blur-sm border border-border/40 rounded-2xl p-8 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-secondary">V</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Vezo</h3>
                      <p className="text-sm text-foreground/60">Your Complete Solution</p>
                    </div>
                  </div>
                  
                  <div className="h-48 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-lg flex items-center justify-center border border-border/40">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-secondary/30 mb-2">Vezo</div>
                      <p className="text-sm text-foreground/40">Explore innovative solutions</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 rounded-lg p-3 border border-border/40">
                      <p className="text-xs text-foreground/60 uppercase tracking-wider font-medium">Features</p>
                      <p className="text-sm font-semibold text-foreground mt-1">Premium</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 border border-border/40">
                      <p className="text-xs text-foreground/60 uppercase tracking-wider font-medium">Support</p>
                      <p className="text-sm font-semibold text-foreground mt-1">24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
