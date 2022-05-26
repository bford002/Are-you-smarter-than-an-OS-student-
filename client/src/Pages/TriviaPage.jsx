import React from 'react';
import Questions from '../Components/Questions.jsx';


const TriviaPage = ({user, setUser}) => {
  return (
    <div className='welcome'>
      <h1>Here are your questions:</h1>
      <Questions user = {user} setUser={setUser}/>
    </div>
  );
};

export default TriviaPage;
