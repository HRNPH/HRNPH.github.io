import type { Meta, StoryObj } from "@storybook/react";
import Script from "next/script";
import Background from "../BgWrapper";
import SkillsSection from "./SkillSection";

const meta: Meta<typeof SkillsSection> = {
  title: "Landing/SkillSection",
  component: SkillsSection,
  parameters: {},
  decorators: [
    (Story) => (
      <div>
        <Script
          src="sdk/live2dcubismcore.min.js"
          strategy="afterInteractive" // load before anything else
        />
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Background>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <SkillsSection {...args} />
      </div>
    </Background>
  ),
  tags: ["autodocs"],
  args: {
    skills: [
      {
        category: "Programming Languages",
        items: ["JavaScript", "TypeScript", "Python"],
      },
      {
        category: "Frontend",
        items: ["React", "TailwindCSS", "Svelte"],
      },
      {
        category: "Backend",
        items: ["Node.js", "Express", "Django"],
      },
    ],
  },
} satisfies Meta<typeof SkillsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
