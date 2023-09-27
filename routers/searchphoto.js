const express = require('express');
const db = require('.././lib/db');
const photo = require('.././lib/photo');
const searchResultsModule = require('.././lib/searchResultsModule');
const pageModule = require('./page');
let result = '';
let paramText = '';

const router = express.Router();

router.route('/process/search').post(function(req, res) {
    console.log('/process/search 호출됨.');

    if(!req.session.isLogined) {
        res.redirect('/login');
        return;
    }
    const sessionId = req.session.user.id;

    paramText = req.body.text || req.query.text;
    const paramPage = req.query.page || pageModule.getPageValue();

    if (db) {
        photo.searchPhoto(sessionId, paramPage, paramText, function(err, rows) {
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
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        });
    }
});

module.exports = {
    router: router, 
    getResultValue: function() { 
        return result;
    },
    getText: function () {
        return paramText;
    },
    setResultValue: function() {
        result = [];
    }
};