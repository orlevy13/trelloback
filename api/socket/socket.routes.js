
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        console.log('a user is connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })

        socket.on('board updated', boardId => {
            console.log('update event on socket factory', boardId)
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            socket.broadcast.to(socket.currBoard).emit('board updated', boardId)
        })
        socket.on('boardLoad', boardId => {
            if (socket.currBoard) {
                socket.leave(socket.currBoard)
            }
            socket.join(boardId)
            socket.currBoard = boardId;
            console.log('new board loaded', boardId);

        })
    })
}