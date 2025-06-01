import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ userData, updateFeed }) => {
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      updateFeed(userId);
    } catch (err) {
      console.log(err);
    }
  };

  const { firstName, lastName, photoUrl, age, about, _id, gender } = userData;
  return (
    <div className="flex justify-center flex-col items-center">
      <div key={_id} className="card bg-base-300 w-96 shadow-xl my-4">
        <figure>
          <img src={photoUrl} alt="User Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <p>{gender ? `${gender} , ${age}` : `Age : ${age}`} </p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
