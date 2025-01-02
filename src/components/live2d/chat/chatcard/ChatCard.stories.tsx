import type { Meta, StoryObj } from "@storybook/react";

import { ChatCard } from "./ChatCard";

const meta = {
  title: "assistant/ChatCard",
  component: ChatCard,
} satisfies Meta<typeof ChatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: {
      content: "Hello, how can I help you?",
      id: "1",
      type: "agent",
    },
  },
  render: ({ message }) => (
    <>
      <ChatCard message={message} />
      <ChatCard message={{ ...message, type: "user" }} />
    </>
  ),
};
