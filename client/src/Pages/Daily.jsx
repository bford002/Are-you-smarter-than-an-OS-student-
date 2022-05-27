import React, { useState } from 'react';
import TriviaPage from './TriviaPage.jsx';

const Daily = () => {
  const [daily, setDaily] = useState();
  return (
    <div>
      {console.log(customLink)}
      {customLink ? (
        <TriviaPage setUser={setUser} user={user} daily={daily} />
      ) : (
        'Loading your questions'
      )}
    </div>
  );
};

export default Daily;
