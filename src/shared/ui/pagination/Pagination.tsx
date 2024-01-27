import React from 'react'

import { clsx } from 'clsx'
import { useTranslation } from 'next-i18next'

import s from './Pagination.module.scss'
import { DOTS, usePagination } from './usePagination'

import { RadixSelect, Text } from '@/shared/ui'

export type PaginatorPropsType = {
  handlePageChange: (pageNumber: number) => void
  handleSetItemsPerPage: (numItemsPerPage: number) => void
  totalPages: number | undefined
  totalCount: number | undefined
  itemsPerPage: number | undefined
  siblingCount?: number
  currentPage: number
  className?: string
  selectOptions: string[]
}

export const Pagination = (props: PaginatorPropsType) => {
  const {
    handlePageChange,
    handleSetItemsPerPage,
    totalCount = 10,
    siblingCount = 1,
    currentPage = 1,
    itemsPerPage = 10,
    className,
    selectOptions,
  } = props

  const classNames = {
    paginationContainer: clsx(s.paginationContainer, className),
    arrowLeft: clsx(s.arrow, s.left),
    arrowRight: clsx(s.arrow, s.right),
  }
  const { t } = useTranslation('common', { keyPrefix: 'TablePagination' })

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    itemsPerPage,
  })

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    handlePageChange(currentPage + 1)
  }

  const onPrevious = () => {
    handlePageChange(currentPage - 1)
  }
  let lastPage = paginationRange[paginationRange.length - 1]

  return (
    <>
      <ul className={classNames['paginationContainer']}>
        {/* Left navigation arrow */}
        <li
          className={clsx(s.paginationItem, { [s.disabled]: currentPage === 1 })}
          onClick={onPrevious}
        >
          <div className={classNames['arrowLeft']} />
        </li>
        {paginationRange.map((pageNumber, idx) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li key={idx} className={s.dots}>
                &#8230;
              </li>
            )
          }

          // Render our Page Pills
          return (
            <li
              key={idx}
              className={clsx(s.paginationItem, { [s.selected]: pageNumber === currentPage })}
              onClick={() => handlePageChange(Number(pageNumber))}
            >
              {pageNumber}
            </li>
          )
        })}
        {/*  Right Navigation arrow */}
        <li
          className={clsx(s.paginationItem, {
            [s.disabled]: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className={classNames['arrowRight']} />
        </li>
        <li>
          <div className={s.numOfPages}>
            <Text className={s.show}>{t('Show')}</Text>
            <RadixSelect
              placeholder={'10'}
              className={s.triggerBtn}
              onChangeOption={handleSetItemsPerPage}
              options={selectOptions}
              itemsPerPage={itemsPerPage}
            />
            <Text className={s.perPage}>{t('OnPage')}</Text>
          </div>
        </li>
      </ul>
    </>
  )
}
