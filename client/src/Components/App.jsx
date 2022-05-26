import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from '../Pages/Home.jsx';
import { Navbar } from '../Components/NavBar.jsx';
import UserProfile from '../Pages/UserProfile.jsx';
import TriviaPage from '../Pages/Trivia.jsx';

// const CLIENT_URL = process.env.CLIENT_URL;
// const PORT = process.env.PORT;

export const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
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
      await axios(options)
        .then((res) => {
          if (res.status === 200) {
            return res;
          }
        })
        .then((resObj) => {
          // console.log(resObj);
          setUser(resObj.data.user);
        })
        .then(() => console.log(user))
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
            <Route
              path='/userprofile'
              element={<UserProfile user={user} getUser={setUser} />}
            />
            <Route
              path='/trivia'
              element={user ? <TriviaPage user={user} /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
