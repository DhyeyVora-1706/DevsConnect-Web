import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const [connectionData, setConnectionData] = useState(null);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      setConnectionData(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionData) {
    return;
  }

  if (connectionData.length === 0) {
    return <h1>You don't have any connections</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>

      {connectionData.map((item) => {
        return (
          <div
            key={item._id}
            className="flex p-4 m-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="h-20 w-20 rounded-full"
                src={item.photoUrl}
              ></img>
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {item.firstName + " " + item.lastName}
              </h2>
              <p>{item.about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
