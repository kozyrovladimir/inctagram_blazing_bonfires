import { forwardRef, ReactNode, Ref } from 'react'
import * as React from 'react'

import styles from './RoundCheckbox.module.scss'

type Props = {
  error?: string
  label: ReactNode
}

export const RoundCheckbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, checked, error, ...rest } = props

  return (
    <>
      <div className={styles.checkboxWrapper}>
        <input type={'radio'} checked={checked} className={styles.checkbox} {...rest} ref={ref} />
        <label htmlFor="#">{label}</label>
      </div>
    </>
  )
})
