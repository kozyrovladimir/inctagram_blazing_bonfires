'use client'

import { useState } from 'react'

import Image from 'next/image'
import styles from 'src/shared/ui/Input/Input.module.scss'

import eyeImg from '@/shared/assets/icons/eye.svg'
import searchImg from '@/shared/assets/icons/search.svg'

type Props = {
  label: string
  value: string
  disabled?: boolean
  placeholder: string
  error?: string
  password?: boolean
  search: boolean
  callback: (value: string) => void
}

export default function Input({
  label,
  value,
  placeholder,
  error,
  password,
  callback,
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
        type={password && passwordInvisible ? 'password' : 'text'}
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
          {!passwordInvisible && <div className={styles.eyeCrossLine}></div>}
        </>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
