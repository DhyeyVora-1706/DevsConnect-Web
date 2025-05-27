import React from "react";

const UserCard = ({ feedData }) => {
  return (
    <div className="flex justify-center flex-col items-center">
      {feedData.map((item) => {
        const { firstName, lastName, photoUrl, age, about, _id } = item;
        return (
          <div key={_id} className="card bg-base-300 w-96 shadow-xl my-4">
            <figure>
              <img src={photoUrl} alt="User Image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p>{about}</p>
              <p>Age : {age}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Interested</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
