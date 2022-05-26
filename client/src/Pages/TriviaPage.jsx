import React, { useState, useEffect } from 'react';
import Questions from '../Components/Questions.jsx';
import axios from 'axios';


const TriviaPage = ({user, setUser}) => {
  return (
    <div className='welcome'>
      <h1>Here are your questions:</h1>
      <Questions user = {user} setUser={setUser}/>
    </div>
  );
};

export default TriviaPage;
