const express = require('express');
const db = require('.././lib/db');
const user = require('.././lib/user');

const router = express.Router();

router.route('/process/withdrawal').post(function(req, res) {
    console.log('/process/withdrawal 호출됨.');
    
    const paramId = req.body.id || req.query.id;
    const paramPassword = req.body.password || req.query.password;
    const paramPassword_r = req.body.r_pwd || req.query.r_pwd;

    if(paramPassword !== paramPassword_r) {
        console.log(req.query.id);
        return res.redirect('/mypage/?page=withdrawal');
    }

    if (db) {
        user.withdrawal(paramId, paramPassword, function(err, rows) {
            if(err) {
                console.error('withdrawal 중 오류 발생 : ' + err.stack);
                res.redirect('/');
                return;
            }

            if(rows) {
                res.redirect('/logout');
            } else { 
                res.redirect('/');
            }
        });
    } else { 
        res.redirect('/');
    }
});


module.exports = router;