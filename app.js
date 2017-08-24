// require express module
var express = require('express');

// init the application
var app = express();

// init a http server
var http = require('http').Server(app);

// require the socket.io module
var io = require('socket.io')(http);

// set view engine
app.set('view engine', 'pug');
app.set('views', './views');

// use static files
app.use('/public', express.static('./public'));

// open websocket connection
io.on('connection', function (socket) {

    // small notification
    console.log('A user connected with #id ' + socket.id);

    // handle chat messages
    socket.on('chat message', function (data) {
        console.log(data);
        // send message to client
        io.emit('chat message', data, { for: 'everyone' });
    });

    // handle typing
    socket.on('user typing', function () {

        // send message to client
        io.emit('user typing', 'A user is typing...', { for: 'everyone' });
    });
});

// small example route
app.get('/', function (req, res) {

    // render template
    res.render('index');
});

// run the http server on port 3000
http.listen(3000, function () {

    // small notification
    console.log('Running server on port: 3000');
});
