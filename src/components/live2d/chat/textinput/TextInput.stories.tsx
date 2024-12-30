import type { Meta, StoryObj } from "@storybook/react";

import { TextInputArea } from "./TextInput";

const meta = {
  title: "assistant/TextInputArea",
  component: TextInputArea,
} satisfies Meta<typeof TextInputArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSendMessage: (message: string) => {
      console.info(message);
      alert(`Sending message: ${message}`);
    },
  },
};
