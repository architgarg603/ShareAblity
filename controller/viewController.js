const jwt = require("jsonwebtoken");
const  secretkey  = process.env.secretkey;

function getHome(req, res) {
    let nameHeader = "";
    if (req.user) {
        nameHeader = req.user.name;
    }
    res.render("homepage.ejs", { name: nameHeader,check:req.isLoggedIn });


}
function getSearch(req, res) {
    if (req.isLoggedIn == "true") {

        let token = req.cookies.sW;
        let payload = "";
        if (token)
            payload = jwt.verify(token, secretkey);
        res.clearCookie("sW");
        res.render("afterSearch.ejs", { search: payload ? payload.words : "", name: req.user.name });
    } else {
        res.redirect("/signin")
    }

}

function getLogin(req, res) {
    if (req.isLoggedIn == "true") {
        res.redirect("/")
    } else {
        res.render("login.ejs");
    }

}

function getSignUp(req, res) {
    if (req.isLoggedIn) {
        res.redirect("/")
    } else {
        res.render("signup.ejs");
    }

}

function upload(req, res) {
    if (req.isLoggedIn) {
        res.render("upload.ejs",{name: req.user.name });
    } else {
        res.redirect("/signin")
    }

}

function myPost(req, res) {
    if (req.isLoggedIn) {
        res.render("myPost.ejs", { name: req.user.name });
    } else {
        res.redirect("/signin")
    }

}

function profile(req, res) {
    if (req.isLoggedIn) {
        res.render("profile.ejs", { name: req.user.name });
    } else {
        res.redirect("/signin")
    }

}

function messageList(req, res) {
    if (req.isLoggedIn) {
        res.render("messageList.ejs", { name: req.user.name });
    } else {
        res.redirect("/signin")
    }

}
function pchat(req, res) {
    if (req.isLoggedIn) {
        res.render("chat.ejs", { name: req.user.name });
    } else {
        res.redirect("/signin")
    }

}

function about(req, res) {
    let nameHeader = "";
    if (req.user) {
        nameHeader = req.user.name;
    }
    res.render("about.ejs", { name: nameHeader,check:req.isLoggedIn });
}




module.exports.getHome = getHome;
module.exports.getLogin = getLogin;
module.exports.getSignUp = getSignUp;
module.exports.upload = upload;
module.exports.myPost = myPost;
module.exports.profile = profile;
module.exports.about = about;
module.exports.getSearch = getSearch;
module.exports.messageList = messageList;
module.exports.pchat = pchat;

