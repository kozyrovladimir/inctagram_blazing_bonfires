import * as React from 'react'

import { blueGrey } from '@mui/material/colors'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Image from 'next/image'

import enFlag from '../../public/languages/flagBritish.svg'
import rusFlag from '../../public/languages/flagRus.svg'

import s from './LanguageSelet.module.scss'

const outerTheme = createTheme({
  palette: {
    primary: {
      main: blueGrey[100],
    },
  },
})

export const LanguageSelect = () => {
  const [language, setLanguage] = React.useState<string>('rus')

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value)
  }

  return (
    <ThemeProvider theme={outerTheme}>
      <FormControl
        size="small"
        className={s.formControl}
        sx={{
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <Select
          inputProps={{
            MenuProps: {
              MenuListProps: {
                sx: {
                  backgroundColor: 'black',
                  color: 'white',
                  border: '1px solid white',
                },
              },
            },
          }}
          sx={{
            height: '2.5rem',
            color: 'white',
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
          }}
          className={s.select}
          labelId="languageSelectLabel"
          id="languageSelectId"
          value={language}
          onChange={handleChange}
        >
          <MenuItem value={'rus'} className={s.menuItem}>
            <Image
              src={rusFlag}
              alt={''}
              width={20}
              height={20}
              style={{ marginRight: '10px' }}
              priority
            />
            <span>Russian</span>
          </MenuItem>
          <MenuItem value={'en'} className={s.menuItem}>
            <Image
              src={enFlag}
              alt={''}
              width={20}
              height={20}
              style={{ marginRight: '10px' }}
              priority
            />
            <span>English</span>
          </MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  )
}
