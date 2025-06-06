import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({
  userData,
  updateFeed,
  index,
  isStatic = false,
  disableActions = false,
}) => {
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      updateFeed?.(userId);
    } catch (err) {
      console.log(err);
    }
  };

  const { firstName, lastName, photoUrl, age, about, _id, gender, skills } =
    userData;
  return (
    <div
      className={
        isStatic
          ? ""
          : "absolute left-1/2 transform -translate-x-1/2 transition-all duration-300"
      }
      style={
        isStatic
          ? {}
          : {
              zIndex: 1000 - index,
              top: `${index * 5}px`,
            }
      }
    >
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="User" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <p>{gender ? `${gender}, ${age}` : `Age: ${age}`}</p>
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="badge badge-dash badge-accent">
                  {skill}
                </div>
              ))}
            </div>
          )}
          {!disableActions && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
