import React, { useState } from "react";
import ArrowSVG from "../ArrowSVG";
import { useRouter } from "next/router";

const CampaignDropdownMenu = ({ campaigns }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleRouteChange = (id) => {
    router.push(`/adgroups/${id}`);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-full ${isOpen ? "overflow-y-scroll" : ""}`}>
      <ul className="menu menu-xs bg-base-200 rounded-lg max-w-xs w-full">
        <li>
          <details open={isOpen} onToggle={handleToggle}>
            <summary className="flex items-center">
              <ArrowSVG />
              <span className="ml-2">Campaigns</span>
            </summary>
            <ul>
              {campaigns.map((campaign) => (
                <li key={campaign.id} className="border-none">
                  <button
                    className="w-full"
                    onClick={() => handleRouteChange(campaign.id)}
                  >
                    <div className="flex items-center">
                      <ArrowSVG />
                      <p className="ml-2 mt-1">{campaign.title}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
};

export default CampaignDropdownMenu;
