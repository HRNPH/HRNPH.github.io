import type { Meta, StoryObj } from "@storybook/react";
import Script from "next/script";
import { SkillCard } from "./SkillsCard";
import ParallaxBackground from "../../BgWrapper";

const meta: Meta<typeof SkillCard> = {
  title: "Landing/SkillCard",
  component: SkillCard,
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
    <ParallaxBackground>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <SkillCard {...args} className="w-1/2 pt-20" />
      </div>
    </ParallaxBackground>
  ),
  tags: ["autodocs"],
  args: {
    category: "Frontend",
    items: ["React", "TypeScript", "TailwindCSS"],
  },
} satisfies Meta<typeof SkillCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
