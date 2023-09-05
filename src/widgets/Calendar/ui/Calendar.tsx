import React, { useState, forwardRef } from 'react'

import Image from 'next/image'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import type { Value } from 'react-multi-date-picker'

import styles from './Calendar.module.scss'

import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import calendarIcon from '@/shared/assets/icons/icons/iconCalendar.svg'

interface IProps {
  data?: ProfileUserType
  outsideOnChange: (newValue: Value) => void
  classNameWrap: string
}

export const Calendar = ({ classNameWrap, data, outsideOnChange }: IProps) => {
  const minAge = new Date().setFullYear(new Date().getFullYear() - 12)
  const defaultValue = data?.dateOfBirth ? new Date(data?.dateOfBirth) : new Date(minAge)
  const [value, setValue] = useState<Value | undefined>(defaultValue)
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

  return (
    <div className={classNameWrap}>
      <DatePicker
        inputClass={styles.customInput}
        containerClassName={styles.container}
        value={value}
        monthYearSeparator=" "
        weekDays={weekDays}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        arrow={false}
        showOtherDays
        format="MM.DD.YYYY"
        maxDate={minAge}
        placeholder="Enter date of birth"
        onChange={date => {
          setValue(date)
          outsideOnChange(date)
        }}
        weekStartDayIndex={0}
        offsetY={-1}
      />
      <Image src={calendarIcon} alt="calendar" className={styles.calendarIcon} />
    </div>
  )
}
