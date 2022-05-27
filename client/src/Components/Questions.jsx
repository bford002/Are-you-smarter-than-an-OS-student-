import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question.jsx';

const Questions = ({ user, setUser, daily, customLink }) => {
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    const getQuestions = () => {
      console.log(customLink);
      axios.get(customLink || process.env.TRIVIA_URL).then((data) => {
        console.log(customLink);
        setQuestions(data.data.results);
      });
    };
    getQuestions();
  }, []);

  return (
    <div className='questions'>
      {questions
        ? questions.map((question, index, collection) => {
            return (
              <div className='Question'>
                <Question
                  setUser={setUser}
                  user={user}
                  question={question}
                  key={`q${index}`}
                />
              </div>
            );
          })
        : 'Loading Questions...'}
    </div>
  );
};

export default Questions;
