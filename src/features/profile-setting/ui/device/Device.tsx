import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import styles from './Device.module.scss'

import logoutImg from '@/shared/assets/icons/logout/logout.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/button/Button'
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
}: Props) => {
  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'Auth' })

  return (
    <>
      <div className={styles.container}>
        <section>
          <IconDevice osName={osName} isCurrent={isCurrent} browserName={browserName} />
          <div className={styles.description}>
            {isCurrent && <h4>{browserName}</h4>}
            {!isCurrent && <h4>{`${osName === ('Mac OS' || 'iOS') ? 'Apple' : ''} ${osName}`}</h4>}
            <p>IP: {ip}</p>
            {!isCurrent && <p>Last visit: {new Date(lastActive).toLocaleDateString()}</p>}
          </div>
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
