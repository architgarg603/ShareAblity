const jwt = require("jsonwebtoken");
const  secretkey  = process.env.secretkey;

const { chatModel } = require("../model/chatModel");
const { userModel } = require("../model/userModel");

async function getList(req, res) {
    try {
        console.log(req.id)
        let id = req.user._id;
        let list = await chatModel.find({ p1: id });
        let data = [];
        for (let i = 0; i < list.length; i++) {
            let obj = await userModel.findById(list[i].p2);
            let mess = "";
            if (list[i].chat.length) {
                mess = list[i].chat[list[i].chat.length - 1];
            }
            let userObj = {
                name: obj.name,
                id: obj._id,
                photo: obj.pImage,
                mess: mess

            }
            data.push(userObj);
        }

        res.status(200).json({
            message: "Successfully get list",
            data: data
        })

    } catch (err) {
        res.status(501).json({
            message: "failed to get list",
            err
        })
    }
}

async function getchat(req, res) {
    try {
        let token = req.cookies.cC;
        let payload = "";
        if (token) {
            payload = jwt.verify(token, secretkey);

            let id1 = payload.p1;
            let id2 = payload.p2;

            let data = await chatModel.find({ p1: id1, p2: id2 });

            if (data.length == 0) {
                data = await chatModel.create({
                    p1: id1,
                    p2: id2,
                    chat: []
                })
                data = [data];
                await chatModel.create({
                    p1: id2,
                    p2: id1,
                    chat: []
                })

            }
            res.status(200).json({
                message: "Successfully get chats",
                data: data,
                name:payload.name,
                img:payload.pIMage,
                id:id2
            })
        }else{
            res.status(200).json({
                message: "Successfully get chat",
                data: [{
                    p1:"",
                    p2:"",
                    chat:[]
                }],
                name:"",
                img:"",
                id:""
            })
        }



    } catch (err) {
        res.status(501).json({
            message: "failed to get chat",
            err
        })
    }
}


async function addChat(req, res) {
    try {

        let id1 = req.id;
        let id2 = req.body.id;

        
        let data = await chatModel.findOne({ p1: id1, p2: id2 });
        let data1 = await chatModel.findOne({ p1: id2, p2: id1 });
        let obj = {};
        obj.sender = "me";
        obj.mess = req.body.message;
        let arr = data.chat
        arr.push(obj);
        data.chat = arr;
        await data.save();

        obj.sender = "other"
        arr = data1.chat;
        arr.push(obj)
        data1.chat = arr
        await data1.save();

        res.status(200).json({
            message: "Successfully added chat",
            data: data
        })

    } catch (err) {
        res.status(501).json({
            message: "failed to add message",
            err
        })
    }
}

function makeChatCookie(req, res) {
    try {
        const token = jwt.sign({ p1: req.id, p2: req.body.id, name:req.body.name, pIMage:req.body.pImage }, secretkey);
        res.cookie("cC", token, { httpOnly: true });
        res.status(200).json({
            data: "cookie added"
        })
    } catch (err) {
        res.status(501).json({
            err,
        });
    }
}



module.exports.getList = getList;
module.exports.getchat = getchat;
module.exports.addChat = addChat;
module.exports.makeChatCookie = makeChatCookie;
