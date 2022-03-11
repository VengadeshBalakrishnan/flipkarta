import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    
  let { _id, name, email, isAdmin } = user;

  return jwt.sign(
    {
      _id: _id,
      name: name,
      email: email,
      isAdmin: isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};
