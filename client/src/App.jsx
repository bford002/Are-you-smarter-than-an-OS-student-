import React from 'react';
import axios from 'axios';

export const App = () => {
  const persons = [];
  axios.get('/users')
    .then((users)=>{
      console.log(users.data);
    });
  return (
    <div>
      <h1>Welcome from AWS { new Date().toString() }</h1>
    </div>
  );
};
