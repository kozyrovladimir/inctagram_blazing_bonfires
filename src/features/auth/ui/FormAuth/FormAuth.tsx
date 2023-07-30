/* eslint-disable no-nested-ternary */
/* eslint-disable no-nested-ternary */

import React, { FC, FormHTMLAttributes, PropsWithChildren } from 'react'

import styles from './FormAuth.module.scss'

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  title: string
}

export enum FormOption {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  CREATEPASSWORD = 'createPassword',
  FORGOTPASSWORD = 'forgotPassword',
}

const FormAuth: FC<PropsWithChildren<IProps>> = ({ title, children }: IProps) => {
  return (
    <form className={styles.formContainer}>
      <h3>{title}</h3>
      {children}
    </form>
  )
}

export default FormAuth
