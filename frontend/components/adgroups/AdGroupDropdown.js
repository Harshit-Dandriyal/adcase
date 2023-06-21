import React, { useState, useEffect } from "react";
import ArrowSVG from "../ArrowSVG";
import { useRouter } from "next/router";

// Import your loading spinner component
import Spinner from "../Spinner";

const AdGroupDropdownMenu = ({ groups }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => url !== router.pathname && setLoading(true);
    const handleComplete = (url) =>
      url !== router.pathname && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleRouteChange = (id) => {
    router.push(`/keywords/${id}`);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-full ${isOpen ? "overflow-y-scroll" : ""}`}>
      {loading && <Spinner />} {/* Display loading spinner when loading */}
      <ul
        className={`menu menu-xs bg-base-200 rounded-lg max-w-xs w-full ${
          loading ? "pointer-events-none opacity-50" : ""
        }`}
      >
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
