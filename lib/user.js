const db = require('./db');

// 사용자 인증
exports.authUser = function(id, password, callback) {
    console.log('authUser 호출됨.');
    
    db.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); 
            }
            callback(err, null);
            return;
        }

        const columns = ['id', 'password'];
        const tablename = 'users';
        
        const exec = conn.query("select ?? from ?? where id = ? and password = ?" ,
                             [columns, tablename, id, password], function(err, rows) {
            conn.release();
            
            if(rows && rows.length > 0) {
                console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
                callback(null, rows);
                return id;
            } else {
                console.log("일치하는 사용자를 찾지 못함.");
                callback(null, null);
            }
        });
    });
}

// 사용자 등록
exports.addUser = function(id, password, callback) {
    console.log('addUser 호출됨.');
    
    db.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }

        const data = {id:id, password:password};
        
        const exec = conn.query('insert into users set ?', data, function(err, result) {
            conn.release();
            console.log('실행 대상 SQL : ' + exec.sql);
            
            if(err) {
                console.log('SQL 실행 시 오류 발생함.');
                console.dir(err);
                callback(err, null);
                return;
            }
            
            callback(null, result);
        });
    });
}

// 사용자 정보 수정
exports.updateUser = function(sessionId, id, password, callback) {
    console.log('updateUser 호출됨.');
    
    db.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); 
            }
            callback(err, null);
            return;
        }
        
        const data = {id:id, password:password};

        const exec = conn.query('update users set ? where id = ?', [data, sessionId], function(err, result) {
            
            if(err) {
                console.log('SQL 실행 시 오류 발생함.');
                console.dir(err);
                callback(err, null);
                return;
            }
            
            const exec2 = conn.query('update likes set user_id = ? where user_id = ?', [id, sessionId], function(err, result) {

                if(err) {
                    console.log('SQL 실행 시 오류 발생함.');
                    console.dir(err);
                    callback(err, null);
                    return;
                }
                const exec3 = conn.query('update photos set writer = ? where writer = ?', [id, sessionId], function(err, result) {
                    conn.release();
                    
                    if(err) {
                        console.log('SQL 실행 시 오류 발생함.');
                        console.dir(err);
                        callback(err, null);
                        return;
                    }
                    
                    callback(null, result);
                });
            });

        });
    });
}

// 회원 탈퇴
exports.withdrawal = function(id, password, callback) {
    console.log('withdrawal 호출됨.');

    db.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); 
            }
            callback(err, null);
            return;
        }

        const tablename = 'users';
        
        const exec = conn.query("delete from ?? where id = ? and password = ?" ,
                             [tablename, id, password], function(err, rows) {

            console.log('실행 대상 SQL : ' + exec.sql);
            
            const exec2 = conn.query('delete from likes where user_id = ?', [id], function(err, rows) {

                if(err) {
                    console.log('SQL 실행 시 오류 발생함.');
                    console.dir(err);
                    callback(err, null);
                    return;
                }
                const exec3 = conn.query('delete from photos where writer = ?', [id], function(err, rows) {
                    conn.release(); 
                    
                    if(err) {
                        console.log('SQL 실행 시 오류 발생함.');
                        console.dir(err);
                        callback(err, null);
                        return;
                    }
                    
                    callback(null, rows);
                });
            });

        });
    });
}