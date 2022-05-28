import React from 'react';
import TriviaPage from './TriviaPage.jsx';

const Daily = ({ user, setUser }) => {
  const daily = `${process.env.CLIENT_URL}:${process.env.PORT}/questions/`;
  return (
    <div>
      {daily ? (
        <TriviaPage setUser={setUser} user={user} daily={daily} />
      ) : (
        'Loading questions...'
      )}
    </div>
  );
};

export default Daily;
