import HeroSection from "@/components/hero/HeroSection";
import { SkillsSection } from "@/components/skills/SkillSection";
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
    </div>
  );
}
