import React, { useState } from "react";
import ArrowSVG from "../ArrowSVG";
import { useRouter } from "next/router";

const DropdownMenu = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const handleRouteChange = (id) => {
    router.push(`/campaign/${id}`);
  };
  return (
    <div className="w-full">
      <ul className="menu menu-xs bg-base-200 rounded-lg max-w-xs w-full">
        <li>
          <details open={true} onToggle={() => setIsOpen(!isOpen)}>
            <summary>
              <ArrowSVG />
              Projects
            </summary>

            <ul>
              {categories.map((category) => (
                <div className="border-none">
                  <button
                    className=" w-full"
                    onClick={() => handleRouteChange(category.id)}
                  >
                    <li>
                      <a>
                        <ArrowSVG />
                        {category.title}
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
  );
};

export default DropdownMenu;

// Rest of the code ...
