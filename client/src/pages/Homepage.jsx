import React from "react";
import { Feeds } from "../components/Feeds";
import { Friends } from "../components/Friends";
import { Groups } from "../components/Groups";

export const Homepage = () => {
  return (
    <div className="flex justify-between p-6 ">
      <div className="p-2 w-1/4">
        <Groups />
      </div>
      <div className="p-2 w-2/4">
        <Feeds />
      </div>
      <div className="p-2 w-1/4">
        <Friends />
      </div>
    </div>
  );
};
