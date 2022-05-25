import React from 'react';
import Questions from '../Components/Questions.jsx';


const TriviaPage = () => {
  return (
    <div className='welcome'>
      <h1>Here are your questions:</h1>
      <Questions />
    </div>
  );
};

export default TriviaPage;
