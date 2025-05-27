import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("mark@gmail.com");
  const [password, setPassword] = useState("testing");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUserInfo(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-32">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div className="my-3 flex flex-col space-y-4">
            <input
              type="text"
              placeholder="UserName"
              className="input rounded-l"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              className="input rounded-l"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500"> {error && `ERROR :  ${error}`}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
