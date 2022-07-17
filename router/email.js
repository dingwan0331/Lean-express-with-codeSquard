const express    = require('express');
const router     = express.Router(); // express의 Router 메서드
const path       = require('path');  // 상대경로를 사용하기위해 path 모듈 불러오기
const mysql      = require('mysql')

const connection = mysql.createConnection({ // mysql 과 연동할 기본 셋팅들을 인자로 넣어준다.
    host     : 'localhost',       // mysql end-point 지금은 local 환경의 mysql을 사용하기에 localhost로 적었다.
    port     : '3306',            // mysql default port number
    user     : 'root',            // mysql 의 유네임을 넣어준다.
    password : '',                // mysql 의 pw를 넣어줘야하지만 외부 모듈 + gitignore 관리를 배우기전까지 공백으로 유지할 예정이다.
    database : 'express_example'  // 사용할 schema를 입력
  });
   
router.get('', function(req, res){
    res.sendFile(path.join(__dirname, '../public/email.html'))
  })
  
router.post('/send',  function(req, res){
    res.render('email.ejs',{'email' : req.body.email})
})

router.post('/ajax',function(req, res){
    const email = req.body.email;
    let responseData = {};
    const query = connection.query(`select name from users where email = "${email}"`,
    function(err, rows){
      try{
        if (err) throw err;
        if (rows[0].name) {
          responseData.message = 'Success';
          responseData.name    = rows[0].name;
        } else {
          responseData.message = 'There Are No Matched'
        }
      }
      catch(err) {
        responseData.message = 'SQL Syntax Error'
      }
      res.json(responseData)
    })
  })

module.exports = router;