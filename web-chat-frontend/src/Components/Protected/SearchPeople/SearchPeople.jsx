import React, { useState, useEffect, useContext } from 'react';
import { getUsers } from '../../../Api/User';
import ListUsers from '../ListUsers/ListUsers';
import { ChatUserContext } from '../../../Context/ChatUser';
import './SearchPeople.css';

const SearchPeople = () => {

    const [userToSearch, setUserToSearch] = useState('');
    // const [enabledSearchInput, setEnabledSearchInput] = useState(true);
    const [users, setUsers] = useState([]);
    const [searchError, setSearchError] = useState('');
    const {chatUser} = useContext(ChatUserContext);
    const handleChange = e => {
        setUserToSearch(e.target.value);
    }

    const fetchUsers = () => {
        setUsers([]);
        const validUserToSearch = userToSearch.trim();
        if(validUserToSearch.length > 0){
            getUsers(validUserToSearch)
            .then(data => {
                setUsers(data);
                if(data.length === 0){
                    setSearchError('User not found');
                }
            })            
        }

    }

    useEffect(() => {
        fetchUsers();
        if(userToSearch.trim().length === 0){
            setUsers([]);
            setSearchError('');
        }
    }, [userToSearch]);

    return (
        <div className="row justify-content-center mt-2">
            <div className="col-8">
                <div className="row">
                    <div className="col px-0" id="searchInput">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
                            </div>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter the email or name of the person you want to chat with" aria-label="Username" aria-describedby="basic-addon1" 
                                value={userToSearch} 
                                onChange={handleChange} 
                                disabled={ chatUser.isChatUserSet ? "disabled" : "" }    
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ListUsers users={users} searchError={searchError} setUserToSearch={setUserToSearch}></ListUsers>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPeople;
