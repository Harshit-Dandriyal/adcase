import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  let accessToken = null;

  if (req.method === "POST") {
    const { email, password } = req.body;

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
        "https://resonant-petal-379617.ew.r.appspot.com/auth/token/",
        body,
        { ...config, withCredentials: true }
      );
      accessToken = accessResponse.access;
      // in production change secure to true
      console.log("access", accessToken);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("access", accessResponse.access, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
          path: "/",
        })
      );
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        return res.status(401).json({ message: error.response.data.detail });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
      console.error(error.config);

      return res.status(500).json({ message: "Something went wrong" });
    }

    if (accessToken) {
      const userConfig = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
    }
    res.status(200).json({ access: accessToken });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
