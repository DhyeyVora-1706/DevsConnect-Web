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

  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed &&
    feed.map((item) => {
      return (
        <div key={item._id}>
          <UserCard userData={item}></UserCard>;
        </div>
      );
    })
  );
};

export default Feed;
