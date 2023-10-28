import React, { useState } from "react";
import { fetchData } from "../utils/apiUtils";
import { useEffect } from "react";
import {
  BiSolidLike,
  BiSolidDislike,
  BiSolidMessageAltDetail,
} from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

export const Feeds = () => {
  const [feeds, setFeeds] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData(`posts?page=${page}&limit=2`);
        console.log(response.data);
        setFeeds((prevFeeds) => {
          // Filter out any new posts that already exist in the state
          const newFeeds = response.data.filter(
            (newPost) =>
              !prevFeeds.some(
                (existingPost) => existingPost._id === newPost._id
              )
          );
          return [...prevFeeds, ...newFeeds];
        });
      } catch (error) {
        console.log("Error fetching feeds: ", error);
      }
    };
    getData();
  }, [page]);

  return (
    <div className="flex flex-col">
      <div className="col-span-full">
        <div className="my-4">
          <textarea
            id="post"
            name="post"
            placeholder="Post something"
            rows={3}
            className="block resize-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-custom-onyx sm:text-sm sm:leading-6"
            defaultValue={""}
          />
          <button className="border border-white text-white rounded-full px-4 py-1 text-sm  mt-2 w-full hover:bg-white hover:text-black transition delay-150 duration-300 ease-in-out ">
            Post
          </button>
        </div>
      </div>
      {feeds.map((feed, idx) => (
        <div
          className="p-4 shadow-sm bg-transparent mb-4 rounded-md border-0 ring-1 ring-inset ring-custom-onyx"
          key={feed._id}
        >
          <div className="flex align-middle items-center gap-2">
            {" "}
            <CgProfile size={40} className="text-white " />
            <div className="">
              <h4 className="text-md cursor-pointer font-bold text-white">
                {feed.author.fullname}
              </h4>
              <h4 className="text-xs cursor-pointer font-thin text-white">
                {feed.createdAt}
              </h4>
            </div>
          </div>
          <p className="break-words text-white font-light text-md leading-6 p-2 border-b ">
            {feed.content}
          </p>
          <div className="text-2xl mt-2 p-2 text-white flex gap-4 flex-row-reverse">
            <BiSolidDislike
              className="hover:text-custom-black cursor-pointer
            hover:transition delay-50 duration-300 ease-in-out"
            />
            <BiSolidLike
              className="hover:text-custom-black cursor-pointer
            hover:transition delay-50 duration-300 ease-in-out"
            />
            <BiSolidMessageAltDetail
              className="hover:text-custom-black cursor-pointer
            hover:transition delay-50 duration-300 ease-in-out"
            />
          </div>
        </div>
      ))}
      <button
        className="borderBtnWhite"
        onClick={() => setPage((prevPage) => prevPage + 1)}
      >
        Load More
      </button>
    </div>
  );
};
