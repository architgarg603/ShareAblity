let input = document.querySelector(".search");
let searchBtn = document.querySelector(".searchBtn")
let initialSearch = input.value;

let popupWrap = document.querySelector(".wrap");
let closePopupBtn = document.querySelector(".closeBtn");
let popup = document.querySelector(".popup")

let otherDiv = document.querySelector(".others");

let name = document.querySelector(".upper h1");
let author = document.querySelector(".upper h3");
let bottom = document.querySelector(".bottom");
let challenge = document.querySelector(".text1 p");
let solution = document.querySelector(".text2 p");
let likeBtn = document.querySelector(".liked");

let contact = document.querySelector(".contact")
let postId;
let idx = 6;
let postLength;
let userObj;

let loadMore = document.querySelector(".loadMore");
let page = document.querySelector(".page");


async function search() {
    let post = await axios.post("https://shareablity.herokuapp.com/post/search", { word: initialSearch });
    post = post.data.data;
    let storiesDiv = document.querySelector(".stories");

    let stories = document.createElement("div");
    stories.classList.add("stories");

    postLength = post.length;
    loadMore.style.display = "none";

    for (let i = 0; i < post.length && i < idx; i++) {
        let story = document.createElement("div");
        story.classList.add("story");

        let part1 = document.createElement("div");
        part1.classList.add("part1");

        let text = document.createElement("div");
        text.classList.add("text");
        text.innerHTML = post[i].name;

        let part2 = document.createElement("part2");
        part2.classList.add("part2");

        let type = post[i].MediaType.split('/')[0];
        let mediaWrapper = document.createElement("div");
        mediaWrapper.classList.add("mediaWrapper");
        part2.addEventListener("click", function () {
            postId = post[i]._id
            viewPost(post[i]);
        });

        if (type == 'image') {
            part2.innerHTML = "Read Story";
            let img = document.createElement("img");
            img.setAttribute("src", post[i].src);
            mediaWrapper.appendChild(img);
            part1.appendChild(mediaWrapper);
        }
        else if (type == 'video') {
            part2.innerHTML = "Watch Story";
            let video = document.createElement("video");
            video.controls = true
            let source = document.createElement("source");
            source.setAttribute("src", post[i].src);
            source.setAttribute("type", post[i].MediaType);
            video.appendChild(source);
            mediaWrapper.appendChild(video);
            part1.appendChild(mediaWrapper);

        }
        else if (type == 'audio') {
            part2.innerHTML = "Listen Story";
            let audio = document.createElement("audio");
            let source = document.createElement("source");
            source.setAttribute("src", post[i].src);
            source.setAttribute("type", post[i].MediaType);
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
    if (post.length == 0) {
        let head = document.createElement("h1");
        head.innerHTML = "No relevent post found";
        stories.appendChild(head);
    }

    storiesDiv.remove();
    otherDiv.appendChild(stories);

}
search();

async function viewPost(post) {
    try {
        let user = await axios.post("https://shareablity.herokuapp.com/user/userById", { id: post.userId });
        userObj = user.data.data;
        user = user.data.data;
        author.innerHTML = `Shared By: ${user.name}`;
        name.innerHTML = post.name;
        challenge.innerHTML = post.challenge;
        solution.innerHTML = post.solution;
        isLiked = await axios.post("https://shareablity.herokuapp.com/post/checkLike", { id: post._id });
        isLiked = isLiked.data.check;
        if (isLiked) {
            document.querySelectorAll(".liked i")[1].style.display = "none";
            document.querySelectorAll(".liked i")[0].style.display = "flex";
        } else {
            document.querySelectorAll(".liked i")[0].style.display = "none";
            document.querySelectorAll(".liked i")[1].style.display = "flex";
        }
        document.querySelector(".liked span").innerHTML = isLiked ? "Liked!" : "Like";
        let type = post.MediaType.split("/")[0];
        if (type == 'image') {
            let img = document.createElement("img");
            img.setAttribute("src", post.src);
            media = img;
            bottom.appendChild(img);
        }
        else if (type == 'video') {
            let video = document.createElement("video");
            video.controls = true;
            let source = document.createElement("source");
            source.setAttribute("src", post.src);
            source.setAttribute("type", post.MediaType);
            video.appendChild(source);
            media = video;
            bottom.appendChild(video);
        }
        else if (type == 'audio') {
            let audio = document.createElement("audio");
            let source = document.createElement("source");
            source.setAttribute("src", post.src);
            source.setAttribute("type", post.MediaType);
            audio.controls = true;
            audio.appendChild(source);
            media = audio;
            bottom.appendChild(audio);

        }
        popupWrap.style.display = "flex";
        let h = (page.getBoundingClientRect().top * (-1)) + ((screen.height) / 10);
        popup.style.top = h + 'px';


    }
    catch (e) {
        console.log(e);
    }

}

closePopupBtn.addEventListener("click", closeTheStory);
function closeTheStory() {
    popupWrap.style.display = "none";
    media.remove();
}


likeBtn.addEventListener("click", async function () {
    await axios.post("https://shareablity.herokuapp.com/post/like", { id: postId });
    isLiked = isLiked ? false : true;
    if (isLiked) {
        document.querySelectorAll(".liked i")[1].style.display = "none";
        document.querySelectorAll(".liked i")[0].style.display = "flex";
    } else {
        document.querySelectorAll(".liked i")[0].style.display = "none";
        document.querySelectorAll(".liked i")[1].style.display = "flex";
    }
    document.querySelector(".liked span").innerHTML = isLiked ? "Liked!" : "Like";
})

if (postLength < idx) {
    loadMore.style.display = "none";
}

loadMore.addEventListener("click", function () {
    idx += 6;
    search();
})

searchBtn.addEventListener("click", async function () {
    if (input.value) {
        initialSearch = input.value;
        search();
    }

})

contact.addEventListener("click", async function () {
    await axios.post("https://shareablity.herokuapp.com/chat/mcc", { id: userObj._id, name: userObj.name, pImage: userObj.pImage });
    window.location.href = "/pchat"
})

