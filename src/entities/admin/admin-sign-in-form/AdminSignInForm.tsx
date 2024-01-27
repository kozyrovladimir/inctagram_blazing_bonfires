import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import styles from './AdminSignInForm.module.scss'

import { ADMIN_LOGIN } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { signInAdmin } from '@/pages/super-admin/modal/slices/admin-auth-reducer'
import { LoginFormType } from '@/shared/api'
import { RoutersPath } from '@/shared/constants/paths'
import { RootState } from '@/shared/providers/storeProvider'
import { Button, ButtonSize, FormContainer, Input, InputType, LinearLoader } from '@/shared/ui'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const AdminSignInForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('common', { keyPrefix: 'Auth' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Auth' })
  const isAdminLogged = useSelector((state: RootState) => state.adminAuth.isAdminLogged)

  if (isAdminLogged) {
    router.replace(RoutersPath.superAdminUsersList)
  }

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(tError('RequiredField'))
      .matches(emailRegex, tError('InvalidEmail')),
    password: yup.string().required(tError('RequiredField')),
  })

  const [loginAdmin] = useMutation(ADMIN_LOGIN, {
    onCompleted: ({ loginAdmin }) => {
      // loginAdmin is taken from data object which comes as second argument in useMutation hook after loginAdmin function
      const isAdminLogged = loginAdmin?.logged

      // Since graphql will never return error ala "Wrong credentials" but always returns { logged: true/false }
      // we cannot add validation before loginAdmin request. Thus we always send request to backend and if "logged" is false ->
      // show toast.error.
      if (!isAdminLogged) {
        toast.error(tError('Wrong email or password!'))
      } else {
        sessionStorage.setItem('adminAuth', String(loginAdmin?.logged))
        // Since all components are SSR ( I can't make them client-side for some reason) we have to dispatch "logged" value to store.
        // Because if we will try to sign in again. 29th line will redirect us back to UsersList page.
        dispatch(signInAdmin(isAdminLogged))
        router.replace(RoutersPath.superAdminUsersList)
      }
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit((args: LoginFormType) => {
    loginAdmin({
      variables: { email: String(args.email), password: String(args.password) },
    })
  })

  return (
    <>
      <Toaster position="top-right" />
      <FormContainer title={t('SignIn')}>
        <form className={styles.formContainer} onSubmit={onSubmit}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label={t('Email')}
                type={InputType.EMAIL}
                placeholder={t('EnterEmail')}
                error={errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                label={t('Password')}
                type={InputType.PASSWORD}
                placeholder={t('EnterPassword')}
                error={errors.password?.message}
                {...field}
              />
            )}
          />
          <Button size={ButtonSize.STRETCHED}>{t('SignIn')}</Button>
        </form>
      </FormContainer>
    </>
  )
}
