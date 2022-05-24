import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    <div>
      <h1>Leaderboard</h1>
      {
        users.map((user, index) => {
          return <table>
            <tr>
              <td>Username</td>
              <td>Wins</td>
              <td>Games Played</td>
              <td>Correct Answers</td>
              <td>Questions Attempted</td>
            </tr>
            <tr>
              <th>{ user.username }</th>
              <td>{ user.wins }</td>
              <td>{ user.totalGames }</td>
              <td>{ user.qCorrect }</td>
              <td>{ user.qAttempted }</td>
            </tr>         
          </table>;
        })
      }
    </div>
  );

};

export default Leaderboard;
