import { Skill, SkillCard } from "./card/SkillsCard";
import { ParallaxWrapper } from "../providers/ParalaxWrapper";

interface SkillsSectionProps {
  skills: Skill[];
  className?: string;
}

const SkillsSection = ({ skills, className }: SkillsSectionProps) => (
  <section
    id="skills"
    className={`relative overflow-hidden py-20 ${className}`}
  >
    <div className="container mx-auto px-6">
      <ParallaxWrapper speed={10}>
        <h2 className="mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-4xl font-bold text-transparent">
          Skills & Expertise
        </h2>
      </ParallaxWrapper>
      <ParallaxWrapper speed={5}>
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
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
