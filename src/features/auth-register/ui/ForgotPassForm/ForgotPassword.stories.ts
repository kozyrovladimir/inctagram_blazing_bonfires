import { Meta, StoryObj } from '@storybook/react'

import { ReduxStoreProviderDecorator } from './../SignInForm/decorators/ReduxStoreProviderDecorator'
import ForgotPass from './ForgotPassForm'

const meta: Meta<typeof ForgotPass> = {
  title: 'Components/ForgotPassword',
  component: ForgotPass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof ForgotPass>

export const Default: Story = {
  args: {
    email: 'Enter email',
    password: 'Enter password',
    passwordConfirmation: 'Enter password confirmation',
    agreement: false,
  },
}
