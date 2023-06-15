import React, { useState } from "react";
import ArrowSVG from "../ArrowSVG";
import { useRouter } from "next/router";

const AdGroupDropdownMenu = ({ groups }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleRouteChange = (id) => {
    router.push(`/keywords/${id}`);
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
                AdGroups
              </summary>

              <ul>
                {groups.map((group) => (
                  <div className="border-none  ">
                    <button
                      className=" w-full"
                      onClick={() => handleRouteChange(group.id)}
                    >
                      <li>
                        <a>
                          <ArrowSVG />
                          {group.title}
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

export default AdGroupDropdownMenu;
