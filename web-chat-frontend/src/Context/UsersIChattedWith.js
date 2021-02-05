import React, { useState, createContext, useEffect } from 'react';
import { setTokenToHeaders, getUsersIChattedWith } from '../Api/User';

const UsersIChattedWithContext = createContext('');

const UsersIChattedWithProvider = props => {
    
    const [usersIChattedWith, setUsersIChattedWith] = useState([]);
        
    // useEffect(() => {
    //     setTokenToHeaders();
    // }, []);

   
    const assignUsersIChattedWith = async () => {
        setTokenToHeaders();
        getUsersIChattedWith()
        .then(data => {
            setUsersIChattedWith(data);
        }); 
    }

    const removeUsersIChattedWith = () => {
        setUsersIChattedWith([]);
    }

    return (
        <UsersIChattedWithContext.Provider value={{ usersIChattedWith, assignUsersIChattedWith, removeUsersIChattedWith }}>
            {props.children}
        </UsersIChattedWithContext.Provider>
    );

}

export {
    UsersIChattedWithContext,
    UsersIChattedWithProvider
}
