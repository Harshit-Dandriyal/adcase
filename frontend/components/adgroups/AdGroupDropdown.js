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
      <ul className="menu menu-xs bg-base-200 rounded-lg max-w-xs w-full">
        <li>
          <details open={isOpen} onToggle={handleToggle}>
            <summary className="flex items-center">
              <ArrowSVG />
              <span className="ml-2">AdGroups</span>
            </summary>
            <ul>
              {groups.map((group) => (
                <li key={group.id} className="border-none">
                  <button
                    className=" w-full"
                    onClick={() => handleRouteChange(group.id)}
                  >
                    <div className="flex items-center border-none">
                      <ArrowSVG />
                      <p className="ml-2 mt-1">{group.title}</p>
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

export default AdGroupDropdownMenu;
