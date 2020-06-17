const express = require('express')
const app = express()
const port = 5000 
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

//bodyparser: 클라이언트에서 오는 정보를 서버에서 분석해서 가져올수있게 해주는 것
//application/x-www-form-urlencoded 분석
app.use(bodyParser.urlencoded({extended: true}));
//application/json 분석해서 가져올 수 있게
app.use(bodyParser.json());

const mongoose = require('mongoose')
//mongodb연결
mongoose.connect(config.mongoURL, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))




app.get('/', (req, res) => res.send('Hello World! 안녕하세요!!'))


app.post('/register', (req, res) => {

    //회원 가입 할때 필요한 정보들을 Client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다

        const user = new User(req.body)

        user.save((err, userInfo) => {
            if(err) return res.json({ success: false, err})
            return res.status(200).json({
                success: true
            })
        })
})



app.listen(port, () => console.log('Example app listening on port ${port}!'))
