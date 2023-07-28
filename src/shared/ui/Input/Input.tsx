'use client'

import { useState } from 'react'

import Image from 'next/image'

import eyeImg from '../../assets/icons/eye.svg'
import searchImg from '../../assets/icons/search.svg'

import styles from './Input.module.scss'

type Props = {
  label: string
  value: string
  disabled?: boolean
  placeholder: string
  error?: string
  password?: boolean
  email?: boolean
  search?: boolean
  callback: (value: string) => void
}

export default function Input({
  label,
  value,
  placeholder,
  error,
  password,
  callback,
  email,
  search,
}: Props) {
  const [passwordInvisible, setPasswordInvisible] = useState<boolean>(true)
  const inputStyles =
    styles.input + ' ' + (error ? styles.erroredInput : '') + (search ? styles.inputSearch : '')

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      {search && (
        <Image src={searchImg} alt="search" width={15} height={15} className={styles.search} />
      )}
      <input
        className={inputStyles}
        // eslint-disable-next-line no-nested-ternary
        type={password && !passwordInvisible ? 'password' : email ? 'email' : 'text'}
        value={value}
        placeholder={placeholder}
        onChange={e => callback(e.currentTarget.value)}
      />
      {password && (
        <>
          <Image
            src={eyeImg}
            alt="eye"
            width={24}
            height={24}
            className={styles.eye}
            onClick={() => setPasswordInvisible(!passwordInvisible)}
          />
          {!passwordInvisible && (
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
