import { Meta, StoryObj } from '@storybook/react'

import Sign from './Sign'

const meta: Meta<typeof Sign> = {
  title: 'Components/Sign',
  component: Sign,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sign>

export const Default: Story = {
  args: {
    email: 'Enter email',
    password: 'Enter password',
  },
}

export const Error: Story = {
  args: {
    email: 'Invalid email',
    password: 'Enter your password',
  },
}
