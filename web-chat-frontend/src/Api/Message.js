import axios from 'axios';
import  { URL } from './Config'; 


const getMessages = users => {
    return axios.get(`${URL}/api/messages/${JSON.stringify(users)}`)
    .then(res => {
        return res.data;
    })
    .catch(err => { 
        return [];
    });
}

export {
    getMessages
}