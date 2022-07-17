const express = require('express')  // require = node_module에 있는 함수를 불러오는 함수
const app = express()    // express는 함수를 가르키지만 실행은 하지않는다 app에 express뒤에 () 붙인 실행형을 할당
const port = 3000 // 포트넘number를 변수에 담았다.
const bodyParser = require('body-parser') // node_modules의 body-parser를 가져온다
const mysql = require('mysql') // mysql 불러오기
const { response } = require('express')
const connection = mysql.createConnection({ // mysql 과 연동할 기본 셋팅들을 인자로 넣어준다.
  host     : 'localhost',       // mysql end-point 지금은 local 환경의 mysql을 사용하기에 localhost로 적었다.
  port     : '3306',            // mysql default port number
  user     : 'root',            // mysql 의 유네임을 넣어준다.
  password : '',                // mysql 의 pw를 넣어줘야하지만 외부 모듈 + gitignore 관리를 배우기전까지 공백으로 유지할 예정이다.
  database : 'express_example'  // 사용할 schema를 입력
});

connection.connect() // db 연결!

// GET 메서드를 통해 들어온 요청 req, res는 request & response
// res.send 메세지를 response로 날린다!
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// listen = 3000이란 포트로 요청을 받는다 == 서버를 실행한다.
// 안에 있는 콘솔로그는 서버 구동 콘솔에 뜬다.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// 기본적인 url 라우터
// sendFile() = 브라우저에 나의 파일을 보내준다.이 안에는 파일의 경로가 필요하다.
// __dirname = express에서 지원하는 기능으로 나의 app 경로를 문자열 형태로 반환한다.
// res.send와 res.sendFile 을 동시에 쓰면 오류가난다 예상으로는 res.send를 사용하면 자동으로 index.html or index.js를 같이 주는데 
// sendFile의 main.html 파일과 두개가 보내져 오류를 일으키는 것 같다.
// app.get의 첫 인자로 배열을 넣으면 여러개의 url을 한군데로 처리가 가능하다.
app.get(['/1','/main'], function(req, res){
   res.send('<h1>Hi!!!!!</h1>')
  //res.sendFile(__dirname + '/public/main.html')
})

// 스태틱파일 등록하기
// express.static('public') = public dir을 스태틱 함수에 넣어준다.
app.use(express.static('public'))
// bodyParser를 express에서 사용할꺼다! json 형태의 데이터를!
app.use(bodyParser.json())
// bodyParser를 express에서 사용할꺼다! json 말고 다른형태인데.. 인코딩도 해줘...
app.use(bodyParser.urlencoded({extended:true}))
// 내 view engine은 ejs라는 셋팅을 해준다 use vs set
app.set('view engine', 'ejs')

app.get('/email', function(req, res){
  res.sendFile(__dirname + '/public/email.html')
})

// post 에서 body값을 뽑아 내려면 body-parser를 설치해야한다!
app.post('/email_post', function(req, res){
  // 리퀘스트의 바디의 email키값을 가진 value를 보내준다
  //res.send(req.body.email)
  // render를 사용하여 email.ejs 에서 ejs문법에 해당하는 키에 대한 밸류를 설정해준다.
  // 2번째 인자는 object 타입으로 해당 키값에 대한 밸류를 설정해준다.
  res.render('email.ejs',{'email' : req.body.email})
})

app.post('/ajax-send-email',function(req, res){
  const email = req.body.email;
  let responseData = {};
  //const query = connection.query('select * from users',
  const query = connection.query(`select name from users where email = "${email}"`,
  function(err, rows){
    // err가 발생하지 않으면 err = None
    // err가 발생하지 않으면 rows = []
    try{
      if (err) throw err; // throw = 예외 발생시키기 raise 와같다
      // rows 의 리턴값은 [ RowDataPacket { name: '정진관' } ] 0번 인덱스에 접근 해줘야 한다.
      if (rows[0].name) {
        responseData.message = 'Success';
        responseData.name    = rows[0].name;
      } else {
        responseData.message = 'There Are No Matched'
      }
    }
    catch(err) {   // 예외처리! message에 SQL Syntax Error 반환
      responseData.message = 'SQL Syntax Error'
    }
    res.json(responseData)
  })
})

// step1 예제 
// ejs 내에서 주석 처리할때 html 문법이 아닌 ejs 문법에 기반하여 하여야 한다.. 아니면 오류가 난다...
// app.post('/ajax-send-email', function(req, res){
  // console.log(req.body.email) // 콘솔에 req의 body에 있는 email 찍어보기
//  response로 보낼 object형식의 데이터를 변수에 담기
  // const responseData = {'result' : 'Success', 'email' : req.body.email}
  // res.json(responseData)  // object 형식의 데이터를 json으로 변환
// })