import homeView from '../views/home.art'
// import '../../styles/home.scss'
// import  'element-ui';

export const home = (req,res,next)=>{
    res.render(homeView())
}