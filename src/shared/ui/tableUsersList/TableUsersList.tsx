import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  userID: string,
  userName: string,
  profileLink: string,
  dateAdded: string,
) {
  return { userID, userName, profileLink, dateAdded };
}

const rows = [
  createData('12312313', '1 person', 'profileLink', '01.01.2023'),
  createData('124214324324', '2 person', 'profileLink', '01.01.2023'),
  createData('123213212', '3 person', 'profileLink', '01.01.2023'),
];

export function TableUsersList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Profile link</TableCell>
            <TableCell align="right">Date added</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.userID}>
              <TableCell component="th" scope="row">
                {row.userID}
              </TableCell>
              <TableCell align="right">{row.userName}</TableCell>
              <TableCell align="right">{row.profileLink}</TableCell>
              <TableCell align="right">{row.dateAdded}</TableCell>
              <TableCell align="right">...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}