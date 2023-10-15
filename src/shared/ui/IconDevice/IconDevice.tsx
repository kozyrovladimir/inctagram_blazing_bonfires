import { useCallback } from 'react'

import Image from 'next/image'

import { findPathSVG } from '@/shared/utils/iconGenerator'

interface IProps {
  osName: string
  browserName: string
  size?: string
  theme?: string
  isCurrent: boolean
}

export const IconDevice = ({ osName, isCurrent, theme, browserName }: IProps) => {
  const path = useCallback(() => {
    const displayIcon = isCurrent ? browserName : osName

    return theme ? findPathSVG(displayIcon, isCurrent, theme) : findPathSVG(displayIcon, isCurrent)
  }, [theme, osName, browserName, isCurrent])

  return (
    <Image src={path()} alt={`icon ${isCurrent ? browserName : osName}`} width={48} height={48} />
  )
}
