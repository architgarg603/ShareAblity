const express = require("express");
const { addPost, getUserPosts, addLike, removeNewLikes, search, checkLike, deletePost } = require("../controller/postController");
const { UserisLoggedIn, makeSearchCookie, deleteSearchCookie } = require("../controller/userController");
const { getSearchBar } = require("../controller/viewController");
const postRouter = express.Router();

postRouter.use(UserisLoggedIn);
postRouter.post("/add", addPost);
postRouter.post("/getAll",getUserPosts);
postRouter.post("/like",addLike);
postRouter.post("/removeNewLike", removeNewLikes);
postRouter.post("/search",search);
postRouter.post("/checkLike", checkLike);
postRouter.post("/delete",deletePost);
postRouter.post("/msc",makeSearchCookie);
postRouter.post("/dsc",deleteSearchCookie);

module.exports = postRouter;