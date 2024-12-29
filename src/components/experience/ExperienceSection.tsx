import { ParallaxWrapper } from "../providers/ParalaxWrapper";

export type Experience = {
  period: string;
  title: string;
  company: string;
  description: string;
};

const ExperienceSection = ({ experience }: { experience: Experience[] }) => (
  <section id="experience" className="py-20 relative">
    <div className="container mx-auto px-6">
      <ParallaxWrapper speed={10}>
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Work Experience
        </h2>
      </ParallaxWrapper>
      <div className="space-y-8">
        {experience.map((exp, index) => (
          <ParallaxWrapper key={index} speed={5}>
            <div className="flex flex-col md:flex-row items-start gap-4 group">
              <div className="w-full md:w-1/4 text-right">
                <div className="font-semibold text-blue-400">{exp.period}</div>
              </div>
              <div className="w-full md:w-3/4 border-l-2 border-blue-500/50 group-hover:border-blue-400 pl-6 pb-8 transition-colors">
                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                <p className="text-blue-300 mb-2">{exp.company}</p>
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
