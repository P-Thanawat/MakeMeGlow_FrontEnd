import React from "react";
import AdminHeader from "../component/AdminHeader";
import Profile from "../component/MyProfile/Profile";

function AdminProfile() {
  return (
    <div>
      <AdminHeader />
      <Profile button="EDIT MY PROFILE" />
    </div>
  );
}

export default AdminProfile;
