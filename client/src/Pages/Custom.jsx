import React from 'react';
import TriviaPage from './TriviaPage.jsx';

const Custom = ({ user, setUser, customLink }) => {
  return (
    <div>
      {customLink ? (
        <TriviaPage setUser={setUser} user={user} customLink={customLink} />
      ) : (
        'Loading questions...'
      )}
    </div>
  );
};

export default Custom;
