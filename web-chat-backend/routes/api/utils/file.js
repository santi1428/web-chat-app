const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, "/../../../public/UserProfilePhotos"),
    filename: function(req, file, cb){
        cb(null, 'Photo-' + Date.now() + path.extname(file.originalname));
    }
});

const checkFileType = (file, cb) => {

    const filetypes = /jpeg|jpg|png|gif/;
 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
 
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
 
}

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('profilePhoto');


module.exports = {
    upload
}