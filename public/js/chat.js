let submitBtn = document.querySelector(".submit");
let input = document.querySelector(".p2 input");
let id;

async function getchat() {
    let data = await axios.post("https://shareablity.herokuapp.com/chat/getChat");
    let name = data.data.name;
    let img = data.data.img;
    id = data.data.id;
    data = data.data.data[0].chat;

    for (let i = 0; i < data.length; i++) {
        let div = document.createElement("div");
        div.classList.add(data[i].sender);

        let msg = document.createElement("div");
        msg.classList.add("msg");
        msg.innerHTML = data[i].mess

        div.appendChild(msg);
        document.querySelector(".div3").appendChild(div);
    }
    document.querySelector(".user span").innerHTML = name;
    document.querySelector(".userimg").setAttribute("src", img);


}

submitBtn.addEventListener("click", async function () {
    if (input.value) {
        let data = await axios.post("https://shareablity.herokuapp.com/chat/addChat",{
            id:id,
            message:input.value
        });
      
    input.value = "";
    }
})


getchat();
