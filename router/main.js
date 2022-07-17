const express = require('express');
const app     = express();
const router  = express.Router(); // express의 Router 메서드
const path    = require('path');  // 상대경로를 사용하기위해 path 모듈 불러오기

router.get('', function(req, res){
    // path의 join메서드를 통하여 현재위치 정대경로 에서 상대경로로 다시 지정 (문자열을 합치는게 아닌 경로를 2번 사용하는느낌)
    res.sendFile(path.join(__dirname, '../public/main.html'))
})
// main.js 모듈화 아래와 같은 메서드를 사용하면 다른 곳에서 모듈처럼 사용이 가능하다.
module.exports = router;