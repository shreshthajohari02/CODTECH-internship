const socket = io();

socket.on("connect", () => {
    console.log("Connected ✅");
});

function sendMessage() {
    const input = document.getElementById("input");
    const msg = input.value;

    if (msg.trim() !== "") {
        socket.emit("chat message", msg);
        input.value = "";
    }
}

socket.on("chat message", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messages").appendChild(li);
});