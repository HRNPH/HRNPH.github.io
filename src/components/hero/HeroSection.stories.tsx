import type { Meta, StoryObj } from "@storybook/react";
import Script from "next/script";
import HeroSection from "./HeroSection";

const meta: Meta<typeof HeroSection> = {
  title: "Landing/Hero",
  component: HeroSection,
  parameters: {},
  decorators: [
    (Story) => (
      <div>
        <Script
          src="sdk/live2dcubismcore.min.js"
          strategy="afterInteractive" // load before anything else
        />
        <Story />
        {/* Self Closing BG Decorator */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900" />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
