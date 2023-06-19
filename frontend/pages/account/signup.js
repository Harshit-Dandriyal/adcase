import React, { useContext, useState } from "react";
import Image from "next/image";
import AuthenticationContext from "../../context/AuthenticationContext";
import { useRouter } from "next/router";

const SignupPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { register, error } = useContext(AuthenticationContext); // Import 'error' from your context
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await register({ email, password }); // Await for the 'register' to complete
      router.push("/"); // If register is successful, move to next page
    } catch (err) {
      console.log(err); // Log error for debugging, if needed
    }
  };
  return (
    <>
      <div className="flex justify-evenly items-center flex-col h-[100vh]">
        <Image
          className="ml-1"
          src="/logo.png"
          alt="Google logo"
          width={80}
          height={80}
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
          <p className="line text-center relative mt-[10px]">
            <span className="line inline-block pr-2">OR</span>
            <span className=" line inline-block h-[1px] bg-black flex-grow"></span>
          </p>
          <button className="googlelogin-button mt-5 flex rounded w-64 h-12 items-center justify-center bg-[#212121] border border-white">
            <Image
              className="ml-1"
              src="https://freepngimg.com/save/66903-google-pay-gboard-platform-logo-cloud/1734x1662"
              alt="Google logo"
              width={25}
              height={25}
            />
            Continue with Google
          </button>
        </div>
      </div>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
    </>
  );
};

export default SignupPage;
