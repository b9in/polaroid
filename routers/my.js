const express = require('express');
const db = require('.././lib/db');
const photo = require('.././lib/photo');
const pageModule = require('./page');
let myResults = '';
const router = express.Router();

router.route('/process/my').post(function(req, res) {
    console.log('/process/my 호출됨.');

    if(!req.session.isLogined) {
        res.redirect('/login');
        return;
    }
    
    const sessionId = req.session.user.id;
    const paramPage = req.query.page || pageModule.getPageValue();

    console.log('요청 파라미터 : ' + paramPage);
    
    if (db) {
        photo.my(sessionId, paramPage, function(err, rows) {

            if (err) {
                res.redirect('/');
                return;
            }

            if (rows && rows.length > 0) {
                myResults = rows;
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        });
    }
});

module.exports = {
    router: router, 
    getMy: function() { 
        return myResults;
    },
    setMy: function() {
        myResults = [];
    }
};