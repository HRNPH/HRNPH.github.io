import type { Meta, StoryObj } from "@storybook/react";

import { VoiceInput } from "./VoiceInput";

const meta = {
  title: "assistant/VoiceInputArea",
  component: VoiceInput,
} satisfies Meta<typeof VoiceInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onStartRecording: () => {
      console.info("Recording started");
    },
    onStopRecording: () => {
      console.info("Recording stopped");
    },
  },
};
