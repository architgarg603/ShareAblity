let storyName = document.querySelector("#name_story");
let challenge = document.querySelector("#challenge");
let solution = document.querySelector("#solution");
let uploading = document.querySelector(".uploading");
let popup = document.querySelector(".popup");
let percentage = document.querySelector(".percentage");
let mediaUploaded = document.querySelector("#uploaded");
let submit = document.querySelector(".submit");
let link = "";
let image = document.querySelector(".image");
let mediabox = document.querySelector(".media");

window.addEventListener("load",function(){
    submit.addEventListener("click",share);
    mediaUploaded.addEventListener("change", uploadMedia);


});

function share(){
    if(mediaUploaded.files[0] && storyName.value && challenge.value && solution.value ){
        uploading.style.display = "flex";
        let obj = {};
        let time = Date.now();
        let task = storage.ref(`images/${time}${mediaUploaded.files[0].name}`).put(mediaUploaded.files[0]);

        task.on('state_changed', function (snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progress = Math.floor(progress);
            percentage.innerHTML = `${progress}%`
        },
            function (err) {
                window.alert("Error in saving media");
            },
            function () {
                storage.ref("images").child(`${time}${mediaUploaded.files[0].name}`).getDownloadURL().then(async function (url) {
                    link = url;
                    obj.path = link;
                    obj.storyName = storyName.value;
                    obj.challenge = challenge.value;
                    obj.solution = solution.value;
                    obj.MediaType = mediaUploaded.files[0].type;

                    await axios.post("https://shareablity.herokuapp.com/post/add",obj);
                   uploading.style.display = "none";
                   popup.style.display = "flex";
                   setTimeout(function(){
                       window.location.href = "/";
                       
                   },3000);
                })
            });
        
    }
}

function uploadMedia() {
    let reader = new FileReader();
    if (document.querySelector(".media div")) {
        document.querySelector(".media div").remove();
    }
    reader.onload = function (e) {
        let type = mediaUploaded.files[0].type.split("/")[0];
        let wrap = document.createElement("div");
        if (type == "image") {
            let img = document.createElement("img");
            img.setAttribute("src", e.target.result);
            img.classList.add("image");
            wrap.appendChild(img)
            mediabox.prepend(wrap);

        } else if (type == "video") {

            let video = document.createElement("video");
            let src = document.createElement("source");

            src.setAttribute("src", e.target.result);
            src.setAttribute("type", mediaUploaded.files[0].type);
            src.classList.add("image");
            video.classList.add("image");
            video.controls = true
            video.appendChild(src)
            wrap.appendChild(video);
            mediabox.prepend(wrap);
        } else if (type == "audio") {

            let audio = document.createElement("audio");
            let src = document.createElement("source");

            src.setAttribute("src", e.target.result);
            src.setAttribute("type", mediaUploaded.files[0].type);
            src.classList.add("image");
            audio.classList.add("image");
            audio.controls = true
            audio.appendChild(src)
            wrap.appendChild(audio)
            mediabox.prepend(wrap);
        }
      
    };
    reader.readAsDataURL(mediaUploaded.files[0]);


}




