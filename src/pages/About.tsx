import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Heart, Eye, Users, Code, Database, Brain, Zap } from "lucide-react";

const About = () => {
  const ethics = [
    {
      icon: Shield,
      title: "No Hallucinated Claims",
      description: "Every legal reference is grounded in verifiable sources. We never fabricate citations.",
    },
    {
      icon: Eye,
      title: "Clear Disclaimers",
      description: "All outputs include scope boundaries and limitations. Transparency is non-negotiable.",
    },
    {
      icon: Brain,
      title: "Explainable Reasoning",
      description: "Understand the logic behind every answer with step-by-step legal analysis.",
    },
    {
      icon: Heart,
      title: "Human-in-the-Loop",
      description: "AI assists understanding — humans make decisions. We never bypass professional oversight.",
    },
  ];

  const techStack = [
    { icon: Code, label: "Python & FastAPI", desc: "Backend APIs" },
    { icon: Brain, label: "LLMs", desc: "Domain-adapted models" },
    { icon: Zap, label: "NLP Pipelines", desc: "Legal entity extraction" },
    { icon: Database, label: "Vector Databases", desc: "Semantic legal search" },
  ];

  const roadmap = [
    {
      phase: "Phase 1",
      status: "Current",
      items: [
        "Core legal Q&A (Indian statutes + Constitution)",
        "Explainable responses with citations",
        "Web platform launch",
      ],
    },
    {
      phase: "Phase 2",
      status: "Planned",
      items: [
        "Judgment summarization",
        "Multilingual support",
        "Legal education tools",
      ],
    },
    {
      phase: "Phase 3",
      status: "Future",
      items: [
        "Advanced research tools",
        "Institution & academic partnerships",
        "Offline / privacy-preserving deployments",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 parchment-texture">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                About Nyaya AI
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-primary mb-6">
                Rethinking How Law Meets Technology
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nyaya AI is not just a product — it's an attempt to build India's first foundational legal intelligence system, rooted in Indian values, data, and realities.
              </p>
            </div>
          </div>
        </section>

        {/* Ethics Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                Our Principles
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary mb-6">
                Ethics & Responsibility
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Law is a high-impact domain. We believe trust is more important than cleverness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {ethics.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-lg border border-border shadow-page hover:shadow-book transition-all"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24 parchment-texture">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                Technology
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary mb-6">
                Built for Scale & Accuracy
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {techStack.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-3 bg-card rounded-lg border border-border shadow-page"
                >
                  <item.icon className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                Roadmap
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary mb-6">
                Our Journey Ahead
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {roadmap.map((phase, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border shadow-page ${
                    phase.status === 'Current'
                      ? 'bg-primary/5 border-gold/30'
                      : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {phase.phase}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      phase.status === 'Current'
                        ? 'bg-gold/20 text-gold'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {phase.status}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-gold mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
