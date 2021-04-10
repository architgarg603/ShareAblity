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

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: [6, "Password must be greater than 6 characters"],
        required: true
    },
    confirmPassword: {
        type: String,
        minlength: [6, "Password must be greater than 6 characters"],
        validate: {
            validator: function () {
                return this.password == this.confirmPassword;
            },
            message: "Password didn't matched !!"
        }
    },
    aboutYourself: {
        type: String
    },
    pImage: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/sharablity.appspot.com/o/static%2Fdummy-avatar.jpg?alt=media&token=989ddb4e-d575-4125-bf33-5c09b7ea4f8c"
    },
    phone: {
        type: String,
        required: true
    },
    likes:{
        type:Array
    }
   
})


// it will run before create is called on userModel
userSchema.pre("save", function () {
    this.confirmPassword = undefined;
})

const userModel = mongoose.model("userCollection", userSchema);
module.exports.userModel = userModel;