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
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {skills.map((skillSet, index) => (
            <div key={index} className="mb-6 break-inside-avoid">
              <SkillCard category={skillSet.category} items={skillSet.items} />
            </div>
          ))}
        </div>
      </ParallaxWrapper>
    </div>
  </section>
);

export default SkillsSection;
