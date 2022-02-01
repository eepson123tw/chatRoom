import "./index.css";

import { io } from "socket.io-client";

const url = new URL(location.href);

const userName = url.searchParams.get("user_name");
const roomName = url.searchParams.get("room_name");
import { UserData } from "@/service/UserService";
import { data } from "autoprefixer";
if (!userName || !roomName) {
  location.href = `/main/main.html`;
}
type data = {
  userData: UserData;
  msg: string;
  time: number;
};
//建立連接->node
const clientIo = io();
//加入聊天室
clientIo.emit("join", { userName, roomName });
clientIo.on("userId", (id) => {
  console.log(id);
  userId = id;
});

const textInput = document.querySelector("#textInput") as HTMLInputElement;
const submitBtn = document.querySelector("#submitBtn") as HTMLButtonElement;
const chatBoard = document.querySelector("#chatBoard") as HTMLDivElement;
const roomHeader = document.querySelector("#roomName") as HTMLParagraphElement;
const backBtn = document.querySelector("#backBtn") as HTMLButtonElement;

roomHeader.innerText = roomName || "_";

let userId = "";

function msgHandler({ userData, msg, time }: data) {
  const creatDom = document.createElement("div");
  const date = new Date(time);
  const userTime = `${date.getHours()}:${date.getMinutes()}`;

  creatDom.classList.add("flex", "mb-4", "items-end");

  if (userData.id === userId) {
    creatDom.classList.add("justify-end");

    creatDom.innerHTML = `<div>
    <p class="text-xs text-white mb-1">${userData.userName}</p>
     <p
     class="mx-w-[50%] break-all bg-white px-4 py-2 rounded-bl-full rounded-br-full rounded-tl-full"
    >
      ${msg}
     </p>
   </div>

  <p class="text-xs text-gray-700 ml-4">${userTime}</p>`;
  } else {
    creatDom.classList.add("justify-start");
    creatDom.innerHTML = `
    <div>
      <p class="text-xs text-gray-700 mb-1">${userData.userName}</p>
      <p
        class="mx-w-[50%] break-all bg-gray-800 px-4 py-2 rounded-tr-full rounded-br-full rounded-tl-full text-white"
      >
      ${msg}
      </p>
    </div>

    <p class="text-xs text-gray-700 ml-4">${userTime}</p>
  `;
  }

  chatBoard.appendChild(creatDom);

  textInput.value = "";
  chatBoard.scrollTop = chatBoard.scrollHeight;
}
function roomMsgHandler(msg: string) {
  const creatDom = document.createElement("div");
  creatDom.classList.add("flex", "justify-center", "mb-4", "items-center");
  creatDom.innerHTML = `<p class="text-gray-700 text-sm">${msg}</p>`;

  chatBoard.appendChild(creatDom);
  chatBoard.scrollTop = chatBoard.scrollHeight;
}

backBtn.addEventListener("click", () => {
  location.href = "/main/main.html";
});

submitBtn.addEventListener("click", () => {
  const textValue = textInput.value;
  clientIo.emit("chat", textValue);
});

clientIo.on("join", (msg) => {
  roomMsgHandler(msg);
});

clientIo.on("chat", ({ userData, msg, time }: data) => {
  msgHandler({ userData, msg, time });
});
clientIo.on("leave", (msg) => {
  roomMsgHandler(msg);
});
