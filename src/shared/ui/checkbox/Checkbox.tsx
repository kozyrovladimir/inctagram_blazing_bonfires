import { forwardRef, ReactNode, Ref } from 'react'

import styles from './Checkbox.module.scss'

import inputStyles from '@/shared/ui/input/Input.module.scss'

type Props = {
  ref: Ref<HTMLInputElement>
  label: ReactNode
  value?: string | boolean
  disabled?: boolean
  error?: string
  labelStyle?: string
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, disabled, error, value, labelStyle, ...rest }: Props, ref) => {
    const checkbox = styles.checkbox + ' ' + (disabled ? styles.checkboxDisabled : '')

    return (
      <>
        <div className={styles.checkboxWrapper}>
          <input
            value={value}
            type={'checkbox'}
            className={checkbox}
            disabled={disabled}
            {...rest}
            ref={ref}
          />
          <label className={labelStyle + (disabled ? styles.labelDisabled : '')} htmlFor="#">
            {label}
          </label>
        </div>
        <p className={inputStyles.error}>{error && !value ? error : ''}</p>
      </>
    )
  }
)
