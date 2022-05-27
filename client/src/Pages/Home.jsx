import React, { useState } from 'react';
import { Button } from '@mui/material';
import GameMode from '../Components/GameMode.jsx';
import TopFive from '../Components/TopFive.jsx';

const Home = ({ user, setUser, setCustomLink, users }) => {
  const gameModes = ['Daily', 'Classic', 'Custom'];

  // FOR TOP 5 BUTTON
  const [displayTopFive, setDisplayTopFive] = useState(false);

  const displayTopFiveClick = () => {
    setDisplayTopFive(!displayTopFive);
  };


  const onMouseOver = (e) => {
    e.target.style.background = 'rgb(63, 81, 181)';
  };



  return (
    <div>
      <h1 className='homeTitle'>Are you smarter than an OS Student?!</h1>
      {user ? (
        <div className='gameSelection'>
          {gameModes.map((gameMode, i) => {
            return (
              <GameMode
                key={gameMode + i}
                type={gameMode}
                user={user}
                setUser={setUser}
                setCustomLink={setCustomLink}
              />
            );
          })}
        </div>
      ) : (
        // <Button
        //   href='/trivia'
        //   variant='contained'
        //   sx={{ width: '20%', marginLeft: '40%', marginRight: '40%' }}
        // >
        //   Click to play!
        // </Button>
        <Button
          variant='contained'
          href={`${process.env.CLIENT_URL}:${process.env.PORT}/auth/google`}
          sx={{ width: '20%', marginLeft: '40%', marginRight: '40%' }}
        >
          Login to play!
        </Button>
      )}
      <div style={{
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <Button
          className='dailyLeaderboardButton'
          sx={{ color: 'white', fontSize: '16px', backgroundColor: 'rgb(63, 81, 181)' }}
          variant='text'
          onClick={displayTopFiveClick}
          onMouseOver={onMouseOver}
        >
          { displayTopFive ? 'Hide Top 5' : 'Show Top 5' }
        </Button>
        <div>
          {
            displayTopFive ? <TopFive users={users} /> : ''
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
