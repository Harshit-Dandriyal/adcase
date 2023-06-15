import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const AddNewProject = () => {
  const [title, setTitle] = useState();
  const [mainurl, setMainUrl] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const access = Cookies.get("access");
    const config = {
      headers: {
        Authorization: "Bearer " + access,
      },
    };

    const postData = {
      title: title,
      main_url: mainurl,
    };

    try {
      const response = await axios.post(
        "https://resonant-petal-379617.ew.r.appspot.com/campaign/create-user-project/",
        postData,
        config
      );
      console.log("Success:", response);
      setLoading(false);
      // After the project is successfully created, you can redirect to another page or give a success message.
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="h-[50vh] w-full flex flex-col justify-center items-center">
        <p className=" text-white text-4xl mb-10">Structure Creation</p>
        <form
          className="flex flex-col justify-center items-center"
          action="#"
          method="POST"
          onSubmit={submitHandler}
        >
          <input
            id="email"
            name="email"
            type="text"
            value={title}
            className="w-64 h-12 m-3 text-center placeholder-white border border-white bg-[#212121]"
            placeholder="Project Name"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            id="email"
            name="email"
            type="text"
            value={mainurl}
            className="w-64 h-12 m-3 text-center placeholder-white border border-white bg-[#212121]"
            placeholder="URL"
            onChange={(e) => setMainUrl(e.target.value)}
          />
          <button
            className="flex h-12 mt-9 bg-green-500 justify-center items-center text-white rounded-full border-2 border-white  w-56"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "+ Create new project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProject;
