import type { Meta, StoryObj } from '@storybook/react'

import { PhotoModal } from './PhotoModal'

const meta: Meta<typeof PhotoModal> = {
  component: PhotoModal,
  title: 'Example/PhotoModal',
}

export default meta
type Story = StoryObj<typeof PhotoModal>

export const PhotoModalButton: Story = {
  args: {
    closeWindow: () => '#',
  },
}
