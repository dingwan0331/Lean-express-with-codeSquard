const express    = require('express')  // require = node_module에 있는 함수를 불러오는 함수
const app        = express()    // express는 함수를 가르키지만 실행은 하지않는다 app에 express뒤에 () 붙인 실행형을 할당
const port       = 3000 // 포트넘number를 변수에 담았다.
const bodyParser = require('body-parser') // node_modules의 body-parser를 가져온다
const path       = require('path')
const router     = express.Router()

// router
const main  = require('./main')
const email = require('./email')

app.use('/main', main)
app.use('/email', email)

router.get('', function(req, res){
    res.sendFile(path.join(__dirname, '../public/main.html'))
})

module.exports = router;