import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { Link } from '@material-ui/core';
import axios from 'axios';
import '../App.css';

// TABLE MATERIALUI
import MaterialTable from '@material-table/core';




const Leaderboard = ({ user, users }) => {


  const columns = [
    { field: 'id', 
      headerClassName: 'leaderboardHeader', 
      title: 'Username',  
      render: rowData => <Link href={`/profile/${rowData.id[0].key}`}>{rowData.id}</Link>
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
        id: [<img src={user.imageUrl} className='avatar' key={user._id} />, user.username],
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
          pageSize: 10,
          pageSizeOptions: [5, 10, 20],
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
