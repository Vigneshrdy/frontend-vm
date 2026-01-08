import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Search, BookOpen, Brain, Globe, Shield, MessageSquare, FileText, Scale, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  const mainFeatures = [
    {
      icon: Search,
      title: "Natural Language Queries",
      description: "Ask questions in plain Hindi or English. No legal jargon required — Nyaya AI interprets your intent and identifies the relevant legal domains automatically.",
      details: [
        "Intent recognition across 50+ legal domains",
        "Support for colloquial and formal language",
        "Context-aware follow-up questions",
      ],
    },
    {
      icon: BookOpen,
      title: "Indian Legal Knowledge Base",
      description: "Built on comprehensive Indian legal sources including the Constitution, Central and State statutes, landmark judgments, and government notifications.",
      details: [
        "Constitution of India (all articles & amendments)",
        "Central Acts and State legislations",
        "Supreme Court & High Court judgments",
        "Government circulars and notifications",
      ],
    },
    {
      icon: Brain,
      title: "Explainable AI",
      description: "No black boxes. Every answer comes with step-by-step reasoning, section citations, and clear disclaimers about scope and limitations.",
      details: [
        "Transparent reasoning chains",
        "Direct citations to source material",
        "Confidence indicators",
        "Limitation acknowledgments",
      ],
    },
    {
      icon: Shield,
      title: "Privacy-First Architecture",
      description: "Legal questions are sensitive. Nyaya AI is built with privacy at its core — minimal data collection, secure processing, and no resale of queries.",
      details: [
        "End-to-end encryption",
        "Minimal data retention",
        "No third-party data sharing",
        "Audit-ready logging",
      ],
    },
  ];

  const upcomingFeatures = [
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Access legal information in Hindi, Tamil, Bengali, and more regional languages.",
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description: "Upload contracts, agreements, or legal documents for plain-language summaries.",
    },
    {
      icon: Sparkles,
      title: "Case Law Research",
      description: "Deep-dive into precedents with semantic search across thousands of judgments.",
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
                Features
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-primary mb-6">
                Legal AI, Done Right
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Powerful capabilities designed specifically for the Indian legal system — accurate, explainable, and ethical.
              </p>
              <Button asChild size="lg" className="font-sans shadow-book">
                <Link to="/chat">
                  Try Nyaya AI
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="space-y-16 max-w-5xl mx-auto">
              {mainFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row gap-8 items-start ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Icon */}
                  <div className="lg:w-1/3 flex justify-center lg:justify-start">
                    <div className="w-24 h-24 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center shadow-book">
                      <feature.icon className="w-12 h-12 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-2/3">
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Features */}
        <section className="py-24 parchment-texture">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                Coming Soon
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary mb-6">
                What's Next
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {upcomingFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-lg border border-border shadow-page text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-6">
              Ready to Explore Indian Law?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Ask your first legal question and experience the difference of domain-specific legal AI.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-sans shadow-book">
              <Link to="/chat">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Asking Questions
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
