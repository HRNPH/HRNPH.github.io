import ExperienceSection from "@/components/experience/ExperienceSection";
import HeroSection from "@/components/hero/HeroSection";
import SkillsSection from "@/components/skills/SkillSection";
// import WaifuDisplayer from "@/components/live2d/WaifuDisplayer";

export default function Home() {
  return (
    <div className="w-screen min-h-screen h-full">
      <HeroSection />
      <SkillsSection
        skills={[
          {
            category: "Languages",
            items: ["TypeScript", "Python", "C++"],
          },
          {
            category: "Frameworks",
            items: ["React", "Next.js", "ExpressJs", "NestJs", "React Native"],
          },
          {
            category: "DevOps",
            items: ["Docker", "Kubernetes", "Github Actions"],
          },
        ]}
      />
      <ExperienceSection
        experience={[
          {
            company: "Company A",
            description: "Description A",
            period: "2020 - 2021",
            title: "Title A",
          },
          {
            company: "Company B",
            description: "Description B",
            period: "2021 - 2022",
            title: "Title B",
          },
          {
            company: "Company C",
            description: "Description C",
            period: "2022 - 2023",
            title: "Title C",
          },
        ]}
      />
    </div>
  );
}
