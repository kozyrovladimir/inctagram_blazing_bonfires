import React, { useState } from 'react'

import { CircularProgress } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateNewPasswordMutation } from './../../../../shared/api/auth.api'
import { CreateNewPasswordFormType } from './../../../../shared/api/auth.api.types'
import { ModalWindow } from './../../../../shared/modalWindow/ModalWindow'
import { Button, ButtonSize } from './../../../../shared/ui/Button/Button'
import Input, { InputType } from './../../../../shared/ui/Input/Input'
import inputStyles from './../../../../shared/ui/Input/Input.module.scss'
import styles from './CreateNewPassForm.module.scss'

function CreateNewPass() {
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation()
  const [newPassword, setNewPassword] = useState(false)
  const callBackCloseWindow = () => setNewPassword(false)

  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<CreateNewPasswordFormType>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })
  const password = watch('password', '')
  const onSubmit: SubmitHandler<string> = password => {
    createNewPassword(password)
      .unwrap()
      .then(() => {
        reset()
        setNewPassword(true)
      })
      .catch(error => {
        if (error.data.messages[0].field === 'password') {
          setError('password', {
            type: 'manual',
            message: error.data.messages[0].message,
          })
        }
        if (error.data.messages[0].field === 'passwordConfirmation') {
          setError('passwordConfirmation', {
            type: 'manual',
            message: error.data.messages[0].message,
          })
        }
      })
  }

  return (
    <>
      {newPassword && (
        <ModalWindow
          title={'New password'}
          mainButton={'OK'}
          callBackCloseWindow={callBackCloseWindow}
        >
          <p>You`&apos;`ve created new password successfully</p>
        </ModalWindow>
      )}
      {isLoading && <CircularProgress />}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <Input
          {...register('password', {
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
          error={errors.password && errors.password?.message}
        />
        <Input
          {...register('passwordConfirmation', {
            required: 'Confirm password field is required',
            validate: {
              value: (value: string) => value === password || 'Passwords do not match',
            },
          })}
          label="Password confirmation"
          type={InputType.PASSWORD}
          placeholder="Enter password confirmation"
          className={inputStyles.input}
          error={errors.passwordConfirmation && errors.passwordConfirmation?.message}
        />
        <Button size={ButtonSize.STRETCHED} className={styles.sendLinkBtn}>
          Create new password
        </Button>
      </form>
    </>
  )
}

export default CreateNewPass
