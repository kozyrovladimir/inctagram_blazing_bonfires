import { FC, forwardRef, ReactNode, Ref } from 'react'

import inputStyles from './../Input/Input.module.scss'
import styles from './Checkbox.module.scss'

type Props = {
  ref?: Ref<HTMLInputElement>
  label: ReactNode
  value?: string
  disabled?: boolean
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, disabled, error, value, ...rest }: Props, ref) => {
    return (
      <div>
        <div className={styles.checkboxWrapper}>
          <input
            value={value}
            ref={ref}
            type={'checkbox'}
            className={styles.checkbox}
            disabled={disabled}
            {...rest}
          />
          <label htmlFor="#">{label}</label>
        </div>
        <p className={inputStyles.error}>{error && !value ? error : ''}</p>
      </div>
    )
  }
)
