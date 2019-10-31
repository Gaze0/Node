import * as position from '../constrollers/position'
import * as users from '../constrollers/users'
import * as myInfo from '../constrollers/myInfo'

import { home } from '../constrollers/home'
import titleView from '../views/title.art'
import SMERouter from 'sme-router'

const router = new SMERouter('content')

router.use((req)=>{
    let hasSearchUrl = req.url
    let re = /^\/Forms1$|(\/Forms1\?+)|(\Forms1_list\/+)/
    if(re.test(hasSearchUrl)){
        $('#top_menu').show();
    }else{
        $('#top_menu').hide();
    }
    // window.onresize = function(){
    //     if( $('.move-bg').height()<$('body').height()){
    //         $('.move-bg').height($('body').height())
    //     }
    // }
    let url = req.url.slice(1).split('/')[0].split('?')[0].split('_')[0]
    let BreadcrumbMap = {
        'home':{
            level1:'首页',
            level2:'首页'
        },
        'Forms1':{
            level1:'首页',
            level2:'电影管理'
        },
        'Users':{
            level1:'首页',
            level2:'账号管理'
        },
        'myInfo':{
            level1:'首页',
            level2:'个人信息'
        }
    }
    let TitleMap = {
        'home': {
            title: '首页',
          },
        'Forms1': {
            title: '电影管理',
        },
        'Users':{
            title: '账号管理',
        },
        'myInfo':{
            title:'个人信息'
        }
    }
    let LogoMap = {
        'home': {
            logo: 'fa-laptop',
          },
        'Forms1': {
            logo: 'fa-file-text-o',
        },
        'Users':{
            logo: 'fa-list-alt',
        },
        'myInfo':{
            logo:'fa-user-md'
        }
    }
    let html = titleView({
        breadcrumb:BreadcrumbMap[url],
        Title:TitleMap[url],
        Logo:LogoMap[url]
    })
    $('.content-head').html(html)
})

window.router = router

router.route('/home',home)

router.route('/Forms1',position.form1)

router.route('/Forms1_update',position.update)

router.route('/Forms1_add',position.add)

router.route('/Forms1_list/:page',position.form1)


// router.route('/Forms1_delete',position.remove)

router.route('/myInfo',myInfo.myInfo)

router.route('/Users',users.users)

router.route('*',(req,res,next)=>{
    res.redirect('/home')
})

export default router