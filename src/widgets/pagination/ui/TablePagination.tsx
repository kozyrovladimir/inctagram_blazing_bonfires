import React, { ChangeEvent } from 'react'

import { createTheme, ThemeProvider } from '@mui/material'
import Pagination from '@mui/material/Pagination'

import styles from 'src/widgets/pagination/ui/TablePagination.module.scss'

import { Select } from '@/shared/ui/Select/Select'

export type PaginationPropsType = {
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

export const TablePagination: React.FC<PaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
}) => {
  const lastPage = Math.ceil(totalCount / itemsCountForPage)

  const onChangeCallback = (event: ChangeEvent<unknown>, page: number) => {
    onChange(page, itemsCountForPage)
  }

  const onChangeSelect = (id: number) => {
    onChange(page, id)
  }

  const theme = createTheme({
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: '#fff',
            backgroundColor: '#0d0d0d',
            '&.Mui-selected': {
              color: '#000',
              backgroundColor: '#fff',
            },
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.pagination}>
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          page={2}
          count={10}
          onChange={onChangeCallback}
        />

        <div className={styles.container}>
          <span className={styles.text1}>Show</span>

          <Select
            value={itemsCountForPage}
            st={{
              width: '52px',
              height: '24px',
              appearance: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#171717',
              border: '1px solid #4c4c4c',
            }}
            options={[
              { id: 4, value: 4 },
              { id: 7, value: 7 },
              { id: 10, value: 10 },
            ]}
            onChangeOption={onChangeSelect}
          />

          <span className={styles.text2}>on page</span>
        </div>
      </div>
    </ThemeProvider>
  )
}
