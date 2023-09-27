const express = require('express');
const db = require('.././lib/db');
const photo = require('.././lib/photo');
const pageModule = require('./page');
let myLikeResults = '';
const router = express.Router();

router.route('/process/mylike').post(function(req, res) {
    console.log('/process/mylike 호출됨.');

    if(!req.session.isLogined) {
        res.redirect('/login');
        return;
    }
    
    if(photo.getMyValue()){
        photo.setMyValue();
    }

    const sessionId = req.session.user.id;
    const paramPage = req.query.page || pageModule.getPageValue();

    if (db) {
        photo.myLike(sessionId, paramPage, function(err, rows) {
            if (err) {
                res.redirect('/');
                return;
            }

            if (rows && rows.length > 0) {
                myLikeResults = rows;
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        });
    }
});

module.exports = {
    router: router, 
    getmyLike: function() { 
        return myLikeResults;
    },
    setmyLike: function() {
        myLikeResults = [];
    }
};