export default (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("access", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // set to true if in production
      sameSite: "strict",
      maxAge: -1, // Set maxAge to -1 to delete cookie
      path: "/",
    })
  );

  res.status(200).json({ message: "Logout successful" });
};
