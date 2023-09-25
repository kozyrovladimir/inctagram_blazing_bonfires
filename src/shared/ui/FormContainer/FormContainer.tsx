/* eslint-disable no-nested-ternary */
import React, { FormHTMLAttributes } from 'react'

import styles from './FormContainer.module.scss'

import { classNames } from '@/shared/libs/classNames/classNames'

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  title: string
  className?: string
}

export enum FormOption {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  CREATEPASSWORD = 'createPassword',
  FORGOTPASSWORD = 'forgotPassword',
}

const FormContainer = ({ title, children, className }: IProps) => {
  return (
    <div className={classNames(styles.formContainer, {}, [className ? className : ''])}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export default FormContainer
