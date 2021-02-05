import React, { useState, useEffect } from 'react';
import MuteUser from '../../MuteUser/MuteUser';
import './UserIChattedWith.css';

const UserIChattedWith = props => {

    const { URL, userIChattedWith, configureChatUser, removeChatUser, connectedUsers, muted  } = props;
    const [ connectionState, setConnectionState ] = useState(false);

    const handleClick = e => {
        console.log(e.target);
        removeChatUser();
        configureChatUser({ id: userIChattedWith.userId, name: userIChattedWith.name, lastName: userIChattedWith.lastName, email: userIChattedWith.email, profilePhoto: userIChattedWith.profilePhoto })
    }

    useEffect(() => {
        if(connectedUsers.has(userIChattedWith.userId)){
            setConnectionState(true);
        }else{
            setConnectionState(false);
        }

    }, [connectedUsers])
 
    return (
        <div className="row justify-content-center user-i-chatted-with pb-2 pt-2" onClick={handleClick}>
            <div className="col-auto ml-2 pr-0">
                <img src={URL + userIChattedWith.profilePhoto} className="user-profile-photo" alt="" />            
            </div>
            <div className="col align-self-center pl-1">
                <p className="user-name mb-0">
                    {userIChattedWith.name + " " + userIChattedWith.lastName}{connectionState && <span><i className="fas fa-circle mr-2 text-success ml-2" data-toggle="tooltip" data-placement="top" title={userIChattedWith.name + " is connected"}></i></span>}
                    <MuteUser userId={userIChattedWith.userId} userName={userIChattedWith.name} userLastName={userIChattedWith.lastName} muted={muted} />
                </p>
                <p className="user-email mb-0">
                    {userIChattedWith.email}
                </p>
            </div>
        </div>
    )

}

export default UserIChattedWith;