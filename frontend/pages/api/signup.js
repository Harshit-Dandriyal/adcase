import axios from "axios";

export default async (req, res) => {
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
      await axios.post(
        "https://resonant-petal-379617.ew.r.appspot.com/user/create/",
        body,
        config
      );
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        return res
          .status(error.response.status)
          .json({ message: error.response.data });
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
      console.error(error.config);
      return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "User has been created" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
