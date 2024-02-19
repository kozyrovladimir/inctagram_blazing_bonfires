import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './errorMessage.module.scss'

import { Text } from '@/shared/ui/text/Text'
type Props = {
  error: string | undefined
  position?: 'left' | 'right'
} & ComponentPropsWithoutRef<typeof Text>

export const ErrorMessage = (props: Props) => {
  const { className, error, position = 'right' } = props
  const message = clsx(s.error, position === 'left' && s.position, className)

  return error && <Text className={message}>{error}</Text>
}
