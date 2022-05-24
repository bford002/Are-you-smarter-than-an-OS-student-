import React from 'react';
import axios from 'axios';

export const Trivia = () => {
  axios.get('/users')
    .then((users)=>{
      console.log(users.data);
    });
  return (
    <div>
      <h1>We made it! { new Date().toString() }</h1>
    </div>
  );
};