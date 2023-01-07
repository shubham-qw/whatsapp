const express = require("express");
const app = express();
//const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;
const server = app.listen( PORT , function () {
    console.log("Server running at local port " + PORT);
});
const io = require('socket.io')(server);

app.use(express.static("public"));

app.get("/", function (req,res) {
    res.sendFile(__dirname+"/index.html");
})




io.on('connection', function (socket) {
    console.log("user Connected.");

    socket.on('message', function (msgs) {
        console.log(msgs);
        socket.broadcast.emit('incomingMessage', msgs);
    })
})

