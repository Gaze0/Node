import movieListView from '../views/movieList.art'
import myInfoView from '../views/myInfo.art'
import httpModel from '../models/http'
import movieAddView from '../views/movieAdd.art'
import '../../styles/movie.scss'
import movieUpdateView from '../views/movieUpdate.art'
// import layoutView from '../views/layout.art'

//添加界面加载
function _handleAddClick(res){
    $('#add-btn').on('click',()=>{
        res.go('/Forms1_add')
    })
}


function _handleUpdateClick(res,obj){
    // console.log(e)
    let id = $(obj).data('id')
    res.go('/Forms1_update',{id})
}

async function _handleDeleteClick(res,obj){
    let id = $(obj).data('id')
    let result = await httpModel.post({
        url:'/api/position',
        type:'delete',
        data:{
            id
        }
    })
    if(result.res){
        res.go('/Forms1?t=' + (new Date().getTime()))
    }
}

async function _handleSearch(res,key){
    let result = await httpModel.post({
        url:'/api/position/search',
        data:{
            keyword:key
        }
    })
    if(result.res){
        res.render(movieListView({
            list:result.data.list
        }))
    }else{
        res.go('/Forms1')
    }
}

export const form1 = async (req,res,next)=>{
    let result = await httpModel.get({
        url:'api/position'
    })
    // console.log(result)
    if(result.res){
        res.render(movieListView({
            list : result.data.list
        }))
        _handleAddClick(res)
    }else{
        res.go('/home')
    }
    $('.movie-update').on('click',function(){
        _handleUpdateClick(res,this)
    })
    // $('.movie-update').on('click',_handleUpdateClick.bind(this,event,res))
    $('body').on('click','.movie-delete',function(){
        _handleDeleteClick(res,this)
    })


    $('body').on('keyup','.form-control',(e)=>{
        if(e.keyCode===13){
            _handleSearch(res,e.target.value)
        }
    })
}

// //删除
// export const remove = async (req,res,next)=>{

// }



export const myInfo = (req,res,next)=>{
    res.render(myInfoView())
}



//添加
async function _handleSaveClick(){
    let data = $('#add-form').serialize()
    // console.log($('#add-form').serializeArray())
    // let dataArr = $('#add-form').serializeArray()
    // let flag = 1;
    // for(var i = 0;i<dataArr.length;i++){
    //     if(dataArr[i].name === ''){
    //         flag = 0;
    //     }
    // }
    
    let result = await httpModel.post({
        url:'/api/position',
        data
    })
    if(result.res){
        $('#add-form')[0].reset()
    }else{
        alert(result.data)
    }
    
}

export const add = (req,res,next)=>{
    res.render(movieAddView())

    $('.add-cancel').on('click',function(){
        res.go('/Forms1')
    })
    $('.save-btn').on('click',_handleSaveClick)
}


//更新
export const update = async (req,res,next)=>{
    let id = req.body.id
    // console.log(id)
    let result = await httpModel.get({
        url:'/api/position/findOne',
        data:{
            id
        }
    })
    res.render(movieUpdateView({
        list:result.data
    }))
    let $form = $('#update-form')
    // console.log(id)
    $('.save-btn').on('click',async ()=>{
        let data = $form.serialize()
        let result = await httpModel.post({
            url: '/api/position',
            type:'PATCH',
            data:data +'&id=' +id,
        })
        if(result.res){
            res.go('/Forms1')
        }else{
            alert(result.data.message)
        }
    })
    $('.update-cancel').on('click',function(){
        res.go('/Forms1')
    })
}
