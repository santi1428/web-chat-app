const db = require('../../../database/index');
const { encryptPassword, comparePassword } = require('../encrypt');
const fs = require('fs');
const path = require('path');

const searchUsersByEmailOrName = async (user, userId) => {
    const lowerCaseUser = user.toLowerCase();
    try{
        const users = await db.select('id', 'name', 'last_name AS lastName', 'email', 'profile_photo AS profilePhoto')
        .from('user')
        .whereRaw(`(lower(email) LIKE '%${lowerCaseUser}%' OR lower(CONCAT (name,' ','last_name')) LIKE '%${lowerCaseUser}%') AND (id <> ${userId})`)
        .limit(5);
        return users;
    }catch(err){
        console.log(err);
        return [];
    }
}

const getUsersIChattedWith = async (userId) => {
    try{
        const chatPeople = db('user').distinct('user.id AS userId', 'name', 'last_name AS lastName', 'email', 'profile_photo AS profilePhoto').from('user').innerJoin('message', function() {
            this.on('message.senderId', '=', 'user.id').orOn('message.receiverId', '=', 'user.id')
        }).where('message.senderId',  userId).orWhere('message.receiverId', userId);
        return chatPeople;
    }catch(err){
        console.error(err);
    }
}

const verifyPassword = async (password, userId) => {
    const user = await getUser(userId);
    const verifiedPassword = await comparePassword(password, user.password);
    return verifiedPassword;
}

const updateUserProfilePhoto = async (profilePhoto, userId) => {
    try{
        await db('user').where('id', '=', userId).update({
            profile_photo: profilePhoto,
            profile_photo_set: true
        });
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateUserPassword = async (newPassword, userId) => {
    const encryptedNewPassword = await encryptPassword(newPassword);
    try{
        await db('user').where('id', '=', userId).update({
            password: encryptedNewPassword
        });
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteUserProfilePhoto = async (userId) => {
    const user = await getUser(userId);
    if(user.profile_photo_set){
        try{
            const userProfilePhotoPath = path.join(__dirname, "/../../../public" + user.profile_photo);
            fs.unlinkSync(userProfilePhotoPath);
            return true;
        }catch(err){
            console.error(err);
            return false;
        }
    }else{
        return true;
    }
    
}

const getUser = async (id) => {
    const users = await db.select().from('user').where({ id });
    return users[0];
}
 
const validateIfEmailIsAvailable = async (email) => {
    const users = await db.select().from('user').where({ email })
    return users.length === 0;
}

const validateIfEmailIsAvailableTochange = async (email, id) => {
    const users = await db.select().from('user').where({ email }).andWhere( 'id', '<>', id )
    return users.length === 0;
}

const saveNewUser = async ({ name, lastName, email, password }) => {
    const encryptedPassword = await encryptPassword(password);
    try{
        const user = await db('user').insert({name, email, last_name: lastName, password: encryptedPassword, profile_photo: "/UserProfilePhotos/default.png", profile_photo_set: false });
        return true;
    }catch(err){
        console.log(err);
        return false;
    } 
}

const getMutedUsersId = async (userId) => {
    try{
        const mutedUsersId = await db.select('muted_user_id AS mutedUserId').from('muted').where({ userId });
        const mutedUsersIdArr = [];
        mutedUsersId.forEach(mutedUserId => {
            mutedUsersIdArr.push(mutedUserId.mutedUserId);
        });
        return mutedUsersIdArr;
    }catch(err){
        console.error(err);
        return [];
    }
}

const muteUser = async(userId, userToMuteId) => {
    try{
        const userMuted = await db('muted').insert({ userId, muted_user_id: userToMuteId });
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}


const unmuteUser = async (userId, userToUnmuteId) => {
    try{
        const userUnmuted = await db('muted').where('userId', userId).andWhere('muted_user_id', userToUnmuteId).del();
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}

const updateUser = async ({ name, lastName, email }, id) => {
    try{
        const user = await db('user').where('id', '=', id).update({name, email, last_name: lastName });
        return true;
    }catch(err){
        console.log(err);
        return false;
    } 
}

const deleteUserMessages = async (userId) => {
    try{
        await db('message').where('senderId', userId).orWhere('receiverId', userId).del();
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}

const deleteUserMutedUsers = async (userId) => {
    try{
        await db('muted').where('userId', userId).orWhere('muted_user_id', userId).del();
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}

const deleteUser = async (userId) => {
    try{
        await db('user').where('id', userId).del();
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}

const deleteUserAccount = async (userId) => {
    
    const deletedUserMutedUsers = await deleteUserMutedUsers(userId); 
    const deletedUserProfilePhoto = await deleteUserProfilePhoto(userId);
    const deletedUserMessages = await deleteUserMessages(userId);
    const deletedUser = await deleteUser(userId);

    if(deletedUserMessages && deletedUser && deletedUserProfilePhoto && deletedUserMutedUsers){
        console.log(true);
        return true;
    }else{
        console.log(false);
        return false;
    }

}


module.exports = {
    searchUsersByEmailOrName,
    verifyPassword,
    updateUserProfilePhoto,
    updateUserPassword,
    deleteUserProfilePhoto,
    getUser,
    validateIfEmailIsAvailable,
    validateIfEmailIsAvailableTochange,
    saveNewUser,
    updateUser,
    deleteUserAccount,
    getUsersIChattedWith,
    unmuteUser,
    getMutedUsersId,
    muteUser
}