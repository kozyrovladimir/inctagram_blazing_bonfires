import { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/view/ui/Select/Select'

const meta = {
  argTypes: {
    title: { control: { type: 'text' } },
  },
  component: Select,
  tags: ['autodocs'],
  title: 'UI/SelectMenu',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectMenu: Story = {
  args: {
    options: ['hello', 'goodbye', 'how are you?'],
    title: 'Select-box',
    itemsPerPage: 10,
  },
}
