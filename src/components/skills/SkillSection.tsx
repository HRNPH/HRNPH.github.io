import { Skill, SkillCard } from "./card/SkillsCard";
import { ParallaxWrapper } from "../providers/ParalaxWrapper";

interface SkillsSectionProps {
  skills: Skill[];
  className?: string;
}
const SkillsSection = ({ skills, className }: SkillsSectionProps) => (
  <section className={`py-20 relative overflow-hidden ${className}`}>
    <div className="container mx-auto px-6">
      <ParallaxWrapper speed={10}>
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Skills & Expertise
        </h2>
      </ParallaxWrapper>
      <ParallaxWrapper speed={5}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillSet, index) => (
            <SkillCard
              key={index}
              category={skillSet.category}
              items={skillSet.items}
            />
          ))}
        </div>
      </ParallaxWrapper>
    </div>
  </section>
);

export default SkillsSection;
