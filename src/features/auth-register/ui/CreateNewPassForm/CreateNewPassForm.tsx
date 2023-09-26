import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import * as yup from 'yup'

import styles from './CreateNewPassForm.module.scss'

import { useCreateNewPasswordMutation } from '@/shared/api/services/auth/auth.api'
import { NewPasswordType } from '@/shared/api/services/auth/auth.api.types'
import { AppErrors } from '@/shared/common/errors'
import { Button, ButtonSize } from '@/shared/ui/Button/Button'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { Input, InputType } from '@/shared/ui/Input/Input'
import inputStyles from '@/shared/ui/Input/Input.module.scss'
import { LinearLoader } from '@/shared/ui/Loaders/LinearLoader'

type FormType = {
  newPassword: string
  newPasswordConfirmation: string
}

export function CreateNewPassForm() {
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation()

  const router = useRouter()
  const { query } = router
  const { code } = query

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .min(6, AppErrors.MIN_6_CHARACTERS)
      .max(20, AppErrors.MAX_20_CHARACTERS)
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
        AppErrors.PASSWORD_VALIDATION_ERROR_TEXT
      )
      .required(AppErrors.REQUIRED_FIELD),
    newPasswordConfirmation: yup.string().required(AppErrors.REQUIRED_FIELD),
  })

  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      newPassword: '',
      newPasswordConfirmation: '',
    },
  })

  const password = watch('newPassword', '')

  const onSubmit: SubmitHandler<NewPasswordType> = data => {
    if (!data) {
      throw new Error('data is undefined')
    } else {
      data.recoveryCode = code
    }

    createNewPassword(data)
      .unwrap()
      .then(() => {
        reset()
        router.push('/sign-in')
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
      {isLoading && <LinearLoader />}
      <FormContainer title="Create New Password">
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <Input
            {...register('newPassword')}
            label="Password"
            type={InputType.PASSWORD}
            placeholder="Enter password"
            className={inputStyles.input}
            error={errors.newPassword && errors.newPassword?.message}
          />
          <Input
            {...register('newPasswordConfirmation', {
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
      </FormContainer>
    </>
  )
}
