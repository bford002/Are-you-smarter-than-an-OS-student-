import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import {BrowserRouter, Route, Routes, Navigate, Link} from 'react-router-dom';
import Home from '../Pages/Home.jsx';
import Leaderboard from '../Pages/Leaderboard.jsx';
import Profile from './Profile.jsx';


import { Navbar } from '../Components/NavBar.jsx';
import UserProfile from '../Pages/UserProfile.jsx';
import TriviaPage from '../Pages/Trivia.jsx';

// const CLIENT_URL = process.env.CLIENT_URL;
// const PORT = process.env.PORT;


export const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      const options = {
        url: `${process.env.CLIENT_URL}:${process.env.PORT}/auth/login/success`,
        method: 'GET',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      };
      axios(options)
        .then((res) => {
          if (res.status === 200) {
            return res;
          }
        })
        .then((resObj) => {
          // console.log(resObj);
          setUser(resObj.data.user);
        })
        .catch((err) => {
          console.error(err, 'something went wrong');
        });
    };
    getUser(), getAllUsers();
  }, []);


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




  return (
    <div>
      <Navbar user={user} />
      <BrowserRouter>

        {
          users.map(user => {
            return <Link to={'/profile/' + user._id} key={user._id} />;
          })
        }

        <div>
          <Routes>
            <Route path='/' element={<Home user={user} />} />
            <Route path='/userprofile' element={<UserProfile user={user} />} />
            <Route path='/leaderboard' element={(user ? <Leaderboard users={users} /> : <Home user={user} />)} />
            <Route path='/trivia' element={(user ? <TriviaPage /> : <Home user={user} />)} />
            <Route path='/profile/:_id' element={(user ? <Profile users={users} /> : <Home user={user} />)} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
