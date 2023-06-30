import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "react-modal";

const AdGroupColumn = ({ group }) => {
  const [title, setTitle] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    Modal.setAppElement("#__next"); // Use `#__next` for Next.js
  }, []);
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
  const submitDeleteHandler = async (group_id) => {
    const access = Cookies.get("access");
    console.log("san" + access);
    const config = {
      headers: {
        Authorization: "Bearer " + access,
      },
    };

    try {
      const response = await axios.delete(
        `https://resonant-petal-379617.ew.r.appspot.com/campaign/group/${group_id}/delete/`,
        config
      );
      window.location.reload();
      // After the project is successfully created, you can redirect to another page or give a success message.
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const submitUpdateHandler = async (group_id) => {
    const access = Cookies.get("access");
    console.log("san" + access);
    const postData = {
      title: title,
    };

    const config = {
      headers: {
        Authorization: "Bearer " + access,
      },
    };

    try {
      const response = await axios.put(
        `https://resonant-petal-379617.ew.r.appspot.com/campaign/group/${group_id}/update/`,
        postData,
        config
      );
      window.location.reload();
      // After the project is successfully created, you can redirect to another page or give a success message.
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const submitDuplicateHandler = async (group_id) => {
    const access = Cookies.get("access");
    const config = {
      headers: {
        Authorization: "Bearer " + access,
      },
    };

    try {
      const response = await axios.get(
        `https://resonant-petal-379617.ew.r.appspot.com/campaign/duplicate-group/${group_id}/`,
        config
      );
      window.location.reload();
      // After the project is successfully created, you can redirect to another page or give a success message.
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const CdialogRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    setTitle(group.title); // Set the input field's value to the current campaign title
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="flex h-[40px] w-full justify-around items-center">
      <p className="m-0  text-white border border-gray-500 w-1/2 h-full pt-1 text-center">
        {group.title}
      </p>
      <p className="m-0 text-white border border-gray-500 w-1/2 h-full pt-1 text-center">
        {group.num_keywords}
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
                    submitDuplicateHandler(group.id);
                  }}
                >
                  <a>Duplicate</a>
                </button>
              </li>
              <button
                className="btn"
                onClick={() => window.my_modal_1.showModal()}
              >
                open modal
              </button>
              <dialog id="my_modal_1" className="modal" open={modalIsOpen}>
                <form className="modal-box flex justify-center flex-col">
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
                        submitUpdateHandler(group.id);
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

              <li>
                <button
                  onClick={() => {
                    submitDeleteHandler(group.id);
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

export default AdGroupColumn;
