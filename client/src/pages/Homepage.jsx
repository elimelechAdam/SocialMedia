import React, { Suspense, useEffect, useState } from "react";
import { fetchData } from "../utils/apiUtils";

const Feeds = React.lazy(() =>
  import("../components/Feeds").then((module) => ({ default: module.Feeds }))
);
import { Friends } from "../components/Friends";
import { Groups } from "../components/Groups";

export const Homepage = () => {
  const userId = localStorage.getItem("userId");

  const [likedPosts, setLikedPosts] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(`posts?page=${page}`);
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
  }, [page]);
  return (
    <div className="flex justify-between p-2 ">
      <div className="lg:p-2 lg:w-1/4">
        <Groups />
      </div>
      <div className="p-2 w-2/4 sm:w-3/4">
        <Suspense fallback={<div>Loading...</div>}>
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
        <Friends />
      </div>
    </div>
  );
};
