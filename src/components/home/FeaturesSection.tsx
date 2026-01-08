import { Search, BookOpen, Brain, Globe, Shield } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Legal Query Understanding",
      description: "Ask questions in plain language — Nyaya AI interprets intent, identifies relevant legal domains, and responds with structured explanations grounded in Indian law.",
      example: {
        question: "What happens if a company doesn't pay PF contributions?",
        points: [
          "Relevant acts and sections",
          "Obligations and penalties",
          "Real-world implications",
          "Citations and references",
        ],
      },
    },
    {
      icon: BookOpen,
      title: "Indian Law Knowledge Base",
      description: "Built using the Constitution of India, Central and State statutes, Supreme Court and High Court judgments, and government notifications.",
      highlights: [
        "Constitution of India",
        "Central & State Statutes",
        "SC & HC Judgments",
        "Government Circulars",
      ],
    },
    {
      icon: Brain,
      title: "Explainable AI Outputs",
      description: "Instead of a single opaque answer, Nyaya AI provides step-by-step reasoning, legal grounding, and clear disclaimers.",
      benefits: [
        "Step-by-step reasoning",
        "Section & Act citations",
        "Scope boundaries",
        "Judgment references",
      ],
    },
    {
      icon: Globe,
      title: "Multilingual & Inclusive",
      description: "India is multilingual — law shouldn't be English-only. Designed to support regional languages and simple explanations.",
      planned: true,
    },
    {
      icon: Shield,
      title: "Privacy-First Design",
      description: "Legal questions are sensitive. No unnecessary data collection, secure query handling, and no resale of queries.",
      security: [
        "Minimal data collection",
        "Secure processing",
        "No query resale",
        "Controlled inference",
      ],
    },
  ];

  return (
    <section className="py-24 bg-secondary/30 relative">
      {/* Ornamental top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-primary mb-6">
            What Nyaya AI Does
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Powerful features designed to make Indian law accessible, understandable, and actionable for everyone.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-card rounded-lg border border-border shadow-page hover:shadow-book transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Icon and Title */}
                <div className="lg:w-1/3">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      {feature.planned && (
                        <span className="inline-block text-xs font-medium uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description and Details */}
                <div className="lg:w-2/3">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Example Query */}
                  {feature.example && (
                    <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                      <p className="text-sm text-foreground mb-3 italic">
                        "{feature.example.question}"
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {feature.example.points.map((point, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium text-gold bg-gold/10 px-2 py-1 rounded"
                          >
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  {feature.highlights && (
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((item, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium text-primary bg-primary/5 px-3 py-1.5 rounded border border-primary/10"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Benefits */}
                  {feature.benefits && (
                    <div className="flex flex-wrap gap-2">
                      {feature.benefits.map((item, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium text-primary bg-primary/5 px-3 py-1.5 rounded border border-primary/10"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Security */}
                  {feature.security && (
                    <div className="flex flex-wrap gap-2">
                      {feature.security.map((item, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium text-primary bg-primary/5 px-3 py-1.5 rounded border border-primary/10"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ornamental bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default FeaturesSection;
