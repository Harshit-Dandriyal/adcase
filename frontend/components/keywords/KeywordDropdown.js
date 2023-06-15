import React, { useState } from "react";
import ArrowSVG from "../ArrowSVG";
import { useRouter } from "next/router";

const KeyWordDropdownMenu = ({ keywords }) => {
  const [isOpen, setIsOpen] = useState(false);
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
                KeyWords
              </summary>

              <ul>
                {keywords.map((keyword) => (
                  <div className="border-none  ">
                    <button className=" w-full">
                      <li>
                        <a>
                          <ArrowSVG />
                          {keyword.title}
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

export default KeyWordDropdownMenu;
