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
            category: "Programming Languages",
            items: ["TypeScript", "Python", "C++"],
          },
          {
            category: "Skills",
            items: [
              "AI/ML (PyTorch, Scikit-learn)",
              "Fullstack Web Development",
              "Mobile (React Native)",
              "DevOps, CI/CD",
            ],
          },
          {
            category: "Tool Chains",
            items: [
              "PyTorch, Scikit-learn",
              "React, Next.js, Astro",
              "Express, NestJS",
              "FastAPI, LiteStar",
              "GitHub Actions, GitLab CI",
              "Dockers, k8s, ArgoCD",
              "Cloudflare",
              "Proxmox",
              "Terraform, Packer",
            ],
          },
          {
            category: "Interest",
            items: [
              "ML/DL",
              "Startup",
              "Medical Technology",
              "Cloud Computing",
              "Homelab, Home Datacenter",
              "Anime, Manga, Light Novel",
            ],
          },
          {
            category: "Languages",
            items: ["Thai (Native)", "English (Fluent)"],
          },
          {
            category: "Education",
            items: [
              "Chulalongkorn University",
              "Computer Engineering & Digital Technology (CEDT)",
            ],
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
