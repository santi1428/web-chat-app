import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import Message from './Message/Message';
import { getMessages } from '../../../Api/Message';
import { MessagesContext } from '../../../Context/Message';
import { debounce, uniqBy } from "lodash";
import { URL } from '../../../Api/User';
import './Chat.css';


const Chat = props => {

    const { user, socket, chatUser, removeChatUser, joinChat, connectedUsers, getRoomId, sendChatMessage } = props;
    const [ chatMessage, setChatMessage ] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [isChatUserTyping, setIsChatUserTyping] = useState(false);
    const { messages } = useContext(MessagesContext);
    const [isChatUserConnected, setIsChatUserConnected] = useState(false);
    const chatUserRef = useRef(chatUser);
    const [typing, setTyping] = useState(null);
    const messageInput = useRef(null);
    const messagesContainer = useRef(null);
    const current = useRef(true);
    const messagesRef = useRef(messages);
    
    useEffect(() => {
        if(current.current){
            messageInput.current.focus();
            startChatConnection();
        }

        
        return () => {
            current.current = false;
            closeChat();
        }

    }, []);

    useEffect(() => {
        if(current.current){
            if(connectedUsers.has(chatUser.chatUserId)){
                setIsChatUserConnected(true);
            }else{
                setIsChatUserConnected(false);
            }
            setIsChatUserTyping(false);
            fetchChatMessages({ user1: user.id, user2: chatUser.chatUserId });
            joinChat(user.id, chatUser.chatUserId);
            chatUserRef.current = chatUser;
        }

    }, [chatUser]);

    useEffect(() => {

        messagesRef.current = [...messages];
        
        // console.log("Messages to add", messages);

        addMessagesToChatMessages();

    }, [messages]);


    const addMessagesToChatMessages = () => {
        const newMessages = [...messagesRef.current].filter(message => (message.receiverId == user.id && message.senderId == chatUserRef.current.chatUserId) || (message.senderId == user.id && message.receiverId == chatUserRef.current.chatUserId));
        console.log("messages to add ", newMessages);
        if(newMessages.length > 0){
            setChatMessages(chatMessages => {
                return uniqBy([...chatMessages, ...newMessages], 'id');
            });
        }
        console.log("total messages", chatMessages);
    }

    useEffect(() => {
        if(current.current){
            if(connectedUsers.has(chatUser.chatUserId)){
                setIsChatUserConnected(true);
            }else{
                setIsChatUserConnected(false);
            }
        }

    }, [connectedUsers]);

    const startChatConnection = () => {

        socket.on("typingEvent", function(typing){
            if(getRoomId(user.id, chatUserRef.current.chatUserId) == typing.roomId){
                setIsChatUserTyping(typing.state);
            }
        });

    }

    useEffect(() => {

        if(typing !== null){
            emitTypingEvent(typing);
        }
    
    }, [typing]);

    const emitTypingEvent = state => {
        socket.emit("typingEvent", {
            state, 
            userId: user.id,
            chatUserId: chatUser.chatUserId
        });
    }
    
    const scrollToBottom = () => {
        if(messagesContainer.current !== null){
            messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
        }
    }

    useEffect(scrollToBottom, [chatMessages]);

    const fetchChatMessages = users => {
        getMessages(users)
        .then(data => {
            setChatMessages(data);
        });     
    }

    const closeChat = e => {
        removeChatUser();
    }

    const handleSubmit = e => {
        // console.log("submitted");
        e.preventDefault();
        sendMessage(chatMessage);
        setChatMessage("");
        scrollToBottom();
        e.target.focus();
    }

    const sendMessage = message => {
        const messageToSend = { senderId: user.id, receiverId: chatUser.chatUserId, message: message.trim() };
        if(messageToSend.message.length > 0){
            // console.log("sending message ", messageToSend);
            sendChatMessage(messageToSend);
        }
    }

    const handleChange = e => {
        setChatMessage(e.target.value);
    }

    const handleClick = e => {
        messageInput.current.focus();
    }

    const doneTyping = () => {
        setTyping(false);
    }

    const handleOnKeyDown = () => {
        setTyping(true);
    }

    const handleOnKeyUp = useCallback(debounce(doneTyping, 500), []);

    return (
        <div className="row justify-content-center mt-3" id="chat">
            <div className="col-10">
                <div className="row">
                    <div className="col card px-0">
                       <div className="card-header bg-dark text-white text-center">
                            { isChatUserConnected &&
                                <span><i className="fas fa-circle mr-2 text-success" data-toggle="tooltip" data-placement="top" title={chatUser.chatUserName + " is connected"}></i></span>
                            }<span><img src={URL + chatUser.chatUserProfilePhoto} id="chatUserProfilePhoto" className="mr-2" alt=""/></span>{ chatUser.chatUserName + ' ' + chatUser.chatUserLastName} { isChatUserTyping ? " typing..." : "" }
                            <button type="button" className="text-white close" data-dismiss="modal" aria-label="Close" onClick={closeChat}>
                                    <span aria-hidden="true">&times;</span>
                            </button>
                       </div>
                       <div className="card-body" id="messages" ref={messagesContainer}>
                            {   chatMessages != null && chatMessages != undefined && [...chatMessages].length > 0 ?
                                    [...chatMessages].map(message => {
                                        return (
                                            message.senderId == user.id ?
                                                <Message
                                                key={message.id} 
                                                message={message} 
                                                name={"You"} 
                                                alignDirection={"right"} />
                                            :
                                                <Message 
                                                key={message.id} 
                                                message={message} 
                                                name={chatUser.chatUserName}
                                                alignDirection={"left"}
                                                />
                                        )
                                    })
                                :
                                ""
                            }
                       </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="row mt-2">
                    <div className="col px-0">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder={"Write something to " + chatUser.chatUserName + "..."} 
                        value={chatMessage} 
                        onChange={handleChange}
                        onKeyUp={handleOnKeyUp}
                        onKeyDown={handleOnKeyDown}
                        ref={messageInput}
                        />
                    </div>
                    <div className="col-auto px-0 align-self-center">
                        <button type="submit" className="btn btn-sm btn-dark ml-2" onClick={handleClick}><i className="fas fa-paper-plane mr-1"></i>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chat;