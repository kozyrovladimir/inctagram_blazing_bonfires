import React, { useEffect, useState } from 'react'

import { SubmitHandler, useForm, Controller } from 'react-hook-form'

import styles from './ProfileSetting.module.scss'

import { ProfilePhoto } from '@/features/profile-setting/ProfilePhoto'
import { UserType } from '@/shared/api/auth.api.types'
import { useGetProfileMutation, useUpdateProfileMutation } from '@/shared/api/profile.api'
import { Button } from '@/shared/ui/Button/Button'
import Input, { InputType } from '@/shared/ui/Input/Input'
import Calendar from '@/widgets/LangSwitcher/ui/Calendar/Calendar'

export const ProfileSetting = () => {
  const [userId, setUserId] = useState('')
  const [getProfile, { isLoading }] = useGetProfileMutation()
  const [updateProfile] = useUpdateProfileMutation()
  const [updateSuccess, setUpdateSuccess] = useState(false)
  let userProfile: UserType

  useEffect(() => {
    const urlCode = window.location.search.split('=')[1] // поменять потом то, что достается из url

    setUserId(urlCode)
  }, [])

  useEffect(() => {
    if (userId) {
      userProfile = getProfile(userId)
    }
  }, [userId])

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<UserType>({
    mode: 'onChange',
    // defaultValues: {
    //   userName: '', // userProfile.userName,
    //   firstName: '',
    //   lastName: '',
    //   city: '',
    //   dateOfBirth: 00.00.00,
    //   aboutMe: '',
    // },
  })

  const onSubmit: SubmitHandler<UserType> = (data: UserType) => {
    console.log(data)
    updateProfile(data)
      .unwrap()
      .then(() => {
        reset()
        setUpdateSuccess(true)
      })
      .catch(error => {
        if (error.data.messages[0].field === 'userName') {
          setError('userName', {
            type: 'manual',
            message: error.data.messages[0].message,
          })
        }
        if (error.data.messages[0].field === 'email') {
          setError('firstName', {
            type: 'manual',
            message: error.data.messages[0].message,
          })
        }
        if (error.data.messages[0].field === 'email') {
          setError('lastName', {
            type: 'manual',
            message: error.data.messages[0].message,
          })
        }
        if (error.data.messages[0].field === 'email') {
          setError('city', {
            type: 'manual',
            message: error.data.messages[0].message,
          })
        }
        if (error.data.messages[0].field === 'email') {
          setError('aboutMe', {
            type: 'manual',
            message: error.data.messages[0].message,
          })
        }
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.profileSettingContainer}>
        <div className={styles.photo}>
          <ProfilePhoto />
        </div>
        <div>
          <Input
            {...register('userName', {
              required: 'Username field is required',
              minLength: 7,
            })}
            label={'Username'}
            placeholder={''}
            type={InputType.TEXT}
            style={{ marginBottom: '20px' }}
            classNameWrap={'myCustomLabel'}
            error={errors.userName && errors.userName?.message}
          />
          <Input
            {...register('firstName', {
              required: 'First name field is required',
              minLength: 3,
            })}
            label={'First Name'}
            placeholder={''}
            type={InputType.TEXT}
            style={{ marginBottom: '20px' }}
            classNameWrap={'myCustomLabel'}
            error={errors.firstName && errors.firstName?.message}
          />
          <Input
            {...register('lastName', {
              required: 'Last name field is required',
              minLength: 3,
            })}
            label={'Last Name'}
            placeholder={''}
            type={InputType.TEXT}
            style={{ marginBottom: '20px' }}
            classNameWrap={'myCustomLabel'}
            error={errors.lastName && errors.lastName?.message}
          />
          <div className={styles.labelDate}>Date of birthday</div>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <Calendar
                value={field.value}
                onChange={newValue => field.onChange(newValue)}
                classNameWrap={styles.calendar}
              />
            )}
            error={errors.dateOfBirth && errors.dateOfBirth?.message}
          />
          {/*<Calendar classNameWrap={styles.calendar} />*/}
          <Input
            {...register('city', {
              required: 'City field is required',
              minLength: 7,
            })}
            label={'City'}
            placeholder={''}
            type={InputType.TEXT}
            style={{ marginBottom: '20px' }}
            classNameWrap={'myCustomLabel'}
            error={errors.city && errors.city?.message}
          />
          <div className={styles.aboutMeLabel}>About me</div>
          <textarea
            {...register('aboutMe', {
              required: 'About Me field is required',
              minLength: 7,
            })}
            name="aboutMe"
            rows={4}
            cols={50}
            placeholder=" "
            className={styles.aboutMeTextarea}
            error={errors.aboutMe && errors.aboutMe?.message}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.line}></div>
      </div>
      <div className={styles.buttonContainer}>
        <Button className={styles.button} disabled={updateSuccess}>
          Save Changes
        </Button>
      </div>
    </form>
  )
}
