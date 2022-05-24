import React from 'react';

const Home = ({ user }) => {
  return (
    <div className='welcome'>
      {console.log}
      <h1>Welcome, {user ? user.name : 'guest'}</h1>

      {user ? (
        <a href={`${process.env.CLIENT_URL}:${process.env.PORT}/auth/logout`}>
          <button>Logout</button>
        </a>
      ) : (
        <a href={`${process.env.CLIENT_URL}:${process.env.PORT}/auth/google`}>
          <button>Login</button>
        </a>
      )}
    </div>
  );
};

export default Home;
