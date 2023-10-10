import Image from 'next/image'

import anyDevicesBlack from '@/shared/assets/icons/devices/anyDevices-black.svg'
import anyDevicesWhite from '@/shared/assets/icons/devices/anyDevices.svg'
import appleBlack from '@/shared/assets/icons/devices/apple-black.svg'
import appleWhite from '@/shared/assets/icons/devices/apple.svg'
import browserBlack from '@/shared/assets/icons/devices/browser-black.svg'
import browserWhite from '@/shared/assets/icons/devices/browser.svg'
import chromeBlack from '@/shared/assets/icons/devices/chrome-black.svg'
import chromeWhite from '@/shared/assets/icons/devices/chrome.svg'
import desktopBlack from '@/shared/assets/icons/devices/desktop-black.svg'
import desktopWhite from '@/shared/assets/icons/devices/desktop.svg'
import mobileBlack from '@/shared/assets/icons/devices/mobile-black.svg'
import mobileWhite from '@/shared/assets/icons/devices/mobile.svg'
import safariBlack from '@/shared/assets/icons/devices/safari-black.svg'
import safariWhite from '@/shared/assets/icons/devices/safari.svg'

interface IProps {
  deviceName?: string
  browserName?: string
  size?: string
  theme?: string
  isCurrent: boolean
}

export const IconDevice = ({ deviceName, isCurrent, size, theme, browserName }: IProps) => {
  if (isCurrent) {
    switch (browserName) {
      case 'Chrome':
        return (
          <Image src={theme === 'dark' ? chromeWhite : chromeBlack} alt="apple icon" sizes={size} />
        )
      case 'Safari':
        return (
          <Image src={theme === 'dark' ? safariWhite : safariBlack} alt="apple icon" sizes={size} />
        )
      default:
        return (
          <Image
            src={theme === 'dark' ? browserWhite : browserBlack}
            alt="apple icon"
            sizes={size}
          />
        )
    }
  } else {
    switch (deviceName) {
      case 'Macintosh':
        return (
          <Image
            src={theme === 'dark' ? desktopWhite : desktopBlack}
            alt="apple icon"
            sizes={size}
          />
        )
      case 'Mobile':
        return (
          <Image src={theme === 'dark' ? mobileWhite : mobileBlack} alt="apple icon" sizes={size} />
        )
      default:
        return (
          <Image
            src={theme === 'dark' ? anyDevicesWhite : anyDevicesBlack}
            alt="apple icon"
            sizes={size}
          />
        )
    }
  }
}
