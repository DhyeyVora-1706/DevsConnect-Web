import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  console.log(user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age ? user.age : 18);
  const [gender, setGender] = useState(user.gender ? user.gender : "male");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const updateProfile = async () => {
    setError("");
    console.log(gender);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUserInfo(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      if (err?.status === 400) {
        if (err?.response?.data?.includes("gender")) {
          setError(
            "Gender is invalid , Acceptable values are male, female and other"
          );
        }
        if (err?.response?.data?.includes("age")) {
          setError("Age should be between 18 and 80");
        }
        if (err?.response?.data?.toLowerCase().includes("photourl")) {
          setError("PhotoURL is not a valid URL");
        }
      } else {
        setError(err?.response?.data || "Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-start gap-10 p-10 bg-base-200 min-h-screen">
      {/* Edit Profile Card */}
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Edit Profile</h2>
          <form className="form-control space-y-4">
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                First Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="input input-bordered"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="input input-bordered"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              className="select select-bordered"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled value="">
                Select Gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>

            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              placeholder="Enter your age"
              className="input input-bordered"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="url"
              placeholder="Enter your photo URL"
              className="input input-bordered"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />

            <label className="label">
              <span className="label-text">About</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center mt-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateProfile}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* User Card - Side by side */}
      <UserCard
        userData={{ firstName, lastName, age, gender, about, photoUrl }}
      />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
