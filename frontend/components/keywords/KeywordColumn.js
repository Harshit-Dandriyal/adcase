import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
const KeyWordColumn = ({ keyword }) => {
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
  const submitUpdateHandler = async (key_id) => {
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
  const submitDuplicateHandler = async (key_id) => {
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
  return (
    <div className="flex w-full justify-around items-center">
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
      <ul
        tabIndex={0}
        class="menu lg:menu-vertical bg-base-200 rounded-box w-14 flex justify-center items-center "
      >
        <li className="flex justify-center">
          <details className="">
            <summary tabindex="0"></summary>

            <div className="fixed bg-slate-900 right-[15%] z-40">
              <li>
                <button>
                  <a>Duplicate</a>
                </button>
              </li>
              <li>
                <button>
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
          </details>
        </li>
      </ul>
    </div>
  );
};

export default KeyWordColumn;
