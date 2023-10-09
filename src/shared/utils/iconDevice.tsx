import Image from 'next/image'

import appleBlack from '@/shared/assets/icons/devices/apple-black.svg'
import appleWhite from '@/shared/assets/icons/devices/apple.svg'
import desktopBlack from '@/shared/assets/icons/devices/desktop-black.svg'
import desktopWhite from '@/shared/assets/icons/devices/desktop.svg'

interface IProps {
  deviceName: string
  browser?: string
  size?: string
  theme?: string
}

export const IconDevice = ({ deviceName, size, theme, browser }: IProps) => {
  switch (deviceName) {
    case 'Macintosh':
      return (
        <Image src={theme === 'dark' ? desktopWhite : desktopBlack} alt="apple icon" sizes={size} />
      )
    case 'Mobile':
      return (
        <Image src={theme === 'dark' ? appleWhite : appleBlack} alt="apple icon" sizes={size} />
      )
  }
}
