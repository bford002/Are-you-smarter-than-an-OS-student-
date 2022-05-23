import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      const options = {
        url: 'http://localhost:3000/auth/login/success',
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
  // axios.get('/users')
  //   .then((users)=>{
  //     console.log(users.data);
  //   });
  //
  return (
    <div>
      <h1>We made it! { user ? user.name : 'Guest' }</h1>
      { user ? <a href='http://localhost:3000/auth/logout'>
        <button>Logout</button>
      </a> : <a href='http://localhost:3000/auth/google'>
        <button>Login</button>
      </a> }
    </div>
  );
};
