import React, { useState } from 'react'

import DatePicker from 'react-multi-date-picker'

import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import styles from './Calendar.module.scss'

export default function Example() {
  const [value, setValue] = useState(new Date())

  return (
    <DatePicker
      inputClass={styles.customInput}
      className="bg-dark"
      containerClassName={styles.container}
      value={value}
      headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
      arrow={false}
      showOtherDays
      format="DD.MM.YYYY"
      placeholder="click to open"
      onChange={setValue}
    />
  )
}
