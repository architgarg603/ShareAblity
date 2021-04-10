const express = require("express");
const { getList, getchat, addChat, makeChatCookie } = require("../controller/chatController");
const { UserisLoggedIn } = require("../controller/userController");
const chatRouter = express.Router();

chatRouter.use(UserisLoggedIn);
chatRouter.post("/getList",getList);
chatRouter.post("/getChat",getchat);
chatRouter.post("/addChat",addChat);
chatRouter.post("/mcc",makeChatCookie);
module.exports = chatRouter;