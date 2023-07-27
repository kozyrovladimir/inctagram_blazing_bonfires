import { useState } from 'react'

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
  label: string
  value: string
  disabled?: boolean
  placeholder: string
  error?: string
  type: InputType
  callback: (value: string) => void
}

export default function Input({ label, value, placeholder, error, type, callback }: Props) {
  const [passwordInvisible, setPasswordInvisible] = useState<boolean>(true)
  const inputStyles = classNames(styles.input, {
    [styles.erroredInput]: error,
    [styles.inputSearch]: type === InputType.SEARCH,
  } as Mods)

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      {type === InputType.SEARCH && (
        <Image src={searchImg} alt="search" width={15} height={15} className={styles.search} />
      )}
      <input
        className={inputStyles}
        type={type === InputType.PASSWORD && passwordInvisible ? 'password' : 'text'}
        value={value}
        placeholder={placeholder}
        onChange={e => callback(e.currentTarget.value)}
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
          {!passwordInvisible && <div className={styles.eyeCrossLine}></div>}
        </>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
