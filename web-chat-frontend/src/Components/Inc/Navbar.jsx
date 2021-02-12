import React, { useContext, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/User';
import { useHistory } from "react-router-dom";
import { SocketContext } from '../../Context/Socket';
import { UsersIChattedWithContext } from '../../Context/UsersIChattedWith';
import { MuteContext } from '../../Context/Mute';
import { URL } from '../../Api/User'; 

function Navbar(){
  const { user, removeUser } = useContext(UserContext);  
  const { disconnectFromUsersIChattedWith } = useContext(SocketContext);
  const { usersIChattedWith } = useContext(UsersIChattedWithContext);
  const usersIChattedWithRef = useRef(usersIChattedWith); 
  const { removeMutedUsersId } = useContext(MuteContext);
  const history = useHistory();

  const logout = () => {
    
    disconnectFromUsersIChattedWith({ users: usersIChattedWithRef.current, userId: user.id }); 
    removeUser();
    removeMutedUsersId();
    history.push('/login');
  }
  
  useEffect(() => {

    usersIChattedWithRef.current = usersIChattedWith;
    // console.log(usersIChattedWith);

  }, [usersIChattedWith]);

  const goToUpdateProfile = () => {
    history.push('/updateprofile');
  }

  const goToHome = e => {
    e.preventDefault();
    history.push('/');
  }

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
        <a className="navbar-brand ml-5" href="#" onClick={goToHome}><i className="fas fa-comment-dots mr-2"></i>WebChat</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto mr-5">
            {!user.isLoggedIn &&
              <li className="nav-item active">
                <Link to="/login" className="nav-item nav-link py-3 mr-0 mr-md-3 mr-lg-5 px-4 active">
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Sign In
                </Link>
              </li>
            }
            {user.isLoggedIn ? 
              <li className="nav-item active">
                <Link to="#" className="nav-item nav-link py-3 mr-0 mr-md-3 mr-lg-5 px-4 active" onClick={goToUpdateProfile}>
                  <img src={ URL + user.profilePhoto } alt="User profile photo is not available" className="mr-2" id="profilePhoto" />
                  {user.name + ' ' + user.lastName}
                </Link>
              </li> :              
               <li className="nav-item active">
                <Link to="/signup" className="nav-item nav-link py-3 mr-0 mr-md-3 mr-lg-5 px-4 active">
                  <i className="fas fa-user-plus mr-2"></i>               
                  Sign Up
                </Link>
               </li>
            }
            {user.isLoggedIn && 
              <li className="nav-item active" onClick={logout}>
                <Link to="#" className="nav-item nav-link py-3 mr-0 mr-md-3 mr-lg-5 px-4 active">
                  <i className="fas fa-sign-out-alt mr-2"></i>              
                  Log out
                </Link>
              </li> 
            }
          </ul>
        </div>
      </nav>
  )
}


export default Navbar;