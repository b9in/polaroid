const express = require('express'),
    http = require('http'),
    path = require('path');
const bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static');
const expressErrorHandler = require('express-error-handler');
const expressSession = require('express-session');
const addUser = require('./routers/adduser');
const addPhoto = require('./routers/addphoto');
const login = require('./routers/login');
const move = require('./routers/move');
const deletePhoto = require('./routers/deletephoto');
const updatePhoto = require('./routers/updatephoto');
const searchResultsModule = require('./lib/searchResultsModule');
const photo = require('./lib/loadphoto');
const search = require('./routers/searchphoto');
const pageModule = require('./routers/page');
const like = require('./routers/like');
const updateUser = require('./routers/updateuser');
const withdrawal = require('./routers/withdrawal');
const myLike = require('./routers/mylike');
const my = require('./routers/my');
const photoModule = require('./lib/photo');

const app = express();

let util_1 = 'Login';
let util_2 = 'Signup';
let li_1 = 'login';
let li_2 = 'sign_up';

let paramPage;
let results;
let myLikeResults;
let myResults;
let sessionId = "";
let sessionPwd = "";

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs'); // 템플릿 엔진 설정

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/views', static(path.join(__dirname, 'views')));
app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

app.use(addUser);
app.use(login);
app.use(move);
app.use(addPhoto);
app.use(search.router);
app.use(deletePhoto);
app.use(updatePhoto);
app.use(pageModule.router);
app.use(like);
app.use(updateUser);
app.use(withdrawal);
app.use(myLike.router);
app.use(my.router);

app.use(function (req, res, next) {
    if (req.session && req.session.isLogined) { 
        li_1 = 'mypage';
        li_2 = 'logout';
        util_1 = 'My Page';
        util_2 = 'Logout';
    } else { 
        li_1 = 'login';
        li_2 = 'sign_up';
        util_1 = 'Login';
        util_2 = 'Sign up';
    }

    next();
});

app.get('/', (req, res) => {

    if (req.session && req.session.user && req.session.user.id) {
        sessionId = req.session.user.id;
        sessionPwd = req.session.user.password;
        
    } else {
       
    }
    paramPage = req.query.page || pageModule.getPageValue();
    results = search.getResultValue();
    myLikeResults = myLike.getmyLike();
    myResults = my.getMy();
    let text = search.getText();

    if(paramPage <= 0) {
        paramPage = 1;
    }

    if (text === "") {
        results = []; 
    }

    if(paramPage > 1 && results.length==0 && text){
        //paramPage = 1;
    } else if(paramPage > 1 && results.length > 0) {
        results = pageModule.getResultValue();
        //paramPage = 1;
    }

    photo.loadPhotos(sessionId, paramPage, function(err, latestRows) {
        if (err) {
            console.error('loadPhotos 함수 실행 중 오류 발생:', err);
            return;
        }

    photo.loadPhotos_like(sessionId, function(err, likeRows) {
        if (err) {
            console.error('loadPhotos_Like 함수 실행 중 오류 발생:', err);
            return;
        }

        if(results.length === 0) {
            searchResultsModule.setSearchResults([], ''); 
        }


        if(myResults.length > 0) {
            myLike.setmyLike();
            search.setResultValue();
        } else if (myLikeResults.length > 0) {
            search.setResultValue();
            my.setMy();
        } else if (results.length > 0) {
            my.setMy();
            myLike.setmyLike();
        }

        if(myLikeResults.length > 0){
            res.render('template', { li_1, li_2, util_1, util_2, data: util_1, latestResults: myLikeResults, likeResults: likeRows, text, page:paramPage});
        } else if(myResults.length > 0) {
            res.render('template', { li_1, li_2, util_1, util_2, data: util_1, latestResults: myResults, likeResults: likeRows, text, page:paramPage});
        } else if(results && results.length > 0) {
            res.render('template', { li_1, li_2, util_1, util_2, data: util_1, latestResults: results, likeResults: likeRows, text, page:paramPage}); 
        
        } else{
            res.render('template', { li_1, li_2, util_1, util_2, data: util_1, latestResults: latestRows, likeResults: likeRows, text , page:paramPage});
        }
    });
    });

});

app.post('/', (req, res) => {

    if (req.session && req.session.user && req.session.user.id) {
        sessionId = req.session.user.id;
        sessionPwd = req.session.user.password;
    } 
    paramPage = req.query.page || pageModule.getPageValue();
    let polaroid = req.query.polaroid || req.body.polaroid;
    let text = search.getText();

    paramPage = 1;

    if (text === "") {
        results = []; 
    }

    if(paramPage > 1 && results.length==0 && text){
        //paramPage = 1;
    } else if(paramPage > 1 && results.length > 0) {
        results = pageModule.getResultValue();
        //paramPage = 1;
    }

    if(polaroid) {
        search.setResultValue();
        myLike.setmyLike();
        pageModule.setPageValue();
        photoModule.setMyLikeValue();
        myResults = my.setMy();
        paramPage = 1;
        searchResultsModule.setSearchResults([], '');
        results = [];
    }

    photo.loadPhotos(sessionId, paramPage, function(err, latestRows) {
        if (err) {
            console.error('loadPhotos 함수 실행 중 오류 발생:', err);
            return;
        }

    photo.loadPhotos_like(sessionId, function(err, likeRows) {
        if (err) {
            console.error('loadPhotos_Like 함수 실행 중 오류 발생:', err);
            return;
        }
        search.setResultValue();
        myLike.setmyLike();
        photoModule.setMyValue();
        photoModule.setMyLikeValue();
        res.render('template', { li_1, li_2, util_1, util_2, data: util_1, latestResults: latestRows, likeResults: likeRows, text , page:paramPage});

    });
    });

});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/sign_up', (req, res) => {
    res.render('sign_up');
});

app.get('/404', (req, res) => {
    res.render('404');
});

app.get('/mypage', (req, res) => {

    if(!req.session.isLogined) {
        res.redirect('/login');
        return;
    }

    const page = req.query.page;
    if (req.session && req.session.user && req.session.user.id) {
        sessionId = req.session.user.id;
        sessionPwd = req.session.user.password;
        
    }

    res.render('mypage', {sessionId, sessionPwd ,page:page});
});

app.get('/upload', (req, res) => {

    if(!req.session.isLogined) {
        res.redirect('/login');
        return;
    }

    res.render('upload');
});

app.get('/update', (req, res) => {

    if(!req.session.isLogined) {
        res.redirect('/login');
        return;
    }

    res.render('update');
});

app.get('/logout', function (req, res) {
    if (util_2 === 'Logout' && req.session.isLogined) {
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

});

//===== 404 오류 페이지 처리 =====//
const errorHandler = expressErrorHandler({
    static: {
        '404': './views/404.ejs'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//==== 서버 시작 ====//
http.createServer(app).listen(app.get('port'), function() {
    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
    
});
