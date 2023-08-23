import { Meta, StoryObj } from '@storybook/react'

import ForgotPassForm from './ForgotPassForm'

import { ReduxStoreProviderDecorator } from '@/app/providers/StoreProvider'

const meta: Meta<typeof ForgotPassForm> = {
  title: 'Components/ForgotPassword',
  component: ForgotPassForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof ForgotPassForm>

export const Default: Story = {
  args: {
    email: 'Email',
    recaptcha: '',
  },
}
