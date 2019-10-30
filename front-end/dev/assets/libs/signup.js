var clock = '';
    var nums = 30;
    var btn;
    function sendCode(thisBtn) {
        btn = thisBtn;
        btn.disabled = true; //将按钮置为不可点击
        btn.value = '重新获取（'+nums+'）';
        clock = setInterval(doLoop, 1000); //一秒执行一次
    }

    function doLoop() {
        nums--;
        if (nums > 0) {
            btn.value = '重新获取（'+nums+'）';
        } else {
            clearInterval(clock); //清除js定时器
            btn.disabled = false;
            btn.value = '点击发送验证码';
            nums = 10; //重置时间
        }
    }
    
    $(document).ready(function(){
        $("#login_QQ").click(function(){
            alert("暂停使用！");
        });
        $("#login_WB").click(function(){
            alert("暂停使用！");
        });
    });