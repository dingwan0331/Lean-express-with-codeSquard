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