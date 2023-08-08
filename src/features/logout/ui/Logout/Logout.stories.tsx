import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { store } from '../../../../shared/store'

import { Logout } from './Logout'

const meta: Meta<typeof Logout> = {
  title: 'Components/Logout',
  component: Logout,
}

export default meta

type Story = StoryObj<typeof Logout>
export const Primary: Story = {
  render: () => (
    <Provider store={store}>
      <Logout />
    </Provider>
  ),
}
