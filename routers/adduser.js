const express = require('express');
const db = require('.././lib/db');
const user = require('.././lib/user');

const router = express.Router();

router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser 호출됨.');
    
    const paramId = req.body.id || req.query.id;
    const paramPassword = req.body.password || req.query.password;
    const paramPassword_r = req.body.r_pwd || req.query.r_pwd;

    if(paramPassword !== paramPassword_r) {
        console.log(req.query.id);
        return res.redirect('/sign_up');
    }

    if (db) {
        user.addUser(paramId, paramPassword, function(err, addedUser) {
            if(err) {
                console.error('사용자 추가 중 오류 발생 : ' + err.stack);
                res.redirect('/');
                return;
            }

            if(addedUser) {
                console.dir(addedUser);
                
                const insertId = addedUser.insertId;
                console.log('추가한 레코드의 아이디 : ' + insertId);
                
                res.redirect('/login');
            } else { 
                res.redirect('/');
            }
        });
    } else { 
        res.redirect('/');
    }
});

module.exports = router;