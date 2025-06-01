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

  return (
    feed &&
    feed.map((item) => {
      return (
        <div key={item._id}>
          <UserCard userData={item} updateFeed={removeUserFromFeed}></UserCard>;
        </div>
      );
    })
  );
};

export default Feed;
