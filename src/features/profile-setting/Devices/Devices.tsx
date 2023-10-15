import { useEffect, useState } from 'react'

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

export function Devices() {
  const router = useRouter()
  const { t } = useTranslation('common', { keyPrefix: 'Devices' })

  const [currentDevice, setCurrentDevice] = useState<UserSessionsType | undefined>(undefined)
  const [isModal, setIsModal] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isChooseModal, setIsChooseModal] = useState(true)
  const [messageModal, SetMessageModal] = useState('')

  const { data: sessions, isLoading } = useGetSessionsQuery()
  const [deleteSession, { isLoading: isLoadingDeleteSessons }] = useDeleteSessionMutation()
  const [logout, { isLoading: isLoadingLogoutCurrent }] = useLogoutMutation()
  const [terminateAll, {}] = useTerminateAllMutation()

  const logoutSession = (id: number) => {
    if (id === currentDevice?.deviceId) {
      setIsModal(true)
      SetMessageModal('Это ваше устройство, вы действительно хотите выйти?')
    } else {
      deleteSession(id)
        .unwrap()
        .catch(error => {
          setIsError(true)
          setIsChooseModal(false)
          SetMessageModal(error.data.messages[0].message ?? 'Error, try again late.')
        })
    }
  }
  const logoutApiHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        router.push('/sign-in')
      })
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
          SetMessageModal('All other sessions terminate')
        })
        .catch(error => {
          setIsError(true)
          setIsChooseModal(false)
          SetMessageModal(error.data.messages[0].message ?? 'Error, try again late.')
        })
    } else {
      setIsModal(true)
      SetMessageModal('All other sessions terminate')
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

  useEffect(() => {
    sessions && setCurrentDevice(getCurrentDevice(sessions))
  }, [sessions])

  return (
    <>
      {(isLoading || isLoadingDeleteSessons || isLoadingLogoutCurrent) && <LinearLoader />}
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
            onClick={() => {
              setIsChooseModal(false)
              allTerminateHandler()
            }}
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
                  logoutCallback={id => {
                    setIsChooseModal(true)
                    logoutSession(id)
                  }}
                  deviceId={session.deviceId}
                />
              )
            })}
          </section>
          <p>{JSON.stringify(!isLoading && sessions)}</p>
        </div>
      )}

      {isModal && (
        <Modal
          title="Attention"
          callBackCloseWindow={() => {
            setIsModal(false)
          }}
          mainButtonCB={() => {
            isChooseModal && logoutApiHandler()
          }}
          extraButtonCB={() => {
            setIsModal(false)
          }}
          mainButton={isChooseModal ? 'Да' : 'OK'}
          extraButton={isChooseModal ? 'Нет' : undefined}
        >
          {messageModal}
        </Modal>
      )}
    </>
  )
}