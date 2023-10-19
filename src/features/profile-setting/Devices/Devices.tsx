import { useEffect, useState } from 'react'

import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { UAParser } from 'ua-parser-js'

import { Device } from '../ui/Device/device'

import styles from './Devices.module.scss'

import { useGetSessionsQuery, useLogoutMutation } from '@/shared/api'
import {
  useDeleteSessionMutation,
  useTerminateAllMutation,
} from '@/shared/api/services/devices/devices.api'
import { UserSessionsType } from '@/shared/api/services/devices/devices.api.types'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { LinearLoader } from '@/shared/ui/Loaders/LinearLoader'
import { Modal } from '@/shared/ui/Modal/Modal'
import { errorHandler } from '@/shared/utils/errorHandler'

export function Devices() {
  const router = useRouter()
  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'Devices' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const [currentDevice, setCurrentDevice] = useState<UserSessionsType | undefined>(undefined)
  const [isModal, setIsModal] = useState(false)
  const [isChooseModal, setIsChooseModal] = useState(true)
  const [messageModal, SetMessageModal] = useState('')

  const { data: sessions, error, isLoading } = useGetSessionsQuery()
  const [deleteSession, { isLoading: isLoadingDeleteSessons }] = useDeleteSessionMutation()
  const [logout, { isLoading: isLoadingLogoutCurrent }] = useLogoutMutation()
  const [terminateAll, {}] = useTerminateAllMutation()

  const currentIsLoading = isLoading || isLoadingDeleteSessons || isLoadingLogoutCurrent

  const currentErrorHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
    errorHandler(error, tError('NotAuthorization'), tError('TryAgain'), tError('NetworkError'))
  }

  if (error) {
    currentErrorHandler(error)
  }

  const logoutSession = (id: number) => {
    setIsChooseModal(false)

    if (id === currentDevice?.deviceId) {
      setIsModal(true)
      SetMessageModal(t('ReallyLogout'))
    } else {
      deleteSession(id)
        .unwrap()
        .catch(error => currentErrorHandler(error))
    }
  }

  const logoutCurrentDevice = () => {
    logout()
      .unwrap()
      .then(() => {
        router.push('/sign-in')
      })
      .catch(error => currentErrorHandler(error))
      .finally(() => {
        setIsModal(false)
      })
  }

  const allTerminateHandler = () => {
    if (sessions && sessions?.length > 1) {
      terminateAll()
        .unwrap()
        .then(() => {
          setIsModal(true)
          SetMessageModal(t('AllSessionsTerminated'))
        })
        .catch(error => currentErrorHandler(error))
    } else {
      setIsModal(true)
      SetMessageModal(t('AllSessionsTerminated'))
    }
  }

  const getCurrentDevice = (sessions: UserSessionsType[]): UserSessionsType | undefined => {
    const currentDeviceUA = new UAParser().getResult()

    return sessions.find(session => {
      return (
        session.browserName === currentDeviceUA.browser.name &&
        session.browserVersion === currentDeviceUA.browser.version &&
        session.osName === currentDeviceUA.os.name &&
        session.osVersion === currentDeviceUA.os.version &&
        session.deviceType === currentDeviceUA.device.type
      )
    })
  }
  const logoutHandler = (id: number) => {
    setIsChooseModal(true)
    logoutSession(id)
  }

  useEffect(() => {
    sessions && sessions.length > 0 && setCurrentDevice(getCurrentDevice(sessions))
  }, [sessions])

  return (
    <>
      {currentIsLoading && <LinearLoader />}
      {sessions && sessions.length > 0 && (
        <div className={styles.container}>
          {currentDevice && (
            <section>
              <h4> {t('ThisDevices')}</h4>
              <Device
                osName={currentDevice.osName}
                deviceName={currentDevice.deviceName}
                browserName={currentDevice.browserName}
                ip={currentDevice.ip}
                isCurrent={true}
                lastActive={currentDevice.lastActive}
                deviceId={currentDevice.deviceId}
              />
            </section>
          )}
          <Button
            className={styles.terminateBtn}
            theme={ButtonTheme.CLEAR}
            size={ButtonSize.LARGE}
            onClick={() => allTerminateHandler()}
          >
            {t('TerminateAllSession')}
          </Button>
          <section>
            <h4> {t('ActiveSessions')}</h4>

            {sessions!.map(session => {
              return (
                <Device
                  key={session.deviceId}
                  isCurrent={false}
                  osName={session.osName}
                  browserName={session.browserName}
                  deviceName={session.deviceName}
                  ip={session.ip}
                  lastActive={session.lastActive}
                  logoutCallback={id => logoutHandler(id)}
                  deviceId={session.deviceId}
                />
              )
            })}
          </section>
        </div>
      )}

      {isModal && (
        <Modal
          title={tRoot('AttentionTitle')}
          callBackCloseWindow={() => {
            setIsModal(false)
          }}
          mainButtonCB={() => {
            isChooseModal && logoutCurrentDevice()
          }}
          extraButtonCB={() => {
            setIsModal(false)
          }}
          mainButton={isChooseModal ? tRoot('Yes') : 'OK'}
          extraButton={isChooseModal ? tRoot('No') : undefined}
        >
          {messageModal}
        </Modal>
      )}
    </>
  )
}
