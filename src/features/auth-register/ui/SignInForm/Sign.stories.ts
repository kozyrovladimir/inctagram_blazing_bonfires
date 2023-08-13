import { Meta, StoryObj } from '@storybook/react'

import { Sign } from './Sign'

import { ReduxStoreProviderDecorator } from '@/app/providers/StoreProvider'

const meta: Meta<typeof Sign> = {
  title: 'Components/Sign',
  component: Sign,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof Sign>

export const Default: Story = {
  args: {
    email: 'Enter email',
    password: 'Enter password',
  },
}
