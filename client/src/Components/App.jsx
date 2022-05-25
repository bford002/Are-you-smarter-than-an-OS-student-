import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from '../Pages/Home.jsx';
import Leaderboard from '../Pages/Leaderboard.jsx';


import { Navbar } from '../Components/NavBar.jsx';

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
    getUser();
  }, []);



  return (
    <div>
      <Navbar user={user} />
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<Home user={user} />} />
            <Route path='/leaderboard' element={<Leaderboard user={user} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
