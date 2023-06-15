import React, { useState } from "react";
import ArrowSVG from "../ArrowSVG";

const KeyWordDropdownMenu = ({ keywords }) => {
  const [isOpen, setIsOpen] = useState(false);

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
              <span className="ml-2">KeyWords</span>
            </summary>
            <ul>
              {keywords.map((keyword) => (
                <li key={keyword.id} className="border-none">
                  <button className="w-full">
                    <div className="flex items-center border-none">
                      <ArrowSVG />
                      <p className="ml-2 mt-1">{keyword.title}</p>
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

export default KeyWordDropdownMenu;
