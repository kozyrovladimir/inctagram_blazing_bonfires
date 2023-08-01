import type { Meta, StoryObj } from '@storybook/react'

import { ModalWindow } from './ModalWindow'

const meta: Meta<typeof ModalWindow> = {
  component: ModalWindow,
}

export default meta
type Story = StoryObj<typeof ModalWindow>

export const MW1Button: Story = {
  render: () => (
    <ModalWindow title={'Storybook'} callBackCloseWindow={() => ''} mainButton={'Ok'}>
      Some Text <br />
      testing the modal window
    </ModalWindow>
  ),
}
export const MW2Button: Story = {
  render: () => (
    <ModalWindow
      title={'Storybook'}
      callBackCloseWindow={() => ''}
      mainButton={'No'}
      extraButton={'Yes'}
    >
      Some Text <br />
      testing the modal window
    </ModalWindow>
  ),
}
