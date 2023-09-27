const express = require('express');
const db = require('.././lib/db');
const loadphoto = require('.././lib/loadphoto');
const photo = require('.././lib/photo');
const searchResultsModule = require('../lib/searchResultsModule');

const router = express.Router();
let page = 1;
let result = [];

router.route('/process/page').post(function(req, res) {
    console.log('/process/page 호출됨.');

    const paramText = req.body.text;

    if(!req.session.isLogined) {
        res.redirect('/login');
        return;
    }

    const sessionId = req.session.user.id;

    const prev = req.body.prev || req.query.prev;
    const next = req.body.next || req.query.next;

    if(prev) {
        page -= 1;
    } else if(next) {
        page += 1;
    }

    if(page <= 0) {
        page = 1;
    }

    if (db) {
        if(paramText) {
            photo.searchPhoto(sessionId, page, paramText, function(err, rows) {
                if (err) {
                    res.redirect('/');
                    return;
                }
                
                if (!paramText || paramText.trim() === "") {
                    searchResultsModule.setSearchResults([], paramText);
                    result = [];
                }
    
                if (rows && rows.length > 0) {
                    searchResultsModule.setSearchResults(rows, paramText);
                    result = searchResultsModule.getSearchResults();
                    photo.setMyLikeValue();
                    photo.setMyValue();
                    res.redirect('/');
                } else {
                    res.redirect('/');
                }
            });
        } else if (photo.getMyLikeValue()){
            photo.myLike(sessionId, page, function(err, rows) {
                if (err) {
                    res.redirect('/');
                    return;
                }
    
                if (rows && rows.length > 0) {
                    res.redirect('/');
                } else {
                    res.redirect('/');
                }
            });
        }else if (photo.getMyValue()){
            photo.my(sessionId, page, function(err, rows) {
                if (err) {
                        res.redirect('/');
                    return;
                }
    
                if (rows && rows.length > 0) {
                    res.redirect('/');
                } else {
                    res.redirect('/');
                }
            });
        } else {
            loadphoto.loadPhotos(sessionId ,page, function(err, rows) {
                if (err) {
                    res.redirect('/');
                    return;
                }
    
                if (rows && rows.length > 0) {
                    photo.setMyLikeValue();
                    photo.setMyValue();
                    res.redirect('/');
                } else {
                    res.redirect('/');
                }
            });
        }
   }

});

module.exports = {
    router: router, 
    getPageValue: function() { 
        return page;
    },
    setPageValue: function() {
        return page = 1;
    },
    getResultValue: function() { 
        return result;
    }
};