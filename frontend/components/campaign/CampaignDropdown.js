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
      <div>
        <ul className="menu menu-xs bg-base-200 rounded-lg max-w-xs w-full">
          <li>
            <details open={true} onToggle={handleToggle}>
              <summary>
                <ArrowSVG />
                Campaigns
              </summary>

              <ul>
                {campaigns.map((campaign) => (
                  <div className="border-none  ">
                    <button
                      className=" w-full"
                      onClick={() => handleRouteChange(campaign.id)}
                    >
                      <li>
                        <a>
                          <ArrowSVG />
                          {campaign.title}
                        </a>
                      </li>
                    </button>
                  </div>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CampaignDropdownMenu;
