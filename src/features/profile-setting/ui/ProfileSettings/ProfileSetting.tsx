import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import jwt from 'jwt-decode'
import router from 'next/router'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import * as yup from 'yup'

import styles from './ProfileSetting.module.scss'

import { ProfilePhoto } from '@/features/profile-setting/ui/ProfilePhoto/ProfilePhoto'
import { ProfileUserType } from '@/shared/api/general.api.types'
import { LoginFormType, LoginResponseType } from '@/shared/api/model/auth.api.types'
import {
  useGetProfileQuery,
  useGetAuthMeQuery,
  useUpdateTokensMutation,
  useUpdateProfileMutation,
} from '@/shared/api/profile.api'
import { AppErrors } from '@/shared/common/errors'
import { Button } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'
import Calendar from '@/widgets/Calendar/ui/Calendar'

export const ProfileSetting = () => {
  const { data, isError, isLoading } = useGetAuthMeQuery()

  const {
    data: profileData,
    isError: isErrorProfileData,
    isLoading: isLoadingProfileData,
  } = useGetProfileQuery(data?.userId ?? null)

  const [
    updateProfile,
    {
      data: updateProfileData,
      isError: isErrorUpdateProfileData,
      isLoading: isLoadingUpdateProfileData,
    },
  ] = useUpdateProfileMutation()

  // const [tokenUpdate, { data: updateToken }] = useUpdateTokensMutation()

  // const checkToken = () => {
  //   const token = localStorage.getItem('accessToken') as string
  //   const tokenFinish = Number((jwt(token) as any).exp as string) * 1000
  //   const nowDate = Date.now()

  //   console.log(new Date(tokenFinish))
  //   console.log(new Date(nowDate))
  //   if (tokenFinish <= nowDate) {
  //     tokenUpdate()
  //       .unwrap()
  //       .then((res: LoginResponseType) => {
  //         localStorage.setItem('accessToken', res.accessToken)
  //         console.log(res)
  //       })
  //   }

  const profileSchema = yup.object().shape({
    userName: yup
      .string()
      .min(2, AppErrors.MIN_2_CHARACTERS)
      .max(20, AppErrors.MAX_20_CHARACTERS)
      .matches(/^([a-zA-Z])+([a-zA-Z0-9]{1,20})$/, AppErrors.START_LATTER_WITHOUT_SPECIAL)
      .required(AppErrors.REQUIRED_FIELD),
    firstName: yup
      .string()
      .min(2, AppErrors.MIN_2_CHARACTERS)
      .max(20, AppErrors.MAX_20_CHARACTERS)
      .matches(/^([A-ZА-Я])+([a-zа-я]{1,20})$/, AppErrors.START_LATTER_WITHOUT_SPECIAL),
    lastName: yup
      .string()
      .min(2, AppErrors.MIN_2_CHARACTERS)
      .max(20, AppErrors.MAX_20_CHARACTERS)
      .matches(/^([A-ZА-Я])+([a-zа-я]{1,20})$/, AppErrors.START_LATTER_WITHOUT_SPECIAL),
    city: yup
      .string()
      .min(2, AppErrors.MIN_2_CHARACTERS)
      .max(20, AppErrors.MAX_20_CHARACTERS)
      .matches(/^([A-ZА-Я])+([a-zа-я]{1,20})$/, AppErrors.START_LATTER_WITHOUT_SPECIAL),
    dateOfBirth: yup.string(),
    aboutMe: yup.string(),
    // avatars: yup.string(),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUserType>({
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
    defaultValues: {
      userName: profileData?.userName ?? '',
      email: profileData?.email ?? '',
      password: profileData?.password ?? '',
      firstName: profileData?.firstName ?? '',
      lastName: profileData?.lastName ?? '',
      city: profileData?.city ?? '',
      dateOfBirth: profileData?.dateOfBirth ?? '',
      aboutMe: profileData?.aboutMe ?? '',
      // avatars: profileData?.avatars ?? [],
    },
  })

  const onError = (errors: FieldErrors) => console.log(errors)

  const onSubmit = (data: ProfileUserType) => {
    updateProfile(data)
      .unwrap()
      .then(res => {
        router.push('/profile')
      })
    //   .catch(error => {
    //     if (error && error.data) {
    //       const { statusCode } = error.data

    //       if (statusCode === 400) {
    //         // setPasswordError('The password is incorrect. Try again please ')
    //         console.log('The password is incorrect. Try again please ')
    //       } else if (statusCode === 401) {
    //         console.log('This email address is not registered. Please register')
    //       }
    //     } else {
    //       alert('Network error')
    //     }
    //   })
  }

  // useEffect(() => {
  //   checkToken()
  // }, [])

  useEffect(() => {
    reset(profileData)
  }, [isLoadingProfileData])

  return (
    <>
      {(isLoading || isLoadingProfileData) && <h2>Loading...</h2>}
      {profileData && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={styles.profileSettingContainer}>
            <div className={styles.photo}>
              <ProfilePhoto />
            </div>

            <div>
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <Input
                    label={'Username'}
                    type={InputType.TEXT}
                    placeholder="Enter your user-name"
                    style={{ marginBottom: '20px' }}
                    error={errors.userName?.message}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
                )}
              />
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    label={'First Name'}
                    placeholder={''}
                    type={InputType.TEXT}
                    error={errors.firstName?.message}
                    style={{ marginBottom: '20px' }}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    label={'Last Name'}
                    placeholder={''}
                    type={InputType.TEXT}
                    style={{ marginBottom: '20px' }}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
                )}
              />
              <div className={styles.labelDate}>Date of birthday</div>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field: { onChange, ...args } }) => (
                  <Calendar
                    data={profileData}
                    outsideOnChange={onChange}
                    classNameWrap={styles.calendar}
                    {...args}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    label={'City'}
                    placeholder={''}
                    type={InputType.TEXT}
                    style={{ marginBottom: '20px' }}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
                )}
              />
              <div className={styles.aboutMeLabel}>About me</div>
              <Controller
                name="aboutMe"
                control={control}
                render={({ field }) => (
                  <textarea
                    rows={4}
                    cols={50}
                    placeholder=" "
                    className={styles.aboutMeTextarea}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.line}></div>
          </div>
          <div className={styles.buttonContainer}>
            <Button type="submit" /*  className={styles.button} */>Save Changes</Button>
          </div>
        </form>
      )}
    </>
  )
}
