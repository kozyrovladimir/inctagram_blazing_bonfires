import { useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'
import { UAParser } from 'ua-parser-js'

import { Device } from '../ui/Device/device'

import styles from './Devices.module.scss'

import { useGetSessionsQuery } from '@/shared/api'
import { useGetIpQuery } from '@/shared/api/services/devices/getIP.api'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

export function Devices() {
  const { t } = useTranslation('common', { keyPrefix: 'Devices' })

  const [userAgent, setUserAgent] = useState<object | null>(null)
  const [os, setOs] = useState('unknow')
  const [device, setDevice] = useState('unknow')
  const [browseName, setBrowseName] = useState('unknow')

  //   const { data, isLoading } = useGetIpQuery()
  const { data, isLoading } = useGetSessionsQuery()

  const getUserDevice = useCallback(() => {
    const ua = window.navigator.userAgent

    const parser = new UAParser(ua)

    setUserAgent(parser.getResult())

    setOs(parser.getOS().name ?? 'unknow')
    setDevice(parser.getDevice().model ?? 'unknow')
    setBrowseName(parser.getBrowser().name ?? 'unknow')
  }, [])

  useEffect(() => {
    getUserDevice()
  }, [])

  if (!isLoading) console.log(data)

  return (
    <div className={styles.container}>
      <section>
        <h4> {t('ThisDevices')}</h4>
        <Device
          os={os}
          device={device}
          browserName={browseName}
          ip={/* !isLoading ? data?.ip :  */ 'Identification...'}
          isCurrent={true}
        />
      </section>
      <Button className={styles.terminateBtn} theme={ButtonTheme.CLEAR} size={ButtonSize.LARGE}>
        {t('TerminateAllSession')}
      </Button>
      <section>
        <h4> {t('ActiveSessions')}</h4>
        {!isLoading &&
          data?.map(el => {
            return (
              <Device
                key={el.deviceId}
                isCurrent={false}
                os={el.osName}
                browserName={el.browserName}
                device={el.deviceName}
                ip={'Identification...'}
              />
            )
          })}
      </section>
      {/* <p>{JSON.stringify(userAgent)}</p> */}
      <p>{JSON.stringify(!isLoading && data)}</p>
    </div>
  )
}
