import React, { useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './CreateNewPassForm.module.scss'

import { useCreateNewPasswordMutation } from '@/shared/api/model/auth.api'
import { NewPasswordType, SignUpType } from '@/shared/api/model/auth.api.types'
import { Button, ButtonSize } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'
import inputStyles from '@/shared/ui/Input/Input.module.scss'

type FormType = {
  newPassword: string
  newPasswordConfirmation: string
}

export function CreateNewPassForm() {
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation()
  const [newPasswordSuccess, setNewPasswordSuccess] = useState(false)

  const router = useRouter()
  const { query } = router
  const { recoveryCode } = query

  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      newPasswordConfirmation: '',
    },
  })

  const password = watch('newPassword', '')

  const onSubmit: SubmitHandler<NewPasswordType> = data => {
    data.recoveryCode = recoveryCode
    createNewPassword(data)
      .unwrap()
      .then(() => {
        reset()
        router.push()
      })
      .catch(error => {
        if (error.data.messages[0].field === 'newPassword') {
          setError('newPassword', {
            type: 'manual',
            message: error.data.messages[0].message,
          })
        }
      })
  }

  return (
    <>
      {isLoading && <CircularProgress />}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <Input
          {...register('newPassword', {
            required: 'Password field is required',
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
              message:
                'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
            },
          })}
          label="Password"
          type={InputType.PASSWORD}
          placeholder="Enter password"
          className={inputStyles.input}
          error={errors.newPassword && errors.newPassword?.message}
        />
        <Input
          {...register('newPasswordConfirmation', {
            required: 'Confirm password field is required',
            validate: {
              value: (value: string) => value === password || 'Passwords do not match',
            },
          })}
          label="Password confirmation"
          type={InputType.PASSWORD}
          placeholder="Enter password confirmation"
          className={inputStyles.input}
          error={errors.newPasswordConfirmation && errors.newPasswordConfirmation?.message}
        />
        <p className={styles.createPassHelpText}>
          Your password must be between 6 and 20 characters
        </p>

        <Button size={ButtonSize.STRETCHED} className={styles.sendLinkBtn}>
          Create new password
        </Button>
      </form>
    </>
  )
}
