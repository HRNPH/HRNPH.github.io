import type { Meta, StoryObj } from "@storybook/react";
import ExperienceSection from "./ExperienceSection";
import Background from "../BgWrapper";

const meta: Meta<typeof ExperienceSection> = {
  title: "landing/ExperienceSection",
  component: ExperienceSection,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
  render: (args) => (
    <Background>
      <ExperienceSection {...args} />
    </Background>
  ),
} satisfies Meta<typeof ExperienceSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    experience: [
      {
        company: "Company A",
        description: "Description A",
        period: "2020 - 2021",
        title: "Title A",
      },
      {
        company: "Company B",
        description: "Description B",
        period: "2021 - 2022",
        title: "Title B",
      },
      {
        company: "Company C",
        description: "Description C",
        period: "2022 - 2023",
        title: "Title C",
      },
    ],
  },
};
