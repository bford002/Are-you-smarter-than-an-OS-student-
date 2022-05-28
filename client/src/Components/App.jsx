import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from '../Pages/Home.jsx';
import Leaderboard from '../Pages/Leaderboard.jsx';
import Profile from './Profile.jsx';
import Custom from '../Pages/Custom.jsx';
import Daily from '../Pages/Daily.jsx';

import { Navbar } from '../Components/NavBar.jsx';
import UserProfile from '../Pages/UserProfile.jsx';
import TriviaPage from '../Pages/TriviaPage.jsx';


export const App = () => {
  const [user, setUser] = useState(null);
  const [customLink, setCustomLink] = useState(null);

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
          const _id = resObj.data.user._id;
          return _id;
        })
        .then((_id) => {
          axios
            .get(`${process.env.CLIENT_URL}:${process.env.PORT}/users/${_id}`)
            .then((results) => {
              // console.log(results.data[0]);
              setUser(results.data[0]);
            });
        })
        .then(() => {
          // console.log(user)
        })
        .catch((err) => {
          console.error(err, 'something went wrong');
        });
    };
    getUser(), getAllUsers();
  }, [customLink]);

  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    axios
      .get('/users')
      .then((results) => {
        // console.log(results.data);
        // const [users, setUsers] = useState(results.data);
        //SET STATE
        setUsers(
          results.data.sort((a, b) => {
            let tempA = Math.round((a.qCorrect / a.qAttempted) * 100) + '%';
            let tempB = Math.round((b.qCorrect / b.qAttempted) * 100) + '%';        
            if (tempA === '-') {
              tempA = 0;
            }
            if (tempB === '-') {
              tempB = 0;
            }
            return parseInt(tempB) - parseInt(tempA);
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <Navbar user={user} />
      <BrowserRouter>

        {users.map((user) => {
          return <Link to={'/profile/' + user._id} key={user._id} />;
        })}

        <div>
          <Routes>
            <Route
              path='/'
              element={
                <Home
                  user={user}
                  users={users}
                  setUser={setUser}
                  setCustomLink={setCustomLink}
                />
              }
            />
            <Route
              path='/custom/'
              element={
                <Custom user={user} setUser={setUser} customLink={customLink} />
              }
            />
            <Route
              path='/daily/'
              element={<Daily user={user} setUser={setUser} />}
            />

            <Route path='/' element={<Home user={user} />} />
            <Route
              path='/leaderboard'
              element={<Leaderboard users={users} />}
            />
            <Route path='/profile/:_id' element={<Profile users={users} />} />
            <Route
              path='/userprofile'
              element={
                <UserProfile user={user} getUser={setUser} editable={true} />
              }
            />
            <Route
              path='/trivia'
              element={
                user ? (
                  <TriviaPage user={user} setUser={setUser} />
                ) : (
                  <Home user={user} />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
