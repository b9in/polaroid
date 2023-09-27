const express = require('express');
const db = require('../lib/db');
const user = require('../lib/user');

const router = express.Router();

router.post('/process/updateuser', function(req, res) {
    console.log('/process/updateuser 호출됨.');

    const paramId = req.body.id || req.query.id;
    const paramPassword = req.body.password || req.query.password;
    const sessionId = req.session.user.id;

    if (db) {
        user.updateUser(sessionId, paramId, paramPassword, function(err, updatedUser) {
            if(err) {
                console.error('updateUser 중 오류 발생 : ' + err.stack);
                res.redirect('/');
                return;
            }
            
            if(updatedUser) {
                res.redirect('/');
            } else { 
                res.redirect('/');
            }
        });
    } else { 
        res.redirect('/');
    }
});


module.exports = router;