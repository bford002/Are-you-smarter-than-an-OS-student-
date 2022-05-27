import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { Link, Typography, TablePagination } from '@material-ui/core';
import axios from 'axios';
import '../App.css';

// TABLE MATERIALUI
import MaterialTable, { MTableToolbar, MTablePagination } from '@material-table/core';

const TopFive = ({ user, users }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [topFive, setTopFive] = useState(users.slice(0, 5));

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const Title = ({ text = 'Top 5', variant = 'h4' }) => (
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
    {
      field: 'rank',
      headerClassName: 'leaderboardHeader',
      title: 'Rank',
      align: 'center',
      render: (rowData) => rowData.tableData.index + 1
    },
    { field: 'id', 
      headerClassName: 'leaderboardHeader', 
      title: 'Username',
      align: 'left',  
      render: rowData => <Link href={`${process.env.CLIENT_URL}:${process.env.PORT}/profile/${rowData.id[0].key}`} 
        style={{color: 'white'}} className='leaderboardLinks' 
      >
        {
          rowData.percentCorrect[0] >= 9 ? rowData.id : [rowData.id[0], rowData.id[1]]
        }
      </Link>
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
    topFive.map(user => {
      return {
        id: [<img src={user.imageUrl} className='avatar' key={user._id} />, 
          user.username, 
          <img className='fireAvatar' 
            src={'https://media.istockphoto.com/vectors/fire-flame-icon-isolated-bonfire-sign-emoticon-flame-symbol-isolated-vector-id1137962021?k=20&m=1137962021&s=612x612&w=0&h=Ub026rl_amXtLNPbMMJRQHDcJ93G_v5d23C55OUtqXk='} />],
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
        title={<Title />}
        data={rows}
        columns={columns}
        options={{
          padding: 'dense',
          paging: false,
          search: false,
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

export default TopFive;
