import express from "express";
import bcrypt from "bcrypt";
import data from "../data.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const email = req.body.email?.toLowerCase();
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }

    res.status(401).send({ message: "Invalid Email or Password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const email = req.body.email?.toLowerCase();

    if (!req.body.name || !email || !req.body.password) {
      res.status(400).send({ message: "Name, email and password are required" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).send({ message: "User already exists" });
      return;
    }

    const user = new User({
      name: req.body.name,
      email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

export default userRouter;
