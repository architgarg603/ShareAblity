const jwt = require("jsonwebtoken");
const  secretkey  = process.env.secretkey;
const { userModel } = require("../model/userModel");

async function getUser(req, res) {
  try {
    let user = await userModel.find({ email: req.body.email });
    user.password = ""
    res.status(200).json({
      message: "User data",
      data: user
    })
  } catch (err) {
    res.status(501).json({
      message: "failed to get user data",
      error: err
    })
  }
}

async function getUserById(req, res) {
  try {
    let user = await userModel.findById(req.body.id);
    user.password = ""
    res.status(200).json({
      message: "User data",
      data: user
    })
  } catch (err) {
    res.status(501).json({
      message: "failed to get user data",
      error: err
    })
  }
}

async function userSignup(req, res) {
  try {
    let user = req.body;
    let newUser = await userModel.create({
      name: user.name,
      email: user.email,
      password: user.pass,
      confirmPassword: user.cPass,
      phone: user.phone,
      about: user.about
    });
    const token = jwt.sign({ id: newUser["_id"] }, secretkey);
    res.cookie("jwt", token, { httpOnly: true });

    res.status(200).json({
      message: "Succesfully Signed up !!",
      data: newUser,
    });
  } catch (error) {
    res.status(200).json({
      message: "Email is already registered!!",
      error,
    });
  }
}

async function userLogin(req, res) {
  try {
    let { email, password } = req.body;
    let loggedInUser = await userModel.find({ email: email });
    if (loggedInUser.length) {
      let user = loggedInUser[0];
      if (user.password == password) {
        // token ban na chahie
        const token = jwt.sign({ id: user["_id"] }, secretkey);

        res.cookie("jwt", token, { httpOnly: true });
        res.status(200).json({
          message: "Logged in succesfully !!",
          data: loggedInUser[0],
        });
        // res.redirect("/");
      } else {
        res.status(200).json({
          message: "Email and Password didn't Matched !!",
        });
      }
    } else {
      res.status(200).json({
        message: "No User Found, Please sign up!",
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Login Failed !!",
      error,
    });
  }
}

async function UserisLoggedIn(req, res, next) {
  try {
    let token = req.cookies.jwt;
    const payload = jwt.verify(token, secretkey);
    if (payload) {
      let user = await userModel.findById(payload.id);
      req.name = user.name;
      req.user = user;
      req.id = user._id
      req.isLoggedIn = "true";
      next();
    } else {
      //logged in nhi hai
      req.isLoggedIn = "false";
      next();
    }
  } catch (error) {
    next();
  }
}
async function updateUserProfilePhoto(req, res) {
  try {
    let id = req.id;
    let user = await userModel.findById(id);
    user.pImage = req.body.imagePath;
    await user.save({ validateBeforeSave: false });
    res.json({
      message: "Profile Photo updated !!"
    })
  }
  catch (error) {
    res.status(200).json({
      message: "failed to update photo !!",
      error
    })
  }
}


async function updateDetails(req, res) {
  oo
  try {
    let user = await userModel.findById(req.id);
    for (key in req.body) {
      user[key] = req.body[key];
    }
    user.save();
    res.status(200).json({
      mess: "Successfully updated details",
      data: user
    })

  } catch (err) {
    res.status(500).json({
      mess: "failed to update",
      data: changesObj
    })
  }
}

async function logout(req, res) {
  try {

    res.clearCookie("jwt");

    res.redirect("/");


  } catch (error) {
    res.status(501).json({
      error,
    });
  }
}

async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    const payload = jwt.verify(token, secretkey);
    if (payload) {
      req.id = payload.id;
      next();
    } else {
      res.status(501).json({
        message: "Please Log in !!",
      });
    }
  } catch (error) {
    res.status(501).json({
      message: "Please Log in !!",
      error,
    });
  }
}

function makeSearchCookie(req, res) {
  try {
    const token = jwt.sign({ words: req.body.searchWords }, secretkey);
    res.cookie("sW", token, { httpOnly: true });
    res.status(200).json({
      data: "cookie added"
    })
  } catch (err) {
    res.status(501).json({
      error,
    });
  }
}


async function deleteSearchCookie(req, res) {
  try {

    res.clearCookie("sW");
    res.status(200).json({
      data: "cookie deleted"
    })

  } catch (error) {
    res.status(501).json({
      error,
    });
  }
}

module.exports.logout = logout;
module.exports.protectRoute = protectRoute;
module.exports.UserisLoggedIn = UserisLoggedIn;
module.exports.userLogin = userLogin;
module.exports.userSignup = userSignup;
module.exports.updateDetails = updateDetails;
module.exports.getUser = getUser;
module.exports.getUserById = getUserById;
module.exports.updateUserProfilePhoto = updateUserProfilePhoto;
module.exports.makeSearchCookie = makeSearchCookie;
module.exports.deleteSearchCookie = deleteSearchCookie;