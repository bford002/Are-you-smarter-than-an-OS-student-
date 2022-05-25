import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const Question = (question) => {
  const answers = [];
  question.question.incorrect_answers.forEach((answer) => {
    answers.push(answer);
  });
  answers.push(question.question.correct_answer);
  for (let i = 0; i < answers.length; i++) {
    const rand = Math.floor(Math.random() * answers.length);

    [answers[i], answers[rand]] = [answers[rand], answers[i]];
  }
  return (
    <div>
      <h1 className='question'>
        {
          question.question.question
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
      {
        answers.map((answer, index) => {
          return <span key={`answer${index}`} className='answer' >
            <Button onClick={(e) => {
              answer === question.question.correct_answer ?
                console.log(`${answer} is the correct answer the question: ${question.question.question}`) :
                console.log(`${answer} is an incorrect answer to the question: ${question.question.question}`);
            }}>
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
