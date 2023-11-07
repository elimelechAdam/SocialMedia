import { useEffect, useState } from "react";
import { addData, fetchData, updateData } from "../utils/apiUtils";
import { BiSolidLike, BiSolidMessageAltDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { PostsModal } from "./PostsModal";

export const Feeds = ({
  feeds,
  setFeeds,
  likedPosts,
  setLikedPosts,
  setPage,
}) => {
  const userId = localStorage.getItem("userId");
  const [post, setPost] = useState({
    content: "",
  });
  const [currentPostId, setCurrentPostId] = useState(null);

  // Post message Modal
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal(postId) {
    setCurrentPostId(postId);
    setIsOpen(true);
  }

  const addPost = async (e) => {
    e.preventDefault();
    try {
      const newPost = await addData(`posts/${userId}`, post);
      setFeeds((prevFeeds) => [newPost, ...prevFeeds]);
      setPost({ content: "" }); // Clear the textarea after posting
    } catch (error) {
      console.log("Error adding post: ", error);
    }
  };

  const addLike = async (postId) => {
    try {
      const updatedPost = await updateData("posts", `${postId}/likes`, {
        userId: userId,
      });
      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed._id === postId ? { ...feed, likes: updatedPost.likes } : feed
        )
      );
      setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
      console.log("added like - change after to UI");
    } catch (error) {
      console.log("Error adding like: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col ">
        <div className="col-span-full border px-5 mb-5 rounded-md ">
          <div className="my-4">
            <textarea
              id="post"
              name="post"
              onChange={(e) => setPost({ content: e.target.value })}
              placeholder="Post something"
              rows={3}
              className="block resize-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-custom-onyx sm:text-sm sm:leading-6"
              defaultValue={""}
            />

            <button
              onClick={addPost}
              className="border border-white text-white rounded-full px-4 py-1 text-sm mt-2  hover:bg-white hover:text-black transition delay-150 duration-300 ease-in-out "
            >
              Post
            </button>
          </div>
        </div>
        {feeds.map((feed) => (
          <div
            className="select-none p-4 shadow-sm bg-transparent mb-4 rounded-md border-0 ring-1 ring-inset ring-custom-onyx"
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
            <div className="text-2xl mt-2 p-2 text-white flex gap-4 flex-row-reverse items-center">
              <BiSolidLike
                value={feed._id}
                className={`hover:text-custom-black cursor-pointer hover:transition delay-50 duration-300 ease-in-out overflow-hidden ${
                  likedPosts.includes(feed._id)
                    ? "text-custom-black"
                    : "text-white"
                }`}
                onClick={() => addLike(feed._id)}
              />
              <p className="text-xs text-white select-none">
                {feed.likes.length}
              </p>

              <BiSolidMessageAltDetail
                onClick={() => {
                  openModal(feed._id);
                }}
                className="hover:text-custom-black cursor-pointer
            hover:transition delay-50 duration-300 ease-in-out overflow-hidden"
              />
              <span
                className="text-xs text-white select-none"
                onClick={() => {
                  openModal(feed._id);
                }}
              >
                {feed.comments.length}
              </span>
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
      {/* postId, userId, content */}
      <PostsModal
        isOpen={isOpen}
        closeModal={closeModal}
        userId={userId}
        postId={currentPostId}
      />
    </>
  );
};
