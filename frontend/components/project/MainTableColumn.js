import React from "react";

const MainTableColumn = ({ category }) => {
  return (
    <div className="flex h-[40px] w-full justify-around items-center">
      <p className="m-0 pt-1 text-center text-white border border-gray-500 w-1/4 h-full">
        {category.title}
      </p>
      <p className="m-0  text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        {category.num_campaigns}
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        {category.num_groups}
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        {category.num_keywords}
      </p>
    </div>
  );
};

export default MainTableColumn;
