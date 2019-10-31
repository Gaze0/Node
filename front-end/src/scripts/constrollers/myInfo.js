import myInfoView from '../views/myInfo.art'

// import '../../assets/libs/tou-custom_up_img.css'
// import '../../assets/libs/tou-amazeui.min.css'
// import '../../assets/libs/tou-amazeui.cropper.min.css'
// import '../../assets/libs/tou-font-awesome.min.css'
export const myInfo = (req,res,next)=>{
    res.render(myInfoView())
}