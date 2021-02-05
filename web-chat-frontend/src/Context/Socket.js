import React, { useState, createContext, useEffect, useRef, useContext } from 'react';
import { showMessageNotification } from '../Components/CustomToast/CustomToast';
import { UsersIChattedWithContext } from './UsersIChattedWith';
import { MessagesContext } from './Message';
import { URL } from '../Api/User';
import { UserContext } from './User';
import io from 'socket.io-client';
import { ChatUserContext } from './ChatUser';
import UserIChattedWith from '../Components/Protected/ListUsersIChattedWith/UserIChattedWith/UserIChattedWith';
import { MuteContext } from './Mute';

const SocketContext = createContext('');

const SocketProvider = props => {

    const endpoint = URL;
    const { user } = useContext(UserContext);
    const { usersIChattedWith } = useContext(UsersIChattedWithContext);
    const { chatUser } = useContext(ChatUserContext);
    const { assignMessages } = useContext(MessagesContext);
    const { mutedUsersId } = useContext(MuteContext);
    const [socket, setSocket] = useState(null);
    const userRef = useRef(user);
    const [roomsJoined, setRoomsJoined] = useState(new Set([]));
    const [connectedUsers, setConnectedUsers] = useState(new Set([]));
    const mutedUsersIdRef = useRef(mutedUsersId);
    const usersIChattedWithRef = useRef(usersIChattedWith);
    const chatUserRef = useRef(chatUser);


    const getRoomId = (firstUserId, secondUserId) => {
        const roomId = (1/2)*(firstUserId + secondUserId)*(firstUserId + secondUserId + 1) + (firstUserId * secondUserId);
        return roomId;
    }
        
    useEffect(() => {
        // showMessageNotification("Daniel Posada", "Bro where have you been?");
        if(user.isLoggedIn){
            configureSocket();
        }else{
            if(socket != null){
                disconnectSocket();
            }
        }

    }, [user.isLoggedIn]);

    useEffect(() => {
        mutedUsersIdRef.current = mutedUsersId;
    }, [mutedUsersId])

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    useEffect(() => {

        usersIChattedWithRef.current = usersIChattedWith;

    }, [usersIChattedWith]);

    useEffect(() => {

        if(socket != null){
            getConnectedUsers();
            getMessages();
        }

    }, [socket]);

    useEffect(() => {
        
        chatUserRef.current = chatUser;

    }, [chatUser])
   
     const configureSocket = () => {
        setSocket(socket => {
            return io(endpoint)
        })
    }

    const getMessages = () => {
        socket.on("message", function(message){
            console.log(message);
            assignMessages(message);
            if(user.id == message.receiverId && message.senderId != chatUserRef.current.chatUserId){
                const senderFullName = getSenderFullName(message.senderId);
                // console.log(senderFullName);
                showMessageNotificationToUser(message.senderId, senderFullName, message.message);
            }
        })
    }

    const showMessageNotificationToUser = (senderId, senderFullName, message) => {
        console.log("includes", mutedUsersId.includes(senderId));
        if(!mutedUsersIdRef.current.includes(senderId)){
            showMessageNotification(senderFullName + " sent you a message", message);
        }
    }

    const getSenderFullName = senderId => {
        const sender = usersIChattedWithRef.current.find(userIChattedWith => userIChattedWith.userId == senderId);
        return sender.name + " " + sender.lastName;
    }

    const sendChatMessage = messageToSend => {
        socket.emit("chatMessage", messageToSend);
    }

    const joinChat = (userId, chatUserId) => {
        const roomId = getRoomId(userId, chatUserId);
        if(!roomsJoined.has(roomId)){
            socket.emit("joinChat", { userId, chatUserId });
            setRoomsJoined(roomsJoined => {
                return new Set([...roomsJoined, roomId]);
            });
        }
    }

    const getConnectedUsers = () => {
        socket.on("connectedUsers", function(connectedUsers){
            setConnectedUsers(new Set([...connectedUsers]));
        });
    }

    const disconnectFromUsersIChattedWith = users => {
        users.users.forEach(user => {
            if(user.userId != users.userId){
                const roomId = getRoomId(user.userId, users.userId);
                socket.emit("leaveRoom", { userId: users.userId, chatUserId: user.userId })
                setRoomsJoined(roomsJoined => {
                    roomsJoined.delete(roomId);
                    return new Set([...roomsJoined]);
                })
                // console.log("user " + users.userId + " leaving room " + roomId);
            }
        });
    }

    const disconnectSocket = () => {
        setConnectedUsers(new Set([]));
        socket.emit('deleteFromConnectedUsers', userRef.current.id);
        socket.emit('disconnect');
        socket.disconnect();
    }

    return (
        <SocketContext.Provider value={{ socket, joinChat, disconnectFromUsersIChattedWith, connectedUsers, setConnectedUsers, getRoomId, sendChatMessage }}>
            {props.children}
        </SocketContext.Provider>
    );

}

export {
    SocketContext,
    SocketProvider
}