import React from "react";
import CampaignDropdownMenu from "./CampaignDropdown";

const CampaignSidebar = ({ categories, campaigns }) => {
  return (
    <div className="w-1/6 flex flex-col bg-[#191e24]">
      <div className="flex h-[70%] w-full items-center flex-col">
        <select
          className="select w-[90%] max-w-xs my-4 border border-white mx-2"
          onChange={(e) => {
            setProject(e.target.value);
          }}
        >
          <option disabled selected>
            Choose your project
          </option>
          {categories.map((category) => (
            <option>{category.title}</option>
          ))}
        </select>
        <CampaignDropdownMenu categories={categories} campaigns={campaigns} />
      </div>
      <div className="flex h-[30%] w-full flex-col ">
        <p className="pl-4 pt-2"> Manage</p>
      </div>
    </div>
  );
};

export default CampaignSidebar;
