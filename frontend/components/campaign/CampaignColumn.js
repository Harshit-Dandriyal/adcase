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
      <ul
        tabIndex={0}
        class="menu lg:menu-vertical bg-base-200 rounded-box w-14 flex justify-center items-center "
      >
        <li className="flex justify-center">
          <details className="">
            <summary tabindex="0"></summary>

            <div className="fixed bg-slate-900 right-[15%] z-40">
              <li>
                <a>Duplicate</a>
              </li>
              <li>
                <a>Update</a>
              </li>
              <li>
                <a>Delete</a>
              </li>
            </div>
          </details>
        </li>
      </ul>
    </div>
  );
};

export default CampaignColumn;
