const db = require('./db');
let offset = 0;

exports.loadPhotos = function(sessionId, page, callback) {
    console.log('loadPhotos 호출됨.');

    const columns = ['title', 'content', 'writer', 'like', 'date', 'img', 'no'];
    const tablename = 'photos';
    let limit = 3; // 한 번에 로드할 포토 개수

    if(page <= 1) {
        page = 1;
        limit = 3;
    } else {
        limit = 4;
    }
    offset = (page - 1) * limit;

    let photoNos = [];

    const exec = db.query("SELECT photo_no FROM likes WHERE user_id = ?", [sessionId], function(err, rows) {

        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            callback(err, null);
            return;
        }

        // rows에서 각 행의 photo_no 값을 photoNos 배열에 추가
        if (rows && rows.length > 0) {
            photoNos = rows.map(row => row.photo_no);
        }
        
        const exec2 = db.query("SELECT ?? FROM ?? ORDER BY date DESC LIMIT ? OFFSET ?", [columns, tablename, limit, offset], function(err, rows) {
    
            if (err) {
                console.error('쿼리 실행 중 오류 발생:', err);
                callback(err, null);
                return;
            }
    
            if (rows && rows.length > 0) {
                // 이미지 데이터를 추가로 불러옵니다.
                for (const row of rows) {
                    const imgBuffer = row.img; // 이미지 데이터
    
                    if (imgBuffer && imgBuffer.length > 0) {
                        // 이미지 데이터를 Base64 형태로 변환하여 추가
                        row.imgBase64 = Buffer.from(imgBuffer).toString('base64');
                    }

                    row.isLiked = photoNos.includes(row.no);
                }
    
                callback(null, rows);
            } else {
                console.log("일치하는 포토를 찾지 못함.");
                callback(null, []);
            }
        });
    });
};

exports.loadPhotos_like = function(sessionId, callback) {
    console.log('loadPhotos_like 호출됨.');

    const columns = ['title', 'content', 'writer', 'like', 'date', 'img', 'no'];
    const tablename = 'photos';

    let photoNos = [];

    const exec = db.query("SELECT photo_no FROM likes WHERE user_id = ?", [sessionId], function(err, rows) {

        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            callback(err, null);
            return;
        }

        // rows에서 각 행의 photo_no 값을 photoNos 배열에 추가
        if (rows && rows.length > 0) {
            photoNos = rows.map(row => row.photo_no);
        }

        const exec2 = db.query("SELECT ?? FROM ?? ORDER BY `like` DESC LIMIT 6", [columns, tablename], function(err, rows) {
            console.log('실행 대상 SQL : ' + exec2.sql);

            if (err) {
                console.error('쿼리 실행 중 오류 발생:', err);
                callback(err, null);
                return;
            }

            if (rows && rows.length > 0) {
                // 이미지 데이터를 추가로 불러옵니다.
                for (const row of rows) {
                    const imgBuffer = row.img; // 이미지 데이터

                    if (imgBuffer && imgBuffer.length > 0) {
                        // 이미지 데이터를 Base64 형태로 변환하여 추가합니다.
                        row.imgBase64 = Buffer.from(imgBuffer).toString('base64');
                    }
                    
                    // 해당 사진의 no 값이 photoNos 배열에 포함되어 있는지 확인하고 isLiked 속성 설정
                    row.isLiked = photoNos.includes(row.no);
                }

                callback(null, rows);
            } else {
                console.log("일치하는 포토를 찾지 못함.");
                callback(null, []);
            }
        });
    });
};
