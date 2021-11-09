import React from "react";
import AccountHeader from "../component/AccountHeader";
import Profile from "../component/MyProfile/Profile";

function EditMyProfile() {
  return (
    <>
      <AccountHeader />
      <Profile button="SAVE" />
    </>
  );
}

export default EditMyProfile;
