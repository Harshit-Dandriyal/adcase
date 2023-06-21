import { useState, useContext, useEffect } from "react";

import Link from "next/link";
import AuthenticationContext from "../context/AuthenticationContext";
import { useRouter } from "next/router";
import { withUnauth } from "../hoc/unauth";
import Cookies from "js-cookie";

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const { login, loginError, loginEmailError } = useContext(
    AuthenticationContext
  );
  const submitHandler = async (e) => {
    e.preventDefault();
    await login({ email, password });
    router.push("/main");
  };
  useEffect(() => {
    // Remove the access token from the cookie
    Cookies.remove("access"); // Make sure to use the correct key for the cookie
  }, []);
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border-none h-[100vh]">
        <div className="flex flex-col justify-center items-center text-white border-none">
          <img
            className="ml-1"
            src="/logo.png"
            alt="Google logo"
            width={80}
            height={20}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-none">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="border-none">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                Email address
              </label>
              <div className="mt-2 border-none">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="border-none">
              <div className="flex items-center justify-between border-none">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 "
                >
                  Password
                </label>
                <div className="text-sm border-none">
                  <a href="#" className="font-semibold  hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2 border-none ">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/account/signup"
              className="font-semibold leading-6 text-red-400 hover:text-indigo-500"
            >
              <span className=" text-indigo-600 cursor-pointer">
                Sign up here
              </span>
            </Link>
          </p>
        </div>
        {loginError && (
          <div className="flex w-full justify-center border-none">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3 "
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {loginError}</span>
            </div>
          </div>
        )}
        {loginEmailError && (
          <div className="flex w-full justify-center border-none">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3 "
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {loginEmailError}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SignIn;
