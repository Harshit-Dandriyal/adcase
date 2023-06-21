import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import Cookies from "js-cookie";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [errorEmail, seterrorEmail] = useState(null);
  const [errorPassword, seterrorPassword] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [loginEmailError, setLoginEmailError] = useState(null);

  const router = useRouter();
  // Login User
  // Login User
  const login = async ({ email, password }) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = {
      email,
      password,
    };

    try {
      const { data: accessResponse } = await axios.post(
        "http://localhost:3000/api/login",
        body,
        config
      );
      if (accessResponse && accessResponse.access) {
        setAccessToken(accessResponse.access);

        // Set the token in a secure HTTP-only cookie
        document.cookie = cookies.serialize(
          "token",
          String(accessResponse.access),
          {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== 'development', // Uncomment this line when in production
            maxAge: 60 * 60, // 1 hour
            path: "/", // Root path
            sameSite: "lax", // Protect from CSRF
          }
        );
      }

      router.push("/main");
    } catch (error) {
      console.log("aaa", error?.response?.data);
      console.log("qqq", error?.response?.data?.message?.detail);

      setLoginError(
        error?.response?.data.message.detail
          ? error?.response?.data?.message?.detail
          : null
      );
      setLoginEmailError(
        error?.response?.data.message.error
          ? error?.response?.data?.message?.error
          : null
      );
    }
  };
  const register = async ({ email, password }) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = {
      email,
      password,
    };

    try {
      // call nextjs api function to create a user

      const response = await axios.post(
        "http://localhost:3000/api/signup",
        body,
        config
      );
      router.push("/");

      // Clear error values after successful response
      seterrorEmail(null);
      seterrorPassword(null);
    } catch (error) {
      seterrorEmail(
        error?.response.data.message.email
          ? error?.response?.data?.message?.email[0]
          : null
      );
      seterrorPassword(
        error?.response?.data.message.password
          ? error?.response?.data?.message?.password[0]
          : null
      );
    }
  };
  return (
    <AuthenticationContext.Provider
      value={{
        user,
        accessToken,
        errorEmail,
        login,
        register,
        errorPassword,
        loginError,
        loginEmailError,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
