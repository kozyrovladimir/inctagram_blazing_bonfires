import Image from 'next/image'

import styles from './device.module.scss'

import { Logout } from '@/features/logout'
import iconDevice from '@/shared/assets/icons/devices/apple.svg'
import { ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { IconDevice } from '@/shared/utils/iconDevice'

interface IProps {
  os?: string
  device: string
  ip: string
  isNotCurrent?: boolean
}
export const Device = ({ os, device, ip, isNotCurrent }: IProps) => {
  return (
    <>
      <div className={styles.container}>
        <section>
          {<IconDevice deviceName={device} theme="dark" />}
          <div className={styles.description}>
            {/* <h4>{`${os === ('Mac OS' || 'iOS') ? 'Apple' : ''} ${os}`}</h4> */}
            <h5>{`${os === ('Mac OS' || 'iOS') ? 'Apple' : ''} ${device}`}</h5>
            <p>IP: {ip}</p>
            <p>Last visit: {new Date().toLocaleDateString()}</p>
          </div>
        </section>
        {isNotCurrent ?? (
          <div>
            <Logout
              theme={ButtonTheme.CLEAR}
              className={styles.logOut}
              size={ButtonSize.STRETCHED}
            />
          </div>
        )}
      </div>
    </>
  )
}
