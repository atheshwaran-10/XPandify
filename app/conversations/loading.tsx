import React from "react";
import { ClipLoader } from "react-spinners";
export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  );
};
export default Loading;
