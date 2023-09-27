const express = require('express');
const router = express.Router();
const photo = require('../lib/photo');

router.route('/process/move').post(function(req, res) {
    console.log('/process/move 호출됨.');

    if(req.body.upload == ""||req.query.upload == "") {
        res.redirect('/upload');
    } else if(req.body.back || req.query.back) {
        res.redirect('/');
    } else if(req.body.update || req.query.update) {

        const no = req.body.no;
        photo.loadPhoto(no, function(err, results) {
            if (err) {
                console.error('loadPhotos 함수 실행 중 오류 발생:', err);
                return;
            }
                const imgBuffer = results[0].img; 
                if (imgBuffer && imgBuffer.length > 0) {
                    results[0].imgBase64 = Buffer.from(imgBuffer).toString('base64');
                }

            if(!req.session.isLogined) {
                res.redirect('/login');
            } else {
                res.render('update', {results:results});
            } 
        });
    }
});

module.exports = router;