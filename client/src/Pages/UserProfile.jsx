import React, { useState } from 'react';
import EditUsername from '../Components/EditUsername.jsx';
import EditImage from '../Components/EditImage.jsx';
import { Typography, Toolbar, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserProfile = ({ user, getUser, editable }) => {
  const [displayEditImage, setDisplayEditImage] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteText, setDeleteText] = useState('');

  const addDefaultProfile = () => {
    axios
      .patch(
        `${process.env.CLIENT_URL}:${process.env.PORT}/users/${user._id}`,
        {
          imageUrl:
            'https://cdn.vox-cdn.com/thumbor/K4azxx_uAtMBZzX62PSimw8Vnjo=/305x0:620x300/1220x813/filters:focal(416x93:514x191):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/54012879/twitter_eggandgumdrop.0.jpg',
        }
      )
      .then((user) => {
        getUser(user.data[0]);
      });
  };

  const displayDeleteButton = () => {
    setShowDelete(true);
  };

  const inputChange = (e) => {
    setDeleteText(e.target.value);
  };

  const deleteAccount = () => {
    if (deleteText === 'DELETE') {
      axios
        .delete(
          `${process.env.CLIENT_URL}:${process.env.PORT}/users/${user._id}`
        )
        .then((results) => {
          console.log(results);
        });
    }
  };

  return (
    <div
      className='userProfile'
      style={{ marginLeft: '20%', marginRight: '20%' }}
    >
      <div
        className='left'
        style={{
          width: '50%',
          float: 'left',
        }}
      >
        <Toolbar
          sx={{ marginLeft: '20%', marginTop: '8%', textAlign: 'center' }}
        >
          <Typography className='profileName' variant='h3'>
            {user ? user.username : 'Loading...'}
          </Typography>
          {editable && <EditUsername user={user} getUser={getUser} />}
        </Toolbar>
        <h1 className='profileAvatar'>
          {user ? (
            <div>
              {editable ? (
                <div
                  className='overlayBox'
                  onClick={() => {
                    setDisplayEditImage(!displayEditImage);
                  }}
                  style={{ marginLeft: '21%' }}
                >
                  <img src={user.imageUrl} className='image' />
                  <div className='overlay'>
                    <div className='overlayText'>Click to Change</div>
                  </div>
                </div>
              ) : (
                <div style={{ marginLeft: '21%' }}>
                  <img src={user.imageUrl} className='image' />
                </div>
              )}
              {displayEditImage && editable && (
                <EditImage
                  user={user}
                  getUser={getUser}
                  setDisplayEditImage={setDisplayEditImage}
                  displayEditImage={displayEditImage}
                />
              )}
            </div>
          ) : (
            'Loading...'
          )}
        </h1>
        {editable && (
          <div>
            <Button variant='contained' onClick={addDefaultProfile}>
              Add default profile image
            </Button>
            <Button variant='contained' onClick={displayDeleteButton}>
              Delete Account
            </Button>
            {showDelete && (
              <div style={{ marginTop: '10px' }}>
                <TextField
                  id='standard-basic'
                  label='DELETE'
                  variant='standard'
                  value={deleteText}
                  onChange={inputChange}
                  error={true}
                  helperText={'Type "DELETE" to delete your account'}
                />
                <Button
                  variant='contained'
                  onClick={deleteAccount}
                  href={
                    deleteText === 'DELETE' &&
                    `${process.env.CLIENT_URL}:${process.env.PORT}/auth/logout`
                  }
                >
                  DELETE
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className='right'
        style={{
          width: '50%',
          float: 'right',
        }}
      >
        <h1 className='profileStats'>
          {user ? (
            <div>
              <h1 className='profileStats'>Stats</h1>
              Games Won: {user.wins}
              <br></br>
              Games Played : {user.totalGames} <br></br>
              Win Percentage :
              {Math.round((user.wins / user.totalGames) * 100) > 0
                ? ' ' + Math.round((user.wins / user.totalGames) * 100) + '%'
                : ' -'}
              <br></br>
              Question Correct : {user.qCorrect}
              <br></br>
              Question Attempted : {user.qAttempted}
              <br></br>
              Percent Correct :
              {Math.round((user.qCorrect / user.qAttempted) * 100)
                ? ' ' +
                  Math.round((user.qCorrect / user.qAttempted) * 100) +
                  '%'
                : ' -'}
              <br></br>
            </div>
          ) : (
            'Loading...'
          )}
        </h1>
      </div>
    </div>
  );
};

export default UserProfile;
