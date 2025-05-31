import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  let userProfileInfo = useSelector((store) => store.user);
  return (
    userProfileInfo && (
      <div>
        <EditProfile user={userProfileInfo} />
      </div>
    )
  );
};

export default Profile;
