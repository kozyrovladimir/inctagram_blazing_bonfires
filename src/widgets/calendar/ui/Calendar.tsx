import React, { useState, forwardRef, useEffect } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import type { Value } from 'react-multi-date-picker'

import styles from './Calendar.module.scss'

import calendarCloseIcon from '@/shared/assets/icons/icons/calendarClose.svg'
import calendarOpenIcon from '@/shared/assets/icons/icons/calendarOpen.svg'

interface IProps {
  data?: Date
  outsideOnChange: (newValue: Value) => void
  classNameWrap: string
}

export const Calendar = ({ classNameWrap, data, outsideOnChange }: IProps) => {
  const minAge = new Date().setFullYear(new Date().getFullYear() - 10)
  const defaultValue = data ? new Date(data) : minAge
  const { t } = useTranslation('common', { keyPrefix: 'Calendar' })
  const [value, setValue] = useState<Value>(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const weekDays = [t('Su'), t('Mo'), t('Tu'), t('We'), t('Th'), t('Fr'), t('Sa')]
  const months = [
    t('January'),
    t('February'),
    t('March'),
    t('April'),
    t('May'),
    t('June'),
    t('July'),
    t('August'),
    t('September'),
    t('October'),
    t('November'),
    t('December'),
  ]

  return (
    <div className={classNameWrap}>
      <DatePicker
        inputClass={styles.customInput}
        containerClassName={styles.container}
        value={value}
        monthYearSeparator=" "
        weekDays={weekDays}
        months={months}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        arrow={false}
        showOtherDays
        format="MM.DD.YYYY"
        onOpen={() => {
          setIsOpen(true)
        }}
        onClose={() => setIsOpen(false)}
        // maxDate={minAge}
        placeholder="00.00.00"
        onChange={date => {
          setValue(date)
          outsideOnChange(date)
        }}
        weekStartDayIndex={1}
        offsetY={-1}
      />

      <Image
        src={isOpen ? calendarCloseIcon : calendarOpenIcon}
        alt="calendar"
        className={styles.calendarIcon}
      />
    </div>
  )
}
