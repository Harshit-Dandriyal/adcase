import { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import cookies from "next-cookies";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Login User
  const login = async ({ email, password }) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    console.log({ email, password });
    const body = {
      email,
      password,
    };

    try {
      const { data: accessResponse } = await axios.post(
        "https://adcase-ten.vercel.app/api/login",
        body,
        config
      );
      console.log("ada1", accessResponse);
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
      if (error.request) {
        setError("Something went wrong");
        return;
      } else {
        setError("Something went wrong");
        return;
      }
      console.error("Error", error.message);
      setError("Something went wrong");
      return;
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
      await axios.post(
        "https://adcase-ten.vercel.app/api/register",
        body,
        config
      );
      login({ email, password });
    } catch (error) {
      if (error.response & error.response.data) {
        setError(error.response.data.message);
        return;
      } else if (error.request) {
        setError("Something went wrong");
        return;
      } else {
        setError("Something went wrong");
        return;
      }
      console.error("Error", error.message);
      setError("Something went wrong");
      return;
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, accessToken, error, login, register }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
