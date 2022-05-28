import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import App from './App.jsx';
import UserProfile from '../Pages/UserProfile.jsx';

const Profile = ({ users }) => {
  const [user, setUser] = useState({});

  const params = useParams();

  const getOneUser = () => {
    axios
      .get(`/users/${params._id}`)
      .then((results) => {
        setUser(results.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getOneUser();
  }, []);

  return (
    <div>
      <UserProfile user={user} editable={false} />
    </div>
  );
};

export default Profile;
