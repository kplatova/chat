const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http =  require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const message = (name, text) => ({name, text});

app.use(express.static(publicPath));

io.on('connection', socket => {
    socket.on('message:create', (data, callback) => {
        if (!data) {
            callback('Сообщение не может быть пустым');
        } else {
            callback();
            io.emit('message:new', message('Admin', data.text));
        }
    });
});

server.listen(port, () => {
    console.log(`Server has been started on port: ${port}`);
});