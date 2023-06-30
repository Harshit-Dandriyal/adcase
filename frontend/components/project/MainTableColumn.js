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
      <ul
        tabIndex={0}
        class="menu lg:menu-vertical bg-base-200 rounded-box w-14 flex justify-center items-center "
      >
        <li className="flex justify-center ">
          <details
            open={menuOpen}
            ref={menuRef}
            onToggle={(event) => event.preventDefault()}
            onClick={toggleMenu}
            className=""
          >
            <summary tabindex="0"></summary>

            <div className=" overflow-clip bg-slate-900 right-[15%] bottom-[50%] z-40 absolute">
              <li>
                <button
                  onClick={() => {
                    submitDuplicateHandler(category.id);
                  }}
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
                >
                  <a>Delete</a>
                </button>
              </li>
            </div>
          </details>
        </li>
      </ul>
    </div>
  );
};

export default MainTableColumn;
