import homeView from '../views/home.art'
import '../../styles/home.scss'
// import  'element-ui';

export const home = (req,res,next)=>{
    res.render(homeView())
    $('.more').on('click',function(){
        alert('没登录去登陆，登陆了看左边')
    })
}