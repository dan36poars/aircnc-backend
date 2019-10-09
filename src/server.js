require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const app = express();

const server = http.Server(app);
const io = socketio(server);


// GET, POST, PUT, DELETE

// req.query = acessar query params ( filters )
// req.params = acessar route params ( put, delete )
// req.body = acessar corpo da request ( create, update )

// connect to DB
const MONGO_URL = process.env.NODE_ENV === 'development' ? process.env.MONGO_URL_DEV : process.env.MONGO_URL_PROD
mongoose.connect( MONGO_URL , { useNewUrlParser: true, useUnifiedTopology: true });


connectedUsers = {};

io.on('connection', socket => {
	const { userid } = socket.handshake.query;
	connectedUsers[userid] = socket.id;
});

// middleware for socket io send and receive messages
app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;
	return next();
});

// set cors
app.use(cors());

// set use json format
app.use(express.json());

// route to thumbnails files 
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(routes);

PORT = process.env.PORT || 3333
server.listen(PORT, () => {
    console.log(`Server listen in Port ${PORT}`);
});