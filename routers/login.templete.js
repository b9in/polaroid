const express = require('express');
const db = require('.././lib/db');
const user = require('.././lib/user');
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');

const router = express.Router();

const options = {
    host: "",
    port: '',
    user: "",
    password: "",
    database: "",
};

const sessionStore = new MySQLStore(options);

app.use(
    session({
        key: "session_cookie_name",
        secret: "session_cookie_secret",
        store: sessionStore,
        resave: false,
        saveUninitialized: true
    })
);

app.use(cookieParser());

router.route('/process/login').post(function(req, res) {
    console.log('/process/login 호출됨.');

    const paramId = req.body.id || req.query.id;
    const paramPassword = req.body.password || req.query.password;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);

    if (db) {
        user.authUser(paramId, paramPassword, function(err, rows) {
            if (err) {
                console.error('사용자 로그인 중 오류 발생 : ' + err.stack);
                res.redirect('/');
                return;
            }
            
            if(rows && rows.length > 0) {
                req.session.user = {
                    id: rows[0].id,
                    password : rows[0].password,
                };     
                req.session.id = rows[0].id; 
                req.session.password = rows[0].password;                        
                req.session.isLogined = true;

                const rememberMe = req.body;
                if (rememberMe) {
                    res.cookie('userId', rows[0].id);
                }

                req.session.save(function(){ 
                    res.redirect('/');
                });
            } else {
                res.redirect('/login');
            }
        });
    }
});


module.exports = router;
