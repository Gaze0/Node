import announcementView from '../views/announcement.art'
import '../../styles/announcement.scss'
// import messageRecordView from '../views'
// import  'element-ui';
import httpModel from '../models/http'
import http from '../models/http'

export const announcement = async (req,res,next)=>{
    let result = await httpModel.get({
        url:'/api/message',
        data:{
            start:0,
            count:5
        }
    })
    console.log(result)
    if(result.res){
        let list= result.data
        // res.render(announcementView({}))
        res.render(announcementView({
            list
        }))
        $('.summernote').summernote({
            height: 250,
            tabsize: 2,
            lang: 'zh-CN'
        });
        $('.note-statusbar').hide()
    
        //发布公告
        var socket = io.connect('http://10.9.49.161:3000');
        $('.btn-lg').on('click',async function(){
            let msg2 = $('.note-editable.panel-body').html()
            await socket.emit('receive', msg2)
            res.go('/announcement'+'?r='+ new Date().getTime())
        })
    
        $('.del').on('click',function(){
            _handleDelClick(this,res)
        })
    }else{
        res.go('/home')
    }
    

}
async function _handleDelClick(obj,res){
    let id = $(obj).attr('data-id')
    console.log(id)
    let result = await httpModel.post({
        url:'/api/message',
        type:'delete',
        data:{
            id
        },

    })
    if(result){
        res.go('/announcement/' + '?t=' + (new Date().getTime()))
    }
}