import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export const Following = ({ users, userId }) => {
  // Find the current user's object
  const currentUser = users.find((user) => user._id === userId);

  // Filter the users array to get the users that the current user is following
  const followingUsers = currentUser
    ? users.filter((user) => currentUser.following.includes(user._id))
    : [];

  return (
    <div className="hidden lg:flex lg:flex-col">
      <div className="p-4 shadow-lg bg-transparent border  max-w-3xl rounded-md">
        <div className="text-2xl border-b-2 p-2 mb-2 text-white flex items-end justify-between">
          <h4 className="text-lg font-thin">Following</h4>
        </div>
        {followingUsers.map((user) => (
          <div
            key={user._id}
            className="flex flex-col xl:flex-row justify-between items-center p-2 bg-white rounded-lg mb-2"
          >
            <div className="mb-2 xl:mb-0 flex items-center text-sm">
              <UserCircleIcon width={40} />
              {user.fullname}
            </div>
            <div>
              <button className="borderBtn">Unfollow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
