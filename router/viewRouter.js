const express = require("express");
const { UserisLoggedIn, logout } = require("../controller/userController");
const { getHome, getLogin, getSignUp, profile, myPost, upload, about, getSearch, getSearchBar, pchat, messageList } = require("../controller/viewController");
const viewRouter = express.Router();

viewRouter.use(UserisLoggedIn);
viewRouter.get("/",getHome);
viewRouter.get("/search",getSearch);
viewRouter.get("/signin",getLogin);
viewRouter.get("/signup", getSignUp);
viewRouter.get('/profile',profile);
viewRouter.get("/mypost",myPost);
viewRouter.get("/upload",upload);
viewRouter.get("/about",about);
viewRouter.get("/chatList",messageList);
viewRouter.get("/pchat",pchat);
viewRouter.get("/logout",logout);
module.exports = viewRouter;