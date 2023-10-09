import { useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'
import { UAParser } from 'ua-parser-js'

import { Device } from '../ui/Device/device'

import styles from './Devices.module.scss'

import { useGetIpQuery } from '@/shared/api/services/profile/ip.api'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

export function Devices() {
  const { t } = useTranslation('common', { keyPrefix: 'Devices' })

  const [userAgent, setUserAgent] = useState<object | null>(null)
  const [os, setOs] = useState('unknow')
  const [device, setDevice] = useState('unknow')

  const { data, isLoading } = useGetIpQuery()

  const getUserDevice = useCallback(() => {
    const ua = window.navigator.userAgent

    const parser = new UAParser(ua)

    setUserAgent(parser.getResult())

    setOs(parser.getOS().name ?? 'unknow')
    setDevice(parser.getDevice().model ?? 'unknow')
  }, [])

  useEffect(() => {
    getUserDevice()
  }, [])

  return (
    <div className={styles.container}>
      <section>
        <h4> {t('ThisDevices')}</h4>
        <Device
          os={os}
          device={device}
          ip={!isLoading ? data?.ip : 'Identification...'}
          isNotCurrent={false}
        />
      </section>
      <Button className={styles.terminateBtn} theme={ButtonTheme.CLEAR} size={ButtonSize.LARGE}>
        {t('TerminateAllSession')}
      </Button>
      <section>
        <h4> {t('ActiveSessions')}</h4>
        <Device os={os} device={device} ip={!isLoading ? data?.ip : 'Identification...'} />
        <Device os={os} device={device} ip={!isLoading ? data?.ip : 'Identification...'} />
        <Device os={os} device={device} ip={!isLoading ? data?.ip : 'Identification...'} />
      </section>
      <p>{JSON.stringify(userAgent)}</p>
    </div>
  )
}
