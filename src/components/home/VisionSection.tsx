import { Lightbulb, Shield, BookOpen, Heart } from "lucide-react";

const VisionSection = () => {
  const visionPoints = [
    {
      icon: Lightbulb,
      text: "Legal literacy is accessible, not elite",
    },
    {
      icon: Shield,
      text: "AI strengthens democratic access to law",
    },
    {
      icon: BookOpen,
      text: "Indian legal knowledge is preserved and modernized",
    },
    {
      icon: Heart,
      text: "Technology empowers justice, not shortcuts it",
    },
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            Our Vision
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-8">
            Building India's Legal Future
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-12 leading-relaxed">
            Nyaya AI envisions a future where access to legal knowledge is a right, not a privilege.
          </p>

          {/* Vision Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {visionPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-left text-primary-foreground/90">
                  {point.text}
                </span>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="p-8 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10">
            <p className="font-serif text-xl md:text-2xl italic text-primary-foreground/90 leading-relaxed">
              "We aim to build one of India's first foundational legal intelligence systems, rooted in Indian values, data, and realities."
            </p>
          </div>
        </div>
      </div>

      {/* Gold accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
    </section>
  );
};

export default VisionSection;
