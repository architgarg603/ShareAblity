let name = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let about = document.querySelector("#about");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirmPassword");
let message = document.querySelector(".message");
let submitbtn = document.querySelector(".submitbtn");
let signup = document.querySelector(".signup");

window.addEventListener("load", function () {
    signup.addEventListener("click", signupBtnHandler);
    submitbtn.addEventListener("click", submitButton);

});

function signupBtnHandler() {
    window.location.href = "/signin";
}

async function submitButton() {
    try {
        if (name.value && email.value && phone.value && about.value && password.value && confirmPassword.value) {
            let obj = await axios.post("https://shareablity.herokuapp.com/user/signup", {
                name: name.value,
                email: email.value,
                phone: phone.value,
                about: about.value,
                pass: password.value,
                cPass: confirmPassword.value
            });
            if (obj.data.data) {
                window.location.href = "/";
            }
            else {
                message.innerHTML = obj.data.message;
            }
        }
        else {
            message.innerHTML = "Fill All The Necessary Details!";
        }
    }
    catch (e) {
        message.innerHTML = "Unable to signUp";
    }
}