import React, { useState, useEffect } from 'react';
import { Link } from '@material-ui/core';
import axios from 'axios';
import '../App.css';
import Home from './Home.jsx';

// TABLE MATERIALUI
import MaterialTable from '@material-table/core';




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
  

  const getOneUser = () => {
    axios.get('/_id', {
      '_id': user._id
    })
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // getOneUser();

  // /userprofile


  const columns = [
    { field: 'id', 
      headerClassName: 'leaderboardHeader', 
      title: 'Username',  
      render: rowData => <Link href={'http://localhost:3000/'}>{rowData.id}</Link>
    },
    {
      headerClassName: 'leaderboardHeader',
      field: 'wins',
      title: 'Wins',
      type: 'numeric',
      editable: 'never',
    },
    {
      headerClassName: 'leaderboardHeader',
      field: 'gamesPlayed',
      title: 'Games Played',
      type: 'numeric',
      editable: 'never',
    },
    {
      headerClassName: 'leaderboardHeader',
      field: 'correctAnswers',
      title: 'Correct Answers',
      type: 'numeric',
      sortable: true,
    },
    {
      headerClassName: 'leaderboardHeader',
      field: 'questionsAttempted',
      title: 'Questions Attempted',
      type: 'numeric',
      sortable: true,
    },
    {
      headerClassName: 'leaderboardHeader',
      field: 'percentCorrect',
      title: 'Percent Correct',
      type: 'numeric',
      sortable: true,
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
    <div>
      <MaterialTable
        title='Trivia Leaderboard'
        data={rows}
        columns={columns}
        options={{
          paging: true,
          pageSize: 20,
          pageSizeOptions: [10, 20],
          draggable: false,
          showFirstLastPageButtons: false,
          emptyRowsWhenPaging: false,
          thirdSortClick: false,
        }}
      />
    </div>
  );
};

export default Leaderboard;
