const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('./auth/verifyToken');
const { searchUsersByEmailOrName, verifyPassword, updateUserProfilePhoto, updateUserPassword, deleteUserProfilePhoto, getUser, validateIfEmailIsAvailable, validateIfEmailIsAvailableTochange, saveNewUser, updateUser, deleteUserAccount, getUsersIChattedWith, muteUser, unmuteUser, getMutedUsersId} = require('./utils/user');
const { upload } = require('./utils/file');

router.post('/', 
[ check('email').isEmail().normalizeEmail(), check('password').isLength({ min: 6 }), check('name').isLength({ min: 2 }).trim().escape(), check('lastName').isLength({ min: 2 }).trim().escape()], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }else{
        const availableEmail = await validateIfEmailIsAvailable(req.body.email);
        if(availableEmail){
            const savedNewUser = await saveNewUser(req.body);
            if(savedNewUser){
                return res.sendStatus(200);
            }else{
                return res.sendStatus(500);    
            }
        }else{
            return res.status(409).json({ error: "Email is already in use" });
        }
    }
});

router.put('/',
[ check('email').isEmail().normalizeEmail(), check('name').isLength({ min: 2 }).trim().escape(), check('lastName').isLength({ min: 2 }).trim().escape(), auth], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }else{
        const { name, lastName, email } = req.body;
        const availableEmail = await validateIfEmailIsAvailableTochange(req.body.email, req.user['_id']);
        if(availableEmail){
            const updatedUser = await updateUser(req.body, req.user['_id']);
            if(updatedUser){
                return res.sendStatus(204);
            }else{
                 return res.sendStatus(500);    
            }
        }else{
            return res.status(409).json({ error: "Email is already in use" });
        }
    }
});

router.get("/usersichattedwith", auth, async (req, res) => {
    const usersIChattedWith = await getUsersIChattedWith(req.user['_id']);
    return res.status(200).json(usersIChattedWith);
});


router.delete('/deleteaccount', [check('password').isLength({ min: 6 }), auth ], async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }else{
        const verifiedPassword = await verifyPassword(req.body.password, req.user['_id']);
        if(verifiedPassword){
            const deletedUserAccount = await deleteUserAccount(req.user['_id']);
            if(deletedUserAccount){
                return res.sendStatus(204);
            }else{
                return res.sendStatus(500);    
            }
        }else{
            return res.status(403).json({ error: "Invalid password" });
        }
    }
});


router.put('/updatepassword',
[ check('oldPassword').isLength({ min: 6 }), check('newPassword').isLength({ min: 6 }), check('conNewPassword').isLength({ min: 6 }), auth ], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }else{
        const { oldPassword, newPassword, conNewPassword } = req.body;
        const verifiedOldPassword = await verifyPassword(oldPassword, req.user['_id']);
        if(verifiedOldPassword){  
            if(newPassword == conNewPassword){
                const updatedUserPassword = await updateUserPassword(newPassword, req.user['_id']);
                if(updatedUserPassword){
                    return res.sendStatus(204);
                }else{
                    return res.sendStatus(500);    
                }
            }
        }else{
            return res.status(403).json({ error: "Invalid password" });
        }
    }
});

router.get('/search/:user', auth, async (req, res) => {
    if(req.params.user.length > 0){
        const users = await searchUsersByEmailOrName(req.params.user, req.user['_id']);
        // console.log(users);
        return res.status(200).json(users); 
    }else{
        return res.sendStatus(422);
    }
});

router.get('/mutedusersid', auth, async (req, res) => {
    const mutedUsers = await getMutedUsersId(req.user['_id']);
    return res.status(200).json(mutedUsers);
});

router.post('/muteuser', auth, async (req, res) => {
    const userToMuteId = req.body.userToMuteId;
    if(Number.isInteger(userToMuteId)){
        const mutedUser = await muteUser(req.user['_id'], userToMuteId);
        if(mutedUser){
            return res.sendStatus(200);
        }else{
            return res.sendStatus(500);
        }
    }else{
        return res.sendStatus(422);
    }
});

router.delete('/unmuteuser', auth, async (req, res) => {
    const userToUnmuteId = req.body.userToUnmuteId;
    if(Number.isInteger(userToUnmuteId)){
        const unmutedUser = await unmuteUser(req.user['_id'], userToUnmuteId);
        if(unmutedUser){
            return res.sendStatus(200);
        }else{
            return res.sendStatus(500);
        }
    }else{
        return res.sendStatus(422);
    }
});

router.post('/uploaduserprofilephoto', auth, async (req, res) => {
    upload(req, res, async (err) => {
        if(err){
            return res.status(422).json({ error: "file format is not valid" });
        }else{
            if(req.file == undefined){
                return res.status(422).json({ error: "You have not provided a file" });
            }else{
                await deleteUserProfilePhoto(req.user['_id']);
                const profilePhoto = `/UserProfilePhotos/${req.file.filename}`;
                const updatedUser = await updateUserProfilePhoto(profilePhoto, req.user['_id']);
                if(updatedUser){
                    return res.status(200).json({ message: "Photo uploaded", file: profilePhoto });
                }else{
                    return res.status(422).json({ error: "There was an error" });
                }    
            }
        }
    });
});




module.exports = router;



// router.get('/', auth, (req, res) => {
//     db.select().from('user').then(data => {
//         if(data.length > 0){
//             return res.status(200).json(data);
//         }else{
//             return res.status(404).json(data);
//         }
//     }).catch(err => res.json(err));
// });