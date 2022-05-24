import React, { useState, useEffect } from 'react';
import axios from 'axios';




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
        questions ? questions.map((question, index, collection)=>{
          const answers = [];
          question.incorrect_answers.forEach((answer)=>{
            answers.push(answer);
          });
          answers.push(question.correct_answer);
          for (let i = 0; i < answers.length; i++) {
            const rand = Math.floor(Math.random() * answers.length);

            [answers[i], answers[rand]] = [answers[rand], answers[i]];
          }
          return (
            <div className='QuestionAndAnswer' key={`question: ${index}`}>
              <div className='question'>
                {
                  question.question
                }
              </div>
              <div className='answers'>
                
                {
                  answers.map((answer, index)=>{
                    return <div className='answer' key={`answer${index}`} >{answer}</div>;
                    
                  })              
                }
              </div>
            </div>
          );
        }) : 'Loading Questions...'
      }
    </div>
  );
};

export default Questions;
