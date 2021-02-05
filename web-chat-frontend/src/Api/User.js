import axios from 'axios';
import  { URL } from './Config'; 

const registerUser = user => {
    return axios.post(`${URL}/api/users`, user)
    .then(res => {
        return res;
    })
    .catch(err => {
        return err.response;
    });
}

const updateUserProfile = user => {
    return axios.put(`${URL}/api/users`, user)
    .then(res => {
        return res;
    })
    .catch(err => {
        return err.response;
    });
}

const updateUserPassword = passwords => {
    return axios.put(`${URL}/api/users/updatepassword`, passwords)
    .then(res => {
        return res;
    })
    .catch(err => {
        return err.response;
    });
}

const signIn = credentials => {
    return axios.post(`${URL}/api/users/auth`, credentials)
    .then(res => {
        return res;
    })
    .catch(err => {
        return err.response;
    });
}

const getUsers = user => {
    return axios.get(`${URL}/api/users/search/${user}`)
    .then(res => {
        return res.data;
    })
    .catch(err => { 
        return [];
    });
}

const uploadUserProfilePhoto = (photo, cb) => {
   const config = {
       headers: {
        'auth-token': JSON.parse(localStorage.getItem("user")).accessToken,
        'content-type': 'multipart/form-data'
       },
       onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            let percent = Math.floor( (loaded * 100) / total )
            console.log( `${loaded}kb of ${total}kb | ${percent}%` );
            if( percent <= 100 ){
                cb(percent);
            }
       }
   }
   return axios.post(`${URL}/api/users/uploaduserprofilephoto`, photo, config)
   .then(res => {
       return res;
   })
   .catch(err => {
       console.log(err.response);
       return err.response;
   })
}

const deleteUserAccount = password => {
    console.log(password);
    return axios.delete(`${URL}/api/users/deleteaccount`, { data: { password } })
    .then(res => {
        return res;
    })
    .catch(err => {
        return err.response;
    });
}

const getUsersIChattedWith = () => {
    return axios.get(`${URL}/api/users/usersichattedwith`)
    .then(res => {
        return res.data;
    })
    .catch(err => { 
        return [];
    });
}

const getMutedUsersId = () => {
    return axios.get(`${URL}/api/users/mutedusersid`)
    .then(res => {
        return res;
    })
    .catch(err => {
        return err.response;
    });
}

const muteUser = userToMuteId => {
    return axios.post(`${URL}/api/users/muteuser`, { userToMuteId })
    .then(res => {
        return res;
    })
    .catch(err => {
        return err.response;
    });
}

const unmuteUser = userToUnmuteId => {
    return axios.delete(`${URL}/api/users/unmuteuser`, { data: { userToUnmuteId } })
    .then(res => {
        return res;
    })
    .catch(err => {
        return err.response;
    });
}

const setTokenToHeaders = () => {
    
    if(!axios.defaults.headers.common["auth-token"]){
        axios.defaults.headers.common = {
            "auth-token": JSON.parse(localStorage.getItem("user")).accessToken
        };
    }

    if(!localStorage.getItem("user")){
        axios.defaults.headers.common = {}
    }

}

const removeTokenFromHeaders = () => {
    axios.defaults.headers.common = {}
}

export {
    registerUser,
    signIn,
    getUsers, 
    setTokenToHeaders,
    removeTokenFromHeaders,
    uploadUserProfilePhoto,
    updateUserProfile,
    updateUserPassword,
    deleteUserAccount,
    getUsersIChattedWith,
    muteUser,
    unmuteUser,
    getMutedUsersId,
    URL
}



