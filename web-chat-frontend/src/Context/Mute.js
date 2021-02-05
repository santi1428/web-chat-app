import React, { useState, createContext, useEffect } from 'react';

const MuteContext = createContext('');

const MuteProvider = props => {
    
    const [mutedUsersId, setMutedUsersId] = useState(JSON.parse(localStorage.getItem("mutedUsersId")) || []);


    const assignMutedUsersId = mutedUsersId => {
        setMutedUsersId(mutedUsersId);
        saveMutedUsersIdToLocalStorage(mutedUsersId);
    }

    const removeMutedUserId = userId => {
        setMutedUsersId(mutedUsersId => {
            const newMutedUsersId = mutedUsersId.filter(mutedUserId => mutedUserId !== userId);
            saveMutedUsersIdToLocalStorage(newMutedUsersId);
            return newMutedUsersId;
        })
    }

    const removeMutedUsersId = () => {
        setMutedUsersId([]);
        deleteMutedUsersIdFromLocalStorage(); 
    }
    
    const addMutedUserId = mutedUserId => {
        setMutedUsersId(mutedUsersId => {
            const newMutedUsersId = [...mutedUsersId, mutedUserId];
            saveMutedUsersIdToLocalStorage(newMutedUsersId);
            return newMutedUsersId;
        });
    }

    const saveMutedUsersIdToLocalStorage = mutedUsersId => {
        localStorage.setItem("mutedUsersId", JSON.stringify(mutedUsersId));
    }

    const deleteMutedUsersIdFromLocalStorage = () => {
        localStorage.removeItem("mutedUsersId");
    }

    return (
        <MuteContext.Provider value={{ mutedUsersId, assignMutedUsersId, removeMutedUserId, removeMutedUsersId, addMutedUserId }}>
            {props.children}
        </MuteContext.Provider>
    );

}

export {
    MuteContext,
    MuteProvider
}
