import React, { useState, useEffect, useContext, useRef } from 'react';
import { UsersIChattedWithContext } from '../../../Context/UsersIChattedWith';
import { ChatUserContext } from '../../../Context/ChatUser';
import { MuteContext } from '../../../Context/Mute';
import { URL, getMutedUsersId  } from '../../../Api/User';
import UserIChattedWith from './UserIChattedWith/UserIChattedWith';
import './ListUsersIChattedWith.css';


const ListUsersIChattedWith = props => {
    const { user, socket, joinChat, connectedUsers } = props;
    const { mutedUsersId } = useContext(MuteContext);
    const { usersIChattedWith, assignUsersIChattedWith } = useContext(UsersIChattedWithContext);
    const { configureChatUser, removeChatUser } = useContext(ChatUserContext);
    const [filter, setFilter] = useState("");
    const [localMutedUsersId, setLocalMutedUsersId] =  useState([]);
    const socketRef = useRef(socket);
    const usersIChattedWithRef = useRef(usersIChattedWith);

    useEffect(() => {
        assignUsersIChattedWith();
    }, []);

    useEffect(() => {

        socketRef.current = socket;

    }, [socket]);

    useEffect(() => {

        setLocalMutedUsersId(mutedUsersId);

    }, [mutedUsersId]);

    
    useEffect(() => {
        usersIChattedWithRef.current = usersIChattedWith;

    }, [usersIChattedWith])


    useEffect(() => {
        if(usersIChattedWith.length > 0){
            connectToUsersIChattedWith();
        }
    }, [usersIChattedWith]);

    const connectToUsersIChattedWith = () => {
        usersIChattedWith.forEach(userIChattedWith => {
            if(userIChattedWith.userId != user.id){
                joinChat(user.id, userIChattedWith.userId);
            }
        });
    }

    const handleOnChange = e => {
        setFilter(e.target.value.toLowerCase().trim());
    }
    
    return (
        <div className="col-xl-4 col-md-3 col-sm-12">
            <div className="row">
                <div className="col pr-0 users-i-chatted-with">
                    <h5 className="ml-3 mb-2">Users you have chatted with</h5>
                    <input type="text" className="form-control mb-2" id="filter-users" placeholder="Enter the name or email" onChange={handleOnChange} />
                    {
                        usersIChattedWith.length > 0 ? usersIChattedWith.map(userIChattedWith => 
                            userIChattedWith.userId != user.id && 
                            ((userIChattedWith.name.toLowerCase() + " " + userIChattedWith.lastName.toLowerCase()).includes(filter) || 
                             userIChattedWith.email.toLowerCase().includes(filter) ) ? <UserIChattedWith key={userIChattedWith.userId} URL={URL}  {...(localMutedUsersId.includes(userIChattedWith.userId) ? { muted: true } : { muted: false })}  connectedUsers={connectedUsers} configureChatUser={configureChatUser} removeChatUser={removeChatUser} userIChattedWith={userIChattedWith}></UserIChattedWith> : ""
                        ) 
                        :
                        <div className="row">
                            <div className="col">
                                <p className="ml-3">You haven't chatted with anyone</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ListUsersIChattedWith;