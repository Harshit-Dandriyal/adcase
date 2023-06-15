import React from "react";

const KeyWordColumn = ({ keyword }) => {
  return (
    <div className="flex w-full justify-around items-center">
      <p className="m-0  text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        {keyword.title}
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        Broad
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        Active
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/4 h-full pt-1 text-center break-words">
        {keyword.final_url}
      </p>
    </div>
  );
};

export default KeyWordColumn;
