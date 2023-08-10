import { ComponentPropsWithoutRef, ForwardedRef, forwardRef, useState } from 'react'
import { useState, forwardRef, Ref, ReactNode } from 'react'

import Image from 'next/image'

import { classNames, Mods } from '../../libs/classNames/classNames'

import eyeImg from './../../assets/icons/eye.svg'
import searchImg from './../../assets/icons/search.svg'
import styles from './Input.module.scss'

export enum InputType {
  SEARCH = 'search',
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'text',
  TEL = 'tel',
}

type Props = {
  ref?: Ref<HTMLInputElement>
  classNameWrap?: string
  label: string
  value?: string
  disabled?: boolean
  placeholder: string
  error?: string
  type: InputType
  callback?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, classNameWrap, value, placeholder, error, type, callback, onChange, ...restProps },
    ref
  ) => {
    const [passwordInvisible, setPasswordInvisible] = useState<boolean>(true)

    const inputStyles = classNames(styles.input, {
      [styles.erroredInput]: error,
      [styles.inputSearch]: type === InputType.SEARCH,
    } as Mods)
    const inputStylesWrapper = classNames(styles.wrapper, {}, [classNameWrap ? classNameWrap : ''])

    const Input = forwardRef<HTMLInputElement, Props>(
  ({ classNameWrap, label, value, placeholder, error, type, callback, ...rest }: Props, ref) => {
    const [passwordInvisible, setPasswordInvisible] = useState<boolean>(true)
    const inputStyles = classNames(styles.input, {
      [styles.erroredInput]: error,
      [styles.inputSearch]: type === InputType.SEARCH,
    } as Mods)
    const inputStylesWrapper = classNames(styles.wrapper, {}, [classNameWrap ? classNameWrap : ''])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      callback?.(e.currentTarget.value)
    }

    return (
      <div className={inputStylesWrapper}>
        <label className={styles.label}>{label}</label>
        {type === InputType.SEARCH && (
          <Image src={searchImg} alt="search" width={15} height={15} className={styles.search} />
        )}
        <input
          ref={ref}
          className={inputStyles}
          type={
            // eslint-disable-next-line no-nested-ternary
            type === InputType.PASSWORD && passwordInvisible
              ? 'password'
              : type === InputType.EMAIL
              ? 'email'
              : 'text'
          }
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          {...restProps}
        />
        {type === InputType.PASSWORD && (
          <>
            <Image
              src={eyeImg}
              alt="eye"
              width={24}
              height={24}
              className={styles.eye}
              onClick={() => setPasswordInvisible(!passwordInvisible)}
            />
            {passwordInvisible && (
              <div
                className={styles.eyeCrossLine}
                onClick={() => setPasswordInvisible(!passwordInvisible)}
              ></div>
            )}
          </>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  }
)
    return (
      <div>
        <div className={inputStylesWrapper}>
          <label className={styles.label}>{label}</label>
          {type === InputType.SEARCH && (
            <Image src={searchImg} alt="search" width={15} height={15} className={styles.search} />
          )}
          <input
            // Привязываем ref к input
            ref={ref}
            className={inputStyles}
            type={
              // eslint-disable-next-line no-nested-ternary
              type === InputType.PASSWORD && passwordInvisible
                ? 'password'
                : type === InputType.EMAIL
                ? InputType.EMAIL
                : InputType.TEXT
            }
            value={value}
            placeholder={placeholder}
            onChange={e => callback && callback(e.currentTarget.value)}
            {...rest}
          />
          {type === InputType.PASSWORD && (
            <>
              <Image
                src={eyeImg}
                alt="eye"
                width={24}
                height={24}
                className={styles.eye}
                onClick={() => setPasswordInvisible(!passwordInvisible)}
              />
              {passwordInvisible && (
                <div
                  className={styles.eyeCrossLine}
                  onClick={() => setPasswordInvisible(!passwordInvisible)}
                ></div>
              )}
            </>
          )}
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  }
)

export default Input
