import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import jinalImg from "@/assets/team/jinal-2.png";
import nidhiImg from "@/assets/team/nidhi-2.png";
import shoaibImg from "@/assets/team/shoaib-2.png";

interface TeamMember {
  name: string;
  firstName: string;
  role: string;
  description: string;
  image: string | null;
}

const teamMembers: TeamMember[] = [
  {
    name: "Shoaib",
    firstName: "SHOAIB",
    role: "LEADING WITH VISION",
    description:
      "As Team Lead and Backend Developer, Shoaib drives the Nyaya AI project with expertise in architecture, model finetuning, and RAG implementation. His passion lies in making legal knowledge accessible to everyone through intelligent AI systems.",
    image: shoaibImg,
  },
  {
    name: "Vignesh Reddy",
    firstName: "VIGNESH",
    role: "DEPLOYMENT EXCELLENCE",
    description:
      "Specializing in deployment pipelines, backend development, and AI model optimization. Vignesh ensures seamless integration of finetuned models and RAG systems for production-ready performance.",
    image: null,
  },
  {
    name: "Jinal Thakkar",
    firstName: "JINAL",
    role: "CREATIVE DESIGN",
    description:
      "Crafting beautiful user experiences through thoughtful graphic design and modern frontend development. Jinal brings creative vision to life with pixel-perfect implementation and artistic flair.",
    image: jinalImg,
  },
  {
    name: "Nidhi Shah",
    firstName: "NIDHI",
    role: "VISUAL INNOVATION",
    description:
      "Combining artistic design sensibility with technical frontend expertise. Nidhi creates engaging visual interfaces that make complex legal information intuitive and accessible to all users.",
    image: nidhiImg,
  },
];

const TeamMemberSection = ({ member }: { member: TeamMember }) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Desktop Layout - Single photo left, description right */}
      <div className="hidden md:flex relative h-screen flex-col">
        {/* Large Name Title at Top */}
        <div className="pt-20 lg:pt-24 px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[14vw] lg:text-[12vw] font-serif font-bold tracking-tighter leading-none"
          >
            <span className="text-foreground">KNOW </span>
            <span className="text-primary">{member.firstName}</span>
          </motion.h1>
        </div>

        {/* Content Container - Photo left, Description right */}
        <div className="relative flex-1 flex items-stretch -mt-16 lg:-mt-24">
          {/* Left Side - Single Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-1/2 flex items-end justify-center pl-8 lg:pl-16"
          >
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-auto h-full object-contain max-h-[75vh]"
              />
            ) : (
              <div className="w-64 h-[60vh] bg-muted flex items-center justify-center rounded-t-2xl">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-6xl font-serif font-bold text-primary">
                      {member.firstName.charAt(0)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">Photo coming soon</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Side - Description (bigger text) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-1/2 flex flex-col justify-center pr-8 lg:pr-24 text-right"
          >
            <h2 className="text-xl lg:text-3xl font-serif font-bold text-foreground mb-6 tracking-wide uppercase">
              {member.role}
            </h2>
            <p className="text-base lg:text-xl text-muted-foreground leading-relaxed">
              {member.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout - Name → Photo → Description (top to bottom, no gap) */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Name at Top */}
        <div className="pt-20 px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[16vw] font-serif font-bold tracking-tighter leading-none"
          >
            <span className="text-foreground">KNOW </span>
            <span className="text-primary">{member.firstName}</span>
          </motion.h1>
          <h2 className="text-xs font-serif font-bold text-foreground mt-1 tracking-wide uppercase">
            {member.role}
          </h2>
        </div>

        {/* Photo - no gap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1 flex items-center justify-center"
        >
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full max-w-[280px] h-auto object-contain"
            />
          ) : (
            <div className="w-48 h-64 bg-muted flex items-center justify-center rounded-xl">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-4xl font-serif font-bold text-primary">
                    {member.firstName.charAt(0)}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs">Photo coming soon</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Description at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="px-6 pb-8"
        >
          <p className="text-xs text-muted-foreground leading-relaxed text-center max-w-sm mx-auto">
            {member.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Team = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />

      {/* Intro Section */}
      <section className="pt-24 pb-8 px-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4 tracking-widest">
            KMIT • 2ND YEAR
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Meet The <span className="text-primary">Innovators</span>
          </h1>
        </motion.div>
      </section>

      {/* Team Members */}
      {teamMembers.map((member) => (
        <TeamMemberSection key={member.name} member={member} />
      ))}

      {/* Quote Section */}
      <section className="py-16 px-6 bg-muted/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center max-w-2xl"
        >
          <blockquote className="text-lg md:text-xl lg:text-2xl font-serif text-foreground leading-relaxed">
            "Innovation happens when{" "}
            <span className="text-primary font-semibold">passion</span> meets{" "}
            <span className="text-primary font-semibold">purpose</span>."
          </blockquote>
          <p className="mt-4 text-muted-foreground text-sm">
            — The Nyaya AI Team
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
