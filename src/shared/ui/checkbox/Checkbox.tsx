import { forwardRef, ReactNode, Ref } from 'react'

import styles from './Checkbox.module.scss'

import inputStyles from '@/shared/ui/input/Input.module.scss'

type Props = {
  ref: Ref<HTMLInputElement>
  label: ReactNode
  value?: string
  disabled?: boolean
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, disabled, error, value, ...rest }: Props, ref) => {
    return (
      <>
        <div className={styles.checkboxWrapper}>
          <input
            value={value}
            type={'checkbox'}
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
