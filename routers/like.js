const express = require('express');
const db = require('../lib/db');
const photo = require('../lib/photo');

const router = express.Router();

router.post('/process/like', function(req, res) {
    console.log('/process/like 호출됨.');

    if (!req.session.isLogined) {
        res.redirect('/login');
        return;
    }

    const paramNo = req.body.no || req.query.no;

    if (db) {
        const sessionId = req.session.user.id; 

        db.query('SELECT * FROM likes WHERE user_id = ? AND photo_no = ?', [sessionId, paramNo], function(err, rows) {
            if (err) {
                console.error('라이크 확인 중 오류 발생 : ' + err.stack);
                res.redirect('/');
            } else {
                if (rows.length <= 0) {
                    // 해당 세션 아이디와 게시물 번호의 라이크가 아직 없음
                    photo.likePhoto(sessionId, paramNo, function(err, likedPhoto) {
                        if (err) {
                            console.error('라이크 추가 중 오류 발생 : ' + err.stack);
                            res.redirect('/');
                        } else {
                            res.redirect('/');
                        }
                    });
                } else {
                    photo.cancellLikePhoto(paramNo, function(err, cancellLikePhoto) {
                        if (err) {
                            console.error('라이크 취소 중 오류 발생 : ' + err.stack);
                            res.redirect('/');
                        } else {
                            res.redirect('/');
                        }
                    });
                    
                }
            }
        });
    } else {
        // 데이터베이스 연결 실패
        res.redirect('/');
    }
});


module.exports = router;