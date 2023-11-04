import React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export const Groups = () => {
  return (
    <div className="hidden lg:flex lg:flex-col">
      <div className="p-4 shadow-lg bg-transparent border  max-w-3xl rounded-md">
        <div className="text-2xl border-b-2 p-2 mb-2 text-white flex items-end justify-between">
          <h4 className="text-lg font-thin">Groups</h4>
        </div>
        <div className="flex flex-col xl:flex-row justify-between items-center p-2 bg-white rounded-lg mb-2">
          <div className="mb-2 xl:mb-0">
            {" "}
            {/* This margin-bottom is for spacing between the icon and the button on mobile screens */}
            <UserCircleIcon width={40} />
          </div>
          <div>
            <button className="borderBtn">Follow group</button>
          </div>
        </div>
      </div>
    </div>
  );
};
