let logo = document.querySelector(".project-header")
let home = document.querySelector(".option3-header")
let about = document.querySelector(".option1-header")
let chats = document.querySelector(".option2-header")
let profile = document.querySelector(".name-header");
let search_header = document.querySelector(".option4-header");

logo.addEventListener("click",function(){
    window.location.href = "/"
})

search_header.addEventListener("click",function(){
    window.location.href = "/search"
})

home.addEventListener("click",function(){
    window.location.href = "/"
    
})

about.addEventListener("click",function(){
    window.location.href = "/about"
    
})

chats.addEventListener("click",function(){
    window.location.href = "/chatList"
    
})

profile.addEventListener("click",function(){
    window.location.href = "/profile"

})
