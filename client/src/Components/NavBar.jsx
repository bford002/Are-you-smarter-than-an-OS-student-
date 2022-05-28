import React from 'react';
import axios from 'axios';
import { AppBar, Toolbar } from '@material-ui/core';
import { Button, Typography, Link } from '@mui/material';

export const Navbar = ({ user }) => {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            className='navTitle'
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px',
              letterSpacing: '2px',
              textDecoration: 'none',
              boxShadow: 'none',
            }}
            component={Link}
            href='/'
          >
            Trivia
          </Typography>
          {user ? (
            <div className='loginSuccess'>
              <div className='userInfo'>
                <Typography
                  variant='h6'
                  className='navUserName'
                  sx={{
                    color: 'white',
                    fontSize: '18px',
                    marginRight: '10px',
                    textDecoration: 'none',
                    boxShadow: 'none',
                  }}
                  component={Link}
                  href='/userprofile'
                >
                  {user.username}
                </Typography>
                <img src={user.imageUrl} className='avatar' />
              </div>
              <Button
                className='logoutButton'
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}
                variant='text'
                href='/leaderboard'
              >
                Leaderboard
              </Button>
              <Button
                className='logoutButton'
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}
                variant='text'
                href={`${process.env.CLIENT_URL}:${process.env.PORT}/auth/logout`}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button
                className='logoutButton'
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}
                variant='text'
                href='/leaderboard'
              >
                Leaderboard
              </Button>
              <Button
                className='loginButton'
                size='small'
                sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}
                variant='text'
                href={`${process.env.CLIENT_URL}:${process.env.PORT}/auth/google`}
              >
              Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
