import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const Question = ({user, setUser, question, correctAnswers, setCorrectAnswers, attemptedQs, setAttemptedQs, totalQs}) => {
  const answers = [];
  const updateCorrect = ()=>{
    axios.patch(`${process.env.CLIENT_URL}:${process.env.PORT}/users/${user._id}`, {
      qAttempted: user.qAttempted + 1,
      qCorrect: user.qCorrect + 1
    })
      .then((user)=>{
        setUser(user.data[0]);
        setCorrectAnswers(correctAnswers + 1);
        setAttemptedQs(attemptedQs + 1);
      }).then(()=>{
        // alert('yooooo');
        // if (attemptedQs === totalQs && correctAnswers === totalQs) {
        //   alert('You win!');
        // } else {
        //   alert('You did not win');
        // }
      });
  };
  const updateIncorrect = ()=>{
    axios.patch(`${process.env.CLIENT_URL}:${process.env.PORT}/users/${user._id}`, {
      qAttempted: user.qAttempted + 1,
    })
      .then((user)=>{
        setUser(user.data[0]);
        setAttemptedQs(attemptedQs + 1);
      })
      .then(()=>{
        // attemptedQs === totalQs ? alert('Better luck next time!') : alert('Keep playing!');
      });
  };
  const [answered, setAnswered] = useState(false);
  const [selection, setSelection] = useState(null);
  question.incorrect_answers.forEach((answer) => {
    answers.push(answer);
  });
  answers.push(question.correct_answer);
  for (let i = 0; i < answers.length; i++) {
    const rand = Math.floor(Math.random() * answers.length);

    [answers[i], answers[rand]] = [answers[rand], answers[i]];
  }
  return (
    <div>
      <h1 className='question'>
        {
          question.question
            .replace(/&#039;/g, '\'')
            .replace(/&quot;/g, '"')
            .replace(/&rsquo;/g, '\'')
            .replace(/&rdquo;/g, '\"')
            .replace(/&ldquo;/g, '\"')
            .replace(/&hellip;/g, '...')
            .replace(/&shy;/g, '-')
            .replace(/&Eacute;/g, 'É')
            .replace(/&eacute;/g, 'é')
            .replace(/&amp;/g, '&')
            .replace(/&iacute;/g, 'í')
            .replace(/&Iacute;/g, 'Í')
            .replace(/&aacute;/g, 'á')
            .replace(/&Aacute;/g, 'Á')
            .replace(/&lrm/g, '')
            .replace(/&Oacute;/g, 'Ó')
            .replace(/&oacute;/g, 'ó')
        }
      </h1>
      <h2 className='selection'>
        {
          selection ?

            <span className='correctAnswer'> 
              { 
                selection === question.correct_answer ?
                  <div>
                    {
                      `${ selection
                        .replace(/&#039;/g, '\'')
                        .replace(/&quot;/g, '"')
                        .replace(/&rsquo;/g, '\'')
                        .replace(/&rdquo;/g, '\"')
                        .replace(/&ldquo;/g, '\"')
                        .replace(/&hellip;/g, '...')
                        .replace(/&shy;/g, '-')
                        .replace(/&Eacute;/g, 'É')
                        .replace(/&eacute;/g, 'é')
                        .replace(/&amp;/g, '&')
                        .replace(/&iacute;/g, 'í')
                        .replace(/&Iacute;/g, 'Í')
                        .replace(/&aacute;/g, 'á')
                        .replace(/&Aacute;/g, 'Á')
                        .replace(/&lrm/g, '')
                        .replace(/&Oacute;/g, 'Ó')
                        .replace(/&oacute;/g, 'ó') } is the correct answer!`
                    }
                  </div> :
                  <div>{ `${ selection
                    .replace(/&#039;/g, '\'')
                    .replace(/&quot;/g, '"')
                    .replace(/&rsquo;/g, '\'')
                    .replace(/&rdquo;/g, '\"')
                    .replace(/&ldquo;/g, '\"')
                    .replace(/&hellip;/g, '...')
                    .replace(/&shy;/g, '-')
                    .replace(/&Eacute;/g, 'É')
                    .replace(/&eacute;/g, 'é')
                    .replace(/&amp;/g, '&')
                    .replace(/&iacute;/g, 'í')
                    .replace(/&Iacute;/g, 'Í')
                    .replace(/&aacute;/g, 'á')
                    .replace(/&Aacute;/g, 'Á')
                    .replace(/&lrm/g, '')
                    .replace(/&Oacute;/g, 'Ó')
                    .replace(/&oacute;/g, 'ó') } is an incorrect answer! The answer was: ${question.correct_answer
                    .replace(/&#039;/g, '\'')
                    .replace(/&quot;/g, '"')
                    .replace(/&rsquo;/g, '\'')
                    .replace(/&rdquo;/g, '\"')
                    .replace(/&ldquo;/g, '\"')
                    .replace(/&hellip;/g, '...')
                    .replace(/&shy;/g, '-')
                    .replace(/&Eacute;/g, 'É')
                    .replace(/&eacute;/g, 'é')
                    .replace(/&amp;/g, '&')
                    .replace(/&iacute;/g, 'í')
                    .replace(/&Iacute;/g, 'Í')
                    .replace(/&aacute;/g, 'á')
                    .replace(/&Aacute;/g, 'Á')
                    .replace(/&lrm/g, '')
                    .replace(/&Oacute;/g, 'Ó')
                    .replace(/&oacute;/g, 'ó') }.` }</div>
              } 
            </span> : 
            <span className='incorrectAnswer'>
              Make your selection!
            </span>
        }
      </h2>
      {
        answers.map((answer, index) => {
          return <span key={`answer${index}`} className='answer' >
            <Button 
              className ='answerButton' 
              onClick={
                () => {
                  setAnswered(true);
                  setSelection(answer);
                  answer === question.correct_answer ?            
                    updateCorrect() :
                    updateIncorrect();
                }
              }
              variant='contained'
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                backgroundColor: 'darkBlue'
              }}
              disabled={ answered }
            >
              { 
                answer
                  .replace(/&#039;/g, '\'')
                  .replace(/&quot;/g, '"')
                  .replace(/&rsquo;/g, '\'')
                  .replace(/&rdquo;/g, '\"')
                  .replace(/&ldquo;/g, '\"')
                  .replace(/&hellip;/g, '...')
                  .replace(/&shy;/g, '-')
                  .replace(/&Eacute;/g, 'É')
                  .replace(/&eacute;/g, 'é')
                  .replace(/&amp;/g, '&')
                  .replace(/&iacute;/g, 'í')
                  .replace(/&Iacute;/g, 'Í')
                  .replace(/&aacute;/g, 'á')
                  .replace(/&Aacute;/g, 'Á')
                  .replace(/&lrm/g, '')
                  .replace(/&Oacute;/g, 'Ó')
                  .replace(/&oacute;/g, 'ó') 
              }
            </Button>
          </span>;
        })
      }
    </div>
  );
};

export default Question;
