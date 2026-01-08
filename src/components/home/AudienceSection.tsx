import { Users, GraduationCap, Rocket, Scale } from "lucide-react";

const AudienceSection = () => {
  const audiences = [
    {
      icon: Users,
      title: "Citizens",
      description: "Understand your rights, duties, and legal processes. Get clarity before seeking professional help.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: GraduationCap,
      title: "Students",
      description: "Learn Indian law intuitively. Prepare for exams, debates, moot courts, and case analysis.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Rocket,
      title: "Startups & MSMEs",
      description: "Understand compliance basics. Interpret regulations without expensive legal consultations.",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: Scale,
      title: "Lawyers & Researchers",
      description: "Faster legal research. Case summarization, cross-reference support, and drafting assistance.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="py-24 relative parchment-texture">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            For Everyone
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-primary mb-6">
            Who Is Nyaya AI For?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From citizens seeking to understand their rights to legal professionals needing research support — Nyaya AI serves all.
          </p>
        </div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-lg border border-border shadow-page hover:shadow-book transition-all duration-300"
            >
              <div className="flex gap-4">
                <div className={`w-14 h-14 rounded-lg ${audience.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <audience.icon className={`w-7 h-7 ${audience.color}`} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {audience.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {audience.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ornamental Divider */}
        <div className="ornament-divider my-16">
          <div className="w-2 h-2 rotate-45 bg-gold/60" />
        </div>

        {/* What Nyaya AI Is NOT */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-semibold text-primary">
              What Nyaya AI Is NOT
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              We're explicit about our boundaries
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Does not provide binding legal advice",
              "Does not replace licensed professionals",
              "Does not fabricate or guess answers",
              "Does not hide uncertainty",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-destructive/5 rounded-lg border border-destructive/10"
              >
                <span className="text-destructive text-lg font-bold">✕</span>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8 text-sm">
            Nyaya AI <span className="text-foreground font-medium">assists understanding</span>, not decision-making without human oversight.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
