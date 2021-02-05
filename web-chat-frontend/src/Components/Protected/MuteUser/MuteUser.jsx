import React, { useState, useEffect, useContext } from 'react';
import { showMutedNotification } from '../../CustomToast/CustomToast';
import { muteUser, unmuteUser } from '../../../Api/User';
import { MuteContext } from '../../../Context/Mute';

const MuteUser = props => {

    const { userId, userName, userLastName, muted } = props;
    const { removeMutedUserId, addMutedUserId } = useContext(MuteContext);
    const [isUserMuted, setIsUserMuted] = useState(muted);
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleOnMouseHover = () => {
        setIsMouseOver(true);
    }

    const handleOnMouseLeave = () => {
        setIsMouseOver(false);
    }

    useEffect(() => {
        setIsUserMuted(muted);
    }, [muted]);

    const handleOnClick = e => {
       if(!isUserMuted){
           muteUserIChattedWith();
       }else if(isUserMuted){
           unmuteUserIChattedWith();
       }
    }

    const muteUserIChattedWith = () => {
        muteUser(userId).then(res => {
            if(res.status == 200){
                // setIsUserMuted(true);
                addMutedUserId(userId);
                showMutedNotification("User muted", userName + " " + userLastName + " is muted");
                setIsUserMuted(true);
            }
        });
    }

    const unmuteUserIChattedWith = () => {
        unmuteUser(userId).then(res => {
            if(res.status == 200){
                // setIsUserMuted(false);
                removeMutedUserId(userId);
                showMutedNotification("User ", userName + " " + userLastName + " is no longer muted");
                setIsUserMuted(false);
            }
        });
    }

    return (
    <button className="btn btn-sm btn-info ml-4 mute-btn" onMouseOver={handleOnMouseHover} onMouseLeave={handleOnMouseLeave} onClick={handleOnClick}>
        {isUserMuted && isMouseOver && <i className="fas fa-comment" title={"unmute " + userName + " " + userLastName}></i>}
        {!isUserMuted && isMouseOver && <i className="fas fa-comment-slash" data-toggle="tooltip" data-placement="top" title={"mute " + userName + " " + userLastName}></i>}
        {!isMouseOver && !isUserMuted && <i className="fas fa-comment" data-toggle="tooltip" data-placement="top" title={"mute " + userName + " " + userLastName}></i>}
        {!isMouseOver && isUserMuted && <i className="fas fa-comment-slash" title={"unmute " + userName + " " + userLastName}></i>}
    </button>
    )


}

export default MuteUser;