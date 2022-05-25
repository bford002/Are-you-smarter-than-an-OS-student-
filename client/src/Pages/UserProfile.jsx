import React from 'react';
import axios from 'axios';

// do axios request to patch a user when they click certain buttons
// send along whatever you need
// get user again to update info
// patch should always send an object where {thingtochange: changed info}
// seperate username and avatar to diffrent sides of screen
// make avatar clickable to then show a component that allows you to change your avatar
// add edit button to side of username, when clicked do show component

const UserProfile = ({ user }) => {
  return (
    <div>
      <h1 className='profileName'>{user ? user.username : 'Loading...'}</h1>
      <h1 className='profileAvatar'>
        {user ? <img src={user.imageUrl} /> : 'Loading...'}
      </h1>
      <h1 className='profileStats'>
        {user ? (
          <div>
            <h1 className='profileStats'>Stats</h1>
            Games Won: {user.wins}
            <br></br>
            Games Played : {user.totalGames} <br></br>
            Win / Loss Ratio :
            {user.wins % user.totalGames === 0
              ? `${user.wins / user.totalGames}.00`
              : user.wins / user.totalGames}
            <br></br>
            Question Correct : {user.qCorrect}
            <br></br>
            Question Attempted : {user.qAttempted}
            <br></br>
            Ratio :
            {user.qCorrect % user.qAttempted === 0
              ? `${user.qCorrect / user.qAttempted}.00`
              : user.qCorrect / user.qAttempted}
            <br></br>
          </div>
        ) : (
          'Loading...'
        )}
      </h1>
      {console.log(user)}
    </div>
  );
};

export default UserProfile;
