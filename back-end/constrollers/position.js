const positionModul = require('../modules/position')
const userModel = require('../modules/usersMod')
const fs = require('fs')
const path =require('path')
const moment = require('moment')
const findAll = async (req,res,next)=>{
    // res.writeHeader(200,{
    //     'Content-Type':'application/json;charset=utf-8',
    //     'Access-Control-Allow-Origin': '*'
    // })
    res.set('Content-Type','application/json;charset=utf-8')
    let pageInfo = req.query
    let data = await positionModul.findAll(pageInfo)
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

const findOne = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8')
    let id = req.query.id
    let result = await positionModul.findOne(id)
    if(result){
        res.render('succ',{
            data:JSON.stringify(result)
        })
    }else{
        res.render('fail',{
            data:JSON.stringify(result)
        })
    }
}

const findusersAll = async (req,res,next)=>{
    let result = await userModel.findAll();
    res.set('Content-Type','application/json;charset=utf-8')
    res.render('succ',{
        data:JSON.stringify({
            list:result
        })
    })
}

const save = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8')
    let data = req.body
    console.log(data)
    data.score = (Math.random()*5+5).toFixed(1)
    data.poster = req.filename
    let now = moment().format("YYYYMMDD")
    console.log(now)
    let showmovietime =req.body.showtime
    showmovietime = showmovietime.replace(/-/g,'')
    if(now>=showmovietime){
        data.globalReleased = true
    }else{
        data.globalReleased = false
    }
    let result = await positionModul.save(data)
    if(result){
        res.render('succ',{
            data:JSON.stringify({
                message:'添加数据成功'
            })
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'添加数据失败'
            })
        })
    }

}


const update = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8')
    let data = req.body
    if(req.filename == ''){
        delete data.poster
    }else{
        data.poster = req.filename
    }
    console.log(req.body)
    let result = await positionModul.update(data)
    if(result){
        res.render('succ',{
            data:JSON.stringify({
                message:'修改数据成功'
            })
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'修改数据失败'
            })
        })
    }
}

const remove = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8')
    let { id , poster} = req.body
    let result = await positionModul.remove(id)
    console.log(result)
    if(result){
        fs.unlink(path.resolve(__dirname,'../public/upload/'+ poster),(err)=>{
            if(err){
                console.log(err.message)
            }
        })
        res.render('succ',{
            data:JSON.stringify(({
                message:'删除成功'
            }))
        })
    }else{
        res.render('fail',{
            data:JSON.stringify(({
                message:'删除失败'
            }))
        })
    }
}


const search = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8')
    let { keyword } = req.body
    let result = await positionModul.search(keyword)
    if(result){
        res.render('succ',{
            data:JSON.stringify(({
                list:result
            }))
        })
    }else{
        res.render('fail',{
            data:JSON.stringify(({
                list:[]
            }))
        })
    }
}

module.exports = {
    findAll,
    findusersAll,
    save,
    update,
    findOne,
    remove,
    search
}