import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import * as yup from 'yup'

import styles from './CreateNewPassForm.module.scss'

import { useCreateNewPasswordMutation } from '@/shared/api/services/auth/auth.api'
import { NewPasswordType } from '@/shared/api/services/auth/auth.api.types'
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
  const { t } = useTranslation('common', { keyPrefix: 'Auth' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const router = useRouter()
  const { query } = router
  const { code } = query

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .min(6, tError('MinCharactrers6'))
      .max(20, tError('MaxCharactrers20'))
      .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, tError('PasswordValidationError'))
      .required(tError('RequiredField')),
    newPasswordConfirmation: yup.string().required(tError('RequiredField')),
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
      <FormContainer title={t('CreateNewPassword')}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <Input
            {...register('newPassword')}
            label={t('Password')}
            type={InputType.PASSWORD}
            placeholder={t('EnterPassword')}
            className={inputStyles.input}
            error={errors.newPassword && errors.newPassword?.message}
          />
          <Input
            {...register('newPasswordConfirmation', {
              validate: {
                value: (value: string) => value === password || t('PasswordDoNotmatch'),
              },
            })}
            label={t('PasswordConfirmation')}
            type={InputType.PASSWORD}
            placeholder={t('EnterPasswordConfirmation')}
            className={inputStyles.input}
            error={errors.newPasswordConfirmation && errors.newPasswordConfirmation?.message}
          />
          <p className={styles.createPassHelpText}>{tError('PasswordMin6Max20')}</p>

          <Button size={ButtonSize.STRETCHED} className={styles.sendLinkBtn}>
            {t('CreateNewPassword')}
          </Button>
        </form>
      </FormContainer>
    </>
  )
}
