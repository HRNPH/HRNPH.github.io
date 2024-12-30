import type { Meta, StoryObj } from "@storybook/react";

import { ChatHistory } from "./ChatHistory";

const meta = {
  title: "assistant/ChatHistory",
  component: ChatHistory,
} satisfies Meta<typeof ChatHistory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    messages: [
      {
        id: "1",
        content: "Hello",
        isUser: true,
        timestamp: new Date(),
      },
      {
        id: "2",
        content: "Hi",
        isUser: false,
        timestamp: new Date(),
      },
    ],
  },
};
