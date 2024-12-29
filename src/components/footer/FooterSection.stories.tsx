import type { Meta, StoryObj } from "@storybook/react";
import Script from "next/script";
import Background from "../BgWrapper";
import FooterSection from "./FooterSection";

const meta: Meta<typeof FooterSection> = {
  title: "Landing/FooterSection",
  component: FooterSection,
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
  render: () => (
    <Background>
      <FooterSection />
    </Background>
  ),
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof FooterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
