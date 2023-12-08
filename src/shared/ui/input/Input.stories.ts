import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

const meta: Meta = {
  title: 'Example/input',
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
    label: 'Default input',
    placeholder: 'Enter your username',
  },
}

export const ErroredInput: Story = {
  args: {
    label: 'input with error',
    error: 'Incorrect value',
  },
}

export const PasswordInput: Story = {
  args: {
    label: 'Password input',
    placeholder: 'Enter your password',
    type: 'password',
    value: '13421234',
  },
}

export const SearchInput: Story = {
  args: {
    label: 'Search input',
    type: 'text',
    placeholder: 'What are you looking for?',
  },
}
