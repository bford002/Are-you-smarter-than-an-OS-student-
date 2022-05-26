import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const EditImage = ({
  user,
  getUser,
  setDisplayEditImage,
  displayEditImage,
}) => {
  const [newImg, setNewImg] = useState('');
  const [newImgCloud, setNewImgCloud] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'ibeno',
      uploadPreset: 'trivia',
    },
    (error, result) => {
      if (result.event === 'success') {
        setNewImgCloud(result.info.url);
      }
    }
  );

  const showWidget = () => {
    widget.open();
  };

  useEffect(() => {
    if (newImgCloud) {
      axios
        .patch(
          `${process.env.CLIENT_URL}:${process.env.PORT}/users/${user._id}`,
          { imageUrl: newImgCloud }
        )
        .then((results) => {
          // console.log(results.data[0]);
          getUser(results.data[0]);
        })
        .then(() => {
          setDisplayEditImage(!displayEditImage);
          setNewImgCloud('');
        })
        .catch((err) => console.error(err, 'onSubmit EditUsername'));
    }
  }, [newImgCloud]);

  const onSubmit = () => {
    // console.log('submitted');
    const isImage = (url) => {
      if (typeof url !== 'string') {
        return false;
      }
      return (
        url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
        null
      );
    };

    // console.log(isImage(newImg));

    if (isImage(newImg)) {
      axios
        .patch(
          `${process.env.CLIENT_URL}:${process.env.PORT}/users/${user._id}`,
          { imageUrl: newImg }
        )
        .then((results) => {
          // console.log(results.data[0]);
          getUser(results.data[0]);
        })
        .then(() => {
          setDisplayEditImage(!displayEditImage);
          setNewImg('');
        })
        .catch((err) => console.error(err, 'onSubmit EditUsername'));
    } else {
      setNewImg('');
      setError(true);
      setHelperText('Invalid URL.');
    }
  };
  const inputChange = (e) => {
    setNewImg(e.target.value);
  };
  return (
    <div>
      <Button
        variant='outlined'
        size='large'
        onClick={showWidget}
        startIcon={<AddAPhotoIcon />}
      >
        Upload Image
      </Button>{' '}
      <br></br>
      Or <br></br>
      <TextField
        label={'Input Image URL'}
        error={error}
        helperText={helperText}
        variant='standard'
        value={newImg}
        onChange={inputChange}
      />
      <Button
        size='Large'
        variant='outlined'
        onClick={onSubmit}
        sx={{ marginTop: '14px' }}
      >
        Submit
      </Button>
    </div>
  );
};

export default EditImage;
