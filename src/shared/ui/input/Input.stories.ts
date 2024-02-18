import type { Meta, StoryObj } from '@storybook/react'

import { Input, InputType } from '@/shared/ui/input/Input'

const meta = {
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['text', 'password', 'search'],
    },
  },
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
    label: 'Input',
    placeholder: 'Input',
    type: InputType.TEXT,
  },
}

export const Password: Story = {
  args: {
    disabled: false,
    label: 'Input',
    placeholder: 'Input',
    type: InputType.PASSWORD,
  },
}
export const Search: Story = {
  args: {
    disabled: false,
    placeholder: 'Input search',
    type: InputType.SEARCH,
  },
}
export const Error: Story = {
  args: {
    disabled: false,
    error: 'Error',
    placeholder: 'Error',
  },
}