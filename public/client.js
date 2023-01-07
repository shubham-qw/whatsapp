const socket = io();
let messageArea = document.querySelector(".message_area");
let name;
let send;
let textArea = document.getElementById("textarea");
do {
    name = prompt("Enter your name.");
} while (!name);


do {
    send = prompt("Enter sender name");
} while (!send);

function appMsg(msg,type) {
    let inMsgBox = document.createElement("div");
    inMsgBox.classList.add(type,"message");
    console.log(inMsgBox);

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
       `;
     

     inMsgBox.innerHTML = markup;

     messageArea.appendChild(inMsgBox);
}

function sendMessage(Msg) {
    let msg = {
        user : name,
        message : Msg.trim()
    };

    appMsg(msg,'outgoing');
    scrool();
    let msgs = {
        user : name,
        message : Msg.trim(),
        sender : send
    };
    textArea.value = '';
    socket.emit('message', msgs);
}

socket.on('incomingMessage', function (msgs) {
    if (msgs.sender === name) {
        console.log(msgs.sender);
        let msg = {
            user : msgs.user,
            message : msgs.message
        }
    appMsg(msg,'incoming');
    scrool();
    }
})

textArea.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})


function scrool() {
    messageArea.scrollTop = messageArea.scrollHeight;
}



