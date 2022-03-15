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

export const isAuth = (req, res, next) => {
  console.log('test',  req.headers.authorization)
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Test XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token !!!" });
  }
};
