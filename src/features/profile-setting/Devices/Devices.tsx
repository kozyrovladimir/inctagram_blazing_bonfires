import { useCallback, useEffect, useState } from 'react'

import { UAParser } from 'ua-parser-js'

import { useGetIpQuery } from '@/shared/api/services/profile/ip.api'
import IconApple from '@/shared/assets/icons/devices/apple.svg'
import { SvgGenerator } from '@/shared/utils/svgGenerator'

export function Devices() {
  const [test, setTest] = useState(0)
  const [userAgent, setUserAgent] = useState<object | null>(null)

  const { data } = useGetIpQuery()

  const getUserDevice = useCallback(() => {
    const ua = window.navigator.userAgent

    const parser = new UAParser(ua)

    setUserAgent(parser.getResult())
    // getBrowser()
    // getDevice()
    // getEngine()
    // getOS()
  }, [])

  useEffect(() => {
    getUserDevice()
  }, [])

  return (
    <>
      {data && <div> {JSON.stringify(data)}</div>}
      <div>{test}</div>
      <button
        style={{ height: '2rem', width: '3rem', color: 'black' }}
        onClick={() => setTest(test + 1)}
      >
        +1
      </button>
      <IconApple height="100" width="100" fill="green" stroke="black" />
      <p>{JSON.stringify(userAgent)}</p>
    </>
  )
}
