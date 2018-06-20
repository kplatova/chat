const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http =  require('http');
const users = require('./users')();

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const message = (name, text, id) => ({name, text, id});

app.use(express.static(publicPath));

io.on('connection', socket => {
    socket.on('join', (user, callback) => {
        if(!user.name || !user.room) {
            return callback('Введите номер комнаты и имя пользователя');
        }

        callback({userId: socket.id});

        socket.emit('message:new', message('Admin', `Привет, ${user.name}`));
    });

    socket.on('message:create', (data, callback) => {
        if (!data) {
            callback('Сообщение не может быть пустым');
        } else {
            callback();
            io.emit('message:new', message(data.name, data.text, data.id));
        }
    })
});

server.listen(port, () => {
    console.log(`Server has been started on port: ${port}`);
});