let otherDiv = document.querySelector(".others");
let name = document.querySelector(".upper h1");
let author = document.querySelector(".upper h3");
let bottom = document.querySelector(".bottom");
let challenge = document.querySelector(".text1 p");
let solution = document.querySelector(".text2 p");
let liked = document.querySelector(".liked");
let wrap = document.querySelector(".wrap");
let cross = document.querySelector(".cross i");
let popup = document.querySelector(".popup");
let page = document.querySelector(".page");
let delBtn = document.querySelector(".Delete");
let media;
let postId;
let isLiked;

delBtn.addEventListener("click",async function(){
   let data =  await axios.post("https://shareablity.herokuapp.com/post/delete",{id: postId});
   window.location.reload();
})

liked.addEventListener("click", async function(){
    await axios.post("https://shareablity.herokuapp.com/post/like",{id: postId});
    isLiked = isLiked?false:true;
    if(isLiked){
        document.querySelectorAll(".liked i")[1].style.display = "none";    
        document.querySelectorAll(".liked i")[0].style.display = "flex";    
    }else{
        document.querySelectorAll(".liked i")[0].style.display = "none";    
        document.querySelectorAll(".liked i")[1].style.display = "flex";    
    }
    document.querySelector(".liked span").innerHTML = isLiked?"Liked!":"Like";
})

async function viewStory(post){
    try{
        name.innerHTML = post.name;
        author.innerHTML = "";
        challenge.innerHTML = post.challenge;
        solution.innerHTML = post.solution;
        isLiked = await axios.post("https://shareablity.herokuapp.com/post/checkLike",{id: post._id});
        isLiked = isLiked.data.check;
        if(isLiked){
            document.querySelectorAll(".liked i")[1].style.display = "none";    
            document.querySelectorAll(".liked i")[0].style.display = "flex";    
        }else{
            document.querySelectorAll(".liked i")[0].style.display = "none";    
            document.querySelectorAll(".liked i")[1].style.display = "flex";    
        }
        document.querySelector(".liked span").innerHTML = isLiked?"Liked!":"Like";
        let type = post.MediaType.split("/")[0];
        if(type == 'image'){
            let img = document.createElement("img");
            img.setAttribute("src",post.src);
            media = img;
            bottom.appendChild(img);
        }
        else if(type == 'video'){
            let video = document.createElement("video");
            video.controls = true
            let source = document.createElement("source");
            source.setAttribute("src",post.src);
            source.setAttribute("type",post.MediaType );
            video.appendChild(source);
            media = video;
            bottom.appendChild(video);
        }
        else if(type == 'audio'){
            let audio = document.createElement("audio");
            let source = document.createElement("source");
            source.setAttribute("src",post.src);
            source.setAttribute("type",post.MediaType );
            audio.controls = true;
            audio.appendChild(source);
            media = audio;
            bottom.appendChild(audio);

        }
        wrap.style.display = "flex";
        let h = (page.getBoundingClientRect().top * (-1)) + ((screen.height )/10) ;
        popup.style.top = h+'px';
       
       
    }
    catch(e){
        console.log(e);
    }
}

function closeTheStory(){
    wrap.style.display = "none";   
    media.remove();
}

async function getPost(){
    let post = await axios.post("https://shareablity.herokuapp.com/post/getAll");
    post = post.data.data;
    let stories = document.createElement("div");
    stories.classList.add("stories");
    for(let i=0;i<post.length;i++){
        let story = document.createElement("div");
        story.classList.add("story");
        let part1 = document.createElement("part1");
        part1.classList.add("part1");
        let part2 = document.createElement("div");
        part2.classList.add("part2");
        let text = document.createElement("div");
        text.classList.add("text");
        text.innerHTML = post[i].name;
        let type = post[i].MediaType.split('/')[0];
        let mediaWrapper = document.createElement("div");
        mediaWrapper.classList.add("mediaWrapper");
        part2.addEventListener("click",function(){
            postId = post[i]._id
            viewStory(post[i]);
        });
        if(type == 'image'){
            part2.innerHTML = "Read Story";
            let img = document.createElement("img");
            img.setAttribute("src",post[i].src);
            mediaWrapper.appendChild(img);
            part1.appendChild(mediaWrapper);
        }
        else if(type == 'video'){
            part2.innerHTML = "Watch Story";
            let video = document.createElement("video");
            video.controls = true;
           
            let source = document.createElement("source");
            source.setAttribute("src",post[i].src);
            source.setAttribute("type",post[i].MediaType );
            video.appendChild(source);
            mediaWrapper.appendChild(video);
            part1.appendChild(mediaWrapper);
            
        }
        else if(type == 'audio'){
            part2.innerHTML = "Listen Story";
            let audio = document.createElement("audio");
            audio.controls = true;
            let source = document.createElement("source");
            source.setAttribute("src",post[i].src);
            source.setAttribute("type",post[i].MediaType );
            audio.controls = true;
            audio.appendChild(source);
            mediaWrapper.appendChild(audio)
            part1.appendChild(mediaWrapper);
        }
        part1.appendChild(text)
        story.appendChild(part1)
        story.appendChild(part2)
        stories.appendChild(story)

    }
    otherDiv.appendChild(stories)
}

cross.addEventListener("click",closeTheStory);
getPost();