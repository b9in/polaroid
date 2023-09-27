const express = require('express');
const db = require('../lib/db');
const photo = require('../lib/photo');

const router = express.Router();

router.post('/process/update', function(req, res) {
    console.log('/process/update 호출됨.');

    const paramTitle = req.body.title || req.query.title;
    const paramContent = req.body.content || req.query.content;
    const paramNo = req.body.no || req.query.no;

    if (db) {
        const sessionId = req.session.user.id;

        db.query('SELECT * FROM photos WHERE writer = ? AND no = ?', [sessionId, paramNo], function(err, rows) {
            if (err) {
                console.error('일치 검사 중 오류 발생 : ' + err.stack);
                res.redirect('/');
            } else {
                if (rows.length <= 0) {
                    res.redirect('/');
                } else {
                    photo.updatePhoto(paramTitle, paramContent, paramNo, function(err, updatedPhoto) {
                        if(err) {
                            console.error('updatePhoto 중 오류 발생 : ' + err.stack);
                            res.redirect('/');             
                            return;
                        }

                        if(updatedPhoto) {
                            res.redirect('/');
                        } else { 
                            res.redirect('/');
                        }
                    });
                    
                }
            }
        });

    } else { 
        res.redirect('/');
    }
});


module.exports = router;