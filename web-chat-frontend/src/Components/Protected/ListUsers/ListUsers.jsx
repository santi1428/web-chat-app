import React, { useContext } from 'react';
import User from './User/User';
import { ChatUserContext } from '../../../Context/ChatUser';
import { URL } from '../../../Api/User';
import './ListUsers.css';

const ListUsers = props => {
    const { users, searchError, setUserToSearch } = props;
    const { chatUser, configureChatUser, removeChatUser } = useContext(ChatUserContext);
    if(!chatUser.isChatUserSet){
        return (
            <ul id="usersList">
                {
                    users.length > 0 ? users.map(user => 
                        <User key={user.id} URL={URL} user={user} configureChatUser={configureChatUser} removeChatUser={removeChatUser} setUserToSearch={setUserToSearch}></User>
                    ) 
                    :
                    <p className="text-danger m-0 p-0">
                        {searchError}
                    </p>
                }
            </ul>
        )
    }else{
        return (
            <React.Fragment></React.Fragment>
        )
    }

}

export default ListUsers;