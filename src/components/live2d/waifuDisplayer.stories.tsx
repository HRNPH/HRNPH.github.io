import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import dynamic from "next/dynamic";
import Script from "next/script";

const WaifuDisplayer = dynamic(
  async () => {
    try {
      const mod = await import("@/components/live2d/WaifuDisplayer");
      return mod.default || mod;
    } catch (err) {
      console.error("Failed to load WaifuDisplayer:", err);
      throw err;
    }
  },
  { ssr: false, loading: () => <div>Loading...</div> }
);

const meta: Meta = {
  title: "Waifu/Displayer",
  component: WaifuDisplayer,
  parameters: {},
  decorators: [
    (Story: any) => (
      <div>
        <Script
          src="sdk/live2dcubismcore.min.js"
          strategy="afterInteractive" // load before anything else
        />
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof WaifuDisplayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
