import React, { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode, useState } from 'react'

import * as RSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './Select.module.scss'

import { ArrowDownOutline } from '@/shared/assets/icons/arrows/Arrow-down'
import { Input, InputType } from '@/shared/ui'

export type SelectMenuProps = {
  onChangeOption: (value: any) => void
  options: string[]
  placeholder?: string
  title?: string
  itemsPerPage?: number
  value?: string
  icon?: ReactNode
  className?: string
  open?: boolean
} & ComponentPropsWithoutRef<typeof RSelect.Root>

export const Select = forwardRef<ElementRef<typeof RSelect.Root>, SelectMenuProps>(
  (
    {
      onChangeOption,
      options,
      placeholder = options[0],
      title,
      itemsPerPage,
      icon,
      className,
      open,
      ...rest
    }: SelectMenuProps,
    ref
  ) => {
    const [isOpened, setIsOpened] = useState(false)

    const onChangeCallback = (value: string) => {
      onChangeOption && onChangeOption(value)
    }

    const toggleIsOpened = () => {
      setIsOpened(!isOpened)
    }

    const classNames = {
      trigger: clsx(s.trigger, className),
    }

    return (
      <div className={s.wrapper}>
        <div className={s.title}>{title}</div>
        <RSelect.Root
          open={open}
          onOpenChange={toggleIsOpened}
          onValueChange={onChangeCallback}
          {...rest}
          // ref={ref}
        >
          <RSelect.Trigger ref={ref} className={classNames['trigger']}>
            <RSelect.Value placeholder={placeholder} />
            <RSelect.Icon>
              {icon || <ArrowDownOutline className={isOpened ? s.iconRotated : s.icon} />}
            </RSelect.Icon>
          </RSelect.Trigger>

          <RSelect.Portal>
            <RSelect.Content
              align={'start'}
              className={s.selectContent}
              collisionPadding={0}
              position={'popper'}
              side={'bottom'}
            >
              <RSelect.Viewport className={s.viewport}>
                {' '}
                {options.map((el, idx) => (
                  <RSelect.Item className={s.item} key={idx} value={el}>
                    <RSelect.ItemText>{el}</RSelect.ItemText>
                    <RSelect.ItemIndicator className={s.selected} />
                  </RSelect.Item>
                ))}
              </RSelect.Viewport>
            </RSelect.Content>
          </RSelect.Portal>
        </RSelect.Root>
      </div>
    )
  }
)
