import React from 'react';
import TriviaPage from './TriviaPage.jsx';

const Custom = ({ user, setUser, customLink }) => {
  return (
    <div>
      {console.log(customLink)}
      {customLink ? (
        <TriviaPage setUser={setUser} user={user} customLink={customLink} />
      ) : (
        'Loading your questions'
      )}
    </div>
  );
};

export default Custom;
