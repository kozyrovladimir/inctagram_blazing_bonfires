import Image from 'next/image'

import styles from './device.module.scss'

import { Logout } from '@/features/logout'
import iconDevice from '@/shared/assets/icons/devices/apple.svg'
import { ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { IconDevice } from '@/shared/utils/iconDevice'

interface IProps {
  os?: string
  device: string
  browserName: string
  ip: string
  isCurrent: boolean
}
export const Device = ({ os, device, ip, isCurrent, browserName }: IProps) => {
  return (
    <>
      <div className={styles.container}>
        <section>
          <IconDevice
            deviceName={device}
            theme="dark"
            isCurrent={isCurrent}
            browserName={browserName}
          />
          <div className={styles.description}>
            {/* <h4>{`${os === ('Mac OS' || 'iOS') ? 'Apple' : ''} ${os}`}</h4> */}
            {isCurrent && <h4>{browserName}</h4>}
            {!isCurrent && <h4>{`${os === ('Mac OS' || 'iOS') ? 'Apple' : ''} ${device}`}</h4>}
            <p>IP: {ip}</p>
            <p>Last visit: {new Date().toLocaleDateString()}</p>
          </div>
        </section>
        {!isCurrent && (
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
