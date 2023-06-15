import React from "react";

const AdGroupColumn = ({ group }) => {
  return (
    <div className="flex h-[40px] w-full justify-around items-center">
      <p className="m-0  text-white border border-gray-500 w-1/2 h-full pt-1 text-center">
        {group.title}
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/2 h-full pt-1 text-center">
        {group.num_keywords}
      </p>
    </div>
  );
};

export default AdGroupColumn;
