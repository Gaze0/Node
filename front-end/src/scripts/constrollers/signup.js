import signupView from '../views/signup.art'
import '../../styles/signup.scss'
import httpModel from '../models/http'


class signup{
    constructor(){
        this.type = '';
        this.render();
    }
    render(){
        let that = this
        let html = signupView();
        $('.root').html(html)
        $('.btn-info,.btn-primary').on('click',function(){
            that.type = $(this).data('name')
        })
        $('.btn-primary').on('click',this.signinSubmit.bind(this))
        $('.btn-info').on('click',this.signupSubmit.bind(this))

        $('.back').on('click',function(){
            $('.email').css({
                display:'none'
            })
            $('.btn-info').attr('disabled',false)
            $(this).hide()
        })
    }
    signupSubmit(){
        $('.back').show()
        $('.email').css({
            display:'table'
        })
        $('.btn-info').attr('disabled',true)
        // $('.yan-btn').off('click');
        $('.yan-btn').off('click').on('click',this.sendEmail.bind(this))
        // var clock = '';
        // var nums = 30;
        // var btn;
        // function sendEmail(thisBtn) {
        //     btn = thisBtn;
        //     btn.disabled = true; //将按钮置为不可点击
        //     btn.value = '重新获取（' + nums + '）';
        //     clock = setInterval(doLoop, 1000); //一秒执行一次
        // }

        // function doLoop() {
        //     nums--;
        //     if (nums > 0) {
        //         btn.value = '重新获取（' + nums + '）';
        //     } else {
        //         clearInterval(clock); //清除js定时器
        //         btn.disabled = false;
        //         btn.value = '点击发送验证码';
        //         nums = 10; //重置时间
        //     }
        // }
        
    }
    async sendEmail(){
        $('.yan-btn').attr('disabled',true);
        $('.yan-btn').css({
            opacity:0.6
        })

        let email = $('.inp-email').val();
        let re = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(re.test(email)){
            let result = await httpModel.get({
                url:`/api/users/send`,
                type:'POST',
                data:{
                    email:email
                }
            })
            this.result = result;
            // console.log(1)
            // console.log(result)
            $('.btn-info').attr('disabled',false)
            $('.btn-info').off('click').on('click',this.regist.bind(this))
        }else{
            alert('budui')
            $('.yan-btn').attr('disabled',false);
            $('.yan-btn').css({
                opacity:1
            })
        }
        // if($('.yanzheng').val()!=''){
            // console.log($('.btn-info'))
           
        // }
    }

    async regist(){
        if($('input[type="password"]').val()===''){
            // console.log(9999)
            $("#modal-alert2").iziModal({
                title: "账号或密码错误",
                subtitle: '请您确认账号或密码重新重新输入',
                iconClass: 'icon-power_settings_new',
                headerColor: '#BD5B5B',
                width: 600
            });
            $('#modal-alert2').iziModal('open');
        }
        if($('input[name="username"]').val()===''){
            // console.log(88888)
            $("#modal-alert2").iziModal({
                title: "账号或密码错误",
                subtitle: '请您确认账号或密码重新重新输入',
                iconClass: 'icon-power_settings_new',
                headerColor: '#BD5B5B',
                width: 600
            });
            $('#modal-alert2').iziModal('open');
        }
        if($('input[type="password"]').val()!=''&&$('input[name="username"]').val()!=''){
            // console.log( $('.yanzheng').val(),(this.result.data.message.substring(3,7)))
            if($('.yanzheng').val()===(this.result.data.message.substring(3,7))){
                // console.log(789)
                let data = $('.form-control').serialize();
                console.log(data,this.type)
                let result = await httpModel.get({
                    url:`/api/users/${this.type}`,
                    type:'POST',
                    data,
                })
                console.log(result)
                this.handleSubmit(result)
    
            }else{
                // console.log('asf')
                $("#modal-alert4").iziModal({
                    title: "验证码错误",
                    subtitle: '请您重亲获取验证码',
                    iconClass: 'icon-power_settings_new',
                    headerColor: '#BD5B5B',
                    width: 600
                });
                $('#modal-alert4').iziModal('open');
                $('.yan-btn').attr('disabled',false);
                $('.yan-btn').css({
                    opacity:1
                })
            }
        }
        
    }
    async signinSubmit(){
        let data = $('.form-control').serialize();
        let result = await httpModel.get({
            url:`/api/users/${this.type}`,
            type:'POST',
            data,
        })
        this.handleSubmit(result)
    }
    handleSubmit(result){
        // console.log(this.type)
        if( this.type === "login"){
            if(result.res){
                window.location.href = 'index.html'
            }else{
                // alert(result.data.message)
                $("#modal-alert2").iziModal({
                    title: "账号或密码错误",
                    subtitle: '请您确认账号或密码重新重新输入',
                    iconClass: 'icon-power_settings_new',
                    headerColor: '#BD5B5B',
                    width: 600
                });
                $('#modal-alert2').iziModal('open');
                console.log(789789789)
                $('.yan-btn').attr('disabled',false);
                $('.yan-btn').css({
                    opacity:1
                })
                $('.login-form')[0].reset()
            }
        }
        else{
            // $("#modal-alert2").iziModal({})
            if(result.res){
                $("#modal-alert").iziModal({
                    title: "注册成功",
                    subtitle: '欢迎来到猫眼管理系统',
                    iconClass: 'icon-check',
                    headerColor: '#5bbd72',
                    width: 600
                });
                $('#modal-alert').iziModal('open');
            }else{
                $("#modal-alert3").iziModal({
                    title: result.data.message,
                    subtitle: '请重新起名',
                    iconClass: 'icon-power_settings_new',
                    headerColor: '#BD5B5B',
                    width: 600
                });
                $('#modal-alert3').iziModal('open');
            }
            $('.login-form')[0].reset()
            $('.email').css({
                display:'none',
                position:'relative',
                zIndex:-1,
            })
        }
    }
}
export default new signup();