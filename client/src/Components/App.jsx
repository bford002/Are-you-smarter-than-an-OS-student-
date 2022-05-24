import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from '../Pages/Home.jsx';
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
<<<<<<< HEAD
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home user={user} />} />
          <Route path='/trivia' element={<Trivia user={user} />} />

        </Routes>
      </div>
    </BrowserRouter>
=======
    <div>
      <Navbar user={user} />
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<Home user={user} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
>>>>>>> 0e46f3ffa6a6c4fdf6f9498986fc8e226465cf81
  );
};
