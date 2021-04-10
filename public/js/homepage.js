let tags = document.querySelectorAll(".box");
let input = document.querySelector(".searchbar");
let searchbtn = document.querySelector(".submitbtn");

searchbtn.addEventListener("click", async function(){
    if(input.value){

        let data = await axios.post("https://shareablity.herokuapp.com/post/msc",{searchWords:input.value})
        window.location.href = "/search";
    }
})


tags[0].addEventListener("click",async function(){
    let data = await axios.post("https://shareablity.herokuapp.com/post/msc",{searchWords:"self care"})
    window.location.href = "/search";
    
})
tags[1].addEventListener("click",async function(){
    let data = await axios.post("https://shareablity.herokuapp.com/post/msc",{searchWords:"entertainment"})
    window.location.href = "/search";
    
})
tags[2].addEventListener("click",async function(){
    let data = await axios.post("https://shareablity.herokuapp.com/post/msc",{searchWords:"social"})
    window.location.href = "/search";
    
})
tags[3].addEventListener("click",async function(){
    let data = await axios.post("https://shareablity.herokuapp.com/post/msc",{searchWords:"communication"})
    window.location.href = "/search";
    
})
tags[4].addEventListener("click",async function(){
    let data = await axios.post("https://shareablity.herokuapp.com/post/msc",{searchWords:"housekeeping"})
    window.location.href = "/search";
    
})
tags[5].addEventListener("click",async function(){
    let data = await axios.post("https://shareablity.herokuapp.com/post/msc",{searchWords:"sports"})
    window.location.href = "/search";
    
})
tags[6].addEventListener("click",async function(){
    let data = await axios.post("https://shareablity.herokuapp.com/post/msc",{searchWords:"cooking"})
    window.location.href = "/search";
    
})
tags[7].addEventListener("click",async function(){
    let data = await axios.post("https://shareablity.herokuapp.com/post/msc",{searchWords:"mobility"})
    window.location.href = "/search";
    
})
tags[8].addEventListener("click",async function(){
    let data = await axios.post("https://shareablity.herokuapp.com/post/msc",{searchWords:"work"})
    window.location.href = "/search";
    
})