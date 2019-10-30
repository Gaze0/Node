const positionModul = require('../modules/position');
const userModel = require('../modules/usersMod');

const findAll = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8')
    let data = await positionModul.findAll()
    if(data){
        res.render('succ',{
            data:JSON.stringify({
                list:data
            })
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({
                list:[]
            })
        })
    }
}

const findOne = async (req,res,next)=>{
    res.set('Content-Type','application/json;charset=utf-8')
    let id = req.query.id
    console.log(id)
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
    // console.log(req.body)
    let data = req.body
    data.score = 9.3;
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
    let id = req.body.id
    console.log(id)
    let result = await positionModul.remove(id)
    console.log(result)
    if(result){
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