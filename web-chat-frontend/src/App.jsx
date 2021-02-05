import React, { useState } from 'react';
import Navbar from './Components/Inc/Navbar';
import LogIn from './Components/Login/LogIn';
import SignUp from './Components/SignUp/SignUp';
import WebChat from './Components/Protected/WebChat/WebChat';
import UpdateProfile from './Components/Protected/UpdateProfile/UpdateProfile';
import UpdatePassword from './Components/Protected/UpdatePassword/UpdatePassword';
import UploadUserProfilePhoto from './Components/Protected/UploadUserProfilePhoto/UploadUserProfilePhoto';
import Home from './Components/Home/Home';
import { UserProvider } from './Context/User';
import { ChatUserProvider } from './Context/ChatUser';
import { UsersIChattedWithProvider } from './Context/UsersIChattedWith';
import { MessagesProvider } from './Context/Message';
import { SocketProvider } from './Context/Socket';
import  ProtectedRoute  from './Components/Protected/ProtectedRoute';
import UnprotectedRoute from './Components/UnprotectedRoute';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import ReactNotification from 'react-notifications-component'
import DeleteAccount from './Components/Protected/DeleteAccount/DeleteAccount';
import { MuteProvider } from './Context/Mute';

import 'react-notifications-component/dist/theme.css'


function App(){
    return (
        <Router>
            <ReactNotification />
            <React.Fragment>
                <MuteProvider>
                    <UserProvider>
                        <UsersIChattedWithProvider>
                            <MessagesProvider>
                                <ChatUserProvider>
                                        <SocketProvider>
                                            <Navbar></Navbar>
                                            <Switch>
                                                <Redirect exact from="/" to="/home" />
                                                <UnprotectedRoute path="/home" component={Home}></UnprotectedRoute>
                                                <UnprotectedRoute path="/login" component={LogIn}></UnprotectedRoute>
                                                <UnprotectedRoute path="/signup" component={SignUp}></UnprotectedRoute>
                                                <ProtectedRoute path="/updateprofile" component={UpdateProfile}></ProtectedRoute>
                                                <ProtectedRoute path="/uploaduserprofilephoto" component={UploadUserProfilePhoto}></ProtectedRoute>
                                                <ProtectedRoute path="/updatepassword" component={UpdatePassword}></ProtectedRoute>
                                                <ProtectedRoute path="/deleteaccount" component={DeleteAccount}></ProtectedRoute>
                                                <ProtectedRoute path="/chat" component={WebChat}></ProtectedRoute>
                                            </Switch>
                                        </SocketProvider>
                                </ChatUserProvider>
                            </MessagesProvider>
                        </UsersIChattedWithProvider>
                    </UserProvider>
                </MuteProvider>
            </React.Fragment>
        </Router>
    )
}


export default App;