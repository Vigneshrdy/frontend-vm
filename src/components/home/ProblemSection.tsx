import { AlertTriangle, Search, DollarSign, Lock } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: Search,
      title: "Vast & Fragmented",
      description: "Indian law spans constitutions, statutes, judgments, circulars, and amendments across multiple jurisdictions.",
    },
    {
      icon: Lock,
      title: "Dense Legal Language",
      description: "Complex terminology makes legal documents inaccessible to non-experts and ordinary citizens.",
    },
    {
      icon: AlertTriangle,
      title: "Hard to Search",
      description: "Finding contextually relevant information across timelines and precedents requires specialized expertise.",
    },
    {
      icon: DollarSign,
      title: "Expensive to Interpret",
      description: "Professional legal consultation remains costly and out of reach for most Indians.",
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
            The Challenge
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-primary mb-6">
            Why Legal Access Matters
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            India has one of the world's most complex legal ecosystems, yet access to reliable legal understanding remains limited, expensive, and intimidating.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-lg border border-border shadow-page hover:shadow-book transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Existing AI Tools Problem */}
        <div className="mt-16 p-8 bg-card rounded-lg border border-border shadow-book">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                Why Existing AI Tools Fall Short
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Most AI tools are trained on Western datasets, poorly aligned with Indian legal structure, operate as black-box systems prone to hallucination, and lack the transparency required for sensitive legal matters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ornamental bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default ProblemSection;
