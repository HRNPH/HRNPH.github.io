import { ParallaxWrapper } from "../providers/ParalaxWrapper";

export type Experience = {
  period: string;
  title: string;
  company: string;
  description: string;
};

const ExperienceSection = ({ experience }: { experience: Experience[] }) => (
  <section id="experience" className="relative py-20">
    <div className="container mx-auto px-6">
      <ParallaxWrapper speed={10}>
        <h2 className="mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-4xl font-bold text-transparent">
          Work Experience
        </h2>
      </ParallaxWrapper>
      <div className="space-y-8">
        {experience.map((exp, index) => (
          <ParallaxWrapper key={index} speed={5}>
            <div className="group flex flex-col items-start gap-4 md:flex-row">
              <div className="w-full text-right md:w-1/4">
                <div className="font-semibold text-blue-400">{exp.period}</div>
              </div>
              <div className="w-full border-l-2 border-blue-500/50 pb-8 pl-6 transition-colors group-hover:border-blue-400 md:w-3/4">
                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                <p className="mb-2 text-blue-300">{exp.company}</p>
                <p className="text-gray-400">{exp.description}</p>
              </div>
            </div>
          </ParallaxWrapper>
        ))}
      </div>
    </div>
  </section>
);
export default ExperienceSection;
