import "./index.css";

const nameValue = document.querySelector("#nameInput") as HTMLInputElement;
const selectValue = document.querySelector("#roomSelect") as HTMLSelectElement;
const sendBtn = document.querySelector("#sendChat") as HTMLButtonElement;

sendBtn?.addEventListener("click", () => {
  const userName = nameValue.value;
  const roomName = selectValue.value;

  console.log(userName, roomName);
  location.href = `/chatRoom/chatRoom.html?user_name=${userName}&room_name=${roomName}`;
});

// console.log(nameValue.);
