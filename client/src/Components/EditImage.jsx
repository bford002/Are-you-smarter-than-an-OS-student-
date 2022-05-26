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
  // const [widgetRes, setWidgetRes] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'ibeno',
      uploadPreset: 'trivia',
    },
    (error, result) => {
      if (result.event === 'success') {
        // setWidgetRes(result);
        setNewImgCloud(result.info.url);
      }
      // checkUploadResult(result);
    }
  );

  const showWidget = () => {
    widget.open();
  };
  // if event == success mean image uploaded
  // if event == abort means they pressed done on upload
  const checkUploadResult = (resultEvent) => {
    if (resultEvent && resultEvent.event === 'success') {
      console.log(resultEvent.info.url);
      setNewImg(resultEvent.info.url);
      // cb();
    }
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
    console.log('submitted');
    const isImage = (url) => {
      if (typeof url !== 'string') {
        return false;
      }
      return (
        url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
        null
      );
    };

    console.log(isImage(newImg));

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
  const tester = () => {
    console.log(newImg);
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
