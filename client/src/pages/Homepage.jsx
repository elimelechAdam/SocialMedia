import React, { Suspense, useContext, useEffect, useState } from "react";
import { fetchData } from "../utils/apiUtils";

const Feeds = React.lazy(() =>
  import("../components/Feeds").then((module) => ({ default: module.Feeds }))
);
import { Friends } from "../components/Friends";
import { Groups } from "../components/Groups";
import { useUser } from "../context/UserProvider";

export const Homepage = () => {
  const { userId, token } = useUser();

  //Feeds
  const [likedPosts, setLikedPosts] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        if (!token) return;
        const response = await fetchData(`posts?page=${page}`, token);
        console.log(response.data);

        setFeeds((prevFeeds) => {
          // Filter out any new posts that already exist in the state
          const newFeeds = response.data.filter(
            (newPost) =>
              !prevFeeds.some(
                (existingPost) => existingPost._id === newPost._id
              )
          );

          const likedPostIds = response.data
            .filter((post) => post.likes.includes(userId))
            .map((post) => post._id);
          setLikedPosts((prevLikedPosts) => [
            ...new Set([...prevLikedPosts, ...likedPostIds]),
          ]);

          console.log(response.data);
          return [...prevFeeds, ...newFeeds];
        });
      } catch (error) {
        console.log("Error fetching feeds: ", error);
      }
    };
    getData();
  }, [page, token]);

  //Friends
  useEffect(() => {
    if (!token) return;
    const getData = async () => {
      try {
        const response = await fetchData("users", token);
        console.log(`response`, response);
        // Update the state with the user details
        setUsers(response.filter((user) => user._id !== userId)); // Filter out any nulls from errors
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getData();
  }, [token]);

  return (
    <div className="flex justify-between p-2 ">
      <div className="lg:p-2 lg:w-1/4">
        <Groups />
      </div>
      <div className="p-2 w-2/4 sm:w-3/4">
        <Suspense fallback={<div>Loading feeds...</div>}>
          <Feeds
            feeds={feeds}
            likedPosts={likedPosts}
            setPage={setPage}
            setLikedPosts={setLikedPosts}
            setFeeds={setFeeds}
          />
        </Suspense>
      </div>
      <div className="lg:p-2 lg:w-1/4">
        <Friends users={users} userId={userId} />
      </div>
    </div>
  );
};
