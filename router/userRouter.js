const express = require("express");
const { userSignup, userLogin, logout, updateDetails, updateUserProfilePhoto, protectRoute, getUserById } = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/signup",userSignup);
userRouter.post("/signin",userLogin);
userRouter.post("/logout",logout);
userRouter.use(protectRoute);
userRouter.patch("/updateDetails",updateDetails);
userRouter.patch("/updateDp",updateUserProfilePhoto);
userRouter.post("/userById",getUserById);


module.exports = userRouter;