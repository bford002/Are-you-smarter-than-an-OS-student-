import React, { useState, useEffect } from 'react';
import Questions from '../Components/Questions.jsx';

const TriviaPage = ({ user, setUser, daily, customLink }) => {
  return (
    <div className='welcome'>
      <h1>Here are your questions:</h1>
      <Questions user={user} setUser={setUser} customLink={customLink} />
    </div>
  );
};

export default TriviaPage;
