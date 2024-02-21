import React, { ReactNode } from 'react'

import { Dialog } from '@headlessui/react'

import styles from './NewPostModal.module.scss'

interface NewPostModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  title: string
  left?: ReactNode
  right?: ReactNode
  children: any
}

const NewPostModal: React.FC<NewPostModalProps> = props => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      className={styles.modalWrapper}
    >
      <Dialog.Panel className={styles.modal}>
        {/*header*/}
        <div className={styles.modalHeader}>
          {props.left}
          <Dialog.Title className={styles.modalTitle}>{props.title}</Dialog.Title>
          {props.right}
        </div>
        {/*content*/}
        <div className={styles.modalContent}>{props.children}</div>
      </Dialog.Panel>
    </Dialog>
  )
}

export default NewPostModal
