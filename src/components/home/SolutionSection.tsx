import { CheckCircle, Target, Eye, Compass, Heart } from "lucide-react";

const SolutionSection = () => {
  const principles = [
    {
      icon: Target,
      title: "Accuracy over Answers",
      description: "We prioritize correct information over fast responses. Every output is grounded in verifiable legal sources.",
    },
    {
      icon: Eye,
      title: "Explainability over Speed",
      description: "Understand the reasoning behind every answer with step-by-step legal analysis and citations.",
    },
    {
      icon: Compass,
      title: "Context over Generalization",
      description: "Built specifically for Indian law — not generic global legal guesses.",
    },
    {
      icon: Heart,
      title: "Ethics over Shortcuts",
      description: "Clear disclaimers, honest limitations, and human-in-the-loop philosophy.",
    },
  ];

  return (
    <section className="py-24 relative parchment-texture">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            Our Approach
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-primary mb-6">
            Domain-Specific Legal AI
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Nyaya AI is trained and engineered specifically for the Indian legal system. We don't replace lawyers — we augment legal understanding and democratize access.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 bg-card/50 rounded-lg border border-border hover:border-gold/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                <principle.icon className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ornamental Divider */}
        <div className="ornament-divider my-16">
          <div className="w-2 h-2 rotate-45 bg-gold/60" />
        </div>

        {/* Key Differentiator */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <CheckCircle className="w-5 h-5 text-gold" />
            <span className="font-serif text-lg font-semibold text-primary">Built for India</span>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nyaya AI is built using Indian legal sources — the Constitution, Central and State statutes, Supreme Court and High Court judgments, and government notifications. This ensures responses are <span className="text-foreground font-medium">contextually Indian</span>, not generic global legal guesses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
