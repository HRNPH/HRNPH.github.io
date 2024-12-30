import type { Meta, StoryObj } from "@storybook/react";
import ProjectSection from "./ProjectSection";
import Background from "../BgWrapper";

const meta: Meta<typeof ProjectSection> = {
  title: "Landing/ProjectSection",
  component: ProjectSection,
  parameters: {},
  tags: ["autodocs"],
  render: (args) => (
    <Background>
      <ProjectSection {...args} />
    </Background>
  ),
  args: {
    projects: [
      {
        title: "AI Waifu",
        description: "My Open-Source AI Project with over 400 stars on GitHub.",
        tags: ["AI/ML", "Anime"],
        image: "/images/projects/aiwaifu/01.webp",
        logo: "https://www.creativefabrica.com/wp-content/uploads/2023/09/22/anime-girl-mascot-logo-Graphics-79872002-1.jpg",
        full_description:
          "aiwaifu is an Open sourced finetunable customizable simpable AI waifu inspired by neuro-sama the goal is to just giving everyone a foundational platform to develop their own waifu Powered by opensource AI model for self-hosted/deploy",
        link: "https://github.com/HRNPH/AIwaifu",
      },
      {
        title: "Project 2",
        description: "Description 2",
        tags: ["tag1", "tag2"],
        image: "/images/projects/aiwaifu/01.webp",
        logo: "https://www.creativefabrica.com/wp-content/uploads/2023/09/22/anime-girl-mascot-logo-Graphics-79872002-1.jpg",
      },
    ],
  },
} satisfies Meta<typeof ProjectSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
