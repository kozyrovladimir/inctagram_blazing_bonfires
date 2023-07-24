import type { Meta, StoryObj } from '@storybook/react'

import { LanguageSelect } from './LangaugeSelect'

const meta: Meta<typeof LanguageSelect> = {
  component: LanguageSelect,
}

export default meta

type Story = StoryObj<typeof LanguageSelect>
export const Primary: Story = {
  render: () => <LanguageSelect />,
}
