import ExperienceSection from "@/components/experience/ExperienceSection";
import FooterSection from "@/components/footer/FooterSection";
import HeroSection from "@/components/hero/HeroSection";
import SkillsSection from "@/components/skills/SkillSection";
// import WaifuDisplayer from "@/components/live2d/WaifuDisplayer";

export default function Home() {
  return (
    <div className="w-screen min-h-screen h-full">
      <HeroSection className="pt-16 sm:pt-2" />
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
            company: "Cariva Thailand",
            description:
              "Developed and maintained AI service endpoints for products such as PreceptorAI LineOA, supporting over 13,000 users.",
            period: "2023 - Present",
            title: "AI Software Engineer",
          },
          {
            company: "SolveServe Group",
            description:
              "Co-founded a legally registered software company, secured over a million THB contracts within six months, controlling software solutions development using Agile-Waterfall hybrid SDLC.",
            period: "2023 - Present",
            title: "Co-Founder, Executive Director",
          },
          {
            company: "CEDT Solution Club",
            description:
              "Founded and led the CEDT Solution Club, generating 150,000 THB by creating software solutions for the department. Focused on preparing students for internships by simulating real-world software development practices.",
            period: "2024 - Present",
            title: "Club President",
          },
          {
            company: "Thailand Securities and Exchange Commission",
            description:
              "Developed a customized RAG System, Detail unable to disclose under NDA.",
            period: "2023 - Present",
            title: "AI Software Vendor",
          },
          {
            company: "AI Builders",
            description:
              "Mentored high school students in data science projects and AI camps, with students winning top awards at major competitions.",
            period: "January - June 2024",
            title: "Mentor",
          },
          {
            company: "DataVue",
            description:
              "Developed proof-of-concept AI marketing products and maintained databases using PostgreSQL on AWS RDS.",
            period: "April - June 2023",
            title: "Intern Data Scientist",
          },
          {
            company: "AI Builders",
            description:
              "Handled teaching and mentoring students in high school data science projects.",
            period: "January - June 2023",
            title: "Teaching Assistant",
          },
        ]}
      />
      <FooterSection />
    </div>
  );
}
