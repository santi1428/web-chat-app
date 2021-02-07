const { saveMessage } = require('./api/utils/message');
const options={
    cors:true,
    origins:[`${process.env.HOST}`],
   }

const socket = server => {

    const io = require('socket.io')(server, options);

    const getRoomId = (firstUserId, secondUserId) => {
        const roomId = (1/2)*(firstUserId + secondUserId)*(firstUserId + secondUserId + 1) + (firstUserId * secondUserId);
        return roomId;
    }

    const connectedUsers = new Set([]);

    const addToConnectedUsers = userId => {
        connectedUsers.add(userId);
    }

    const deleteFromConnectedUsers = userId => {
        connectedUsers.delete(userId);   
    }

    io.on('connection', async function(socket){

        console.log('a socket connection was made');

         socket.on("joinChat", function(usersId){
            addToConnectedUsers(usersId.userId);
            io.emit("connectedUsers", [...connectedUsers]);
            console.log(connectedUsers);
            const roomId = getRoomId(usersId.userId, usersId.chatUserId);
            socket.join(roomId);
            console.log("user " + usersId.userId + " joined to roomId "  + roomId);
            socket.to(roomId).emit('userConnection', { state: true, chatUserId: usersId.userId });
            socket.to(roomId).emit('typingEvent', { state: false, roomId });
        });

        socket.on("chatMessage", async function(message){
            const savedMessage = await saveMessage(message);
            const roomId = getRoomId(message.senderId, message.receiverId);
            console.log("user " + message.senderId + " sending message " + message.message + " to room " + roomId);
            console.log("saved message", savedMessage);
            io.sockets.in(roomId).emit("message", savedMessage);
        });

        socket.on("typingEvent", function(typingEvent){

            const roomId = getRoomId(typingEvent.userId, typingEvent.chatUserId);

            socket.to(roomId).emit('typingEvent', { state: typingEvent.state, roomId });
            socket.to(roomId).emit('userConnection', { state: true, chatUserId: typingEvent.userId });

        });

        socket.on("leaveRoom", function(usersId){
            const roomId = getRoomId(usersId.userId, usersId.chatUserId);
            socket.to(roomId).emit('userConnection', { state: false, chatUserId: usersId.userId });
            socket.to(roomId).emit('typingEvent', { state: false, roomId });
            socket.leave(roomId);
            console.log("user " + usersId.userId + " leaving room " + roomId);
        });

        socket.on("deleteFromConnectedUsers", function(userId){
            deleteFromConnectedUsers(userId);
            io.emit("connectedUsers", [...connectedUsers]);
        });
        
        socket.on('disconnect', function(){
            console.log('a socket connection was closed');
        });

        
    });


}
  
module.exports = socket;



