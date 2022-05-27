import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@material-ui/core/IconButton';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const EditUsername = ({ user, getUser }) => {
  const [displayButton, setDisplayButton] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const buttonClick = () => {
    // console.log('click');
    setDisplayButton(!displayButton);
    setDisplayForm(!displayForm);
  };

  const onSubmit = () => {
    // console.log('submitted');

    if (newUserName.length > 2) {
      axios
        .patch(
          `${process.env.CLIENT_URL}:${process.env.PORT}/users/${user._id}`,
          { username: newUserName }
        )
        .then((results) => {
          getUser(results.data[0]);
        })
        .then(() => {
          setDisplayButton(!displayButton);
          setDisplayForm(!displayForm);
          setNewUserName('');
        })
        .catch((err) => {
          setError(true);
          setHelperText('Username already taken');
        });
    } else {
      setError(true);
      setHelperText('Username must be at least 3 characters long');
    }
  };
  const inputChange = (e) => {
    // console.log(e.target.value);
    setNewUserName(e.target.value);
  };

  return (
    <div>
      {displayButton && (
        <IconButton onClick={buttonClick}>
          <EditIcon />
        </IconButton>
      )}
      {displayForm && (
        <div>
          <TextField
            id='standard-basic'
            label='New Username'
            variant='standard'
            value={newUserName}
            onChange={inputChange}
            error={error}
            helperText={helperText}
          />
          <Button variant='outlined' onClick={onSubmit}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditUsername;
