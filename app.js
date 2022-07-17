const express = require('express')  // require = node_module에 있는 함수를 불러오는 함수
const app = express()    // express는 함수를 가르키지만 실행은 하지않는다 app에 express뒤에 () 붙인 실행형을 할당
const port = 3000 // 포트넘number를 변수에 담았다.

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
app.get(['/1','/main'], function(req, res){
  // res.send('<h1>Hi!!!!!</h1>')
  res.sendFile(__dirname + '/public/main.html')
})

// 스태틱파일 등록하기
// express.static('public') = public dir을 스태틱 함수에 넣어준다.
app.use(express.static('public'))