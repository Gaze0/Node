
const messageModul = require('../modules/message')

const findAll = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8')
    let pageInfo = req.query
    let data = await messageModul.findAll(pageInfo)
    if(data){
        res.render('succ',{
            data:JSON.stringify(data)
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({})
        })
    }
}

const remove = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8')
    let id = req.body.id
    let data = await messageModul.remove(id)
    if(data){
        res.render('succ',{
            data:JSON.stringify({
                message:'删除成功'
            })
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'删除失败'
            })
        })
    }
}

module.exports = {
    findAll,
    remove
}