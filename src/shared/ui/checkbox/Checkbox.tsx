import { forwardRef, ReactNode, Ref } from 'react'

import styles from './Checkbox.module.scss'

type Props = {
  ref: Ref<HTMLInputElement>
  children: ReactNode
  value?: boolean
  disabled?: boolean
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ children, disabled, error, value, ...rest }: Props, ref) => {
    return (
      <div className={styles.checkboxWrapper}>
        <div className={styles.checkboxLabel}>
          <input
            checked={value}
            type={'checkbox'}
            className={styles.checkbox}
            disabled={disabled}
            {...rest}
            ref={ref}
          />
          <span className={styles.check}></span>
        </div>
        <label>{children}</label>
        <p className={styles.error}>{error && !value ? error : ''}</p>
      </div>
    )
  }
)
