import { forwardRef, ReactNode, Ref } from 'react'
import * as React from 'react'

import inputStyles from './../input/Input.module.scss'
import styles from './RoundCheckbox.module.scss'

type Props = {
  ref: Ref<HTMLInputElement>
  label: ReactNode
  disabled?: boolean
  error?: string
  id: number
  onChangeCheckbox: (value: string) => void
}

export const RoundCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ id, label, disabled, error, value, onChangeCheckbox, ...rest }: Props, ref) => {
    return (
      <>
        <div className={styles.checkboxWrapper}>
          <input
            value={id}
            type={'radio'}
            onChange={() => onChangeCheckbox(value)}
            className={styles.checkbox}
            {...rest}
            ref={ref}
          />
          <label htmlFor="#">{label}</label>
        </div>
        <p className={inputStyles.error}>{error && !value ? error : ''}</p>
      </>
    )
  }
)
