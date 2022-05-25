import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question.jsx';

const Questions = () => {
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    const getQuestions = () => {
      axios.get(process.env.TRIVIA_URL)
        .then((data) => {
          setQuestions(data.data.results);
        });
    };
    getQuestions();
  }, []);
  
  return (
    <div className='questions'>
      {
        questions ? questions.map((question, index, collection) => {
          return <Question question = {question} key = {`q${index}`}/>;
        }) : 'Loading Questions...'
      }
    </div>
  );
};

export default Questions;
