/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import * as React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ProfilePhoto } from '../ui/ProfilePhoto/ProfilePhoto'

import styles from './GeneralInfo.module.scss'

import { useGetProfileQuery, useUpdateProfileMutation, useMeQuery } from '@/shared/api'
import {
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
} from '@/shared/api/services/profile/profile.api'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { Button } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'
import { LinearLoader } from '@/shared/ui/Loaders/LinearLoader'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Calendar } from '@/widgets/Calendar/ui/Calendar'

export const GeneralInfo = () => {
  const router = useRouter()

  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'ProfileSettings' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const [isErrorModal, SetIsErrorModal] = useState(false)
  const [errorMessageModal, SetErrorMessageModal] = useState('')

  const { data, isError, error, isLoading } = useMeQuery()

  // не знаю как проверить что нам пришел айди в data из useMeQuery() - пока написал такой костыль(
  const {
    data: profileData,
    isError: isErrorProfileData,
    isLoading: isLoadingProfileData,
  } = useGetProfileQuery(data?.userId ? data?.userId.toString() : '', {
    skip: isLoading || isError,
  })

  const [updateProfile, { isError: isErrorUpdateProfile }] = useUpdateProfileMutation()

  const [updateAvatar, { isLoading: isLoadingAvatar }] = useUpdateAvatarMutation()

  const [deleteAvatar, { isLoading: isLoadingDeleteAvatar }] = useDeleteAvatarMutation()

  const [photo, setPhoto] = useState<Blob | null>(null)
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false)

  const profileSchema = yup.object().shape({
    userName: yup
      .string()
      .min(6, tError('MinCharactrers6'))
      .max(20, tError('MaxCharactrers30'))
      .matches(/[0-9A-Za-z_-]{6,20}$/, tError('UserNameValidationError'))
      .required(tError('RequiredField')),
    firstName: yup
      .string()
      .min(1, tError('MinCharactrers1'))
      .max(50, tError('MaxCharactrers50'))
      .matches(/^[A-ZА-Я][a-zа-я]{1,50}$/, tError('SrartLatterNotSpecial'))
      .required(tError('RequiredField')),
    lastName: yup
      .string()
      .min(1, tError('MinCharactrers1'))
      .max(50, tError('MaxCharactrers50'))
      .matches(/^[A-ZА-Я][a-zа-я]{1,50}$/, tError('SrartLatterNotSpecial'))
      .required(tError('RequiredField')),
    city: yup
      .string()
      .min(2, tError('MinCharactrers2'))
      .max(30, tError('MaxCharactrers30'))
      .matches(/^[A-ZА-Я][a-zа-я]{2,30}$/, tError('SrartLatterNotSpecial'))
      .required(tError('RequiredField')),
    dateOfBirth: yup
      .date()
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 13)), tError('MinAge'))
      .required(tError('RequiredField')),
    aboutMe: yup
      .string()
      .min(1, tError('MinCharactrers1'))
      .max(200, tError('MaxCharactrers200'))
      .required(tError('RequiredField')),
  })

  const {
    control,
    reset,
    watch,
    getValues,
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
      dateOfBirth: profileData?.dateOfBirth ?? '',
      aboutMe: profileData?.aboutMe ?? '',
    },
  })

  useEffect(() => {
    reset(profileData)
  }, [isLoadingProfileData])

  const onSubmit = (data: ProfileUserType) => {
    // const arrFromDate = data.dateOfBirth?.toLocaleDateString().split('.') ?? []

    // arrFromDate.splice(0, 2, arrFromDate[1], arrFromDate[0]).join('.')

    // console.log(data.dateOfBirth)
    // console.log(arrFromDate)

    // data.dateOfBirth = correctDate

    // console.log(data.dateOfBirth)
    // console.log(arrFromDate)

    // console.log(data)

    updateProfile(data)
      .unwrap()
      .then(() => {
        if (isDeleteAvatar) {
          deleteAvatar()
            .unwrap()
            .then(() => {
              router.push('/profile')
            })
        }
        if (photo) {
          const formData = new FormData()

          formData.set('file', photo as Blob)
          updateAvatar(formData)
            .unwrap()
            .then(() => {
              router.push('/profile')
            })
        } else {
          router.push('/profile')
        }
      })
      .catch(error => {
        SetIsErrorModal(true)
        if (error && error.data) {
          const { statusCode } = error.data

          if (statusCode === 401) {
            SetErrorMessageModal('You are not authorization, please enter in your account')
            router.push('/sign-in')
          } else {
            SetErrorMessageModal(error.data.messages[0].message ?? 'Error, try again late.')
          }
        } else {
          SetErrorMessageModal('Network error, try again late.')
        }
      })
  }

  if (error && isError) {
    const { status } = error as FetchBaseQueryError

    console.log(error)
    if (status === 401 || (error as Error).message === 'Token not found') {
      return (
        <Modal title="Error!" callBackCloseWindow={() => router.push('/sign-in')} mainButton="OK">
          You are not authorized, please enter in your account
        </Modal>
      )
    } else {
      return (
        <Modal title="Error!" callBackCloseWindow={() => router.reload()} mainButton="OK">
          Network error. Sorry, offline mode isn&apos;t ready
        </Modal>
      )
    }
  }

  const onError = (errors: FieldErrors) => console.log(errors)

  watch()
  const isFillField = getValues([
    'userName',
    'firstName',
    'lastName',
    'dateOfBirth',
    'city',
    'aboutMe',
    'avatars',
  ]).every(e => !!e)

  return (
    <>
      {(isLoading || isLoadingProfileData || isLoadingAvatar || isLoadingDeleteAvatar) && (
        <LinearLoader />
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
                    label={t('UserName')}
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
                    label={t('FirstName')}
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
                    label={t('LastName')}
                    placeholder={''}
                    type={InputType.TEXT}
                    error={(errors as FieldErrors<ProfileUserType>).lastName?.message}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
                )}
              />
              <label className={styles.labelDate}>{t('DateBirthday')}</label>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, ref, ...args } }) => (
                  <Calendar
                    data={profileData.dateOfBirth}
                    outsideOnChange={onChange}
                    classNameWrap={styles.calendar}
                    {...args}
                  />
                )}
              />
              {errors && (
                <p className={styles.error}>
                  {(errors as FieldErrors<ProfileUserType>).dateOfBirth?.message}
                </p>
              )}
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('City')}
                    placeholder={''}
                    error={(errors as FieldErrors<ProfileUserType>).city?.message}
                    type={InputType.TEXT}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
                )}
              />
              <div className={styles.textareaContent}>
                <label className={styles.aboutMeLabel}>{t('AboutMe')}</label>
                <Controller
                  name="aboutMe"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      rows={4}
                      cols={50}
                      placeholder=""
                      className={styles.aboutMeTextarea}
                      {...field}
                    />
                  )}
                />
              </div>
              {errors && (
                <p className={styles.error}>
                  {(errors as FieldErrors<ProfileUserType>).aboutMe?.message}
                </p>
              )}
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.line}></div>
          </div>
          <Button className={styles.button} disabled={!isFillField}>
            {tRoot('SaveChanges')}
          </Button>
        </form>
      )}
      {isErrorModal && (
        <Modal title="Error!" callBackCloseWindow={() => SetIsErrorModal(false)} mainButton="OK">
          {errorMessageModal}
        </Modal>
      )}
    </>
  )
}
