import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import '../App.css';

// TABLE MATERIALUI
import { DataGrid } from '@mui/x-data-grid';




const Leaderboard = ({ user }) => {

  // STATE
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    axios.get('/users')
      .then((results) => {
        // console.log(results.data);
        // const [users, setUsers] = useState(results.data);
        //SET STATE
        setUsers(results.data.sort((a, b) => {
          return b.wins - a.wins;
        }));
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


  
  const columns = [
    { field: 'id', headerClassName: 'leaderboardHeader', headerName: 'Username', minWidth: 160, flex: 1 },
    {
      headerClassName: 'leaderboardHeader',
      field: 'wins',
      headerName: 'Wins',
      type: 'number',
      minWidth: 160,
      editable: false,
      flex: 1,
    },
    {
      headerClassName: 'leaderboardHeader',
      field: 'gamesPlayed',
      headerName: 'Games Played',
      type: 'number',
      minWidth: 160,
      editable: false,
      flex: 1
    },
    {
      headerClassName: 'leaderboardHeader',
      field: 'correctAnswers',
      headerName: 'Correct Answers',
      type: 'number',
      sortable: true,
      minWidth: 160,
      flex: 1
    },
    {
      headerClassName: 'leaderboardHeader',
      field: 'questionsAttempted',
      headerName: 'Questions Attempted',
      type: 'number',
      sortable: true,
      minWidth: 160,
      flex: 1
    },
    {
      headerClassName: 'leaderboardHeader',
      field: 'percentCorrect',
      headerName: 'Percent Correct',
      type: 'number',
      sortable: true,
      minWidth: 160,
      flex: 1
    }
  ];
  
  const rows =
    users.map(user => {
      return { 
        id: user.username,
        wins: user.wins,
        gamesPlayed: user.totalGames, 
        correctAnswers: user.qCorrect, 
        questionsAttempted: user.qAttempted,
        percentCorrect: user.qAttempted === 0 ? '-' : user.qCorrect / user.qAttempted * 100 + '%'
      };
    });


  return (
    <div style={{ display: 'flex' }}>
      <div style={{ height: 900, minWidth: '100%' }}>
        <DataGrid
          sx={{ 
            '.leaderboardHeader': {
              color: 'white',
              background: 'gray',
            },
            '.MuiDataGrid-row': {
              color: 'white',
              background: '#2b2b2b'
            },
            '&:hover': {
              color: 'red',
              backgroundColor: 'white',
            },
          }}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableColumnMenu
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Leaderboard;
