const db = require('../../../database/index');
const format = require('date-fns/format')

const saveMessage = async (message) => {
    // console.log(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
    try{
        const savedMessage = await db('message').insert({senderId: message.senderId, receiverId: message.receiverId, message: message.message, sentAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") }).returning('*');
        return savedMessage[0];
    }catch(err){
        console.error(err);
    }
}

module.exports = {  saveMessage }
