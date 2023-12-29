import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import styles from './Device.module.scss'

import desctopImage from '@/shared/assets/icons/devices/lightIcons/desktop.svg'
import mobileImage from '@/shared/assets/icons/devices/lightIcons/mobile.svg'
import logoutImg from '@/shared/assets/icons/logout/logout.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui'
import { IconDevice } from '@/shared/ui/iconDevice/IconDevice'

type Props = {
  deviceName: string
  lastActive: string
  browserName: string
  deviceId: number
  ip: string
  isCurrent: boolean
  logoutCallback?: (id: number) => void
  osName: string
  deviceType: string
}
export const Device = ({
  osName,
  ip,
  isCurrent,
  browserName,
  lastActive,
  deviceId,
  logoutCallback,
  deviceName,
  deviceType,
}: Props) => {
  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'Auth' })

  return (
    <>
      <div className={styles.container}>
        <section>
          {isCurrent ? (
            <>
              <IconDevice osName={osName} isCurrent={isCurrent} browserName={browserName} />
              <div className={styles.description}>
                <h4>{browserName}</h4>
                <p>IP: {ip}</p>
              </div>
            </>
          ) : (
            <>
              <Image src={deviceType === 'mobile' ? mobileImage : desctopImage} alt="device" />
              <div className={styles.description}>
                <h4>{`${osName === 'Mac OS' || osName === 'iOS' ? 'Apple' : ''} ${deviceName}`}</h4>
                <p>IP: {ip}</p>
                <p>Last visit: {new Date(lastActive).toLocaleDateString()}</p>
              </div>
            </>
          )}
        </section>
        {!isCurrent && logoutCallback && (
          <div>
            <Button
              className={styles.logOut}
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.STRETCHED}
              onClick={() => {
                logoutCallback(deviceId)
              }}
            >
              <Image src={logoutImg} alt={''} />
              <span className={styles.description}>{t('LogOut')}</span>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
