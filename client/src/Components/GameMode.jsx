import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import Custom from '../Pages/Custom.jsx';
import { useNavigate } from 'react-router-dom';

const GameMode = ({ user, setUser, type, setCustomLink }) => {
  const [difficulty, setDifficulty] = useState('Any');
  const [category, setCategory] = useState('Any');
  const [questions, setQuestions] = useState('5');

  const handleDifficulty = (event) => {
    setDifficulty(event.target.value);
  };
  const handleQuestions = (event) => {
    setQuestions(event.target.value);
  };
  const handleCategory = (event) => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };
  const navigate = useNavigate();
  const onSubmitDaily = () => {};
  const onSubmitClassic = () => {};
  const onSubmitCustom = () => {
    //create a link
    let link = `https://opentdb.com/api.php?amount=${questions}`;
    if (category !== 'Any') {
      link = link + `&category=${category}`;
    }
    if (difficulty !== 'Any') {
      link = link + `&difficulty=${difficulty}`;
    }
    console.log(link);
    // setLink
    setCustomLink(link);
    navigate('/custom');
  };

  return (
    <div className='gameMode' style={{ position: 'relative' }}>
      {type === 'Daily' && (
        <div>
          <h1 style={{ textAlign: 'center' }}>{type}</h1>

          <img
            src={'https://static.dezeen.com/uploads/2013/07/dezeen_daily.png'}
            alt=''
            className='img'
          />
          <p className='desc'>Play todays, custom game!</p>
          <Button
            className='gameButton'
            onClick={onSubmitDaily}
            variant='contained'
          >
            Play!
          </Button>
        </div>
      )}
      {type === 'Classic' && (
        <div>
          <h1 style={{ textAlign: 'center' }}>{type}</h1>

          <img
            src={'https://wrds.one/wp-content/uploads/2017/05/Classic.svg'}
            alt=''
            className='img'
          />
          <p className='desc'>Play a Standard Trivia Game!</p>
          <Button
            variant='contained'
            className='gameButton'
            onClick={onSubmitClassic}
            href='/trivia'
          >
            Play!
          </Button>
        </div>
      )}
      {type === 'Custom' && (
        <div>
          <h1 style={{ textAlign: 'center' }}>{type}</h1>
          <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select value={difficulty} onChange={handleDifficulty} label='Age'>
              <MenuItem value={'Any'}>Any</MenuItem>
              <MenuItem value={'easy'}>Easy</MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'hard'}>Hard</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Questions</InputLabel>
            <Select
              value={questions}
              onChange={handleQuestions}
              label='Questions'
            >
              <MenuItem value={'5'}>5</MenuItem>
              <MenuItem value={'10'}>10</MenuItem>
              <MenuItem value={'20'}>20</MenuItem>
              <MenuItem value={'30'}>30</MenuItem>
              <MenuItem value={'40'}>40</MenuItem>
              <MenuItem value={'50'}>50</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={handleCategory} label='Category'>
              <MenuItem value={'Any'}>Any</MenuItem>
              <MenuItem value={'9'}>General Knowledge</MenuItem>
              <MenuItem value={'10'}>Entertainment: Books</MenuItem>
              <MenuItem value={'11'}>Entertainment: Film</MenuItem>
              <MenuItem value={'12'}>Entertainment: Music</MenuItem>
              <MenuItem value={'13'}>
                Entertainment: Musicals & Theaters
              </MenuItem>
              <MenuItem value={'14'}>Entertainment: Television</MenuItem>
              <MenuItem value={'15'}>Entertainment: Video Games</MenuItem>
              <MenuItem value={'16'}>Entertainment: Board Games</MenuItem>
              <MenuItem value={'29'}>Entertainment: Comics</MenuItem>
              <MenuItem value={'31'}>
                Entertainment: Japanese Anime & Manga
              </MenuItem>
              <MenuItem value={'32'}>
                Entertainment: Cartoon & Animations
              </MenuItem>
              <MenuItem value={'17'}>Science & Nature</MenuItem>
              <MenuItem value={'18'}>Science: Computers</MenuItem>
              <MenuItem value={'19'}>Science: Mathematics</MenuItem>
              <MenuItem value={'30'}>Science: Gadgets</MenuItem>
              <MenuItem value={'20'}>Mythology</MenuItem>
              <MenuItem value={'21'}>Sports</MenuItem>
              <MenuItem value={'22'}>Geography</MenuItem>
              <MenuItem value={'23'}>History</MenuItem>
              <MenuItem value={'24'}>Politics</MenuItem>
              <MenuItem value={'25'}>Art</MenuItem>
              <MenuItem value={'26'}>Celebrities</MenuItem>
              <MenuItem value={'27'}>Animals</MenuItem>
              <MenuItem value={'28'}>Vehicles</MenuItem>
            </Select>
          </FormControl>
          <p className='desc'>Customized your game</p>
          <Button
            className='gameButton'
            variant='contained'
            onClick={onSubmitCustom}
          >
            Play!
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameMode;
