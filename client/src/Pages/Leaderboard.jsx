import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

// TABLE MATERIALUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f44336',
    },
  },
});


const Leaderboard = () => {

  // STATE
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    axios.get('/users')
      .then((results) => {
        // console.log(results.data);
        // const [users, setUsers] = useState(results.data);
        //SET STATE
        setUsers(results.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
    
  // ON RENDER
  useEffect(() => {
    getAllUsers();
  }, [users]);
  
  // console.log([users]);



  return (
    <TableContainer component={Paper} theme={theme}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
        >
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Wins</TableCell>
            <TableCell align="right">Games Played</TableCell>
            <TableCell align="right">Correct Answers</TableCell>
            <TableCell align="right">Questions Attmepted</TableCell>
            <TableCell align="right">Percent Correct</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.username}
              sx={{ border: 2 }}
            >
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell align="right">{user.wins}</TableCell>
              <TableCell align="right">{user.totalGames}</TableCell>
              <TableCell align="right">{user.qCorrect}</TableCell>
              <TableCell align="right">{user.qAttempted}</TableCell>
              <TableCell align="right" defaultValue={0}>{user.qAttempted === 0 ? '-' : user.qCorrect / user.qAttempted * 100 + '%'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
