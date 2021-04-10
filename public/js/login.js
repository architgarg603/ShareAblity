let email = document.querySelector("#email");
let password = document.querySelector("#password");
let message = document.querySelector(".message");
let submitbtn = document.querySelector(".submitbtn");
let signup = document.querySelector(".signup span");

window.addEventListener("load",function(){
    submitbtn.addEventListener("click", submitButtonHandler);
    signup.addEventListener("click",signUpHandler);
    email.addEventListener("keypress",enterButton);
    password.addEventListener("keypress",enterButton);
});

async function submitButtonHandler(){
    try{
        if(email.value && password.value){
            let obj = await axios.post("https://shareablity.herokuapp.com/user/signin",{
                email: email.value,
                password : password.value
            });
            console.log("object");
            if(obj.data.data){
                window.location.href = "/";
            }
            else{
                message.innerHTML = obj.data.message;
            }
        }
        else{
            message.innerHTML = "Add E-mail and Password";
        }
    }
    catch(err){
        message.innerHTML= "No User Found";
    }
}

function signUpHandler(){
    window.location.href = "/signup";
}
async function enterButton(e){
    try{
        if(e.key == 'Enter'){
            if(email.value && password.value){
                let obj = await axios.post("https://shareablity.herokuapp.com/user/signin",{
                    email: email.value,
                    password : password.value
                });
                if(obj.data.data){
                    window.location.href = "/";
                }
                else{
                    message.innerHTML = obj.data.message;
                }
            }
            else{
                message.innerHTML = "Add E-mail and Password";
            }
        }
        
    }
    catch(err){
        message.innerHTML= "No User Found";
    }
}

document.querySelector(".headerimg").addEventListener("click",function(){
    window.location.href = "/"
})



