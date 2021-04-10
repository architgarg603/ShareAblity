const mongoose = require("mongoose");
const  dblink  = process.env.dblink;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
    .connect(
        dblink,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((db) => {
        console.log("Connected to db !!!");
    });

let postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true,
        unique: true
    },
    challenge: {
        type: String,
        required:true
    },
    solution: {
        type: String,
        required: true
    },
    likes:{
        type:Array 
    },
    name:{
        type:String,
        required:true
    },
    MediaType:{
        type:String,
        required:true

    }
   
})



const postModel = mongoose.model("postCollection", postSchema);
module.exports.postModel = postModel;