import React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { fetchData } from "./../utils/apiUtils";
import { useUser } from "../context/UserProvider";

export const Friends = ({ users, userId }) => {
  const { token } = useUser();
  //   "/:userId/followers/:followerId",
  const followUser = async (userId, followerId) => {
    try {
      const response = await fetchData(`users/${userId}/followers/`, token);
      console.log(response);
      console.log(userId, followerId);
    } catch (error) {
      console.log(error);
    }
    console.log(`Friends -> users`, users);
  };

  return (
    <div className="hidden lg:flex lg:flex-col">
      <div className="p-4 shadow-lg bg-transparent border  max-w-3xl rounded-md">
        <div className="text-2xl border-b-2 p-2 mb-2 text-white flex items-end justify-between">
          <h4 className="text-lg font-thin">Follow</h4>
        </div>
        {users.map((user) => (
          <div
            className="flex justify-between items-center p-2 bg-white rounded-lg mb-2"
            key={user._id}
          >
            <div className="mb-2 xl:mb-0 flex items-center text-sm">
              {/* This margin-bottom is for spacing between the icon and the button on mobile screens */}
              <UserCircleIcon width={40} />
              {user.fullname}
            </div>
            <div>
              <button
                className="borderBtn"
                onClick={(e) => {
                  e.preventDefault();
                  followUser(userId, user._id);
                }}
              >
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
