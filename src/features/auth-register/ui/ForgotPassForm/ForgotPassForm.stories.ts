import { Meta, StoryObj } from '@storybook/react'

import ForgotPassForm from './ForgotPassForm'

const meta: Meta<typeof ForgotPassForm> = {
  title: 'Components/ForgotPassword',
  component: ForgotPassForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ForgotPassForm>

export const Default: Story = {
  args: {
    email: 'Email',
    recaptcha: '',
  },
}
