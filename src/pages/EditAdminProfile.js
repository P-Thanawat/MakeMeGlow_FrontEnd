import React from "react";
import AdminHeader from "../component/AdminHeader";
import Profile from "../component/MyProfile/Profile";

function EditAdminProfile() {
  return (
    <div>
      <AdminHeader />
      <Profile button="SAVE" />
    </div>
  );
}

export default EditAdminProfile;
