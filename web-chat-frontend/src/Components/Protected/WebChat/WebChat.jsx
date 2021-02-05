import React, { useState, useContext } from 'react';
import SearchPeople from '../SearchPeople/SearchPeople';
import Chat from '../Chat/Chat';
import ListUsersIChattedWith from '../ListUsersIChattedWith/ListUsersIChattedWith';
import { URL } from '../../../Api/User';
import { ChatUserContext } from '../../../Context/ChatUser';
import { SocketContext } from '../../../Context/Socket';
import './WebChat.css';
import { UserContext } from '../../../Context/User';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

const WebChat = () => {

    const { user } = useContext(UserContext);
    const { chatUser, removeChatUser } = useContext(ChatUserContext);
    const { socket, closeChatConnection, joinChat, disconnectFromUsersIChattedWith, connectedUsers, setConnectedUsers, getRoomId, sendChatMessage } = useContext(SocketContext);
    const history = useHistory();

    useEffect(() => {


    }, []);

    return (
        <div className="row mt-3">
            <ListUsersIChattedWith 
            user={user} 
            socket={socket} 
            joinChat={joinChat} 
            disconnectFromUsersIChattedWith={disconnectFromUsersIChattedWith}
            connectedUsers={connectedUsers} setConnectedUsers={setConnectedUsers}
            />
            <div className="col pl-2">
                <SearchPeople></SearchPeople>
                {
                    !chatUser.isChatUserSet ?
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <div className="jumbotron">
                                <h1 className="display-5">Welcome to our app {user.name}!</h1>
                                <hr/>
                                <p className="lead">To start using the chat, search for the person you want to chat with in the textbox above</p>
                            </div>
                        </div>
                    </div>
                    :
                    <Chat 
                    socket={socket} 
                    user={user} 
                    closeChatConnection={closeChatConnection} 
                    chatUser={chatUser} 
                    removeChatUser={removeChatUser} 
                    joinChat={joinChat} 
                    connectedUsers={connectedUsers}
                    getRoomId={getRoomId}
                    sendChatMessage={sendChatMessage}
                    />
                }
            </div>
        </div>
    )
}

export default WebChat;