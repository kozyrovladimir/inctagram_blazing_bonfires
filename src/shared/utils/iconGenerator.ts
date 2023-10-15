import defaultIconDeviceDark from '@/shared/assets/icons/devices/darkIcons/anyDevices.svg'
import defaultIconBrowserDark from '@/shared/assets/icons/devices/darkIcons/browser.svg'
import defaultIconDeviceLight from '@/shared/assets/icons/devices/lightIcons/anyDevices.svg'
import defaultIconBrowserLight from '@/shared/assets/icons/devices/lightIcons/browser.svg'

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
const darkSVG = require.context(
  '@/shared/assets/icons/devices/darkIcons', // путь к вашей папке с изображениями SVG
  false, // true - включить подкаталоги/false - выключть
  /\.svg$/ // шаблон файла
)
const lightSVG = require.context('@/shared/assets/icons/devices/lightIcons', false, /\.svg$/)

const svgsDark = requireAll(darkSVG)
const svgsLight = requireAll(lightSVG)

interface svgFile {
  default: {
    src: string
    blurWidth: number
    blurHeight: number
    height: number
    width: number
  }
}

export const findPathSVG = (name: string, isCurrent: boolean, theme?: string): string => {
  const findName = (file: svgFile): string => {
    return file.default.src.replace('/_next/static/media/', '').split('.')[0].toLocaleLowerCase()
  }
  const findFile = (files: svgFile[]): svgFile => {
    const file = files.filter((file: svgFile) => {
      return findName(file) === name.toLocaleLowerCase()
    })[0]

    return file
  }

  let defaultIcon
  let file

  if (theme) {
    defaultIcon = isCurrent ? defaultIconBrowserLight : defaultIconDeviceLight
    file = findFile(svgsDark)
  } else {
    defaultIcon = isCurrent ? defaultIconBrowserDark : defaultIconDeviceDark
    file = findFile(svgsLight)
  }

  return file ? file.default.src : defaultIcon
}
