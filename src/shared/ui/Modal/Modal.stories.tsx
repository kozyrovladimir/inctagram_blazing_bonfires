import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Example/Modal',
}

export default meta
type Story = StoryObj<typeof Modal>

export const MW1Button: Story = {
  render: () => (
    <Modal title={'Storybook'} callBackCloseWindow={() => ''} mainButton={'Ok'}>
      Some Text <br />
      testing the modal window
    </Modal>
  ),
}
export const MW2Button: Story = {
  render: () => (
    <Modal title={'Storybook'} callBackCloseWindow={() => ''} mainButton={'No'} extraButton={'Yes'}>
      Some Text <br />
      testing the modal window
    </Modal>
  ),
}
