"use client";
import { Parallax } from "react-scroll-parallax";
import { Skill, SkillCard } from "./card/SkillsCard";

interface SkillsSectionProps {
  skills: Skill[];
  className?: string;
}
export const SkillsSection = ({ skills, className }: SkillsSectionProps) => (
  <section className={`py-20 relative overflow-hidden ${className}`}>
    <div className="container mx-auto px-6">
      <Parallax speed={10}>
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Skills & Expertise
        </h2>
      </Parallax>
      <Parallax speed={5}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillSet, index) => (
            <SkillCard
              key={index}
              category={skillSet.category}
              items={skillSet.items}
            />
          ))}
        </div>
      </Parallax>
    </div>
  </section>
);
