import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(18);
  const [photoUrl, setPhotoUrl] = useState(
    "https://static.vecteezy.com/system/resources/previews/018/716/098/non_2x/programmer-line-gradient-icon-vector.jpg"
  );
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const errorList = validateForm({
      firstName,
      lastName,
      about,
      gender,
      skills,
      emailId,
      password,
      age,
      photoUrl,
    });

    if (Object.keys(errorList).length > 0) return;

    try {
      await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          about,
          gender,
          skills,
          emailId,
          password,
          age,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response);
    }
  };

  const validateForm = (fields) => {
    const newErrors = {};
    console.log("Called on onBlur ", fields);

    if ("emailId" in fields) {
      if (!fields.emailId.trim()) {
        newErrors.emailId = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(fields.emailId)) {
        newErrors.emailId = "Invalid email format";
      } else {
        delete newErrors.emailId;
      }
    }

    if ("password" in fields) {
      if (!fields.password.trim()) {
        newErrors.password = "Password is required";
      } else {
        delete newErrors.password;
      }
    }

    if ("firstName" in fields) {
      if (!fields.firstName.trim()) {
        newErrors.firstName = "First name is required";
      } else {
        delete newErrors.firstName;
      }
    }

    if ("lastName" in fields) {
      if (!fields.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      } else {
        delete newErrors.lastName;
      }
    }

    if ("age" in fields) {
      if (!fields.age) {
        newErrors.age = "Age is required";
      } else if (fields.age < 18 || fields.age > 80) {
        newErrors.age = "Age should be between 18 and 80";
      } else {
        delete newErrors.age;
      }
    }

    if ("skills" in fields) {
      if (!fields.skills.trim()) {
        newErrors.skills = "Skills field is required";
      } else {
        delete newErrors.skills;
      }
    }

    if ("about" in fields) {
      if (!fields.about.trim()) {
        newErrors.about = "About is required";
      } else {
        delete newErrors.about;
      }
    }

    if ("photoUrl" in fields) {
      if (!fields.photoUrl.trim()) {
        newErrors.photoUrl = "Photo URL is required";
      } else {
        try {
          new URL(fields.photoUrl);
          delete newErrors.photoUrl;
        } catch {
          newErrors.photoUrl = "Photo URL is not valid";
        }
      }
    }

    setError((prev) => ({ ...prev, ...newErrors }));
    return newErrors;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <form
            className="form-control space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="input input-bordered"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => validateForm({ firstName })}
            />
            {error?.firstName && (
              <p className="text-red-500 text-sm">{error?.firstName}</p>
            )}

            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="input input-bordered"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => validateForm({ lastName })}
            />
            {error?.lastName && (
              <p className="text-red-500 text-sm">{error?.lastName}</p>
            )}

            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              onBlur={() => validateForm({ emailId })}
            />
            {error?.emailId && (
              <p className="text-red-500 text-sm">{error?.emailId}</p>
            )}

            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validateForm({ password })}
            />
            {error?.password && (
              <p className="text-red-500 text-sm">{error?.password}</p>
            )}

            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              placeholder="Enter your age"
              className="input input-bordered"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              onBlur={() => validateForm({ age })}
            />
            {error?.age && <p className="text-red-500 text-sm">{error?.age}</p>}

            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              className="select select-bordered"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              onBlur={() => validateForm({ gender })}
            >
              <option disabled value="">
                Select Gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
            {error?.gender && (
              <p className="text-red-500 text-sm">{error?.gender}</p>
            )}

            <label className="label">
              <span className="label-text">PhotoUrl</span>
            </label>
            <input
              type="url"
              placeholder="Enter your photourl"
              className="input input-bordered"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              onBlur={() => validateForm({ photoUrl })}
            />
            {error?.photoUrl && (
              <p className="text-red-500 text-sm">{error?.photoUrl}</p>
            )}

            <label className="label">
              <span className="label-text">Skills</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              onBlur={() => validateForm({ skills })}
            ></textarea>
            {error?.skills && (
              <p className="text-red-500 text-sm">{error?.skills}</p>
            )}

            <label className="label">
              <span className="label-text">About</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              onBlur={() => validateForm({ about })}
            ></textarea>
            {error?.about && (
              <p className="text-red-500 text-sm">{error?.about}</p>
            )}

            <div className="card-actions justify-center mt-4">
              <button type="submit" className="btn btn-primary">
                SignUp
              </button>
            </div>
          </form>
          <div className="text-center mt-6 text-sm text-gray-500">
            Existing User{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              ➡️Login
            </Link>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Signup Successful , Redirecting to Login..</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
