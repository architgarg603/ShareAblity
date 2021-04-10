let sharebtn = document.querySelector(".share");
let messbtn = document.querySelector(".a");
let likebtn = document.querySelector(".b");
let uploadbtn = document.querySelector(".c");

sharebtn.addEventListener("click",function(){
    window.location.href = "/upload";
})
messbtn.addEventListener("click",function(){
    window.location.href = "/chatList";
    
})
likebtn.addEventListener("click",function(){
    // window.location.href = "/";
    
})
uploadbtn.addEventListener("click",function(){
    window.location.href = "/mypost";
})