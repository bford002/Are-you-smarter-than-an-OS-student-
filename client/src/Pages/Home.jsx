import React from 'react';
import { Button } from '@mui/material';

const Home = ({ user }) => {
  return (
    <div>
      <h1 className='homeTitle'>Are you smarter than an OS Student?!</h1>
      {user ? (
        <Button
          href='/trivia'
          variant='contained'
          sx={{ width: '20%', marginLeft: '40%', marginRight: '40%' }}
        >
          Click to play!
        </Button>
      ) : (
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
