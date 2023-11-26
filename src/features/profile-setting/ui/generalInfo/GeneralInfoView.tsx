import Link from 'next/link'
import { Control, Controller, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'

import styles from './GeneralInfoView.module.scss'

import { AutocompletionOfCities } from '@/features/profile-setting/generalInfo/autocompletion-of-cities/AutocompletionOfCities'
import { ProfilePhoto } from '@/features/profile-setting/ui/profilePhoto/ProfilePhoto'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { RoutersPath } from '@/shared/constants/paths'
import { Button } from '@/shared/ui/button/Button'
import { Input, InputType } from '@/shared/ui/input/Input'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'
import { Modal } from '@/shared/ui/modal/Modal'
import { Calendar } from '@/widgets/calendar/ui/Calendar'

type translateFields = {
  userNameLabel: string
  firstNameLabel: string
  lastNameLabel: string
  cityLabel: string
  dateOfBirthLabel: string
  aboutMeLabel: string
  privacyPolicy: string
  notification: string
  yes: string
  no: string
  ok: string
  saveChanges: string
  leftWithoutSave: string
  settingsSaved: string
}
type Props = {
  currentIsLoading: boolean
  profileData: ProfileUserType | undefined
  handleSubmit: UseFormHandleSubmit<any, undefined>
  onSubmit: (data: ProfileUserType) => void
  control: Control<any, any>
  handleChangedAvatar: (data: Blob) => void
  handleDeleteAvatar: (data: boolean) => void
  formCache: ProfileUserType
  errors: FieldErrors<any>
  cacheForm: () => void
  translateFields: translateFields
  isModal: boolean
  isSaved: boolean
  handleCloseModal: () => void
  handleLeftPageWithoutSave: () => void
}

export const GeneralInfoView = ({
  currentIsLoading,
  profileData,
  handleSubmit,
  onSubmit,
  control,
  handleChangedAvatar,
  handleDeleteAvatar,
  formCache,
  errors,
  cacheForm,
  translateFields,
  isModal,
  isSaved,
  handleCloseModal,
  handleLeftPageWithoutSave,
}: Props) => {
  return (
    <>
      {currentIsLoading && <LinearLoader />}
      <Toaster position="top-right" />

      {!!profileData && (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.content}>
            <div className={styles.photoContent}>
              <Controller
                name="avatars"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <ProfilePhoto
                    outsideOnChange={data => handleChangedAvatar(data)}
                    deleteAvatar={data => handleDeleteAvatar(data)}
                    value={formCache ? formCache.avatars : profileData.avatars}
                    {...args}
                  />
                )}
              />
            </div>
            <div className={styles.textFieldsContent}>
              <Controller
                name="userName"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <Input
                    label={translateFields.userNameLabel}
                    type={InputType.TEXT}
                    placeholder={''}
                    error={(errors as FieldErrors<ProfileUserType>).userName?.message}
                    classNameWrap={styles.myCustomLabel}
                    value={value ?? ''}
                    {...args}
                  />
                )}
              />
              <Controller
                name="firstName"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <Input
                    label={translateFields.firstNameLabel}
                    placeholder={''}
                    type={InputType.TEXT}
                    error={(errors as FieldErrors<ProfileUserType>).firstName?.message}
                    classNameWrap={styles.myCustomLabel}
                    value={value ?? ''}
                    {...args}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <Input
                    label={translateFields.lastNameLabel}
                    placeholder={''}
                    type={InputType.TEXT}
                    error={(errors as FieldErrors<ProfileUserType>).lastName?.message}
                    classNameWrap={styles.myCustomLabel}
                    value={value ?? ''}
                    {...args}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <>
                    <label>{translateFields.cityLabel}</label>
                    <AutocompletionOfCities
                      error={(errors as FieldErrors<ProfileUserType>).city?.message}
                      {...args}
                    />
                  </>
                )}
              />
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field: { onChange, value, ref, ...args } }) => (
                  <div>
                    <label>{translateFields.dateOfBirthLabel}</label>
                    <Calendar
                      data={formCache ? formCache.dateOfBirth : profileData.dateOfBirth}
                      outsideOnChange={onChange}
                      classNameWrap={styles.calendar}
                      {...args}
                    />
                    {(errors as FieldErrors<ProfileUserType>).dateOfBirth && (
                      <p className={styles.errorCalendar}>
                        {(errors as FieldErrors<ProfileUserType>).dateOfBirth?.message}{' '}
                        <Link
                          href={{
                            pathname: `${RoutersPath.authPrivacyPolicy}`,
                            query: { previousPage: `${RoutersPath.profileGeneralInformation}` },
                          }}
                          className={styles.agreementLink}
                          onClick={() => cacheForm()}
                        >
                          {translateFields.privacyPolicy}
                        </Link>
                      </p>
                    )}
                  </div>
                )}
              />

              <div className={styles.textareaContent}>
                <label className={styles.aboutMeLabel}>{translateFields.aboutMeLabel}</label>
                <Controller
                  name="aboutMe"
                  control={control}
                  render={({ field: { ref, value, ...args } }) => (
                    <textarea
                      rows={4}
                      cols={50}
                      placeholder=""
                      className={styles.aboutMeTextarea}
                      value={value ?? ''}
                      {...args}
                    />
                  )}
                />
                {errors && (
                  <p className={styles.errorTextarea}>
                    {(errors as FieldErrors<ProfileUserType>).aboutMe?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.line}></div>
          <Button className={styles.button}>{translateFields.saveChanges}</Button>
        </form>
      )}

      {isModal && (
        <Modal
          title={translateFields.notification}
          callBackCloseWindow={handleCloseModal}
          extraButtonCB={handleLeftPageWithoutSave}
          mainButtonCB={handleCloseModal}
          extraButton={isSaved ? undefined : translateFields.yes}
          mainButton={isSaved ? translateFields.ok : translateFields.no}
        >
          {isSaved ? translateFields.saveChanges : translateFields.leftWithoutSave}
        </Modal>
      )}
    </>
  )
}
