const tools = require('../utils/tools')

const isSignin = async function(req,res,next){
    // console.log(123)
    // 1-----------------------------------------
    // console.log(req.session.username)
    // let token = req.session.username
    // 2-------------------------------------------
    res.set('Content-Type','application/json;charset=utf-8')
    // console.log(req.path,req.get('X-Access-Token'))
    // let token = req.get('X-Access-Token')
    console.log(req.cookies)
    let {token,username} = req.cookies
    let decoded = await tools.verifyToken(token)
    
    if(token){
        if(req.path === '/isSignin'){
            res.render('succ', {
                data : JSON.stringify({
                    // username:decoded.username
                    username
                })
            })
        }else{
            
            // 2------------------------------
             if(decoded){
                next()
            }else{
                res.render('fail', {
                    data : JSON.stringify({
                        message:'token 验证失败'
                    })
                })
            }
            // 1----------------------------------
            // next()
        }
    }else{
        res.render('fail', {
            data : JSON.stringify({
                message:'没有权限'
            })
        })
    }
}

module.exports = isSignin