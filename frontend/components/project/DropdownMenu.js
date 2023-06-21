import React, { useState, useEffect } from "react";
import ArrowSVG from "../ArrowSVG";
import { useRouter } from "next/router";

// Import your loading spinner component
import Spinner from "../Spinner";

const DropdownMenu = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add this line
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
    localStorage.setItem("projectId", id);
    router.push(`/campaign/${id}`);
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
          <details open={isOpen} onToggle={() => setIsOpen(!isOpen)}>
            <summary className="flex items-center">
              <ArrowSVG />
              <span className="ml-2">Projects</span>
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
                      <p className="ml-2 mt-1"> {category.title}</p>
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
