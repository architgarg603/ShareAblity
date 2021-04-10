const { postModel } = require("../model/postModel");
const { userModel } = require("../model/userModel");

async function addPost(req, res) {
    try {
        let id = req.id + "";
        let newPost = await postModel.create({
            userId: id,
            src: req.body.path,
            challenge: req.body.challenge,
            solution: req.body.solution,
            name: req.body.storyName,
            MediaType: req.body.MediaType
        });
        res.status(200).json({
            message: "Succesfully created post !!",
            data: newPost,
        });

    } catch (err) {
        res.status(200).json({
            err: err
        })
    }

}

async function getUserPosts(req, res) {
    try {

        let id = req.id;
        let allPost = await postModel.find({ userId: id });
        res.status(200).json({
            message: "Succesfully recieved all post",
            data: allPost
        })

    } catch (err) {
        res.status(200).json({
            message: "failed to get post",
            err: err
        })
    }
}
async function addLike(req, res) {
    try {

        let id = req.body.id;
        let userId = req.user.id;
        let post = await postModel.findById(id);
        let user = await userModel.findById(post.userId);
        let likesArr = post.likes;

        if (likesArr.includes(userId)) {
            likesArr = likesArr.filter((checkId) => {
                return checkId != userId
            })

            user.likes = user.likes.filter((checkId) => {
                return checkId != userId
            })
        } else {
            likesArr.push(userId);
            user.likes.push(userId);
        }
        user.save();
        post.likes = likesArr;
        post.save();

        res.status(200).json({
            message: "Succesfully liked post post",
            data: post
        })

    } catch (err) {
        res.status(200).json({
            message: "failed to like post",
            err: err
        })
    }
}

async function removeNewLikes(req, res) {
    try {

        let user = await userModel.findById(req.user._id);
        user.likes = [];
        user.save();

        res.status(200).json({
            message: "Succesfully removes all new likes",
            data: user.likes
        })

    } catch (err) {
        res.status(200).json({
            message: "failed to remove new like notification",
            err: err
        })
    }
}

async function checkLike(req,res){
    try{

        let id = req.body.id;
        let post = await postModel.findById(id);
        let likes = post.likes;
        
        let ans = false;
        for(let i=0;i<likes.length;i++){
            if(likes[i] == req.user._id){
                ans = true;
                break;
            }
        }

        res.status(200).json({
            check:ans
        })

    }catch(err){
        res.status(200).json({
            message: "failed to check like",
            err: err
        })
    }
}

async function search(req, res) {
    try {
        let post = await postModel.find({});
        let searcArr = req.body.word.split(" ");

        let data = post.filter((x) => {
            return searcArr.some((y) => {
                return x.name.includes(y);
            })
        })


        res.status(200).json({
            message: "get searched post",
            data: data
        })
    } catch (err) {
        res.status(200).json({
            message: "failed to search",
            err: err
        })
    }
}

async function deletePost(req,res){
    try{
        let deletedPost = await postModel.findByIdAndDelete(req.body.id)
        res.status(200).json({
            message:"deleted Successfully",
            data : deletedPost
        })
        
    // db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );
    }catch(err){
        res.status(501).json({
            message:"deleted not Successfully",
            data : err
        })
    }
}


module.exports.addPost = addPost;
module.exports.getUserPosts = getUserPosts;
module.exports.addLike = addLike;
module.exports.removeNewLikes = removeNewLikes;
module.exports.search = search;
module.exports.checkLike = checkLike;
module.exports.deletePost = deletePost;