import type { Meta, StoryObj } from '@storybook/react'

import Profile from './index'

const meta: Meta<typeof Profile> = {
  title: 'Pages/Profile',
  component: Profile,
}

export default meta
type Story = StoryObj<typeof Profile>

export const Primary: Story = {}
