import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox'

const meta: Meta = {
  title: 'Example/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultCheckbox: Story = {
  args: {
    label: 'Default checkbox',
    value: '',
  },
}

export const ErroredCheckbox: Story = {
  args: {
    label: 'Input with error',
    value: '',
    error: 'Checkbox is required',
  },
}
