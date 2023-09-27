const express = require('express');
const router = express.Router();

router.get('/logout', function (req, res, util_2) { 
    if (util_2 === 'Logout') {
        if (req.session.isLogined) {
            req.session.destroy(function (err) {
                if (err) {
                    console.error('세션 삭제 중 오류 발생 : ' + err.stack);
                    return;
                }
                console.log('세션 삭제 및 로그아웃 성공');
                res.redirect('/');
            });
        } else {
            console.log('로그인 상태가 아닙니다.');
            res.redirect('/');
        }
    } else {
        console.log('util_2가 "Logout"이 아닙니다.');
        res.redirect('/'); 
    }
});

module.exports = router;
