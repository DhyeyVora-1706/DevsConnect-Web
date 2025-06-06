import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const [feed, setFeed] = useState(null);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      setFeed(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeUserFromFeed = (userId) => {
    const updatedFeed = feed.filter((user) => user._id !== userId);
    setFeed(updatedFeed);
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0) {
    return (
      <div className="flex justify-center text-2xl my-10">
        <h1>You are all caught up , No more users left😊</h1>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px]">
      {feed &&
        feed.map((item, index) => (
          <UserCard
            key={item._id}
            userData={item}
            updateFeed={removeUserFromFeed}
            index={index}
          />
        ))}
    </div>
  );
  // return (
  //   feed &&
  //   feed.map((item) => {
  //     return (
  //       <div key={item._id}>
  //         <UserCard userData={item} updateFeed={removeUserFromFeed}></UserCard>;
  //       </div>
  //     );
  //   })
  // );
};

export default Feed;
