import { forwardRef, ReactNode, Ref } from 'react'

import inputStyles from './../Input/Input.module.scss'
import styles from './roundCheckbox.module.scss'

type Props = {
  ref: Ref<HTMLInputElement>
  label: ReactNode
  value?: string
  disabled?: boolean
  error?: string
}

export const RoundCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ label, disabled, error, value, ...rest }: Props, ref) => {
    return (
      <>
        <div className={styles.checkboxWrapper}>
          <input
            value={value}
            type={'radio'}
            className={styles.checkbox}
            disabled={disabled}
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
