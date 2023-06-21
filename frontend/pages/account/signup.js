import React, { useContext, useState } from "react";
import Image from "next/image";
import AuthenticationContext from "../../context/AuthenticationContext";
import { useRouter } from "next/router";

const SignupPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { register, errorEmail, errorPassword } = useContext(
    AuthenticationContext
  ); // Import 'error' from your context
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    await register({ email, password }); // Await for the 'register' to complete
  };
  return (
    <>
      <div className="flex justify-center items-center flex-col h-[100vh] border-none">
        <img
          className="ml-1 h-[90px]"
          src="/logo.png"
          alt="Google logo"
          width={80}
          height={100}
        />
        <div className="flex justify-center items-center flex-col border-none">
          {/* Changed the Tailwind class from mt-[250px] to mt-64 */}
          <h1 className="text-3xl font-bold m-3 text-white">
            Create your account!
          </h1>
          <form
            className="flex flex-col"
            action="#"
            method="POST"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-64 h-12 m-3 text-center placeholder-white border border-white bg-[#212121]"
              placeholder="Email address"
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-64 h-12 m-3 text-center placeholder-white border border-white bg-[#212121]"
              placeholder="Password"
            />
            <button className=" m-3 flex rounded w-64 h-12 items-center justify-center border border-white bg-blue-500 text-white hover:bg-blue-700">
              {" "}
              Sign Up
            </button>
          </form>
        </div>
        {errorEmail && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {errorEmail}</span>
          </div>
        )}
        {errorPassword && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {errorPassword}</span>
          </div>
        )}
      </div>
      {console.log("lka", errorEmail)}
      {console.log("lka1", errorPassword)}
    </>
  );
};

export default SignupPage;
