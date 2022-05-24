import React from 'react';

const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT;

const Home = ({user}) => {
  return (
    <div className='welcome'>
      {console.log}
      <h1>Welcome, { user ? user.name : 'guest' }</h1>

      { user ?
        <a href={ `${CLIENT_URL}:${PORT}/auth/logout` }>
          <button>Logout</button>
        </a> 
        : <a href={ `${CLIENT_URL}:${PORT}/auth/google` }>
          <button>Login</button>
        </a> }
    </div>
  );
};

export default Home;
