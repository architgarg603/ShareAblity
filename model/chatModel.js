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

let chatSchema = new mongoose.Schema({
    p1: {
        type: String,
        required: true
    },
    p2: {
        type: String,
        required: true
    },
    chat: {
        type: Array,
        default: []
    }
   
});



const chatModel = mongoose.model("chatCollection", chatSchema);
module.exports.chatModel = chatModel;