import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassForm } from './CreateNewPassForm'

import { ReduxStoreProviderDecorator } from '@/app/providers/StoreProvider'

const meta: Meta<typeof CreateNewPassForm> = {
  title: 'Components/CreateNewPassword',
  component: CreateNewPassForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof CreateNewPassForm>

export const Default: Story = {
  args: {
    password: '',
    passwordConfirmation: '',
  },
}
