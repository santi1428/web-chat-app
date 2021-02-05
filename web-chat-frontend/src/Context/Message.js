import React, { useState, createContext, useEffect } from 'react';
// import { setTokenToHeaders, getUsersIChattedWith } from '../Api/User';

const MessagesContext = createContext('');

const MessagesProvider = props => {
    
    const [messages, setMessages] = useState([]);
        
    const assignMessages = message => {
        setMessages(messages => {
           return [...messages, message];
        })
    }

    const removeMessages = () => {
        setMessages([]);
    }

    return (
        <MessagesContext.Provider value={{ messages, assignMessages, removeMessages }}>
            {props.children}
        </MessagesContext.Provider>
    );

}

export {
    MessagesContext,
    MessagesProvider
}
