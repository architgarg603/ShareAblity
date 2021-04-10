
async function getList() {
    let data = await axios.post("https://shareablity.herokuapp.com/chat/getList");
    data = data.data.data;

    let ul = document.createElement("ul");
    ul.classList.add("people");

    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        li.classList.add("person");

        let upper = document.createElement("div");
        upper.classList.add("upper");

        let span1 = document.createElement("span");
        span1.classList.add("title");
        span1.innerHTML = data[i].name;

        let down = document.createElement("div");
        down.classList.add("down");

        let span = document.createElement("span");
        span.classList.add("preview");
        if(data[i].mess.mess)
        span.innerHTML = data[i].mess.mess;

        upper.appendChild(span1);
        down.appendChild(span);
        li.appendChild(upper);
        li.appendChild(down);

        ul.appendChild(li);

        li.addEventListener("click",async function(){
            await axios.post("https://shareablity.herokuapp.com/chat/mcc", { id: data[i].id,name:data[i].name, pImage:data[i].photo });
            window.location.href = "/pchat"

        });

    }

    document.querySelector(".people").remove();
    document.querySelector(".list").appendChild(ul);
}

getList();