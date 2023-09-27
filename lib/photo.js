const db = require('./db');

exports.loadPhoto = function(no, callback) {
    console.log('loadPhoto 호출됨.');
    
    db.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }
        
        const columns = ['title', 'content', 'writer', 'like', 'date', 'img', 'no'];
        const tablename = 'photos';
        
        const exec = conn.query("select ?? from ?? where no = ?" ,
                             [columns, tablename, no], function(err, rows) {
            conn.release();
            
            if(err) {
                console.log('SQL 실행 시 오류 발생함.');
                console.dir(err);
                callback(err, null);
                return;
            }

            if(rows && rows.length > 0) {
                callback(null, rows);
            } else {
                callback(null, rows);
            }

        });
    });
}

// 포토 등록
exports.addPhoto = function(title, content, writer, like, image, callback) {
    console.log('addPhoto 호출됨.');
    
    db.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); 
            }
            callback(err, null);
            return;
        }
        
        const date = new Date();
        const data = {title:title, content:content, writer:writer, like:like, date:date, img:image};
        
        const exec = conn.query('insert into photos set ?', data, function(err, result) {
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

// 포토 삭제
exports.deletePhoto = function(no, callback) {
    console.log('deletePhoto 호출됨.');
    
    db.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }
            
            callback(err, null);
            return;
        }

        const exec2 = conn.query('delete from photos where no = ?', [no], function(err, result) {
            conn.release();
            console.log('실행 대상 SQL : ' + exec2.sql);
            
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

// 포토 검색
exports.searchPhoto = function(sessionId, page ,title, callback) {
    console.log('searchPhoto 호출됨.');

    db.getConnection(function(err, conn) {

        if (err) {
            if (conn) {
                conn.release(); 
            }
            callback(err, null);
            return;
        }

        let offset = 0;
        let limit = 3; // 한 번에 로드할 포토 개수

        if(page <= 1) {
            page = 1;
            limit = 3;
        } else {
            limit = 4;
        }
        offset = (page - 1) * limit;

        const columns = ['title', 'content', 'writer', 'like', 'date', 'img', 'no'];
        const tablename = 'photos';

        const exec = db.query("SELECT photo_no FROM likes WHERE user_id = ?", [sessionId], function(err, rows) {
    
            if (err) {
                console.error('쿼리 실행 중 오류 발생:', err);
                callback(err, null);
                return;
            }
    
            const exec2 = conn.query("SELECT ?? FROM ?? WHERE title LIKE ? ORDER BY date DESC LIMIT ? OFFSET ?",
            [columns, tablename, `%${title}%`, limit, offset], function(err, rows) {

            if (err) {
                console.error('쿼리 실행 중 오류 발생:', err);
                callback(err, null);
                return;
            }

            conn.release();
            
            if(rows && rows.length > 0) {
                photoNos = rows.map(row => row.photo_no);

                for (const row of rows) {
                    const imgBuffer = row.img; 
    
                    if (imgBuffer && imgBuffer.length > 0) {
                        row.imgBase64 = Buffer.from(imgBuffer).toString('base64');
                    }
                    row.isLiked = photoNos.includes(row.no);
                }
                callback(null, rows);
            } else {
                console.log("일치하는 포토를 찾지 못함.");
                callback(null, null);
            }
            });
        });
    });
}

let myLikeValue = false;

exports.myLike = function(sessionId, page, callback) {

    db.getConnection(function(err, conn) {

        if (err) {
            if (conn) {
                conn.release();
            }
            callback(err, null);
            return;
        }

        let offset = 0;
        let limit = 3; 

        if(page <= 1) {
            page = 1;
            limit = 3;
        } else {
            limit = 4;
        }
        offset = (page - 1) * limit;

        const exec = db.query("SELECT photos.* FROM likes INNER JOIN photos ON likes.photo_no = photos.no WHERE likes.user_id = ? ORDER BY date DESC LIMIT ? OFFSET ?", [sessionId,limit,offset], function(err, rows) {
    
            if (err) {
                console.error('쿼리 실행 중 오류 발생:', err);
                callback(err, null);
                return;
            }

            if (rows && rows.length > 0) {
                photoNos = rows.map(row => row.photo_no);
                for (const row of rows) {
                    const imgBuffer = row.img;
    
                    if (imgBuffer && imgBuffer.length > 0) {
                        row.imgBase64 = Buffer.from(imgBuffer).toString('base64');
                    }
                    row.isLiked = true;
                    myLikeValue = true;
                }
                callback(null, rows);
            } else {
                callback(null, null);
            }

        });
    });
}

exports.getMyLikeValue = function() {
    return myLikeValue;
};
exports.setMyLikeValue = function() {
    return myLikeValue = false;
};

let myValue = false;

exports.my = function(sessionId, page, callback) {

    db.getConnection(function(err, conn) {

        if (err) {
            if (conn) {
                conn.release(); 
            }
            callback(err, null);
            return;
        }

        let offset = 0;
        let limit = 3; 

        if(page <= 1) {
            page = 1;
            limit = 3;
        } else {
            limit = 4;
        }
        offset = (page - 1) * limit;

        const exec = db.query("SELECT * FROM photos where writer = ? ORDER BY date DESC LIMIT ? OFFSET ?", [sessionId, limit, offset], function(err, rows) {
    
            if (err) {
                console.error('쿼리 실행 중 오류 발생:', err);
                callback(err, null);
                return;
            }

            if (rows && rows.length > 0) {
                photoNos = rows.map(row => row.photo_no);
                for (const row of rows) {
                    const imgBuffer = row.img; 
    
                    if (imgBuffer && imgBuffer.length > 0) {
                        row.imgBase64 = Buffer.from(imgBuffer).toString('base64');
                    }
                    row.isLiked = photoNos.includes(row.no);
                    myValue = true;
                }
                callback(null, rows);
            } else {
                console.log("일치하는 포토를 찾지 못함.");
                callback(null, null);
            }

        });
    });

}

exports.getMyValue = function() {
    return myValue;
};

exports.setMyValue = function() {
    return myValue = true;
};

// 포토 수정
exports.updatePhoto = function(title, content, no, callback) {
    console.log('addPhoto 호출됨.');
    
    db.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); 
            }
            callback(err, null);
            return;
        }
        const exec = conn.query('update photos set title = ?, content = ? where no = ?', [title, content, no], function(err, result) {
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
}

// 포토 좋아요
exports.likePhoto = function(user_id, no, callback) {
    console.log('likePhoto 호출됨.');
    
    db.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); 
            }
            callback(err, null);
            return;
        }

        data = {user_id : user_id, photo_no : no}

        // SQL문을 실행합니다.
        const exec = conn.query('insert into likes set ?;', [data], function(err, result) {
            
            if(err) {
                console.log('SQL 실행 시 오류 발생함.');
                console.dir(err);
                callback(err, null);
                return;
            }
            
            const exec2 = conn.query('UPDATE photos SET `like` = `like` + 1 WHERE no = ?', [no], function(err, result) {
                conn.release();
        
                if (err) {
                    console.log('SQL 실행 시 오류 발생함.');
                    console.dir(err);
                    callback(err, null);
                    return;
                }
                
                callback(null, result);
            });
        });


    });
}

// 포토 좋아요 취소
exports.cancellLikePhoto = function(no, callback) {
    console.log('cancellLikePhoto 호출됨.');

    db.getConnection(function(err, conn) {
        if (err) {
            if (conn) {
                conn.release(); 
            }
            callback(err, null);
            return;
        }
        
        const exec = conn.query('delete from likes where photo_no= ?', [no], function(err, result) {
            if(err) {
                console.log('SQL 실행 시 오류 발생함.');
                console.dir(err);
                callback(err, null);
                return;
            }
            
            const exec2 = conn.query('UPDATE photos SET `like` = `like` - 1 WHERE no = ?', [no], function(err, result) {
                conn.release(); 
        
                if (err) {
                    console.log('SQL 실행 시 오류 발생함.');
                    console.dir(err);
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        });

    });
}