import React from 'react';
import AccountHeader from '../component/AccountHeader';
import Profile from '../component/MyProfile/Profile';

function MyProfile() {
  return (
    <>
      <AccountHeader />
      <Profile button='EDIT MY PROFILE' />
    </>
  );
}

export default MyProfile;
