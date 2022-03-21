const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
})

io.on('connection', socket => {
    console.log(`user ${socket.id}`);
    socket.on('SendMessage', msg => {
        io.emit('SendMessage', msg);
    })
});

server.listen(3000, () => {
    console.log("listening on 3000");
});