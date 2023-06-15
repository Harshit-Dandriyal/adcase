import Image from "next/image";
import React, { useState } from "react";
import CampaignHeader from "../../components/campaign/CampaignHeader";
import CampaignColumn from "../../components/campaign/CampaignColumn";
import cookie from "next-cookies";
import axios from "axios";
import CampaignSidebar from "../../components/campaign/CampaignSidebar";
import AddNewProject from "../../components/AddNewProject";
const CategoryPage = ({ categories, campaigns, keywords }) => {
  const [projectModal, setProjectModal] = useState(true);
  return (
    <div className=" h-[100vh] flex ">
      <CampaignSidebar categories={categories} campaigns={campaigns} />
      <div className="w-5/6 flex flex-col">
        <div className="flex h-[10%] w-[97%] justify-end items-center gap-5 mr-5">
          <button
            className="flex h-10 bg-green-500 justify-center items-center text-white rounded-full border-2 border-white  w-44"
            onClick={() => {
              setProjectModal(!projectModal);
            }}
          >
            {" "}
            + Create new project
          </button>
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className=" m-1 p-0 block"></label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Email address</a>
                <p className="mt-1"> example@gmail.com</p>
              </li>
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Setting</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex h-[90%] w-full justify-end items-center flex-row">
          <div className="flex w-[80%] h-full flex-col">
            <div className="flex h-[12%] w-[100%] pl-[2%] bg-[#191e24] gap-6 items-center">
              <button className="flex h-8 bg-gray-500 justify-center items-center text-white rounded-full border-2 border-white  w-28 text-sm">
                + Add Project
              </button>
              <button className="flex h-8 bg-gray-500  justify-center items-center text-white rounded-full border-2 border-white  w-24 text-sm">
                ± Duplicate
              </button>
              <button className="flex h-8 bg-gray-500 justify-center items-center text-white rounded-full border-2 border-white  w-24 text-sm">
                - Remove
              </button>
            </div>
            {projectModal ? (
              <>
                <CampaignHeader />
                <div className="flex  w-full flex-col overflow-y-scroll">
                  <div className="flex flex-col">
                    {campaigns.map((campaign) => (
                      <>
                        <CampaignColumn campaign={campaign} />
                      </>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <AddNewProject />
            )}
          </div>
          <div className="flex w-[20%] h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

export async function getServerSideProps(context) {
  // Get the token from the cookie
  const { access } = cookie(context);

  // Determine the value of `id` here. In this example, let's say `id` comes from the request params
  const id = context.params ? context.params.id : null; // Replace with the correct logic to obtain `id`

  // Include the token in the Authorization header
  const config = {
    headers: {
      Authorization: "Bearer " + access,
    },
  };

  const url1 =
    "https://resonant-petal-379617.ew.r.appspot.com/campaign/get-user-projects/";
  const url2 = id
    ? `https://resonant-petal-379617.ew.r.appspot.com/campaign/${id}/get-campaigns`
    : null;
  const url3 = id
    ? `https://resonant-petal-379617.ew.r.appspot.com/campaign/${id}/get-kewords`
    : null;
  const url4 =
    "https://resonant-petal-379617.ew.r.appspot.com/campaign/create-user-project"; // POST request
  const url5 = id
    ? `https://resonant-petal-379617.ew.r.appspot.com/campaign/${id}/get-groups`
    : null;

  const urls = [url1, url2, url3, url4, url5];

  const promises = urls.map((url, index) => {
    if (url) {
      if (index === 3) {
        // POST request for url4. Uncomment this part if you need to send a POST request
        /*
        const postData = {
          // Your data fields
        };

        return axios
          .post(url, postData, config)
          .then((response) => response.data)
          .catch((error) =>
            console.error(`Error in POST request to ${url}:`, error)
          );
        */
        // For the sake of example, this block of code is commented. Adjust as per your needs.
        return null;
      } else {
        // GET requests for other URLs
        return axios
          .get(url, config)
          .then((response) => response.data)
          .catch((error) =>
            console.error(`Error in GET request to ${url}:`, error)
          );
      }
    }
    return null;
  });

  const [data1, data2, data3 /*postDataResponse*/, , data5] = await Promise.all(
    promises
  );

  return {
    props: {
      categories: data1 ? data1.results : [],
      campaigns: data2 ? data2.results : [],
      keywords: data3 ? data3.results : [],
      // postResponse: postDataResponse, // You may need to adjust this based on the response structure of your POST request
      groups: data5 ? data5.results : [],
    },
  };
}
