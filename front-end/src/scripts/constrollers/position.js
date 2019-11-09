import movieListView from '../views/movieList.art'
import httpModel from '../models/http'
import movieAddView from '../views/movieAdd.art'
// import '../../styles/movie.scss'
import movieUpdateView from '../views/movieUpdate.art'
// import layoutView from '../views/layout.art'
import _ from 'lodash'


let count = 5;
//添加界面加载
function _handleAddClick(res){
    $('#add-btn').on('click',()=>{
        res.go('/Forms1_add')
    })
}


function _handleUpdateClick(res,obj){
    let id = $(obj).data('id')
    res.go('/Forms1_update',{id})
}

async function _handleDeleteClick(req,res,obj){
    let id = $(obj).data('id')
    let poster = $(obj).data('poster')
    let result = await httpModel.post({
        url:'/api/position',
        type:'delete',
        data:{
            id,
            poster
        }
    })
    if(result.res){
        res.go('/Forms1_list/' + req.params.page+ '?t=' + (new Date().getTime()))
    }
}

async function _handleSearch(req,res,key){
    if(key ===''){
        res.go('/Forms1_list/1'+'?t=' + new Date().getTime())
        return 
    }
    let result = await httpModel.post({
        url:'/api/position/search',
        data:{
            keyword:key
        }
    })
    if(result.res){
        res.render(movieListView({
            list:result.data.list,
            from:'search'
        }))
        $('.movie-delete').on('click',function(){
            _handleDeleteClick(req,res,this)
        })
    }else{
        res.go('/Forms1')
    }
}

export const form1 = async (req,res,next)=>{
    // console.log(req)
    let startPage = ~~req.params.page || 1
    let result = await httpModel.get({
        url:'api/position',
        data:{
            start:(startPage-1)*count,
            count
        }
    })
    
    // console.log(result)
    let pageCount = _.range(1,Math.ceil(result.data.total/count)+1)
    if(result.res){
        if(result.data.list.length ===0 &&startPage>1){
            res.go('/Forms1_list/' + (startPage-1))
        }
        res.render(movieListView({
            list : result.data.list,
            pageCount,
            fromm:'form1',
            startPage
        }))
        //添加
        _handleAddClick(res)
    }else{
        res.go('/home')
    }
    // console.log(result)
    //更改
    $('.movie-update').on('click',function(){
        _handleUpdateClick(res,this)
    })
    //删除
    $('.movie-delete').on('click',function(){
        _handleDeleteClick(req,res,this)
    })

    //搜索
    $('body').on('keyup','.form-control',(e)=>{
        if(e.keyCode===13){
            _handleSearch(req,res,e.target.value)
        }
    })

    //分页
    $('.paging a.page-num').on('click',function(){
        _headlePageNumberClick(req,res,this)
    })

    $('.paging a.page-prev').on('click',function(){
        _headlePageNumberClick(req,res,this,'prev')
    })
    $('.paging a.page-next').on('click',function(){
        _headlePageNumberClick(req,res,this,'next',pageCount)
    })
}

function _headlePageNumberClick(req,res,obj,type,pageCount){
    // console.log(form1)
    // form1(req,res,next,~~$(obj).text())
    // console.log(type)
    if(type){
        let page = ~~req.params.page
        if(type==='prev'&&page>1){
            res.go('/Forms1_list/'+(page-1))
        }else if(type === 'next'&&page<pageCount.length){
            res.go('/Forms1_list/' +(page+1))
        }
    }else{
        res.go('/Forms1_list/'+ ~~$(obj).text())
    }
}



//添加
// async function _handleSaveClick(){
//     let data = $('#add-form').serialize()
   
    
//     // let result = await httpModel.post({
//     //     url:'/api/position',
//     //     data
//     // })
//     // if(result.res){
//     //     $('#add-form')[0].reset()
//     // }else{
//     //     alert(result.data)
//     // }
    
// }

export const add = async (req,res,next)=>{
    res.render(movieAddView())

    $('.add-cancel').on('click',function(){
        res.back()
    })
    
    //添加
    await $('#add-form').ajaxForm({
        // console.log(0)
        resetForm:true
    })
    
    // $('.save-btn').on('click',_handleSaveClick)
}


//更新
export const update = async (req,res,next)=>{
    let id = req.body.id
    let result = await httpModel.get({
        url:'/api/position/findOne',
        data:{
            id
        }
    })
    res.render(movieUpdateView({
        list:result.data
    }))
    // let $form = $('#update-form')
    // $('.save-btn').on('click',async ()=>{
    //     let data = $form.serialize()
    //     let result = await httpModel.post({
    //         url: '/api/position',
    //         type:'PATCH',
    //         data:data +'&id=' +id,
    //     })
    //     if(result.res){
    //         res.go('/Forms1')
    //     }else{
    //         alert(result.data.message)
    //     }
    // })
    $('#update-form').ajaxForm({
        resetForm:true,
        dataType:'json',
        url:'/api/position',
        method:'patch',
        success:(result)=>{
            if(result.res){
                res.back()
            }else{
                alert(result.data.memsage)
            }
        }
    })
    $('.update-cancel').on('click',function(){
        res.back()
    })
}
