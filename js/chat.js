const chat = document.getElementById("chat");

function addMessage(text,type){

let msg = document.createElement("div");

msg.classList.add("message",type);

msg.innerText = text;

chat.appendChild(msg);

chat.scrollTop = chat.scrollHeight;

}

function send(){

const input = document.getElementById("input");

const text = input.value;

if(!text) return;

addMessage(text,"user");

input.value="";

addMessage("BEA is thinking...","ai");

}
