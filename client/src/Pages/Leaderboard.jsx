import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { Link, Typography, TablePagination } from '@material-ui/core';
import axios from 'axios';
import '../App.css';

//uncomment for local testing. Remember to comment when pushing to main branch.
const CLIENT_URL = `${process.env.CLIENT_URL}`; //:${process.env.PORT}`;

// TABLE MATERIALUI
import MaterialTable, { MTableToolbar, MTablePagination } from '@material-table/core';




const Leaderboard = ({ user, users }) => {

  const [isLoading, setIsLoading] = useState(true);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const Title = ({ text = 'Trivia Leaderboard', variant = 'h4' }) => (
    <Typography
      variant={variant}
      style={{ 
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
      }}
      className='leaderboardTitle'
    >
      {text}
    </Typography>
  );


  const columns = [
    { field: 'id', 
      headerClassName: 'leaderboardHeader', 
      title: 'Username',  
      render: rowData => <Link href={`${CLIENT_URL}/profile/${rowData.id[0].key}`} style={{color: 'white'}} className='leaderboardLinks' >{rowData.id}</Link>
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
      customSort: (a, b) => (a.percentCorrect[0] + a.percentCorrect[1]) - (b.percentCorrect[0] + b.percentCorrect[1])
    }
  ];
  
  const rows =
    users.map(user => {
      return {
        id: [<img src={user.imageUrl} className='avatar' key={user._id} />, user.username],
        wins: user.wins,
        gamesPlayed: user.totalGames, 
        correctAnswers: user.qCorrect, 
        questionsAttempted: user.qAttempted,
        percentCorrect: user.qAttempted === 0 ? '-' : Math.round(user.qCorrect / user.qAttempted * 100) + '%'
      };
    });


  return (
    <div>
      <MaterialTable
        isLoading={isLoading}
        // onChangeRowsPerPage={}
        title={<Title />}
        data={rows}
        columns={columns}
        options={{
          pageSize: 10,
          draggable: false,
          showFirstLastPageButtons: false,
          emptyRowsWhenPaging: false,
          thirdSortClick: false,
          headerStyle: {
            color: '#FFFFFF',
            backgroundColor: '#6e6e6e',
            textShadow: '3px 2px 3px rgba(255,255,255,.2)',
            fontWeight: 'bold'
          },
          cellStyle: {
            backgroundColor: '#333333',
            color: 'white'
          },
        }}
      />
    </div>
  );
};

export default Leaderboard;
