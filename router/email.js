const express = require('express');
const router  = express.Router(); // express의 Router 메서드
const path    = require('path');  // 상대경로를 사용하기위해 path 모듈 불러오기
const mysql   = require('mysql')
const dotenv  = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,   
    user     : process.env.MYSQL_USERNAME,   
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_SCHEMA_NAME
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