import '../../styles/users.scss'
import UsersView from '../views/posUsers.art'
import httpModel from '../models/http'
//用户数据加载
export const users = async (req,res,next)=>{
    let result = await httpModel.get({
        url:'api/position/findusersAll'
    })
    if(result.res){
        res.render(UsersView({
            List:result.data.list
        }))
        // initializeJS();
    }else{
        res.go('/home')
    }
   
}