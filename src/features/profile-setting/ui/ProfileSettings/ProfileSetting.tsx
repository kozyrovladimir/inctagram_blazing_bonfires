/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import * as React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import * as yup from 'yup'

import styles from './ProfileSetting.module.scss'

import { ProfilePhoto } from '@/features/profile-setting/ui/ProfilePhoto/ProfilePhoto'
import { useGetProfileQuery, useUpdateProfileMutation, useMeQuery } from '@/shared/api'
import {
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
} from '@/shared/api/services/profile/profile.api'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { AppErrors } from '@/shared/common/errors'
import { Button } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'
import { Calendar } from '@/widgets/Calendar/ui/Calendar'

export const ProfileSetting = () => {
  const { data, isError, error, isLoading } = useMeQuery({})

  const {
    data: profileData,
    isError: isErrorProfileData,
    isLoading: isLoadingProfileData,
  } = useGetProfileQuery(data?.userId ?? null)

  const [updateProfile, {}] = useUpdateProfileMutation()

  const [updateAvatar, { isLoading: isLoadingAvatar }] = useUpdateAvatarMutation()

  const [deleteAvatar, { isLoading: isLoadingDeleteAvatar }] = useDeleteAvatarMutation()

  const [photo, setPhoto] = useState<Blob | null>(null)
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false)

  const profileSchema = yup.object().shape({
    userName: yup
      .string()
      .min(6, AppErrors.MIN_6_CHARACTERS)
      .max(20, AppErrors.MAX_30_CHARACTERS)
      .matches(/^([a-zA-Z])+([a-zA-Z0-9]{5,30})$/, AppErrors.START_LATTER_WITHOUT_SPECIAL)
      .required(AppErrors.REQUIRED_FIELD),
    firstName: yup
      .string()
      .min(1, AppErrors.MIN_1_CHARACTERS)
      .max(50, AppErrors.MAX_50_CHARACTERS)
      .matches(/^([A-ZА-Я])+([a-zа-я]{0,50})$/, AppErrors.START_LATTER_WITHOUT_SPECIAL),
    lastName: yup
      .string()
      .min(1, AppErrors.MIN_1_CHARACTERS)
      .max(50, AppErrors.MAX_50_CHARACTERS)
      .matches(/^([A-ZА-Я])+([a-zа-я]{0,50})$/, AppErrors.START_LATTER_WITHOUT_SPECIAL),
    city: yup
      .string()
      .min(2, AppErrors.MIN_2_CHARACTERS)
      .max(30, AppErrors.MAX_30_CHARACTERS)
      .matches(/^([A-ZА-Я])+([a-zа-я]{1,30})$/, AppErrors.START_LATTER_WITHOUT_SPECIAL),
    dateOfBirth: yup.date(),
    aboutMe: yup.string().max(200, AppErrors.MAX_200_CHARACTERS),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUserType | any>({
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
    defaultValues: {
      userName: profileData?.userName ?? '',
      email: profileData?.email ?? '',
      password: profileData?.password ?? '',
      firstName: profileData?.firstName ?? '',
      lastName: profileData?.lastName ?? '',
      city: profileData?.city ?? '',
      dateOfBirth: profileData?.dateOfBirth ?? undefined,
      aboutMe: profileData?.aboutMe ?? '',
    },
  })

  useEffect(() => {
    reset(profileData)
  }, [isLoadingProfileData])

  const onSubmit = (data: ProfileUserType) => {
    updateProfile(data)
      .unwrap()
      .then(() => {
        if (isDeleteAvatar) {
          deleteAvatar()
        }
        if (photo) {
          const formData = new FormData()

          formData.set('file', photo as Blob)

          updateAvatar(formData)
        }
      })
      .catch(error => {
        if (error && error.data) {
          const { statusCode } = error.data

          if (statusCode === 401) {
            console.log('You are not authorization, please enter in your account')
          }
        } else {
          alert('Network error')
        }
      })
  }

  if (isError) {
    const { status } = error as FetchBaseQueryError

    if (status === 401) {
      console.log('You are not authorized, please enter in your account')

      return <h2>You are not authorized, please enter in your account</h2>
    } else {
      return <h2>Network error. Sorry, offline mode isn&apos;t ready</h2>
    }
  }

  const onError = (errors: FieldErrors) => console.log(errors)

  return (
    <>
      {(isLoading || isLoadingProfileData || isLoadingAvatar || isLoadingDeleteAvatar) && (
        <h2>Loading...</h2>
      )}

      {profileData && (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={styles.content}>
            <div className={styles.photoContent}>
              <Controller
                name="avatars"
                control={control}
                render={({ field: { ref, ...args } }) => (
                  <ProfilePhoto
                    outsideOnChange={data => {
                      setPhoto(data as Blob)
                    }}
                    deleteAvatar={data => {
                      setIsDeleteAvatar(data)
                    }}
                    photoFromServer={profileData?.avatars}
                    {...args}
                  />
                )}
              />
            </div>

            <div className={styles.textFieldsContent}>
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <Input
                    label={'Username'}
                    type={InputType.TEXT}
                    placeholder="Enter your user-name"
                    error={(errors as FieldErrors<ProfileUserType>).userName?.message}
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
                    error={(errors as FieldErrors<ProfileUserType>).firstName?.message}
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
                    error={(errors as FieldErrors<ProfileUserType>).lastName?.message}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
                )}
              />
              <label className={styles.labelDate}>Date of birthday</label>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, ref, ...args } }) => (
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
                    error={(errors as FieldErrors<ProfileUserType>).city?.message}
                    type={InputType.TEXT}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
                )}
              />
              <div className={styles.textareaContent}>
                <label className={styles.aboutMeLabel}>About me</label>
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
                {errors && (
                  <p className={styles.error}>
                    {(errors as FieldErrors<ProfileUserType>).aboutMe?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.line}></div>
          </div>
          <Button className={styles.button}>Save Changes</Button>
        </form>
      )}
    </>
  )
}
