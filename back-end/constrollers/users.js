const userModel = require('../modules/usersMod');
const tools = require('../utils/tools')
var nodemailer  = require('nodemailer');  //邮箱验证
var authMiddleware = require('../middleware/auth')


var mailTransport = nodemailer.createTransport({
    service: 'qq',
    host : 'localhost',
    port: 3000,
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth : {
        user : '498438997@qq.com',
        pass : 'ycelzadsdfcrbijd'
    },
  });

const usersignup = async function(req, res, next) {
    res.set('Content-Type','application/json;charset=utf-8')
    let {username,password,email} = req.body
    let hash = await tools.hash(password)
    let result = await userModel.save({
        username,
        password:hash,
        email : email
    });
    
    if(result){
        res.render('succ', {
            data : JSON.stringify({
                message: '注册成功'
            })
        })
    }else{
        res.render('fail', {
            data : JSON.stringify({
                message: '注册失败'
            })
        })
    }
}

const hasUsername = async function(req, res, next) {
    res.set('Content-Type','application/json;charset=utf-8')
    let {username} = req.body
    let result = await userModel.findOne({username})
    // console.log(result)
    console.log(req.body,result)
    if(result){
        res.render('fail', {
            data : JSON.stringify({
                message: '用户名已存在',
            })
        })
    }else{
        next()
    }
}

const userslogin = async function(req,res,next){
    res.set('Content-Type','application/json;charset=utf-8')
    let {username,password} = req.body
    console.log(username)
    let result = await userModel.findOne({username})
    if(result){
        let compareResult = await tools.compare(password,result.password)
        if(compareResult){
            let token = await tools.getToken(username)
            // res.set('X-Access-Token',token)
            // req.session.username = username;
            // console.log(req.session,1)
            res.cookie('token',token)
            res.cookie('username',username)
            res.render('succ', {
                data : JSON.stringify({
                    message: `欢迎${result.username}`,
                    username:result.username
                })
            })
        }else{
            res.render('fail', {
                data : JSON.stringify({
                    message: '账号或密码不对'
                })
            })
        }
    }else{
        res.render('fail', {
            data : JSON.stringify({
                message: '账号或密码不对'
            })
        })
    }
}

const isSignin = authMiddleware

const signout = function(req, res, next) {
    // req.session = null
    // console.log(res.cookies.token)
    res.cookie('token','')
    res.cookie('username','')
    res.set('Content-Type','application/json;charset=utf-8')
    res.render('succ', {
      data: JSON.stringify({
        message: '注销成功.'
      })
    })
  }

function create(){
    return Math.random().toString();
}

const email = function(req,res,next){
    let longVerify = create();
    console.log(longVerify)
    let verify = longVerify.substring(3,7);
    let{ email } = req.body;
    console.log(verify)
    // req.session.verify = verify;
    // 1366045238@qq.com
    var mailOptions = {
        from: '498438997@qq.com', // 发送者
        to: email, // 接受者,可以同时发送多个,以逗号隔开
        subject: '欢迎您注册猫眼管理系统', // 标题
        //text: 'Hello world', // 文本
        html: `<h2>123</h2>`,
        attachments:[
          {
            filename : 'content',
            content : verify
          }
        ]
      };
      mailTransport.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          return;
        }
        back();
      })
      function back(){
        res.set('Content-Type','application/json;charset=utf-8')
        res.render('succ', {
            data: JSON.stringify({
              message: longVerify
            })
          })
       
      }
      
}

module.exports = {
    usersignup,
    hasUsername,
    userslogin,
    isSignin,
    signout,
    email
}