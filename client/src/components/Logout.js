import React from 'react';
import axios from 'axios';

const LogOut = ({ onLogout }) => {
  const handleLogOut = () => {
    axios
      .post('/user/logout')
      .then((res) => {
        if (res.data && res.data.success) {
          onLogout();
        } else {
          console.log('An error occurred while logging out.');
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('An error occurred while logging out.');
      });
  };

  return (
    <div>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};

export default LogOut;
