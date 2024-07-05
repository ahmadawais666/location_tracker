const path = require('path');
const express = require('express');
const app = express();

const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    console.log('A user connected:', socket.id);

    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function() {
        io.emit("user-disconnect", socket.id);
    });
});

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/1', (req, res) => {
    res.send("heyyy");
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
