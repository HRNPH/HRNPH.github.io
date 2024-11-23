import type { Meta, StoryObj } from "@storybook/react";
import dynamic from "next/dynamic";
import Script from "next/script";

const WaifuLoader = dynamic(
  async () => {
    try {
      const mod = await import("@/components/live2d/WaifuLoader");
      return mod.default || mod;
    } catch (err) {
      console.error("Failed to load WaifuDisplayer:", err);
      throw err;
    }
  },
  { ssr: false, loading: () => <div>Loading...</div> }
);

const meta: Meta = {
  title: "Waifu/Loader",
  component: WaifuLoader,
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
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof WaifuLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <WaifuLoader
      id="model"
      className="border-solid border-red-500 border-8"
      resizeTo={window}
    />
  ),
};
