const express = require('express');
const db = require('.././lib/db');
const photo = require('.././lib/photo');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/process/upload', upload.single('image'), function(req, res) {
    console.log('/process/upload 호출됨.');
    
    if (!req.file) {
        console.error('업로드된 파일이 없습니다.');
        return res.status(400).send('업로드된 파일이 없습니다.');
    }

    const paramTitle = req.body.title || req.query.title;
    const paramContent = req.body.content || req.query.content;
    const paramWriter = req.session.user.id; 
    const image = fs.readFileSync(req.file.path);
    
    if (db) {
        photo.addPhoto(paramTitle, paramContent, paramWriter, 0, image, function(err, addedPhoto) {

            if(err) {
                console.error('포토 추가 중 오류 발생 : ' + err.stack);
                res.redirect('/');
                return;
            }
            
            if(addedPhoto) {
                console.dir(addedPhoto);
                res.redirect('/');
            } else { 
                res.redirect('/');
            }
        });
    } else { 
        // 데이터베이스 연결 실패
        res.redirect('/');
    }
});


module.exports = router;