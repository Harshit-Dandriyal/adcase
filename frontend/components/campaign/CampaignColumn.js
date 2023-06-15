import React from "react";

const CampaignColumn = ({ campaign }) => {
  return (
    <div className="flex h-[40px] w-full justify-around items-center">
      <p className="m-0  text-white border border-gray-500 w-1/3 h-full pt-1 text-center">
        {campaign.title}
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/3 h-full pt-1 text-center">
        {campaign.num_groups}
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/3 h-full pt-1 text-center">
        {campaign.num_keywords}
      </p>
    </div>
  );
};

export default CampaignColumn;
