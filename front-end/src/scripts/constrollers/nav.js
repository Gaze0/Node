import usersView from '../views/nav.art'
import httpModel from '../models/http'
import store from 'store'

class Users{
    constructor(){
        this.render();
        this.isSignin = false;
        this.username = ''
    }

    // getUsername(username){
    //     this.username = username
    // }

    async render(){
        await this.dealuser();
        let html = usersView({
            isSignin:this.isSignin,
            username:this.username
        })
        $('.users').html(html)
        // initializeJS();
        // this.changeUser(this.username)
        $('.log-out').on('click',this.signout)
    }
    async signout(){
        // let result = await httpModel.get({
        //     url: '/api/users/signout'
        // })
        // console.log(result)
        store.remove('token')
        // location.reload()
    }
    async dealuser(){
        let result = await httpModel.get({
            url: '/api/users/isSignin'
        })
        // console.log( result)
        // let username = result.data.username;
        // console.log(username)
        let username = result.data.username;
        this.isSignin = username ? true :false;
        this.username = username
    }
    
}

export default new Users()