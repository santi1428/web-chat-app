const express = require('express');
const router = express.Router();
const db = require('../../database/index');
const { check, validationResult } = require('express-validator');
const auth = require('./auth/verifyToken');

router.get("/:users", auth, async(req, res) => {
    const users = JSON.parse(req.params.users);

    const user1 = users.user1;
    const user2 = users.user2;
    
    const messages = await getMessages(user1, user2);

    return res.status(200).json(messages); 

});

const getMessages = async (user1, user2) => {
    const messages = await db.select().from('message').where({ senderId: user1, receiverId: user2 }).orWhere({senderId: user2, receiverId: user1});
    return messages;
}


module.exports = router;