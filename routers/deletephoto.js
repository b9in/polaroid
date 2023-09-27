const express = require('express');
const db = require('../lib/db');
const photo = require('../lib/photo');

const router = express.Router();

router.post('/process/delete', function(req, res) {
    console.log('/process/delete 호출됨.');

    const paramNo = req.body.no || req.query.no;

    if(!req.session.isLogined) {
        res.redirect('/login');
        return;
    }

    const sessionId = req.session.user.id;

    if (db) {

        db.query('SELECT * FROM photos WHERE writer = ? AND no = ?', [sessionId, paramNo], function(err, rows) {
            if (err) {
                console.error('일치 검사 중 오류 발생 : ' + err.stack);
                res.redirect('/');
            } else {
                if (rows.length <= 0) {
                    res.redirect('/');
                } else {
                    photo.deletePhoto(paramNo, function(err, deletedPhoto) {
                        if(err) {
                            res.redirect('/');
                            return;
                        }

                        if(deletedPhoto) {
                            console.dir(deletedPhoto);
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