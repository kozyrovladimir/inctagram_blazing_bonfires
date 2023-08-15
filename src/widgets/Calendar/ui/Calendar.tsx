import React, { useState } from 'react'

import Image from 'next/image'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import type { Value } from 'react-multi-date-picker'
import InputIcon from 'react-multi-date-picker/components/input_icon'

import styles from './Calendar.module.scss'

import calendarIcon from '@/shared/assets/icons/icons/iconCalendar.svg'

interface IPropsDatePiker {
  style: object
  date: DateObject
  today: DateObject
  selectedDate: DateObject | DateObject[]
  currentMonth: object
  isSameDate(arg1: DateObject, arg2: DateObject): boolean
}

interface IProps {
  classNameWrap: string
}

export default function Calendar({ classNameWrap }: IProps) {
  const minAge = new Date().setFullYear(new Date().getFullYear() - 12)
  const [value, setValue] = useState<Value>(minAge)
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const mapDays = (props: IPropsDatePiker) => {
    const { date, today, selectedDate, currentMonth, isSameDate } = props

    props.style = {
      ...props.style,
      margin: '36x',
      fontSize: '1rem',
    }

    if (isSameDate(date, today))
      props.style = {
        ...props.style,
        color: '#397df6',
        backgroundColor: '#171717',
        fontWeight: 'bold',
        border: 'none',
      }
    if (isSameDate(date, selectedDate as DateObject))
      props.style = {
        ...props.style,
        color: '#fff',
        backgroundColor: '#397DF6',
        fontWeight: 'bold',
        border: '4px solid rgba(0,0,0,0.3)',
        boxShadow: 'none',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
      }

    return props
  }

  return (
    <div className={classNameWrap}>
      <DatePicker
        mapDays={mapDays}
        inputClass={styles.customInput}
        containerClassName={styles.container}
        value={value}
        monthYearSeparator=" "
        weekDays={weekDays}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        arrow={false}
        showOtherDays
        format="DD.MM.YYYY"
        minDate={minAge}
        placeholder="00.00.00"
        onChange={setValue}
        weekStartDayIndex={0}
        offsetY={-1}
      />
      <Image src={calendarIcon} alt="calendar" className={styles.calendarIcon} />
    </div>
  )
}
