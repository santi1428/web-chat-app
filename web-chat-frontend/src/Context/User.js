import React, { useState, createContext, useEffect, useContext } from 'react';
import { setTokenToHeaders, removeTokenFromHeaders } from '../Api/User';
import { MuteContext } from './Mute';
import { getMutedUsersId } from '../Api/User';


const UserContext = createContext('');

const UserProvider = props => {

    const { assignMutedUsersId } = useContext(MuteContext);
    
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) ||
        {
            isLoggedIn: false,
            name: '',
            lastName: '',
            email: '',
            profilePhoto: '',
            profilePhotoSet: false
        }
    );
        
    useEffect(() => {
        if(localStorage.getItem("user") && user.isLoggedIn){
            setTokenToHeaders();
        }
    }, []);

    const configureUser = user => {
        const userData = { isLoggedIn: true, id: user.id, name: user.name, lastName: user.lastName, email: user.email, accessToken: user.accessToken, profilePhoto: user.profilePhoto, profilePhotoSet: user.profilePhotoSet }
        setUser(userData);
        saveUserToLocalStorage(userData);
        setTokenToHeaders();   
        fetchMutedUsersId();     
    }

    const fetchMutedUsersId = () => {
        getMutedUsersId().then(res => {
            assignMutedUsersId(res.data);
        });
    }

    const saveUserToLocalStorage = user => {
        localStorage.setItem("user", JSON.stringify(user));
    }

    const removeUser = () => {
        setUser({
            isLoggedIn: false,
            name: '',
            lastName: '',
            email: '',
            profilePhoto: '',
            profilePhotoSet: false
        });
        removeUserFromLocalStorage();
        removeTokenFromHeaders();
    }

    const updateUserProfilePhoto = profilePhoto => {
        const userUpdated = user;
        userUpdated.profilePhoto = profilePhoto;
        setUser(userUpdated);
        removeUserFromLocalStorage();
        saveUserToLocalStorage(userUpdated);
    }

    const updateUser = userProfile => {
        const userUpdated = user;
        userUpdated.name = userProfile.name;
        userUpdated.lastName = userProfile.lastName;
        userUpdated.email = userProfile.email;
        setUser(userUpdated);
        removeUserFromLocalStorage();
        saveUserToLocalStorage(userUpdated);
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem("user");
    }

    return (
        <UserContext.Provider value={{user, configureUser, removeUser, updateUserProfilePhoto, updateUser }}>
            {props.children}
        </UserContext.Provider>
    );

}

export {
    UserContext,
    UserProvider
}

