import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
<<<<<<< HEAD
import Leaderboard from './Leaderboard.jsx';
=======
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Home from '../Pages/Home.jsx';
>>>>>>> 1704f2f4e2832907e87c65b70132ba410fdb5498

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
        }
      };
      axios(options)
        .then((res) => {
          if (res.status === 200) {
            return res;
          }
        })
        .then((resObj) => {
          console.log(resObj);
          setUser(resObj.data.user);
        })
        .catch((err) => {
          console.error(err, 'something went wrong');
        });
    };
    getUser();
  }, []);
  return (
<<<<<<< HEAD
    <div>
      <h1>Welcome, { user ? user.name : 'guest' }</h1>
      { user ? <a href={ `${CLIENT_URL}:${PORT}/auth/logout` }>
        <button>Logout</button>
      </a> : <a href={ `${CLIENT_URL}:${PORT}/auth/google` }>
        <button>Login</button>
      </a> }
      {
        <div>
          <Leaderboard />
        </div>
      }
    </div>
=======
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home user={user} />} />


        </Routes>
      </div>
    </BrowserRouter>
>>>>>>> 1704f2f4e2832907e87c65b70132ba410fdb5498
  );
};
