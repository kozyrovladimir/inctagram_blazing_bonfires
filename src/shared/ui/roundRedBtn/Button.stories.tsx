import type { Meta, StoryObj } from '@storybook/react'

import { RoundRedBtn } from './roundRedBtn'

const meta: Meta<typeof RoundRedBtn> = {
  component: RoundRedBtn,
  title: 'Example/RoundRedBtn',
}

export default meta
type Story = StoryObj<typeof RoundRedBtn>

export const RoundRedButton: Story = {
  args: {},
}
