import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const MainTableColumn = ({ category }) => {
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (event) => {
    event.preventDefault();
    setMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Your event handlers remain the same...
  const submitDeleteHandler = async (category_id) => {
    const access = Cookies.get("access");
    console.log("san" + access);
    const config = {
      headers: {
        Authorization: "Bearer " + access,
      },
    };

    try {
      const response = await axios.delete(
        `https://resonant-petal-379617.ew.r.appspot.com/project/${category_id}/delete/`,
        config
      );
      window.location.reload();
      // After the project is successfully created, you can redirect to another page or give a success message.
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const submitUpdateHandler = async (category_id) => {
  //   const access = Cookies.get("access");
  //   console.log("san" + access);
  //       const postData = {
  //         title: title,
  //       };

  //   const config = {
  //     headers: {
  //       Authorization: "Bearer " + access,
  //     },
  //   };

  //   try {
  //     const response = await axios.delete(
  //       `https://resonant-petal-379617.ew.r.appspot.com/campaign/keyword/${category_id}/delete/`,
  //       postData,
  //       config
  //     );
  //     window.location.reload();
  //     // After the project is successfully created, you can redirect to another page or give a success message.
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const submitDuplicateHandler = async (category_id) => {
    const access = Cookies.get("access");
    const config = {
      headers: {
        Authorization: "Bearer " + access,
      },
    };

    try {
      const response = await axios.get(
        `https://resonant-petal-379617.ew.r.appspot.com/project/duplicate-project/${category_id}/`,
        config
      );
      window.location.reload();
      // After the project is successfully created, you can redirect to another page or give a success message.
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const dialogRef = useRef(null);

  const handleClick = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  return (
    <div className="flex h-[40px] w-full justify-around items-center">
      <p className="m-0 pt-1 text-center text-white border border-gray-500 w-1/4 h-full">
        {category.title}
      </p>
      <p className="m-0  text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        {category.num_campaigns}
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        {category.num_groups}
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        {category.num_keywords}
      </p>

      <li className="flex justify-center relative z-50">
        <details
          open={menuOpen}
          ref={menuRef}
          onToggle={(event) => event.preventDefault()}
          onClick={toggleMenu}
          className="dropdown z-50 dropdown-left myDetails"
        >
          <summary className="flex">
            <div className="border-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`h-6 w-6 transform transition-transform duration-200 ${
                  menuOpen ? "rotate-90" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[10000] bg-base-100 rounded-box ">
            <div className="  right-[15%] bottom-[50%] z-40 flex border-none h-5 justify-center items-center gap-5 px-3">
              <li>
                <button
                  onClick={() => {
                    submitDuplicateHandler(category.id);
                  }}
                  className=" text-base font-bold"
                >
                  <a>Duplicate</a>
                </button>
              </li>
              {/* <li>
                <button onClick={handleClick}>Update</button>
              </li>
              <dialog id="harshitking" className="modal" ref={dialogRef}>
                <form
                  method="dialog"
                  className="modal-box flex justify-center flex-col"
                >
                  <h3 className="font-bold text-lg">Update Project</h3>
                  <div className="flex items-center flex-col border-none mt-5">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={title}
                      className="w-64 h-12 m-3 text-center placeholder-white border border-white bg-[#212121]"
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center border-none">
                    <button
                      className="btn bg-slate-700 hover:bg-slate-800 w-44"
                      onClick={() => {
                        submitUpdateHandler(category.id);
                      }}
                      disabled={loading}
                    >
                      Update
                    </button>
                  </div>
                  <div className="modal-action border-none">
                    {/* if there is a button in form, it will close the modal */}
              {/* <button className="btn">Close</button>
                  </div>
                </form>
              </dialog> */}
              <li>
                <button
                  onClick={() => {
                    submitDeleteHandler(category.id);
                  }}
                  className=" text-base font-bold"
                >
                  <a>Delete</a>
                </button>
              </li>
            </div>
          </ul>
        </details>
      </li>
    </div>
  );
};

export default MainTableColumn;
