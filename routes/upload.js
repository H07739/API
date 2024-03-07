const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

var name;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        name=file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
        cb(null, name);
    }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res,next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // You can perform additional actions here if needed
   
    res.status(200).json({ message: 'Image uploaded successfully',url: `${req.protocol}://${req.get('host')}/`+name});
});

module.exports = router;
