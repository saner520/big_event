$(function(){
    //点击去注册账号的链接
    $('#link_reg').on('click',()=>{
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登陆的链接
    $('#link_login').on('click',()=>{
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义一个叫做 pwd 校验规则
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value){
            var pwd = $('.reg-box [name=password]').val();
            if(pwd !== value){
                return '两次输入密码不正确'
            }
        } 
      });

    //监听注册表单的提交事件
    $('#form_reg').on('submit',(e)=>{
        //1.阻止表单的默认行为
        e.preventDefault();
        var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()};
        $.post('/api/reguser',
        data, function(res){
            if(res.status !== 0){
                return layer.msg(res.message);;
            }
            layer.msg('注册成功，请登录');;
        })
        $('#link_login').click();
    })
    //监听登录表单提交的事件
    $('#form_login').submit(function(e){
        //1.阻止表单的默认行为
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中得到数据
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('登陆失败！');
                }
                layer.msg('登陆成功！');
                //跳转到后台主页
                location.href = 'index.html'
            }
        })
    })
})