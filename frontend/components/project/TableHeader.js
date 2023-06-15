import React from "react";

const TableHeader = () => {
  return (
    <div className="flex h-[3%] w-full bg-gray-500 justify-around items-center">
      <p className="m-0 p-0 text-white">Projects</p>
      <p className="m-0 p-0 text-white">Campaings</p>
      <p className="m-0 p-0 text-white">Adgroups</p>
      <p className="m-0 p-0 text-white">Keywords</p>
    </div>
  );
};

export default TableHeader;
