const express = require('express');
const router = express.Router();
const db = require('../../../database/index');
const { check, validationResult } = require('express-validator');
const { comparePassword } = require('../encrypt');
const jwt = require('jsonwebtoken');



router.post('/auth', 
[ check('email').isEmail(), check('password').isLength({ min: 6 }) ],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }else{
        const { email, password } = req.body;
        const user = await fetchUserData(email);
        if(!user){
            return res.status(403).json({ error: "Invalid email or password" });
        }
        else{
            const validPassword = await comparePassword(password, user.password);
            if(!validPassword){
                return res.status(403).json({ error: "Invalid email or password" });
            }else{
                const token = jwt.sign({ _id:  user.id }, process.env.TOKEN_SECRET);
                res.header('auth-token', token);
                return res.status(200).json({ id: user.id, name: user.name, lastName: user.last_name, email: user.email, accessToken: token, profilePhoto: user.profile_photo, profilePhotoSet: user.profile_photo_set });
            }
        }
    }
});


const fetchUserData = async (email) => {
    const users = await db.select().from('user').where({ email });
    return users[0];
}


module.exports = router;