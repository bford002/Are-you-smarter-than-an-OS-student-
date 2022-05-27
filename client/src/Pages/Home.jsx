import React from 'react';
import { Button } from '@mui/material';
import GameMode from '../Components/GameMode.jsx';

const Home = ({ user, setUser, setCustomLink }) => {
  const gameModes = ['Daily', 'Classic', 'Custom'];

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
    </div>
  );
};

export default Home;
