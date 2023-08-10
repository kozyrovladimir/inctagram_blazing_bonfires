import type { Meta, StoryObj } from '@storybook/react'

import { PhotoMW } from './PhotoMW'

const meta: Meta<typeof PhotoMW> = {
  component: PhotoMW,
  title: 'Example/PhotoMW',
}

export default meta
type Story = StoryObj<typeof PhotoMW>

export const MW1Button: Story = {
  render: () => <PhotoMW closeWindow={() => '#'} />,
}
