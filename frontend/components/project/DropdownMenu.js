import React, { useState } from "react";
import ArrowSVG from "../ArrowSVG";
import { useRouter } from "next/router";

const DropdownMenu = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleRouteChange = (id) => {
    router.push(`/campaign/${id}`);
  };

  return (
    <div className="w-full">
      <ul className="menu menu-xs bg-base-200 rounded-lg max-w-xs w-full">
        <li>
          <details open={isOpen} onToggle={() => setIsOpen(!isOpen)}>
            <summary className="flex items-center">
              <ArrowSVG />
              <span>Projects</span>
            </summary>
            <ul>
              {categories.map((category) => (
                <li key={category.id} className="border-none">
                  <button
                    className="w-full"
                    onClick={() => handleRouteChange(category.id)}
                  >
                    <div className="flex items-center border-none">
                      <ArrowSVG />
                      <span>{category.title}</span>
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

export default DropdownMenu;
