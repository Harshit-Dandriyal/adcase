import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const PageComponent = ({ keyword, openModal, closeModal }) => {
  const [title, setTitle] = useState("");
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
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
  const submitDeleteHandler = async (key_id) => {
    const access = Cookies.get("access");
    console.log("san" + access);
    const config = {
      headers: {
        Authorization: "Bearer " + access,
      },
    };

    try {
      const response = await axios.delete(
        `https://resonant-petal-379617.ew.r.appspot.com/campaign/keyword/${key_id}/delete/`,
        config
      );
      window.location.reload();
      // After the project is successfully created, you can redirect to another page or give a success message.
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const aDdialogRef = React.createRef();
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (aDdialogRef.current) {
  //       aDdialogRef.current.showModal();
  //     }
  //   }, 0); // defer execution to next event loop

  //   return () => clearTimeout(timer); // cleanup function
  // }, []);
  return (
    <div className="flex h-[40px] w-full justify-around items-center">
      <p className="m-0  text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        {keyword.title}
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        Broad
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/4 h-full pt-1 text-center">
        Active
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/4 h-full pt-1 text-center break-words">
        {keyword.final_url}
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
            <div className="  right-[15%] bottom-[50%] z-40 flex border-none h-5 justify-center items-center">
              <li>
                <button onClick={openModal}>
                  <a>Update</a>
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    submitDeleteHandler(keyword.id);
                  }}
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

const KeyWordColumn = ({ keyword }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const aDdialogRef = useRef(null);
  const [title, setTitle] = useState("");
  const [mainurl, setMainUrl] = useState();
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (aDdialogRef.current) {
  //       aDdialogRef.current.showModal();
  //     }
  //   }, 0); // defer execution to next event loop

  //   return () => clearTimeout(timer); // cleanup function
  // }, [modalIsOpen]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const submitUpdateHandler = async (key_id) => {
    const access = Cookies.get("access");
    console.log("san" + access);
    const postData = {
      title: title,
      final_url: mainurl,
    };

    const config = {
      headers: {
        Authorization: "Bearer " + access,
      },
    };

    try {
      const response = await axios.put(
        `https://resonant-petal-379617.ew.r.appspot.com/campaign/keyword/${key_id}/update/`,
        postData,
        config
      );
      window.location.reload();
      // After the project is successfully created, you can redirect to another page or give a success message.
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <PageComponent
        openModal={openModal}
        closeModal={closeModal}
        keyword={keyword}
      />
      <dialog
        id="my_modal_1"
        className="modal fixed inset-0 flex items-center justify-center z-50"
        open={modalIsOpen}
        ref={aDdialogRef}
      >
        <form method="dialog" className="modal-box">
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
            <input
              id="email"
              name="email"
              type="text"
              value={mainurl}
              className="w-64 h-12 m-3 text-center placeholder-white border border-white bg-[#212121]"
              placeholder="Final Url"
              onChange={(e) => setMainUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-center border-none">
            <button
              className="btn bg-slate-700 hover:bg-slate-800 w-44"
              onClick={() => {
                submitUpdateHandler(keyword.id);
                closeModal();
              }}
            >
              Update Group
            </button>
          </div>
          <div className="modal-action border-none">
            <button className="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default KeyWordColumn;
