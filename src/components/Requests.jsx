import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const [requestsData, setRequestsData] = useState(null);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        {
          withCredentials: true,
        }
      );
      const filteredRequests = requestsData.filter(
        (request) => request._id !== requestId
      );
      setRequestsData(filteredRequests);
    } catch (err) {
      console.log(err);
    }
  };

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      setRequestsData(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requestsData) {
    return;
  }

  if (requestsData.length === 0) {
    return (
      <div className="flex justify-center text-2xl my-10">
        <h1>You don't have any pending requests😊</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl">Connection Requests</h1>

      {requestsData.map((item) => {
        const { _id, photoUrl, firstName, lastName, about } = item.fromUserId;
        return (
          <div
            key={_id}
            className="flex items-center justify-between p-4 m-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            {/* Profile Section */}
            <div className="flex items-center">
              <img
                alt="photo"
                className="h-20 w-20 rounded-full"
                src={photoUrl}
              />
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                <p>{about}</p>
              </div>
            </div>

            {/* Button Section */}
            <div className="ml-auto flex">
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("accepted", item._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("rejected", item._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  //   return (
  //     <div className="text-center my-10">
  //       <h1 className="text-bold text-2xl">Connections</h1>

  //       {requestsData.map((item) => {
  //         const { _id, photoUrl, firstName, lastName, about } = item.fromUserId;
  //         return (
  //           <div
  //             key={_id}
  //             className="flex p-4 m-4 rounded-lg bg-base-300 w-2/3 mx-auto"
  //           >
  //             <div>
  //               <img
  //                 alt="photo"
  //                 className="h-20 w-20 rounded-full"
  //                 src={photoUrl}
  //               ></img>
  //             </div>
  //             <div className="text-left mx-4">
  //               <h2 className="font-bold text-xl">
  //                 {firstName + " " + lastName}
  //               </h2>
  //               <p>{about}</p>
  //             </div>
  //             <div>
  //               <button className="btn btn-primary mx-2">Accept</button>
  //               <button className="btn btn-secondary mx-2">Reject</button>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
};

export default Requests;
