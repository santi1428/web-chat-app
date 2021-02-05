import React from 'react';
import './User.css';

const User = props => {
    const { user, configureChatUser, removeChatUser, setUserToSearch, URL  } = props;

    const handleClick = e => {
        configureChatUser({ id: user.id, name: user.name, lastName: user.lastName, email: user.email, profilePhoto: user.profilePhoto })
        setUserToSearch("");
    }

    return (
        <li className="user row pl-2" onClick={handleClick}>
            <div className="col-auto px-0 mx-0">
                <img src={URL + user.profilePhoto} className="userProfilePhoto" alt="" />
            </div>
            <div className="col align-self-center">
                <h5 className="name">
                    <i className="far fa-user mr-2"></i>{user.name + ' ' + user.lastName}
                </h5>
                <p className="email">
                    <i className="far fa-envelope mr-2"></i>{user.email}
                </p>
            </div>
        </li>
    )
}

export default User;