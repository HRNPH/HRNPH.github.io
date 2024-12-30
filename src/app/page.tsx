import ExperienceSection from "@/components/experience/ExperienceSection";
import FooterSection from "@/components/footer/FooterSection";
import HeroSection from "@/components/hero/HeroSection";
import ProjectSection from "@/components/projects/ProjectSection";
import SkillsSection from "@/components/skills/SkillSection";
// import WaifuDisplayer from "@/components/live2d/WaifuDisplayer";

export default function Home() {
  return (
    <div className="h-full min-h-screen w-screen">
      <HeroSection className="pt-16 sm:pt-2" />
      <ExperienceSection
        experience={[
          {
            company: "CEDT Solution Club",
            description:
              "Founded and led the CEDT Solution Club, generating 150,000 THB by creating software solutions for the department. Focused on preparing students for internships by simulating real-world software development practices.",
            period: "2024 - Present",
            title: "Club President",
          },
          {
            company: "Mr Rehab",
            description:
              "Leading the development of an AI-powered tele-rehabilitation platform, managing system architecture, cloud infrastructure, and CI/CD pipelines while ensuring secure access and scalability in consideration of the data residency requirements compliant.",
            period: "2024 - Present",
            title: "Head of Developer",
          },
          {
            company: "Cariva Thailand",
            description:
              "Developed and maintained AI service endpoints for products such as PreceptorAI LineOA, supporting over 13,000 users. for Cariva Thailand, a leading AI healthcare startup company. under AI And Robotics Ventures Co.,Ltd. (ARV)",
            period: "2023 - Present",
            title: "AI Software Engineer",
          },
          {
            company: "SolveServe Group.Co.,Ltd",
            description:
              "Co-founded a legally registered software company with focus on software development and tech-bussiness expansion (tech ed, etc...), secured over a million THB contracts within six months, controlling software solutions development using Agile-Waterfall hybrid SDLC.",
            period: "2023 - Present",
            title: "Co-Founder",
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
      <ProjectSection
        projects={[
          {
            title: "AI Waifu",
            description:
              "An Open-Source AI Project with over 400 stars on GitHub.",
            tags: ["AI/ML", "VTubing", "Open Source"],
            image: "/images/projects/aiwaifu/01.webp",
            logo: "https://avatars.githubusercontent.com/u/51855316?s=48&v=4",
            full_description:
              "AI Waifu is an open-source framework that integrates AI with VTuber Studio, enabling customizable AI avatars. It features emotion-to-animation mapping and real-time lip sync powered by custom implementation of an almost realtime phoneme classifiers using mel-spectrogram coefficient, providing a foundation for building AI VTubers or assistants.",
            link: "https://github.com/HRNPH/AIwaifu",
          },
          {
            title: "MR-Rehab",
            description: "An AI-powered tele-rehabilitation solution.",
            tags: ["Medical AI", "Tele-rehabilitation", "Startup"],
            image: "/images/projects/mr-rehab/01.jpeg",
            logo: "https://media.licdn.com/dms/image/v2/D560BAQFrsmjuaypCoQ/company-logo_200_200/company-logo_200_200/0/1725839850592?e=1743638400&v=beta&t=dI2oxroQ1RD3deHa3elEN5q2MUuBTyMf3sLZcH2nfFI",
            full_description:
              "MR-Rehab is a tele-rehabilitation platform designed to support patients during their recovery process. I worked on developing the system’s architecture, implementing cloud infrastructure, and setting up CI/CD pipelines for deployment. The platform utilizes AI to assist in monitoring and managing patient rehabilitation remotely. To ensure secure access for our internal services, I integrated Cloudflare for domain management and user authentication. MR-Rehab aims to improve accessibility to rehabilitation services and streamline communication between patients and medical professionals.",
            link: "https://www.linkedin.com/company/mr-rehabth/posts/?feedView=all",
          },
          {
            title: "DevCommu",
            description:
              "Organizer of programming bootcamps for high school students.",
            tags: ["Education", "Bussiness"],
            image: "/images/projects/devcommu/01.jpg",
            logo: "/images/projects/devcommu/logo.png",
            full_description:
              "During my high school years, my school lacked events that connected students with an interest in technology. To address this, I created DevCommu, an initiative focused on organizing programming bootcamps for high school students. I collaborated with schools and organizations to teach topics such as Python, web development, and AI basics. Through these bootcamps, thousands of students gained hands-on experience in coding and problem-solving. I managed event logistics, prepared learning materials, and worked with volunteer mentors to create a supportive and engaging learning environment. DevCommu reflects my passion for education and building a community where students can grow their technical skills. In the bussiness aspect of DevCommu, we organized also paid bootcamps privately, organize a student tech events for companies, and provide an infrastructure for college student with top notch teachnical and teaching skills to teach high school students with an interest for private tutoring.",
            link: "https://www.devcommu.org/",
          },
          {
            title: "PythaiNLP/Khavee",
            description:
              "A one of the two main contributor to the PyThaiNLP library, introducing the first Thai Khavee (กวี) NLP toolkit.",
            tags: ["AI/ML", "NLP", "Open Source"],
            image: "/images/projects/pythainlp/01.png",
            logo: "/images/projects/pythainlp/logo.png",
            full_description:
              "PythaiNLP/Khavee is a nice addition to the PyThaiNLP ecosystem, focusing on Thai natural language processing. As one of the main contributor, I helped develop Khavee (กวี), the first opensource python Thai poetry and literature analysis toolkit. It includes tools for tokenization, rhyme detection, and more, help researchers and developers to process Thai literary works with ease.",
            link: "https://pythainlp.org/dev-docs/api/khavee.html",
          },
          {
            title: "InteliSort",
            description:
              "AI-powered issue ticket prioritization system for the Traffy Fondue platform.",
            tags: ["AI/ML", "Clustering"],
            image: "/images/projects/intelisort/01.png",
            logo: "/images/projects/intelisort/logo.png",
            full_description:
              "InteliSort is an AI-driven system designed to manage and prioritize issue tickets within the Traffy Fondue platform. The system helps city administrators efficiently address reported issues by categorizing and ranking tickets based on urgency and impact. I led the development of the AI model, focusing on creating an effective sorting mechanism to streamline resource allocation and improve response times. The project was part of HackBKK 2023, showcasing smart city innovations to enhance urban issue management.",
            link: "https://example.com/intelisort",
          },
          {
            title: "My Homelab",
            description:
              "A homelab with Proxmox cluster setup provisioned with Terraform. and Packer.",
            tags: ["Homelab", "DevOps"],
            image: "/images/projects/myhomelab/01.png",
            logo: "/images/projects/myhomelab/logo.png",
            full_description:
              "A homelab set up as a Proxmox cluster, provisioned using Terraform and Packer for creating cloud-init template. It is used for learning various technologies and hosting personal projects, including this website. The setup includes a local Kubernetes cluster for experimenting with GitOps workflows, ArgoCD, and remote development servers powered by my two 4070 TI GPUs. The servers run privately on a home network, accessible only via VPN through Tailscale. Public access is managed using Cloudflare Tunnel, while internal services for personal and business use are secured with Cloudflare Access.",
            link: "https://github.com/HRNPH/HomePacker",
          },
          // {
          //   title: "PreceptorAI",
          //   description: "A medical chatbot assisting over 12,000 users.",
          //   tags: ["AI/ML", "Healthcare", "Chatbot"],
          //   image: "/images/projects/preceptorai/01.png",
          //   logo: "/images/projects/preceptorai/logo.png",
          //   full_description:
          //     "PreceptorAI is a medical chatbot powered by LLM and RAG technology to assist medical professionals and students in answering questions and accessing resources. It serves over 12,000 users with accurate, AI-driven support.",
          //   link: "https://example.com/preceptorai",
          // },
          // TODO: Add more projects
          // {
          //   title: "The Ritz AI",
          //   description:
          //     "An AI-powered personal assistant for clinic services.",
          //   tags: ["AI/ML", "Healthcare", "Customer Support"],
          //   image: "/images/projects/theritz/01.png",
          //   logo: "/images/projects/theritz/logo.png",
          //   full_description:
          //     "The Ritz AI is a personal assistant for SpaceX Clinic of Mhor Ritz, featuring RAG (Retrieval-Augmented Generation) to recommend clinic products, assist with upselling, and answer user questions about the clinic’s services.",
          //   link: "https://example.com/the-ritz-ai",
          // },
        ]}
      />
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
      <FooterSection />
    </div>
  );
}
