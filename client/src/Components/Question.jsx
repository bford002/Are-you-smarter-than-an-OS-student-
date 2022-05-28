import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const Question = ({user, setUser, question, correctAnswers, setCorrectAnswers, attemptedQs, setAttemptedQs, qIndex}) => {
  const [answered, setAnswered] = useState(false);
  const [selection, setSelection] = useState(null);
  
  const answers = question.incorrect_answers.reduce((result, answer)=>{
    result.push(answer);
    return result;
  }, []);

  answers.push(question.correct_answer);

  const shuffleAnswers = ()=>{
    answers.forEach(( answer, currentIndex) => {
      const randomIndex = Math.floor(Math.random() * answers.length);
      [answers[currentIndex], answers[randomIndex]] = [answers[randomIndex], answers[currentIndex]];
    });
  };
  shuffleAnswers();
  
  

  const updateCorrect = ()=>{
    axios.patch(`${process.env.CLIENT_URL}:${process.env.PORT}/users/${user._id}`, {
      qAttempted: user.qAttempted + 1,
      qCorrect: user.qCorrect + 1
    })
      .then((user)=>{
        setUser(user.data[0]);
        setCorrectAnswers(correctAnswers + 1);
        setAttemptedQs(attemptedQs + 1);
      });
  };

  const updateIncorrect = ()=>{
    axios.patch(`${process.env.CLIENT_URL}:${process.env.PORT}/users/${user._id}`, {
      qAttempted: user.qAttempted + 1,
    })
      .then((user)=>{
        setAttemptedQs(attemptedQs + 1);
        setUser(user.data[0]);
      });
  };
  
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
            .replace(/&Uacute;/g, 'Ú')
            .replace(/&uacute;/g, 'ú')
            .replace(/&amp;/g, '&')
            .replace(/&iacute;/g, 'í')
            .replace(/&Iacute;/g, 'Í')
            .replace(/&aacute;/g, 'á')
            .replace(/&Aacute;/g, 'Á')
            .replace(/&lrm/g, '')
            .replace(/&Oacute;/g, 'Ó')
            .replace(/&oacute;/g, 'ó') 
            .replace(/&ouml;/g, 'ö')
            .replace(/&Ouml;/g, 'Ö')
            .replace(/&minus;/g, '−')
            .replace(/&Uuml;/g, 'Ü')
            .replace(/&uuml;/g, 'ü')
            .replace(/&Aring;/g, 'Å')
            .replace(/&aring;/g, 'å')
            .replace(/&sup2;/g, '²')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&Ntilde;/g, 'Ñ')
            .replace(/&ntilde;/g, 'ñ')
            .replace(/&lsquo;/g, '\'')
            .replace(/&rsquo;/g, '\'')
            .replace(/&divide/g, '÷')
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
                        .replace(/&Uacute;/g, 'Ú')
                        .replace(/&uacute;/g, 'ú')
                        .replace(/&amp;/g, '&')
                        .replace(/&iacute;/g, 'í')
                        .replace(/&Iacute;/g, 'Í')
                        .replace(/&aacute;/g, 'á')
                        .replace(/&Aacute;/g, 'Á')
                        .replace(/&lrm/g, '')
                        .replace(/&Oacute;/g, 'Ó')
                        .replace(/&oacute;/g, 'ó') 
                        .replace(/&ouml;/g, 'ö')
                        .replace(/&Ouml;/g, 'Ö')
                        .replace(/&minus;/g, '−')
                        .replace(/&Uuml;/g, 'Ü')
                        .replace(/&uuml;/g, 'ü')
                        .replace(/&Aring;/g, 'Å')
                        .replace(/&aring;/g, 'å')
                        .replace(/&sup2;/g, '²')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&Ntilde;/g, 'Ñ')
                        .replace(/&ntilde;/g, 'ñ')
                        .replace(/&lsquo;/g, '\'')
                        .replace(/&rsquo;/g, '\'')
                        .replace(/&divide/g, '÷') } is the correct answer!`
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
                    .replace(/&Uacute;/g, 'Ú')
                    .replace(/&uacute;/g, 'ú')
                    .replace(/&amp;/g, '&')
                    .replace(/&iacute;/g, 'í')
                    .replace(/&Iacute;/g, 'Í')
                    .replace(/&aacute;/g, 'á')
                    .replace(/&Aacute;/g, 'Á')
                    .replace(/&lrm/g, '')
                    .replace(/&Oacute;/g, 'Ó')
                    .replace(/&oacute;/g, 'ó') 
                    .replace(/&ouml;/g, 'ö')
                    .replace(/&Ouml;/g, 'Ö')
                    .replace(/&minus;/g, '−')
                    .replace(/&Uuml;/g, 'Ü')
                    .replace(/&uuml;/g, 'ü')
                    .replace(/&Aring;/g, 'Å')
                    .replace(/&aring;/g, 'å')
                    .replace(/&sup2;/g, '²')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&Ntilde;/g, 'Ñ')
                    .replace(/&ntilde;/g, 'ñ')
                    .replace(/&lsquo;/g, '\'')
                    .replace(/&rsquo;/g, '\'')
                    .replace(/&divide/g, '÷') } is an incorrect answer! The answer was: ${question.correct_answer
                    .replace(/&#039;/g, '\'')
                    .replace(/&quot;/g, '"')
                    .replace(/&rsquo;/g, '\'')
                    .replace(/&rdquo;/g, '\"')
                    .replace(/&ldquo;/g, '\"')
                    .replace(/&hellip;/g, '...')
                    .replace(/&shy;/g, '-')
                    .replace(/&Eacute;/g, 'É')
                    .replace(/&eacute;/g, 'é')
                    .replace(/&Uacute;/g, 'Ú')
                    .replace(/&uacute;/g, 'ú')
                    .replace(/&amp;/g, '&')
                    .replace(/&iacute;/g, 'í')
                    .replace(/&Iacute;/g, 'Í')
                    .replace(/&aacute;/g, 'á')
                    .replace(/&Aacute;/g, 'Á')
                    .replace(/&lrm/g, '')
                    .replace(/&Oacute;/g, 'Ó')
                    .replace(/&oacute;/g, 'ó') 
                    .replace(/&ouml;/g, 'ö')
                    .replace(/&Ouml;/g, 'Ö')
                    .replace(/&minus;/g, '−')
                    .replace(/&Uuml;/g, 'Ü')
                    .replace(/&uuml;/g, 'ü')
                    .replace(/&Aring;/g, 'Å')
                    .replace(/&aring;/g, 'å')
                    .replace(/&sup2;/g, '²')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&Ntilde;/g, 'Ñ')
                    .replace(/&ntilde;/g, 'ñ')
                    .replace(/&lsquo;/g, '\'')
                    .replace(/&rsquo;/g, '\'')
                    .replace(/&divide/g, '÷') }.` }</div>
              } 
            </span> : 
            <span className='incorrectAnswer'>
              Make your selection!
            </span>
        }
      </h2>
      {
        answers.map((answer, index) => {
          return <span key={`q#${qIndex}a#${index}`} className='answer' >
            <Button 
              className ='answerButton' 
              onClick={
                () => {
                  setAnswered(true);
                  setSelection(answer);
                  answer === question.correct_answer ?            
                    (updateCorrect(), setCorrectAnswers(correctAnswers + 1)) :
                    updateIncorrect();
                  setAttemptedQs(attemptedQs + 1);
                  
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
                  .replace(/&Uacute;/g, 'Ú')
                  .replace(/&uacute;/g, 'ú')
                  .replace(/&amp;/g, '&')
                  .replace(/&iacute;/g, 'í')
                  .replace(/&Iacute;/g, 'Í')
                  .replace(/&aacute;/g, 'á')
                  .replace(/&Aacute;/g, 'Á')
                  .replace(/&lrm/g, '')
                  .replace(/&Oacute;/g, 'Ó')
                  .replace(/&oacute;/g, 'ó') 
                  .replace(/&ouml;/g, 'ö')
                  .replace(/&Ouml;/g, 'Ö')
                  .replace(/&minus;/g, '−')
                  .replace(/&Uuml;/g, 'Ü')
                  .replace(/&uuml;/g, 'ü')
                  .replace(/&Aring;/g, 'Å')
                  .replace(/&aring;/g, 'å')
                  .replace(/&sup2;/g, '²')
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&Ntilde;/g, 'Ñ')
                  .replace(/&ntilde;/g, 'ñ')
                  .replace(/&lsquo;/g, '\'')
                  .replace(/&rsquo;/g, '\'')
                  .replace(/&divide/g, '÷')
              }
            </Button>
          </span>;
        })
      }
    </div>
  );
};

export default Question;
