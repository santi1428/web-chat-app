import React, { useState, createContext, useEffect } from 'react';

const ChatUserContext = createContext('');

const ChatUserProvider = props => {
    
    const [chatUser, setChatUser] = useState(
        {   
            isChatUserSet: false,
            chatUserId: null,
            chatUserName: '',
            chatUserLastName: '',
            chatUserEmail: '',
            chatUserProfilePhoto: ''
        }
    );
        
    useEffect(() => {

    }, []);

    const configureChatUser = user => {
        const chatUserData = { isChatUserSet: true, chatUserId: user.id, chatUserName: user.name, chatUserLastName: user.lastName, chatUserEmail: user.email, chatUserProfilePhoto: user.profilePhoto }
        setChatUser(chatUserData);
        // saveUserToLocalStorage(userData);
        // setTokenToHeaders();        
    }

    // const saveUserToLocalStorage = user => {
    //     localStorage.setItem("user", JSON.stringify(user));
    // }

    const removeChatUser = () => {
        setChatUser({
            isChatUserSet: false,
            chatUserId: null,
            chatUserName: '',
            chatUserLastName: '',
            chatUserEmail: '',
            chatUserProfilePhoto: ''
        });
        // removeUserFromLocalStorage();
    }

    // const removeChatUserFromLocalStorage = () => {
    //     localStorage.removeItem("chatUser");
    // }

    return (
        <ChatUserContext.Provider value={{chatUser, configureChatUser, removeChatUser}}>
            {props.children}
        </ChatUserContext.Provider>
    );

}

export {
    ChatUserContext,
    ChatUserProvider
}

