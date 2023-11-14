import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Image from 'next/image'

import blackTriangleImg from '../../assets/icons/table/black-triangle.svg'
import triangleImg from '../../assets/icons/table/triangle.svg'

import style from './TableUsersList.module.scss'
import { UserSettingsBM } from './UserSettingsBM'

function createData(userID: string, userName: string, profileLink: string, dateAdded: string) {
  return { userID, userName, profileLink, dateAdded }
}

const rows = [
  createData('12312313', '1 person', 'profileLink', '01.01.2023'),
  createData('124214324324', '2 person', 'profileLink', '01.01.2023'),
  createData('123213212', '3 person', 'profileLink', '01.01.2023'),
]

export function TableUsersList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} className={style.tableRoot} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell className={style.headerItem}>User ID</TableCell>
            <TableCell className={style.headerItem} align="right">
              Username
              <Image src={triangleImg} alt="" className={style.triangleImg} />
            </TableCell>
            <TableCell className={style.headerItem} align="right">
              Profile link
            </TableCell>
            <TableCell className={style.headerItem} align="right">
              Date added
              <Image src={blackTriangleImg} alt="" className={style.triangleDown} />
              <Image src={blackTriangleImg} alt="" className={style.triangleUp} />
            </TableCell>
            <TableCell className={style.headerItem} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.userID}>
              <TableCell component="th" scope="row" className={style.tableContentItem}>
                {row.userID}
              </TableCell>
              <TableCell className={style.tableContentItem} align="right">
                {row.userName}
              </TableCell>
              <TableCell className={style.tableContentItem} align="right">
                {row.profileLink}
              </TableCell>
              <TableCell className={style.tableContentItem} align="right">
                {row.dateAdded}
              </TableCell>
              <TableCell className={style.tableContentItem} align="right">
                <UserSettingsBM />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
