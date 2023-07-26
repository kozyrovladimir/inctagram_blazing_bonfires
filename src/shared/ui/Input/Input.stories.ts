import type { Meta, StoryObj } from '@storybook/react'

import Input from './Input'

const meta: Meta = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultInput: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter your username',
  },
}

export const ErroredInput: Story = {
  args: {
    label: 'Input with error',
    error: 'Incorrect value',
  },
}

export const PasswordInput: Story = {
  args: {
    label: 'Password Input',
    placeholder: 'Enter your password',
    password: true,
    value: '13421234',
  },
}

export const SearchInput: Story = {
  args: {
    label: 'Search Input',
    placeholder: 'What are you looking for?',
    search: true,
  },
}
