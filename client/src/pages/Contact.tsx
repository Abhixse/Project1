import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import MapComponent from "@/components/MapComponent";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (234) 567-890", "+1 (234) 567-891"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@mspprintpack.com", "sales@mspprintpack.com"],
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Print Avenue, Design City", "Business District, 12345"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to send message");
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      toast({
        title: "Send Failed",
        description: error?.message || "Unable to send message. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 hero-gradient">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-secondary text-sm font-medium uppercase tracking-wider">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Let's Start a{" "}
              <span className="text-gradient-teal">Conversation</span>
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Have a project in mind? We'd love to hear from you. Get in touch and let's create
              something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-card hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                {item.details.map((detail, index) => (
                  <p key={index} className="text-sm text-foreground/75">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-card">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <span className="text-secondary text-sm font-medium uppercase tracking-wider">Get in Touch</span>
              <h2 className="text-3xl font-bold text-foreground mt-2 mb-8">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (234) 567-890"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-background"
                  />
                </div>

                <Button type="submit" size="lg" variant="secondary" className="glow-teal group">
                  Send Message
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Map Section */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="rounded-2xl overflow-hidden bg-muted" style={{ height: "500px" }}>
                  <MapComponent />
                </div>

                <div className="mt-4 text-center">
                  <a
                    href="https://www.google.com/maps/search/MSP+Print+Pack+Ahmedabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Get Directions</span>
                  </a>
                </div>

                <div className="mt-8 p-6 rounded-xl bg-background">
                  <h4 className="font-semibold text-foreground mb-4">
                    Quick Response Guarantee
                  </h4>
                  <p className="text-foreground/75 text-sm">
                    We aim to respond to all inquiries within 24 hours during business days.
                    For urgent matters, please call us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-secondary text-sm font-medium uppercase tracking-wider">FAQ</span>
              <h2 className="text-3xl font-bold text-foreground mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "What are your minimum order quantities?",
                  answer: "Minimum order quantities vary by product type. For custom packaging, we typically start at 500 units. For printing services, minimums may be lower. Contact us for specific requirements.",
                },
                {
                  question: "How long does production take?",
                  answer: "Standard production time is 2-3 weeks for most products. Rush orders may be available for an additional fee. We'll provide a specific timeline based on your project requirements.",
                },
                {
                  question: "Do you offer design services?",
                  answer: "Yes! Our in-house design team can create custom designs from scratch or refine your existing artwork. Design services can be included in your project quote.",
                },
                {
                  question: "What file formats do you accept?",
                  answer: "We accept AI, PDF, EPS, and high-resolution TIFF files. Our team can provide templates and artwork guidelines to ensure your files are print-ready.",
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 rounded-xl bg-card">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-foreground/80">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
